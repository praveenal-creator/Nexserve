import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import {
  HERO_IMAGE_PATH,
  SAMPLE_LOCATIONS,
  SERVICE_CATEGORIES,
  ServiceCategoryId,
} from '../data/fixnowData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  location: string;
  submittedLocation: string;
  onLocationChange: (value: string) => void;
  onLocationSubmit: (submitted: string) => void;
  onSelectCategoryAndScroll: (categoryId: ServiceCategoryId) => void;
  onJumpToAssistant: () => void;
}

export function Hero({
  location,
  submittedLocation,
  onLocationChange,
  onLocationSubmit,
  onSelectCategoryAndScroll,
  onJumpToAssistant,
}: HeroProps) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = location.trim();
    if (!trimmed) {
      setValidationError('Enter your city, neighborhood, or postal code to check coverage.');
      return;
    }
    setValidationError(null);
    onLocationSubmit(trimmed);
  };

  const handleSampleLocationClick = (sample: string) => {
    setValidationError(null);
    onLocationChange(sample);
    onLocationSubmit(sample);
  };

  return (
    <section className="bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Value Proposition & Location Finder */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-medium text-emerald-700 mb-3">
              Plumbing · Electrical · Appliance Repair
            </p>

            <h1
              className="font-display font-bold tracking-tight text-[#0b1f3a] leading-[1.08] max-w-xl"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Something broken? We&apos;ll help you fix it.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              FIXNOW connects homeowners with verified local technicians for everyday home
              repairs. Share what went wrong, review clear upfront expectations, and get
              reliable help in your neighborhood.
            </p>

            {/* Functional Location Search Form */}
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl" noValidate>
              <label htmlFor="hero-location-input" className="sr-only">
                Enter your city or postal code
              </label>
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/15 transition-all">
                <div className="flex items-center gap-2.5 flex-1 px-2.5">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  <input
                    id="hero-location-input"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      onLocationChange(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Enter city, neighborhood, or ZIP code"
                    className="w-full min-h-[44px] bg-transparent text-sm sm:text-base text-[#0b1f3a] placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span>Find a Technician</span>
                </button>
              </div>

              {validationError && (
                <p role="alert" className="mt-2.5 text-sm text-rose-600 font-medium">
                  {validationError}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-500">
                <span>Try a sample area:</span>
                {SAMPLE_LOCATIONS.map((sample, idx) => (
                  <span key={sample} className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSampleLocationClick(sample)}
                      className="text-[#0b1f3a] hover:text-emerald-700 underline underline-offset-4 decoration-slate-300 hover:decoration-emerald-600 transition-colors cursor-pointer font-medium"
                    >
                      {sample}
                    </button>
                    {idx < SAMPLE_LOCATIONS.length - 1 && (
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </form>

            {/* Interactive Location Preview Result (Frontend State Only) */}
            {submittedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0b1f3a]">
                      Service area selected: {submittedLocation}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Choose a repair category below to preview covered issues, or upload a photo
                      for a preliminary check first.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {SERVICE_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => onSelectCategoryAndScroll(category.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-600 text-xs font-semibold text-[#0b1f3a] transition-colors cursor-pointer"
                        >
                          <span>{category.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={onJumpToAssistant}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1f3a] hover:bg-[#132d52] text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        <span>Upload a photo instead</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Clean Editorial Home Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">
              <ResilientImage
                src={HERO_IMAGE_PATH}
                alt="Sunlit modern home kitchen and living room representing dependable residential care"
                fallbackLabel="Bright Residential Living Space"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
