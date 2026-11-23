import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, MapPin, Wrench, X } from 'lucide-react';
import { SERVICE_CATEGORIES, ServiceCategoryId } from '../data/fixnowData';

interface RepairRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: ServiceCategoryId;
  initialLocation: string;
  hasAttachedPhoto: boolean;
  attachedPhotoName: string | null;
}

export function RepairRequestModal({
  isOpen,
  onClose,
  initialCategory,
  initialLocation,
  hasAttachedPhoto,
  attachedPhotoName,
}: RepairRequestModalProps) {
  const [category, setCategory] = useState<ServiceCategoryId>(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
      setLocation(initialLocation);
      setError(null);
      setIsSubmitted(false);
    }
  }, [isOpen, initialCategory, initialLocation]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedService =
    SERVICE_CATEGORIES.find((item) => item.id === category) ?? SERVICE_CATEGORIES[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter your city, neighborhood, or postal code.');
      return;
    }
    if (!summary.trim() && !hasAttachedPhoto) {
      setError('Please add a brief note describing the repair issue.');
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071529]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="repair-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#0b1f3a] text-white flex items-center justify-center">
              <Wrench className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 id="repair-modal-title" className="font-display text-lg font-bold text-[#0b1f3a]">
              Get a Repair
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close repair request dialog"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#0b1f3a] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            <div>
              <span className="block text-sm font-semibold text-[#0b1f3a] mb-2">
                Service category
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SERVICE_CATEGORIES.map((item) => {
                  const active = item.id === category;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-200 text-[#0b1f3a] hover:border-slate-300'
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-location-input"
                className="block text-sm font-semibold text-[#0b1f3a] mb-2"
              >
                Neighborhood or postal code
              </label>
              <div className="flex items-center gap-2.5 px-3.5 rounded-xl border border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/15">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                <input
                  id="modal-location-input"
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g., Austin, TX or 78701"
                  className="w-full min-h-[44px] text-sm text-[#0b1f3a] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-summary-input"
                className="block text-sm font-semibold text-[#0b1f3a] mb-2"
              >
                Brief issue summary
              </label>
              <textarea
                id="modal-summary-input"
                rows={3}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={`Describe your ${selectedService.title.toLowerCase()} problem...`}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-[#0b1f3a] placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>

            {hasAttachedPhoto && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-emerald-950">
                Photo preview attached from AI Assistant:{' '}
                <strong className="font-semibold">{attachedPhotoName ?? 'Selected image'}</strong>
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm font-medium text-rose-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-[#0b1f3a] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Preview Request Summary
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-5">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-lg font-bold text-[#0b1f3a]">
                  Sample request ready
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  This preview confirms how your repair details are organized before matching
                  with a local technician. No live booking or payment is processed in this
                  first version.
                </p>
              </div>
            </div>

            <dl className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Category</dt>
                <dd className="font-semibold text-[#0b1f3a]">{selectedService.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Location</dt>
                <dd className="font-semibold text-[#0b1f3a]">{location}</dd>
              </div>
              {summary.trim() && (
                <div className="pt-2 border-t border-slate-200">
                  <dt className="text-slate-500 mb-1">Issue note</dt>
                  <dd className="text-[#0b1f3a]">{summary.trim()}</dd>
                </div>
              )}
            </dl>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 py-2 rounded-lg bg-[#0b1f3a] hover:bg-[#132d52] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
