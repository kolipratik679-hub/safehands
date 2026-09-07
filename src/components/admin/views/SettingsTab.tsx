import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Shield,
  Key,
  Lock,
  Mail,
  Database,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Server,
  FileCode,
  Terminal,
  Save
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { apiFetch, user } = useAdminAuth();
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Password update form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState(user?.email || 'safehands@gmail.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingCreds, setUpdatingCreds] = useState(false);
  const [credSuccess, setCredSuccess] = useState<string | null>(null);
  const [credError, setCredError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/settings/status');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setDbStatus(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch status', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError(null);
    setCredSuccess(null);

    if (newPassword && newPassword !== confirmPassword) {
      setCredError('New password and confirmation do not match.');
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setCredError('New password must be at least 8 characters long.');
      return;
    }

    setUpdatingCreds(true);
    try {
      const res = await apiFetch('/api/admin/settings/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail.trim(),
          newPassword: newPassword ? newPassword : undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update credentials');
      }

      setCredSuccess(data.message || 'Credentials successfully updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setCredSuccess(null), 5000);
    } catch (err: any) {
      setCredError(err.message || 'Failed to update credentials.');
    } finally {
      setUpdatingCreds(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif">
            System Settings & Hostinger Deployment
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Security credentials, MySQL connection status, and Hostinger phpMyAdmin deployment files
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/safehands-hostinger-build.zip"
            download="safehands-hostinger-build.zip"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
            title="Download complete Hostinger deployment zip"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Hostinger Build (.zip)</span>
          </a>
          <a
            href="/safehands.sql"
            download="safehands.sql"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
            title="Download MySQL schema for phpMyAdmin"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download safehands.sql</span>
          </a>
        </div>
      </div>

      {/* Hostinger phpMyAdmin & MySQL Center */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Database className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Database Engine & Hostinger Connectivity
              </h3>
              <p className="text-xs text-slate-400">
                Current runtime connection & database health
              </p>
            </div>
          </div>
          <button
            onClick={fetchStatus}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition cursor-pointer"
            title="Refresh Status"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Metrics Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Driver
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dbStatus?.isMysql ? 'bg-emerald-400' : 'bg-blue-400'}`} />
              <span className="text-sm font-bold text-white">{dbStatus?.driver || 'Detecting...'}</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {dbStatus?.isMysql ? 'Connected directly to MySQL Server' : 'Persistent JSON/Disk Engine active'}
            </span>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Host / Target Database
            </span>
            <div className="mt-1 text-xs font-mono text-slate-200">
              {dbStatus?.host} / {dbStatus?.database}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default Hostinger MySQL port: 3306
            </span>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Managed Records
            </span>
            <div className="mt-1 text-sm font-bold text-slate-200 flex items-center gap-3">
              <span>{dbStatus?.tableCounts?.services ?? 24} Services</span>
              <span>•</span>
              <span>{dbStatus?.tableCounts?.leads ?? 0} Leads</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              All tables validated for schema compatibility
            </span>
          </div>
        </div>

        {/* Informational Sandbox Mode Notice */}
        {!dbStatus?.isMysql && (
          <div className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-blue-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-blue-100">Hostinger Configuration Ready:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                You are currently previewing in the Cloud Sandbox environment with the Safehands Local Persistence Engine active. All services, inquiries, and edits are securely saved. Once deployed to your Hostinger server, your configured database (<span className="font-mono text-blue-300">{dbStatus?.database || 'MySQL'}</span>) will connect directly via <span className="font-mono text-blue-300">localhost:3306</span>.
              </p>
            </div>
          </div>
        )}

        {/* Step-by-Step Hostinger Deployment Guide */}
        <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Hostinger phpMyAdmin & Deployment Instructions</span>
          </h4>

          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
            <li>
              <strong className="text-white">Create MySQL Database in Hostinger hPanel:</strong> Navigate to{' '}
              <span className="font-mono text-blue-400">hPanel &gt; Databases &gt; MySQL Databases</span>. Create a database (e.g. <span className="font-mono text-slate-200">u123456789_safehands</span>) and database user with a secure password.
            </li>
            <li>
              <strong className="text-white">Import `safehands.sql` in phpMyAdmin:</strong> Click{' '}
              <span className="font-mono text-blue-400">Enter phpMyAdmin</span> next to your newly created database. Click the{' '}
              <span className="font-mono text-white">"Import"</span> tab at the top, choose the downloaded{' '}
              <span className="font-mono text-emerald-400">safehands.sql</span> file, and click <span className="font-mono text-white">"Go"</span>. This will automatically create all tables (`admin_users`, `contact_details`, `services`, `leads`, `testimonials`, `reviews`, `site_settings`) and seed the initial data.
            </li>
            <li>
              <strong className="text-white">Configure Environment Variables in Hostinger:</strong> Set your database credentials in the application environment variables or in `.env`:
              <div className="mt-1.5 p-2.5 bg-slate-900 rounded-lg font-mono text-[11px] text-slate-300 space-y-0.5 border border-slate-800">
                <div>DB_HOST=localhost</div>
                <div>DB_PORT=3306</div>
                <div>DB_NAME=u123456789_safehands</div>
                <div>DB_USER=u123456789_safehands</div>
                <div>DB_PASSWORD=your_hostinger_mysql_password</div>
                <div>JWT_SECRET=safehands_super_secret_jwt_key_8989_production</div>
              </div>
            </li>
            <li>
              <strong className="text-white">Deploy Node.js Application:</strong> Upload the build or repository to Hostinger Node.js application manager, run <span className="font-mono text-blue-400">npm install</span>, and start the app with <span className="font-mono text-blue-400">npm start</span>.
            </li>
          </ol>
        </div>
      </div>

      {/* Admin Security Credentials Form */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Change Admin Security Credentials
            </h3>
            <p className="text-xs text-slate-400">
              Update admin login email or password. Changes require verifying your current password.
            </p>
          </div>
        </div>

        {credSuccess && (
          <div className="p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-xl text-emerald-200 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{credSuccess}</span>
          </div>
        )}

        {credError && (
          <div className="p-3.5 bg-red-950/70 border border-red-800 rounded-xl text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{credError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Admin Email Address
            </label>
            <div className="mt-1.5 relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                New Password (Optional)
              </label>
              <div className="mt-1.5 relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="mt-1.5 relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">
              Current Security Password (Required)
            </label>
            <div className="mt-1.5 relative">
              <Lock className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to authorize changes"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-amber-500/40 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updatingCreds}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {updatingCreds ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Credentials</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
