import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/db';
import { apiRouter } from './server/api';

// Resolve directory safely across both ESM (tsx dev) and CJS (production bundle)
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // Basic security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Initialize Database (MySQL or robust fallback persistence)
  await initDatabase();

  // Mount API routes FIRST
  app.use('/api', apiRouter);

  // Serve direct SQL download for phpMyAdmin convenience
  app.get('/safehands.sql', (_req, res) => {
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="safehands.sql"');
    res.sendFile(path.join(process.cwd(), 'safehands.sql'));
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[DEV] Vite middleware attached for live development');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[PROD] Serving static production files from', distPath);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Safehands Enterprises] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[Admin Portal] Access admin at http://0.0.0.0:${PORT}/admin`);
  });
}

startServer().catch(err => {
  console.error('[Server Fatal] Failed to start server:', err);
  process.exit(1);
});
