import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-[600] text-[#16181B]">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-[#5B6167]">
          Enter your email and we'll send you a link to reset your password.
        </p>
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
              <label htmlFor="email" className="block text-sm font-[600] text-[#16181B]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                aria-label="Send password reset email"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[600] text-white bg-[#1B4B43] hover:bg-[#153A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4B43] disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
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
