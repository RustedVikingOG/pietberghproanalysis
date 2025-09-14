import type { Service } from '../models/Service';
import type { SuccessStory } from '../models/SuccessStory';
import type { Credential } from '../models/Credential';
import type { Page } from '../models/Page';

/**
 * Service for content management and organization
 */
export class ContentService {
  /**
   * Get all available services
   * @returns Array of services based on story.md content
   */
  static getServices(): Service[] {
    return [
      {
        id: 'evidence-analysis',
        title: 'Evidence and Communication Analysis',
        description: 'Systematic process of evaluating available evidence using advanced analytical tools and methodologies.',
        category: 'evidence-analysis',
        features: [
          'Cell tower analysis and communication pattern examination',
          'Digital footprint reconstruction',
          'Systematic evidence evaluation',
          'Court-ready expert testimony'
        ],
        benefits: [
          '26 high-profile cases successfully analyzed',
          'Advanced analytical tools proficiency',
          'Proven track record in murder, cash-in-transit, and armed robbery cases',
          'Technology-enabled justice delivery'
        ],
        detailDescription: 'Modern forensic investigation where digital footprints replace traditional clues, emphasizing systematic methodology and real-world application.',
        methodology: [
          'Systematic evidence collection',
          'Digital pattern analysis',
          'Communication timeline reconstruction',
          'Expert testimony preparation'
        ],
        tools: [
          'Analyst Notebook',
          'TextChart',
          'ChartExplore',
          'i2 iBase 8',
          'i2 iBridge 8'
        ]
      },
      {
        id: 'process-reengineering',
        title: 'Operational Process Reengineering (OPR)',
        description: 'Strategic optimization of business processes through continuous improvement and systematic enhancement.',
        category: 'process-reengineering',
        features: [
          'Continuous improvement methodology',
          'Strategic thinking and systemic improvement',
          'Interactive process visualization',
          'Management expertise application'
        ],
        benefits: [
          '18 years in Component Management Services',
          'Proven leadership experience',
          'Visual methodology with interactive flowcharts',
          'Cyclical process optimization'
        ],
        detailDescription: 'Management and organizational expertise focused on moving beyond day-to-day operations to systemic improvement.',
        methodology: [
          'Current state analysis',
          'Process mapping and documentation',
          'Improvement opportunity identification',
          'Implementation and monitoring'
        ]
      },
      {
        id: 'editing-translation',
        title: 'Editorial and Translation Services',
        description: 'Professional editorial and translation services bridging linguistic and cultural gaps with scholarly precision.',
        category: 'editing-translation',
        features: [
          'MA in African Languages expertise',
          'Multi-language translation capabilities',
          'Academic rigor in editing',
          'Cultural bridge-building'
        ],
        benefits: [
          'Scholarly credibility with advanced degree',
          'Translation between Afrikaans, English, and African languages',
          'Decision-tree methodology for service levels',
          'Academic and professional editing experience'
        ],
        detailDescription: 'The intellectual foundation revealing linguistic mastery, cultural bridge-building, and scholarly rigor.',
        methodology: [
          'Source material analysis',
          'Translation strategy development',
          'Quality assurance and review',
          'Cultural adaptation verification'
        ]
      }
    ];
  }

  /**
   * Get success stories and case studies
   * @returns Array of success stories from real cases
   */
  static getSuccessStories(): SuccessStory[] {
    return [
      {
        id: 'mihalik-murder',
        title: 'Mihalik Murder Trial',
        description: 'Cellphone data analysis revealing communication patterns between accused parties.',
        outcome: 'Successful prosecution with expert testimony on cellphone tower locations and call patterns.',
        evidence: [
          'Cellphone tower location data',
          'Call log analysis',
          'Communication pattern mapping',
          'Timeline reconstruction'
        ],
        date: '2022-10-26',
        category: 'Murder Investigation',
        caseType: 'murder',
        location: 'Western Cape',
        mediaLink: 'https://www.news24.com/news24/southafrica/news/mihalik-murder-trial-cellphone-data-shows-frantic-phone-calls-between-accused-20221026'
      },
      {
        id: 'george-murder-fraud',
        title: 'George Murder and Fraud Case',
        description: 'Complex investigation involving multiple charges leading to successful convictions.',
        outcome: 'Three accused - 2 sentenced to life imprisonment and third to 15 years.',
        evidence: [
          'Evidence analysis',
          'Fraud investigation',
          'Case coordination'
        ],
        date: '2023',
        category: 'Murder and Fraud',
        caseType: 'fraud',
        location: 'George'
      },
      {
        id: 'kraaifontein-cit',
        title: 'Kraaifontein Cash-in-Transit Case',
        description: 'Investigation exposing police corruption in cash-in-transit heist.',
        outcome: 'Police official among accused sentenced to 20 years imprisonment.',
        evidence: [
          'Corruption investigation',
          'Cash-in-transit analysis',
          'Internal affairs coordination'
        ],
        date: '2023',
        category: 'Cash-in-Transit and Corruption',
        caseType: 'cash-in-transit',
        location: 'Kraaifontein'
      }
    ];
  }

