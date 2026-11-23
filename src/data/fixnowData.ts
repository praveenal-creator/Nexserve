export type ServiceCategoryId = 'plumbing' | 'electrical' | 'appliance';

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  shortDescription: string;
  imageSrc: string;
  imageAlt: string;
  commonIssues: string[];
  inspectionScope: string;
  safetyTip: string;
}

export interface PreliminarySampleOutput {
  categoryLabel: string;
  suspectedArea: string;
  possibleCauses: string[];
  preparationSteps: string[];
  safetyReminder: string;
}

export interface HowItWorksStep {
  number: string;
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export interface TrustPillar {
  id: string;
  title: string;
  summary: string;
  standardNote: string;
  verificationPoints: string[];
}

export const HERO_IMAGE_PATH = '/src/assets/images/hero_home_interior_1795457218818.jpg';

export const SAMPLE_LOCATIONS = ['Austin, TX', 'Seattle, WA', 'Brooklyn, NY'] as const;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'plumbing',
    title: 'Plumbing',
    shortDescription:
      'Leaks, dripping faucets, clogged drains, running toilets, and supply valve repairs handled cleanly.',
    imageSrc: '/src/assets/images/service_plumbing_1795457219570.jpg',
    imageAlt: 'Modern brushed steel kitchen faucet and porcelain sink in a bright home',
    commonIssues: [
      'Under-sink trap leaks and worn supply hoses',
      'Dripping kitchen or bathroom faucet cartridges',
      'Slow-draining sinks, tubs, and floor drains',
      'Running toilets and faulty fill or flush valves',
    ],
    inspectionScope:
      'A local plumbing specialist checks water pressure, inspects visible seals and traps, isolates shutoff valves, and provides an itemized quote before repairs begin.',
    safetyTip:
      'If active water is pooling, turn the nearest shutoff valve clockwise before your visit.',
  },
  {
    id: 'electrical',
    title: 'Electrical',
    shortDescription:
      'Outlets, dimmer switches, flickering lights, tripped breakers, and fixture installations diagnosed safely.',
    imageSrc: '/src/assets/images/service_electrical_1795457219574.jpg',
    imageAlt: 'Matte white and brushed aluminum wall dimmer switch and outlet on a smooth plaster wall',
    commonIssues: [
      'Unresponsive or warm wall outlets and GFCI receptacles',
      'Flickering ceiling fixtures or faulty dimmer switches',
      'Frequently tripping circuit breakers on kitchen or bath lines',
      'Ceiling fan, pendant light, and smart switch replacements',
    ],
    inspectionScope:
      'A qualified electrical technician tests circuit load, checks grounding and terminal integrity, and outlines clear repair options prior to work.',
    safetyTip:
      'Never touch exposed wiring or a warm outlet—switch off the corresponding circuit breaker first.',
  },
  {
    id: 'appliance',
    title: 'Appliance Repair',
    shortDescription:
      'Washers, dryers, refrigerators, dishwashers, and ovens inspected and restored to everyday working order.',
    imageSrc: '/src/assets/images/service_appliance_1795457220169.jpg',
    imageAlt: 'Modern stainless steel and white front-loading washer and dryer in a bright laundry nook',
    commonIssues: [
      'Washers not draining, spinning, or latching properly',
      'Refrigerators running warm or building frost on coils',
      'Dishwashers leaving standing water or failing to heat',
      'Dryers tumbling without heat or making drum noise',
    ],
    inspectionScope:
      'An appliance technician verifies error codes, tests heating elements, pumps, or door seals, and confirms part availability before quoting.',
    safetyTip:
      'Unplug the appliance or switch off its dedicated breaker if you notice burning smells or standing water.',
  },
];

export const PRELIMINARY_DIAGNOSIS_SAMPLES: Record<
  ServiceCategoryId | 'general',
  PreliminarySampleOutput
