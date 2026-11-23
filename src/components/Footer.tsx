import { Mail, MapPin, Phone, Wrench } from 'lucide-react';

interface FooterProps {
  onOpenRepairModal: () => void;
}

export function Footer({ onOpenRepairModal }: FooterProps) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0b1f3a]"
            >
              <span className="w-8 h-8 rounded-lg bg-[#0b1f3a] text-white flex items-center justify-center">
                <Wrench className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="font-display">FIXNOW</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed max-w-sm text-slate-600">
              Helping homeowners solve everyday plumbing, electrical, and appliance issues by
              connecting them with verified local technicians.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={onOpenRepairModal}
                className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Get a Repair
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold text-[#0b1f3a] mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-[#0b1f3a] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-[#0b1f3a] transition-colors">
                  AI Repair Assistant
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0b1f3a] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#0b1f3a] transition-colors">
                  Trust &amp; Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#0b1f3a] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@fixnow.example"
                  className="hover:text-[#0b1f3a] transition-colors"
                >
                  support@fixnow.example
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">(555) 014-8290 · Mon–Sat, 8am–6pm</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Local service coordination across participating neighborhoods</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FIXNOW. All rights reserved.</p>
          <p>
            Early preview interface · Sample content only; AI suggestions are preliminary and not
            confirmed diagnoses.
          </p>
        </div>
      </div>
    </footer>
  );
}
