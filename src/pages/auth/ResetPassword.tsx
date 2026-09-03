import React, { useState } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Firebase includes 'oobCode' in the password reset link
  const oobCode = searchParams.get('oobCode');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!oobCode) {
      setError('Invalid or missing action code. Try resetting your password again.');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage('Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-[600] text-[#16181B]">
          Set new password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-[#E4E4E7]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div role="alert" className="p-3 bg-[#B3261E] bg-opacity-10 text-[#B3261E] rounded-md text-sm">
                {error}
              </div>
            )}
            
            {message && (
              <div role="status" className="p-3 bg-[#2C7A4B] bg-opacity-10 text-[#2C7A4B] rounded-md text-sm">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-[600] text-[#16181B]">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-[600] text-[#16181B]">
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !oobCode}
                aria-label="Save new password"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[600] text-white bg-[#1B4B43] hover:bg-[#153A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4B43] disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Password'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="font-[600] text-[#1B4B43] hover:text-[#153A34]">
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