> = {
  plumbing: {
    categoryLabel: 'Plumbing',
    suspectedArea: 'Supply connection, compression seal, or fixture cartridge',
    possibleCauses: [
      'Worn rubber washer or O-ring inside the valve or faucet body',
      'Loosened slip-joint nut along the P-trap or drain tailpiece',
      'Mineral buildup restricting steady shutoff or drainage flow',
    ],
    preparationSteps: [
      'Clear items from the cabinet or floor area around the fixture',
      'Place a shallow tray or towel beneath any visible drip',
      'Note whether the issue happens continuously or only while running water',
    ],
    safetyReminder:
      'Shut off the local angle stop valve if dripping accelerates before a technician inspects it.',
  },
  electrical: {
    categoryLabel: 'Electrical',
    suspectedArea: 'Receptacle termination, switch mechanism, or branch circuit load',
    possibleCauses: [
      'Tripped GFCI reset button upstream on a linked bathroom or kitchen circuit',
      'Loose terminal connection or fatigued switch contact',
      'Incompatible dimmer load with newer LED bulbs',
    ],
    preparationSteps: [
      'Unplug sensitive electronics from the affected outlet',
      'Check if neighboring outlets or lights on the same wall lost power',
      'Keep the main electrical panel unobstructed for diagnostic access',
    ],
    safetyReminder:
      'If you notice crackling sounds, heat, or scorch marks, switch off the breaker immediately.',
  },
  appliance: {
    categoryLabel: 'Appliance Repair',
    suspectedArea: 'Drain pump assembly, door latch sensor, or thermal control',
    possibleCauses: [
      'Blocked drain filter or kinked discharge hose preventing cycle completion',
      'Worn door interlock switch preventing the cycle from starting',
      'Lint buildup or tripped thermal fuse restricting heating performance',
    ],
    preparationSteps: [
      'Locate the model and serial plate inside the door rim or side frame',
      'Pause any active cycle and drain standing water if safe to do so',
      'Have a clear path in front of the unit so it can be pulled forward',
    ],
    safetyReminder:
      'Disconnect power before opening any filter cover or inspecting hoses near standing water.',
  },
  general: {
    categoryLabel: 'General Home Inspection',
    suspectedArea: 'Visible wear, seal integrity, or hardware alignment',
    possibleCauses: [
      'Aged seal, gasket, or mechanical fastener requiring replacement',
      'Minor misalignment or obstruction affecting normal operation',
      'Component fatigue that warrants closer hands-on testing',
    ],
    preparationSteps: [
      'Take a second well-lit photo from slightly farther back for spatial context',
      'Jot down when the issue started and any unusual sounds or leaks',
      'Select the closest trade category when requesting a local visit',
    ],
    safetyReminder:
      'Avoid forcing stuck valves, latches, or electrical covers until a qualified technician checks them.',
  },
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    id: 'show',
    title: 'Show the problem',
    summary: 'Snap a clear photo and enter your neighborhood.',
    detail:
      'Upload an image of the leaking pipe, faulty switch, or stalled appliance alongside a short note about what changed.',
  },
  {
    number: '02',
    id: 'understand',
    title: 'Understand the issue',
    summary: 'Review preliminary guidance and prep steps.',
    detail:
      'Get an early placeholder overview of likely areas involved and simple safety precautions while you prepare for a visit.',
  },
  {
    number: '03',
    id: 'find',
    title: 'Find a technician',
    summary: 'Match your repair need with verified local pros.',
    detail:
      'Narrow down by trade—plumbing, electrical, or appliance repair—and review transparent scope expectations upfront.',
  },
  {
    number: '04',
    id: 'fix',
    title: 'Get it fixed',
    summary: 'Approve a clear quote before work begins.',
    detail:
      'Your technician confirms the root cause on-site, shares an itemized quotation for approval, and completes the repair cleanly.',
  },
];

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: 'verification',
    title: 'Technician verification',
    summary:
      'Every technician onboarded to FIXNOW completes identity, trade credential, and insurance verification before taking residential requests.',
    standardNote: 'Pre-visit vetting standard',
    verificationPoints: [
      'Government ID and active trade license checks where applicable',
      'Background screening and proof of general liability coverage',
      'Clear trade specialization across plumbing, electrical, or appliances',
    ],
  },
  {
    id: 'quotations',
    title: 'Transparent quotations',
    summary:
      'Know what a repair involves before tools come out. On-site inspections lead to itemized written quotes that you approve first.',
    standardNote: 'Upfront approval model',
    verificationPoints: [
      'Separate breakdown of inspection, labor, and replacement parts',
      'No work proceeds without your explicit sign-off on scope and price',
      'Clear explanation when a simple adjustment solves the problem',
    ],
  },
  {
    id: 'reviews',
    title: 'Customer reviews',
    summary:
      'Feedback is designed to stay grounded in real service visits—only homeowners with a completed FIXNOW repair can submit a review.',
    standardNote: 'Verified-visit feedback policy',
    verificationPoints: [
      'Reviews tied exclusively to completed repair requests',
      'No anonymous, unverified, or placeholder star ratings displayed',
      'Structured feedback covering punctuality, cleanliness, and clarity',
    ],
  },
];
