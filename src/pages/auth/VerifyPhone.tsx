import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyPhone() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      // In a real app, confirm the result from confirmationResult.confirm(verificationCode)
      // await window.confirmationResult.confirm(verificationCode);
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    
    // In a real app, re-trigger phone auth
    setCooldown(60);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-[600] text-[#16181B]">
          Verify your phone
        </h2>
        <p className="mt-2 text-center text-sm text-[#5B6167]">
          We sent a 6-digit code to your phone number.
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

            <div>
              <fieldset>
                <legend className="sr-only">6-digit verification code</legend>
                <div className="flex justify-between gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      aria-label={`Digit ${index + 1}`}
                      className="w-12 h-14 text-center text-xl font-[600] text-[#16181B] border border-[#E4E4E7] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B4B43] focus:border-[#1B4B43]"
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || code.join('').length !== 6}
                aria-label="Verify phone number"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[600] text-white bg-[#1B4B43] hover:bg-[#153A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4B43] disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Phone'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={handleResend}
              disabled={cooldown > 0}
              aria-label={cooldown > 0 ? `Resend code in ${cooldown} seconds` : "Resend verification code"}
              className={`font-[600] ${
                cooldown > 0 
                  ? 'text-[#5B6167] cursor-not-allowed' 
                  : 'text-[#D98C3F] hover:text-[#B4581F]'
              }`}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
