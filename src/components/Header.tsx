import React, { useState, useRef, useEffect } from 'react';

export type UserRole = 'logged-out' | 'parent' | 'tutor';

interface HeaderProps {
  userRole?: UserRole;
}

export const Header: React.FC<HeaderProps> = ({ userRole = 'logged-out' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileOpen) {
        setIsProfileOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="bg-background border-b border-border py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <a 
          href="/" 
          className="text-primary font-bold text-2xl tracking-tight focus:outline-none focus:ring-2 focus:ring-accent rounded"
          aria-label="TutorTrust PK Home"
        >
          TutorTrust
        </a>
        <nav className="hidden md:flex gap-6">
          {userRole !== 'tutor' && (
            <>
              <a 
                href="/browse" 
                className="text-text-primary font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
              >
                Browse Tutors
              </a>
              <a 
                href="/how-it-works" 
                className="text-text-primary font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
              >
                How It Works
              </a>
            </>
          )}
          {userRole === 'tutor' && (
            <a 
              href="/sessions" 
              className="text-text-primary font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
            >
              My Sessions
            </a>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {userRole === 'logged-out' ? (
          <div className="flex gap-4">
            <a 
              href="/login" 
              className="text-primary font-semibold hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-accent rounded px-4 py-2"
            >
              Log In
            </a>
            <a 
              href="/signup" 
              className="bg-primary text-background font-semibold px-5 py-2 rounded-xl hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            >
              Sign Up
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button 
              aria-label="Notifications" 
              className="text-text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded p-2"
            >
              <span aria-hidden="true">🔔</span>
            </button>
            <button 
              aria-label="Messages" 
              className="text-text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded p-2"
            >
              <span aria-hidden="true">✉️</span>
            </button>
            
            <div className="relative" ref={profileRef}>
              <button 
                ref={toggleBtnRef}
                onClick={toggleProfile}
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                aria-label="Profile menu"
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent rounded p-1 ml-2"
              >
                <div 
                  className="w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center text-xl"
                  aria-hidden="true"
                >
                  👤
                </div>
                <span aria-hidden="true" className="text-text-secondary text-xs">▾</span>
              </button>

              {isProfileOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg py-2 z-50 flex flex-col"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {userRole === 'tutor' && (
                    <>
                      <a href="/verification" className="block px-4 py-3 text-text-primary hover:bg-surface focus:outline-none focus:bg-surface focus:text-primary" role="menuitem">
                        Verification Center
                      </a>
                      <a href="/payouts" className="block px-4 py-3 text-text-primary hover:bg-surface focus:outline-none focus:bg-surface focus:text-primary" role="menuitem">
                        Payout Settings
                      </a>
                    </>
                  )}
                  <a href="/settings" className="block px-4 py-3 text-text-primary hover:bg-surface focus:outline-none focus:bg-surface focus:text-primary" role="menuitem">
                    Account Settings
                  </a>
                  <a href="/help" className="block px-4 py-3 text-text-primary hover:bg-surface focus:outline-none focus:bg-surface focus:text-primary" role="menuitem">
                    Help & Support
                  </a>
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={() => {}} 
                    className="w-full text-left block px-4 py-3 text-error font-medium hover:bg-surface focus:outline-none focus:bg-surface"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
