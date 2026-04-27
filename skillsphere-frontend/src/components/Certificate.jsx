import React, { useState } from 'react';
import { Award, Download, X, Star, CheckCircle } from 'lucide-react';

const CertificateModal = ({ course, userName, onClose }) => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleDownload = () => {
    alert(`🎉 Certificate for "${course.title}" is being downloaded!\n\nIn a real app this would generate a PDF.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden" style={{ animation: 'zoomIn 0.25s ease-out' }}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Your Certificate</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Certificate */}
        <div
          className="mx-6 my-6 rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fefbf3 0%, #fef3c7 50%, #fde68a 100%)',
            border: '3px solid #f59e0b',
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-yellow-400 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-yellow-400 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-yellow-400 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-yellow-400 rounded-br-lg" />

          <div className="text-center relative z-10">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Badge */}
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <Award className="w-8 h-8 text-white" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-700 mb-2">
              SkillSphere — Certificate of Completion
            </p>
            <p className="text-sm text-gray-500 mb-2">This certifies that</p>
            <h2 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              {userName}
            </h2>
            <p className="text-sm text-gray-500 mb-3">has successfully completed</p>
            <h3 className="text-xl font-extrabold text-indigo-700 mb-1">{course.title}</h3>
            <p className="text-xs text-gray-400 mb-4">Instructor: {course.instructor}</p>

            <div className="w-24 h-px bg-yellow-400 mx-auto mb-3" />

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              Issued on {date}
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="px-6 pb-6 flex justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold text-sm shadow-md
                       hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CertificateModal;
