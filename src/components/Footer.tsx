import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Trust & Safety */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 text-lg">Trust & Safety</h3>
            <ul className="space-y-3">
              <li>
                <a href="/safety" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="/verified" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Verified Tutors
                </a>
              </li>
              <li>
                <a href="/child-safety" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Child Safety Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Escrow Payments */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 text-lg">Escrow Payments</h3>
            <ul className="space-y-3">
              <li>
                <a href="/how-escrow-works" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  How Escrow Works
                </a>
              </li>
              <li>
                <a href="/payment-security" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Payment Security
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Refund/Dispute Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 text-lg">Cities</h3>
            <ul className="space-y-3">
              <li>
                <a href="/cities/lahore" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Lahore
                </a>
              </li>
              <li>
                <a href="/cities/karachi" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Karachi
                </a>
              </li>
              <li>
                <a href="/cities/islamabad" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Islamabad
                </a>
              </li>
              <li>
                <a href="/cities/faisalabad" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Faisalabad
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Contact / Help & Support
                </a>
              </li>
              <li>
                <a href="/terms" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-text-secondary text-sm">
          <p>&copy; 2026 TutorTrust PK. Secure Academic Excellence.</p>
        </div>
      </div>
    </footer>
  );
};
