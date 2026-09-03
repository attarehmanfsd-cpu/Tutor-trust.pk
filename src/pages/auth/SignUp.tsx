import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [role, setRole] = useState<'parent' | 'tutor'>('parent');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!terms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would also save the role, phone and name to Firestore.
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to verify phone or dashboard
      navigate('/verify-phone');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-[600] text-[#16181B]">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-[#E4E4E7]">
          <div 
            role="tablist" 
            aria-label="Account Type"
            className="flex space-x-4 mb-6 border-b border-[#E4E4E7] pb-2"
          >
            <button
              role="tab"
              aria-selected={role === 'parent'}
              aria-controls="panel-parent"
              id="tab-parent"
              onClick={() => setRole('parent')}
              className={`pb-2 px-1 text-sm font-[600] border-b-2 ${
                role === 'parent' 
                  ? 'border-[#1B4B43] text-[#1B4B43]' 
                  : 'border-transparent text-[#5B6167] hover:text-[#16181B]'
              }`}
            >
              Parent/Student
            </button>
            <button
              role="tab"
              aria-selected={role === 'tutor'}
              aria-controls="panel-tutor"
              id="tab-tutor"
              onClick={() => setRole('tutor')}
              className={`pb-2 px-1 text-sm font-[600] border-b-2 ${
                role === 'tutor' 
                  ? 'border-[#1B4B43] text-[#1B4B43]' 
                  : 'border-transparent text-[#5B6167] hover:text-[#16181B]'
              }`}
            >
              Tutor
            </button>
          </div>

          <form 
            role="tabpanel" 
            id={`panel-${role}`} 
            aria-labelledby={`tab-${role}`} 
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            {error && (
              <div role="alert" className="p-3 bg-[#B3261E] bg-opacity-10 text-[#B3261E] rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-[600] text-[#16181B]">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="block text-sm font-[600] text-[#16181B]">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#E4E4E7] rounded-md shadow-sm placeholder-[#5B6167] focus:outline-none focus:ring-[#1B4B43] focus:border-[#1B4B43] sm:text-sm"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-[600] text-[#16181B]">
                Password
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

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="h-4 w-4 text-[#1B4B43] focus:ring-[#1B4B43] border-[#E4E4E7] rounded"
                aria-required="true"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-[#16181B]">
                I agree to the <a href="#" className="text-[#1B4B43] hover:text-[#153A34]">Terms and Conditions</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                aria-label="Sign up for an account"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[600] text-white bg-[#1B4B43] hover:bg-[#153A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4B43] disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
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
                  Already have an account?{' '}
                  <Link to="/login" className="font-[600] text-[#1B4B43] hover:text-[#153A34]">
                    Log in
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
