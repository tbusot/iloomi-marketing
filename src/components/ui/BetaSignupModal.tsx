'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [interview, setInterview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setConsent(false);
    setInterview(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-dark-green/50 hover:text-dark-green transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-dark-green mb-2">
                    Join the Beta
                  </h2>
                  <p className="text-dark-green/60 mb-6">
                    Get early access to Iloomi via TestFlight and be among the first to preserve your life story.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-green mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-dark-green/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-green mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-dark-green/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                          className="mt-1 w-4 h-4 text-purple border-dark-green/20 rounded focus:ring-purple"
                        />
                        <span className="text-sm text-dark-green/70">
                          I agree to receive updates about Iloomi and understand my data will be handled according to the Privacy Policy.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={interview}
                          onChange={(e) => setInterview(e.target.checked)}
                          className="mt-1 w-4 h-4 text-purple border-dark-green/20 rounded focus:ring-purple"
                        />
                        <span className="text-sm text-dark-green/70">
                          I'm open to participating in user interviews to help improve Iloomi (optional).
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-purple text-white py-3 px-6 rounded-full font-medium hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {loading ? 'Submitting...' : 'Get Early Access'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-marine-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-marine-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-dark-green mb-2">
                    You're on the list!
                  </h2>
                  <p className="text-dark-green/60 mb-6">
                    Check your email for instructions on how to access Iloomi via TestFlight on iOS.
                  </p>
                  <div className="bg-off-white rounded-xl p-4 text-left">
                    <h3 className="font-medium text-dark-green mb-2">Next steps:</h3>
                    <ol className="text-sm text-dark-green/70 space-y-2">
                      <li>1. Download TestFlight from the App Store</li>
                      <li>2. Open the invitation link from your email</li>
                      <li>3. Install Iloomi and start your story!</li>
                    </ol>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-6 text-purple font-medium hover:text-purple/80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
