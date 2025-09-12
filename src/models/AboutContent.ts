/**
 * Interface for About page content structure
 */
export interface AboutContent {
  introduction: string;
  journey: JourneyPhase[];
  values: CoreValue[];
  achievements: string[];
  professionalAssociation: string;
}

/**
 * Interface for career journey timeline phases
 */
export interface JourneyPhase {
  phase: string;
  description: string;
  years?: string;
  icon?: string;
}

/**
 * Interface for core values and principles
 */
export interface CoreValue {
  name: string;
  description: string;
  icon?: string;
}