  /**
   * Get credentials and qualifications
   * @returns Array of Piet Bergh's credentials
   */
  static getCredentials(): Credential[] {
    return [
      {
        id: 'ma-african-languages',
        type: 'degree',
        title: 'MA in African Languages',
        institution: 'University',
        year: 1985,
        level: 'postgraduate',
        field: 'Linguistics',
        description: 'Establishing scholarly credibility and linguistic expertise'
      },
      {
        id: 'nature-conservation',
        type: 'diploma',
        title: 'Diploma in Nature Conservation',
        institution: 'Conservation Institute',
        year: 1982,
        field: 'Environmental Studies',
        description: 'Demonstrating breadth of academic interests'
      },
      {
        id: 'management-services',
        type: 'certificate',
        title: 'Certificate in Management Services',
        institution: 'Management Institute',
        year: 1990,
        field: 'Management',
        description: 'Administrative and management competence'
      },
      {
        id: 'analyst-notebook',
        type: 'training',
        title: 'Analyst Notebook Certification',
        institution: 'IBM i2',
        year: 2010,
        field: 'Investigation Technology',
        description: 'Advanced analytical tool proficiency'
      },
      {
        id: 'textchart-chartexplore',
        type: 'training',
        title: 'TextChart and ChartExplore',
        institution: 'Investigation Training Center',
        year: 2012,
        field: 'Investigation Technology',
        description: 'Specialized investigation software training'
      },
      {
        id: 'i2-ibase',
        type: 'training',
        title: 'i2 iBase 8 and i2 iBridge 8',
        institution: 'IBM i2',
        year: 2015,
        field: 'Investigation Technology',
        description: 'Advanced investigation database systems'
      },
      {
        id: 'interview-interrogation',
        type: 'training',
        title: 'Interview and Interrogation',
        institution: 'SAPS Training College',
        year: 2005,
        field: 'Investigation Techniques',
        description: 'Core investigative interview skills'
      },
      {
        id: 'consultancy-course',
        type: 'professional',
        title: 'Consultancy Course',
        institution: 'Business Consulting Institute',
        year: 2020,
        field: 'Business Consulting',
        description: 'Transition to private practice preparation'
      }
    ];
  }

  /**
   * Get page metadata for all pages
   * @returns Array of page metadata
   */
  static getPages(): Page[] {
    return [
      {
        title: 'PietBergh ProAnalysis - Professional Investigation and Analysis Services',
        route: '/',
        description: 'Professional investigation, evidence analysis, and business consulting services by former SAPS Brigadier Piet Bergh.',
        metadata: {
          keywords: ['investigation', 'evidence analysis', 'business consulting', 'SAPS', 'Hawks', 'forensic analysis'],
          author: 'Piet Bergh',
          pageType: 'home'
        }
      },
      {
        title: 'About Piet Bergh - 37 Years of Law Enforcement Excellence',
        route: '/about',
        description: 'Learn about Piet Bergh\'s distinguished career as SAPS Brigadier and Provincial Commander of the Hawks.',
        metadata: {
          keywords: ['Piet Bergh', 'SAPS Brigadier', 'Hawks Commander', 'law enforcement', 'investigation expert'],
          author: 'Piet Bergh',
          pageType: 'about'
        }
      },
      {
        title: 'Evidence and Communication Analysis Services',
        route: '/evidential-analysis',
        description: 'Professional evidence analysis using advanced analytical tools and systematic methodology.',
        metadata: {
          keywords: ['evidence analysis', 'communication analysis', 'cellphone data', 'digital forensics'],
          author: 'Piet Bergh',
          pageType: 'service'
        }
      },
      {
        title: 'Operational Process Reengineering (OPR)',
        route: '/operational-process-reengineering',
        description: 'Strategic business process optimization and reengineering services.',
        metadata: {
          keywords: ['process reengineering', 'business optimization', 'management consulting', 'process improvement'],
          author: 'Piet Bergh',
          pageType: 'service'
        }
      },
      {
        title: 'Editorial and Translation Services',
        route: '/editing-translation',
        description: 'Professional editorial and translation services in African languages, English, and Afrikaans.',
        metadata: {
          keywords: ['editing', 'translation', 'African languages', 'Afrikaans', 'linguistic services'],
          author: 'Piet Bergh',
          pageType: 'service'
        }
      },
      {
        title: 'Success Stories and Case Studies',
        route: '/successes',
        description: 'Real-world case studies and success stories from high-profile investigations.',
        metadata: {
          keywords: ['case studies', 'success stories', 'investigation results', 'expert testimony'],
          author: 'Piet Bergh',
          pageType: 'success'
        }
      }
    ];
  }
}