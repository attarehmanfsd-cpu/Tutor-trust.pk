import React from 'react';

export interface Tutor {
  id: string;
  name: string;
  photoUrl: string;
  qualification: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  hourlyRate: number;
  subjects: string[];
  city: string;
}

interface TutorCardProps {
  tutor: Tutor;
  onBook: (tutorId: string) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor, onBook }) => {
  return (
    <div className="bg-[#F7F7F8] border border-[#E4E4E7] rounded-xl p-4 flex flex-col md:flex-row gap-4">
      <img 
        src={tutor.photoUrl} 
        alt={`Profile photo of ${tutor.name}`}
        className="w-24 h-24 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-[#16181B] flex items-center gap-2">
              {tutor.name}
              {tutor.isVerified && (
                <span className="inline-flex items-center gap-1 bg-[#2C7A4B]/10 text-[#2C7A4B] text-xs px-2 py-1 rounded-full font-medium" aria-label="Verified Tutor">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </h3>
            <p className="text-[#5B6167] text-sm mt-1">{tutor.qualification} • {tutor.city}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#16181B]">Rs {tutor.hourlyRate}<span className="text-sm font-normal text-[#5B6167]">/hr</span></div>
            <div className="flex items-center justify-end gap-1 text-sm mt-1" aria-label={`Rating: ${tutor.rating} out of 5 from ${tutor.reviewCount} reviews`}>
              <span className="text-[#D98C3F]" aria-hidden="true">★</span>
              <span className="font-medium text-[#16181B]">{tutor.rating.toFixed(1)}</span>
              <span className="text-[#5B6167]">({tutor.reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {tutor.subjects.map(subject => (
            <span key={subject} className="bg-white border border-[#E4E4E7] text-[#5B6167] text-xs px-2 py-1 rounded-md">
              {subject}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E4E4E7] flex justify-end">
          <button 
            onClick={() => onBook(tutor.id)}
            className="bg-[#1B4B43] hover:bg-[#153A34] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors min-h-[44px] min-w-[44px]"
            aria-label={`Book a session with ${tutor.name}, ${tutor.subjects[0]} tutor`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
};
