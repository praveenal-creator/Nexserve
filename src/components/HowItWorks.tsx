import { useState } from 'react';
import { Camera, CheckCircle2, ScanSearch, UserCheck } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/fixnowData';

const STEP_ICONS = [Camera, ScanSearch, UserCheck, CheckCircle2];

export function HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-[#0b1f3a] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium text-emerald-400 mb-2">How It Works</p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-xl"
              style={{ textWrap: 'balance' }}
            >
              Four straightforward steps from issue to repair
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
            Designed to remove guesswork before anyone arrives at your door—with clear
            communication at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? CheckCircle2;
            const isActive = index === activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                aria-pressed={isActive}
                className={`text-left rounded-2xl p-6 transition-all duration-150 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-[#132d52] border border-emerald-400/70'
                    : 'bg-[#0f2747] border border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="font-display text-sm font-bold tracking-wide text-emerald-400 tabular-nums">
                    {step.number}.
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-emerald-500 text-[#071529]' : 'bg-white/10 text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed mb-3">{step.summary}</p>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-auto pt-3 border-t border-white/10">
                  {step.detail}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
