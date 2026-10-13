/**
 * Proposed construction process. NOT yet confirmed as Pioneer Builders' actual workflow.
 */
export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Consultation", text: "Understanding the requirement, the site and the intended use of the building." },
  { title: "Planning", text: "Translating the brief into a workable programme, drawings and construction approach." },
  { title: "Estimation", text: "Preparing a clear estimate of cost and quantities before work begins." },
  { title: "Construction", text: "Executing the structure and finishes on site, with supervision at each stage." },
  { title: "Quality inspection", text: "Checking completed work against drawings and specifications." },
  { title: "Handover", text: "Completing documentation and handing the finished building to its owner." },
];

export interface ExperienceMetric {
  value: string;
  label: string;
  detail: string;
}

export const experienceMetrics: ExperienceMetric[] = [
  {
    value: "100+",
    label: "Projects Delivered",
    detail: "Construction experience built across completed projects.",
  },
  {
    value: "1,00,000+",
    label: "Sq. Ft. Built",
    detail: "Built area delivered through disciplined construction execution.",
  },
  {
    value: "10+",
    label: "Categories of Work",
    detail: "Diverse construction capabilities serving different project requirements.",
  },
];

export const approachPoints = [
  { title: "Plan before pouring", text: "Drawings, sequence and materials are settled before work reaches the site." },
  { title: "Supervised execution", text: "Each stage of construction is supervised and checked before the next begins." },
  { title: "Accountable handover", text: "Work is completed, inspected and documented before it is handed over." },
] as const;
