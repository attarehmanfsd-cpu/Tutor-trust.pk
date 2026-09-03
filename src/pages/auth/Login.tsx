import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-[600] text-[#16181B]">
          Log in to your account
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-[600] text-[#16181B]">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-[600] text-[#1B4B43] hover:text-[#153A34]">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                aria-label="Log in to your account"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[600] text-white bg-[#1B4B43] hover:bg-[#153A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4B43] disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E4E7]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#5B6167]">
                  New to TutorTrust?{' '}
                  <Link to="/signup" className="font-[600] text-[#1B4B43] hover:text-[#153A34]">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
