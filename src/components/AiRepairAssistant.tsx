import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ImagePlus,
  RotateCcw,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  PRELIMINARY_DIAGNOSIS_SAMPLES,
  ServiceCategoryId,
} from '../data/fixnowData';

interface AiRepairAssistantProps {
  selectedCategory: ServiceCategoryId | 'general';
  onCategoryChange: (category: ServiceCategoryId | 'general') => void;
  uploadedPreviewUrl: string | null;
  uploadedFileName: string | null;
  onImageSelected: (previewUrl: string | null, fileName: string | null) => void;
  onRequestTechnicianFromAssistant: (category: ServiceCategoryId) => void;
}

const CATEGORY_OPTIONS: Array<{ id: ServiceCategoryId | 'general'; label: string }> = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'appliance', label: 'Appliance Repair' },
  { id: 'general', label: 'Not sure yet' },
];

export function AiRepairAssistant({
  selectedCategory,
  onCategoryChange,
  uploadedPreviewUrl,
  uploadedFileName,
  onImageSelected,
  onRequestTechnicianFromAssistant,
}: AiRepairAssistantProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [issueNote, setIssueNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [hasGeneratedPreview, setHasGeneratedPreview] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedPreviewUrl) {
        URL.revokeObjectURL(uploadedPreviewUrl);
      }
    };
  }, [uploadedPreviewUrl]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file (PNG, JPG, or WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image exceeds 10MB. Please select a smaller photo.');
      return;
    }

    setUploadError(null);
    if (uploadedPreviewUrl) {
      URL.revokeObjectURL(uploadedPreviewUrl);
    }
    const nextUrl = URL.createObjectURL(file);
    onImageSelected(nextUrl, file.name);
    setHasGeneratedPreview(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleClearPhoto = () => {
    if (uploadedPreviewUrl) {
      URL.revokeObjectURL(uploadedPreviewUrl);
    }
    onImageSelected(null, null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunPreliminaryPreview = () => {
    if (!uploadedPreviewUrl && !issueNote.trim()) {
      setUploadError('Upload a photo or enter a brief note to preview preliminary guidance.');
      return;
    }
    setUploadError(null);
    setHasGeneratedPreview(true);
  };

  const diagnosisSample = PRELIMINARY_DIAGNOSIS_SAMPLES[selectedCategory];
  const targetServiceCategory: ServiceCategoryId =
    selectedCategory === 'general' ? 'plumbing' : selectedCategory;

  return (
    <section id="ai-assistant" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-sm font-medium text-emerald-700 mb-2">AI Repair Assistant</p>
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0b1f3a]"
            style={{ textWrap: 'balance' }}
          >
            Not sure what&apos;s wrong?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Upload a photo of a dripping pipe, tripped outlet, or faulty appliance to preview
            how FIXNOW structures an initial diagnostic overview before you connect with a
            local technician.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Photo Upload & Description */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7 flex flex-col">
            <div className="mb-5">
              <span className="block text-sm font-semibold text-[#0b1f3a] mb-2.5">
                1. Choose issue area (optional)
              </span>
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/60 rounded-lg">
                {CATEGORY_OPTIONS.map((option) => {
                  const isActive = selectedCategory === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onCategoryChange(option.id)}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#0b1f3a] shadow-sm'
                          : 'text-slate-600 hover:text-[#0b1f3a]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5">
              <span className="block text-sm font-semibold text-[#0b1f3a] mb-2.5">
                2. Upload a photo of the broken item
              </span>

              <input
                ref={fileInputRef}
                id="repair-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="sr-only"
              />

              {!uploadedPreviewUrl ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload a photo of the broken item"
                  className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-50/70'
                      : 'border-slate-300 bg-white hover:border-emerald-600/70'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0b1f3a] flex items-center justify-center mx-auto mb-3">
                    <ImagePlus className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-[#0b1f3a]">
                    Click to choose a photo or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG, or WEBP up to 10MB · Preview stays local in your browser
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={uploadedPreviewUrl}
                      alt={uploadedFileName ? `Uploaded preview: ${uploadedFileName}` : 'Uploaded repair item preview'}
                      className="w-full h-full object-contain bg-slate-900/5"
                    />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between gap-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 min-w-0">
                      <Camera className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                      <span className="text-xs sm:text-sm font-medium text-[#0b1f3a] truncate">
                        {uploadedFileName || 'Selected photo'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0b1f3a] px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Replace</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleClearPhoto}
                        aria-label="Remove uploaded photo"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-800 px-2.5 py-1.5 rounded-md border border-rose-200 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="issue-note-input"
                className="block text-sm font-semibold text-[#0b1f3a] mb-2"
              >
                3. Describe what happened (optional)
              </label>
              <textarea
                id="issue-note-input"
                rows={3}
                value={issueNote}
                onChange={(e) => {
                  setIssueNote(e.target.value);
                  if (uploadError) setUploadError(null);
                }}
                placeholder="Example: Slow drip under the kitchen sink cabinet whenever the faucet runs."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0b1f3a] placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>

            {uploadError && (
              <p role="alert" className="mb-4 text-sm font-medium text-rose-600">
                {uploadError}
              </p>
            )}

            <div className="mt-auto">
              <button
                type="button"
                onClick={handleRunPreliminaryPreview}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0b1f3a] hover:bg-[#132d52] text-white text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>
                  {hasGeneratedPreview
                    ? 'Refresh Preliminary Diagnosis Preview'
                    : 'Preview Preliminary Diagnosis'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Preliminary AI Diagnosis Placeholder & Mandatory Disclaimer */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Preliminary AI Diagnosis Placeholder
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b1f3a] mt-0.5">
                    {hasGeneratedPreview
                      ? `${diagnosisSample.categoryLabel} — Sample Assessment`
                      : 'Ready for your photo or description'}
                  </h3>
                </div>
              </div>

              {!hasGeneratedPreview ? (
                <div className="py-10 space-y-4">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Once you upload a photo or add a short note on the left, this panel displays
                    a structured sample overview showing:
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>Likely fixture or component area involved</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>Common possibilities a technician will check first</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>Practical safety and preparation steps before arrival</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() => setHasGeneratedPreview(true)}
                    className="mt-2 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                  >
                    Preview a sample {diagnosisSample.categoryLabel.toLowerCase()} summary
                  </button>
                </div>
              ) : (
                <motion.div
                  key={`${selectedCategory}-${uploadedFileName ?? 'text'}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="py-5 space-y-5"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Likely area to inspect
                    </p>
                    <p className="text-sm sm:text-base font-medium text-[#0b1f3a]">
                      {diagnosisSample.suspectedArea}
                    </p>
                    {issueNote.trim() && (
                      <p className="mt-1.5 text-xs text-slate-500">
                        Your note included: &ldquo;{issueNote.trim()}&rdquo;
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Possible contributing factors (sample placeholder)
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {diagnosisSample.possibleCauses.map((cause) => (
                        <li key={cause} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-emerald-600 font-bold">
                            ·
                          </span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Helpful prep before a visit
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {diagnosisSample.preparationSteps.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onRequestTechnicianFromAssistant(targetServiceCategory)}
                      className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Request a {diagnosisSample.categoryLabel} check
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mandatory Disclaimer */}
            <div
              role="note"
              aria-label="Preliminary diagnosis disclaimer"
              className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3"
            >
              <AlertTriangle
                className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                <strong className="font-semibold">Not a confirmed diagnosis:</strong> AI
                suggestions are preliminary placeholders meant to help you organize details for
                your technician. Only an on-site inspection by a qualified professional can
                confirm the fault, verify safety, and provide an accurate quote.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
