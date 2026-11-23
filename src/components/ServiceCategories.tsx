import { ArrowRight, Check, Droplets, Refrigerator, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICE_CATEGORIES, ServiceCategoryId } from '../data/fixnowData';
import { ResilientImage } from './ResilientImage';

interface ServiceCategoriesProps {
  selectedCategoryId: ServiceCategoryId;
  onSelectCategory: (id: ServiceCategoryId) => void;
  onOpenAssistantWithCategory: (id: ServiceCategoryId) => void;
  onStartRepairRequest: (id: ServiceCategoryId) => void;
}

const CATEGORY_ICONS: Record<ServiceCategoryId, typeof Droplets> = {
  plumbing: Droplets,
  electrical: Zap,
  appliance: Refrigerator,
};

export function ServiceCategories({
  selectedCategoryId,
  onSelectCategory,
  onOpenAssistantWithCategory,
  onStartRepairRequest,
}: ServiceCategoriesProps) {
  const activeCategory =
    SERVICE_CATEGORIES.find((cat) => cat.id === selectedCategoryId) ?? SERVICE_CATEGORIES[0];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="text-sm font-medium text-emerald-700 mb-2">Core Services</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0b1f3a] max-w-xl">
              Everyday home repairs, clearly scoped
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Select a trade category to review common household repairs, what an inspection
            covers, and safety steps while you wait.
          </p>
        </div>

        {/* 3 Clickable Service Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isSelected = category.id === selectedCategoryId;

            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                aria-pressed={isSelected}
                className={`group text-left rounded-2xl bg-white overflow-hidden transition-all duration-150 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'border-2 border-emerald-600 shadow-sm'
                    : 'border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    fallbackLabel={category.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-[#0b1f3a] group-hover:bg-slate-200/70'
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <span
                      className={`text-xs font-semibold transition-colors ${
                        isSelected ? 'text-emerald-700' : 'text-slate-400 group-hover:text-[#0b1f3a]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'View details'}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0b1f3a] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {category.shortDescription}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Service Details Panel */}
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1.5">
                {activeCategory.title} Scope
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b1f3a]">
                Common {activeCategory.title.toLowerCase()} issues we help coordinate
              </h3>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeCategory.commonIssues.map((issue) => (
                  <li key={issue} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check
                      className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 pt-6 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-slate-200 space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-[#0b1f3a] mb-1.5">
                  What an on-site visit covers
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeCategory.inspectionScope}
                </p>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <ShieldAlert
                  className="w-4 h-4 text-[#0b1f3a] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{activeCategory.safetyTip}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onStartRepairRequest(activeCategory.id)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#0b1f3a] hover:bg-[#132d52] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <span>Request {activeCategory.title}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAssistantWithCategory(activeCategory.id)}
                  className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg border border-slate-200 hover:border-emerald-600 text-sm font-semibold text-[#0b1f3a] hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  Upload photo for AI check
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
