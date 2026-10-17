export type EngineeringDiscipline = 'software' | 'robotics' | 'hardware' | 'cad' | 'ai';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface MediaItem {
  title: string;
  type: 'image' | 'diagram' | 'simulation';
  caption: string;
  url: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}

export interface SchematicStep {
  step: string;
  title: string;
  detail: string;
  discipline: EngineeringDiscipline;
}

export interface ProjectFullDoc {
  overview: string;
  challenge: string;
  solution: string;
  systemArchitecture: string;
  techSpecs: { label: string; value: string }[];
  schematicSteps?: SchematicStep[];
  codeSnippet?: CodeSnippet;
  deliverables: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  mediaGallery: MediaItem[];
}

export interface ProjectNode {
  id: string;
  title: string;
  subtitle: string;
  discipline: EngineeringDiscipline;
  status: 'Field Tested' | 'Completed' | 'Production' | 'Active R&D';
  featured: boolean;
  // Position along the spider web: which radial spoke (0 to 7) and concentric ring level (0.2 to 0.85)
  radialPosition: {
    spokeAngleDeg: number; // 0 to 360 degrees
    ringFraction: number;  // 0.2 (inner) to 0.9 (outer ring)
  };
  canvasCoords: {
    xPercent: number;
    yPercent: number;
  };
  shortSummary: string;
  thumbnailUrl: string;
  metrics: ProjectMetric[];
  tags: string[];
  connectedNodeIds: string[];
  fullDocumentation: ProjectFullDoc;
}

export interface ServiceOffering {
  id: string;
  title: string;
  discipline: EngineeringDiscipline;
  tagline: string;
  description: string;
  skills: string[];
  deliverables: string[];
  turnaround: string;
  iconName: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  disciplines: EngineeringDiscipline[];
  budgetTier: string;
  timeline: string;
  projectBrief: string;
}
