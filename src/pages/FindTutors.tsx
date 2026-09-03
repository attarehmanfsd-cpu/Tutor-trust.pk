import React, { useState, useMemo } from 'react';
import { TutorCard } from '../components/TutorCard';
import type { Tutor } from '../components/TutorCard';

// Dummy data for development
const DUMMY_TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Ali Hassan',
    photoUrl: 'https://i.pravatar.cc/150?u=1',
    qualification: 'MSc Physics',
    rating: 4.8,
    reviewCount: 42,
    isVerified: true,
    hourlyRate: 1500,
    subjects: ['Physics', 'Mathematics'],
    city: 'Lahore'
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    photoUrl: 'https://i.pravatar.cc/150?u=2',
    qualification: 'BS Computer Science',
    rating: 4.9,
    reviewCount: 18,
    isVerified: true,
    hourlyRate: 2000,
    subjects: ['Computer Science'],
    city: 'Karachi'
  },
  {
    id: '3',
    name: 'Usman Tariq',
    photoUrl: 'https://i.pravatar.cc/150?u=3',
    qualification: 'MA English',
    rating: 4.5,
    reviewCount: 9,
    isVerified: false,
    hourlyRate: 1000,
    subjects: ['English'],
    city: 'Islamabad'
  }
];

const SUBJECTS = ['All', 'Physics', 'Mathematics', 'Computer Science', 'English', 'Chemistry'];
const CITIES = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Faisalabad'];
const RATE_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: 'Under Rs 1500', value: 1500 },
  { label: 'Under Rs 2500', value: 2500 },
];

export const FindTutors: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [maxRate, setMaxRate] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredTutors = useMemo(() => {
    return DUMMY_TUTORS.filter(tutor => {
      if (selectedSubject !== 'All' && !tutor.subjects.includes(selectedSubject)) return false;
      if (selectedCity !== 'All' && tutor.city !== selectedCity) return false;
      if (maxRate > 0 && tutor.hourlyRate > maxRate) return false;
      if (verifiedOnly && !tutor.isVerified) return false;
      return true;
    });
  }, [selectedSubject, selectedCity, maxRate, verifiedOnly]);

  const handleResetFilters = () => {
    setSelectedSubject('All');
    setSelectedCity('All');
    setMaxRate(0);
    setVerifiedOnly(false);
  };

  const handleBook = (tutorId: string) => {
    console.log(`Booking tutor ${tutorId}`);
    // Navigation to booking flow would go here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-[#16181B] mb-8">Browse Tutors</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-[#F7F7F8] p-5 rounded-xl border border-[#E4E4E7]">
            <h2 className="text-lg font-semibold text-[#16181B] mb-4">Filters</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="subject-filter" className="block text-sm font-medium text-[#16181B] mb-1">Subject</label>
                <select 
                  id="subject-filter"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2 text-[#16181B] min-h-[44px]"
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="city-filter" className="block text-sm font-medium text-[#16181B] mb-1">City</label>
                <select 
                  id="city-filter"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2 text-[#16181B] min-h-[44px]"
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="rate-filter" className="block text-sm font-medium text-[#16181B] mb-1">Hourly Rate</label>
                <select 
                  id="rate-filter"
                  value={maxRate}
                  onChange={(e) => setMaxRate(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2 text-[#16181B] min-h-[44px]"
                >
                  {RATE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-5 h-5 border-[#E4E4E7] rounded text-[#1B4B43] focus:ring-[#1B4B43] focus:ring-offset-2 min-h-[44px] min-w-[44px]"
                      aria-label="Show verified tutors only"
                    />
                  </div>
                  <span className="text-sm font-medium text-[#16181B]">Verified Only</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {filteredTutors.length > 0 ? (
            <div className="space-y-4">
              <div className="mb-4 text-[#5B6167]" aria-live="polite">
                Showing {filteredTutors.length} {filteredTutors.length === 1 ? 'tutor' : 'tutors'}
              </div>
              {filteredTutors.map(tutor => (
                <TutorCard key={tutor.id} tutor={tutor} onBook={handleBook} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F7F7F8] border border-[#E4E4E7] rounded-xl p-8 text-center" role="status">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E4E4E7]">
                <svg className="w-8 h-8 text-[#5B6167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#16181B] mb-2">No tutors match these filters</h3>
              <p className="text-[#5B6167] mb-6">Try adjusting your search criteria to find what you're looking for.</p>
              <button 
                onClick={handleResetFilters}
                className="bg-white border border-[#E4E4E7] text-[#16181B] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium min-h-[44px] inline-flex items-center gap-2"
                aria-label="Reset all search filters"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FindTutors;
