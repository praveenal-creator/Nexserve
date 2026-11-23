import { Check, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { TRUST_PILLARS } from '../data/fixnowData';

const PILLAR_ICONS = {
  verification: ShieldCheck,
  quotations: FileText,
  reviews: MessageSquare,
} as const;

export function TrustSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-emerald-700 mb-2">Trust &amp; Standards</p>
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0b1f3a]"
            style={{ textWrap: 'balance' }}
          >
            Built around clarity, safety, and accountability
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Inviting someone into your home requires clear standards. Here is how FIXNOW
            approaches verification, pricing transparency, and homeowner feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar) => {
            const Icon =
              PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] ?? ShieldCheck;

            return (
              <article
                key={pillar.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#0b1f3a] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {pillar.standardNote}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#0b1f3a] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {pillar.summary}
                </p>

                <ul className="mt-auto space-y-2.5 pt-5 border-t border-slate-200">
                  {pillar.verificationPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
