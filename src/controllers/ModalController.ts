import { ref } from 'vue';
import type { LegalContent } from '@/models/OverlayModal';

/**
 * ModalController handles the business logic for modal state management
 * and content orchestration
 */
export class ModalController {
  private _isOpen = ref<boolean>(false);
  private _currentContent = ref<LegalContent | null>(null);

  /**
   * Reactive reference for modal open state
   */
  get isOpen() {
    return this._isOpen;
  }

  /**
   * Reactive reference for current modal content
   */
  get currentContent() {
    return this._currentContent;
  }

  /**
   * Opens the modal with the specified content
   */
  openModal = (content: LegalContent): void => {
    this._currentContent.value = content;
    this._isOpen.value = true;
  };

  /**
   * Closes the modal and clears content
   */
  closeModal = (): void => {
    this._isOpen.value = false;
    // Delay clearing content to allow for close animation
    setTimeout(() => {
      this._currentContent.value = null;
    }, 200);
  };

  /**
   * Opens Privacy Policy modal
   */
  openPrivacyPolicy = (): void => {
    this.openModal(this.getPrivacyPolicyContent());
  };

  /**
   * Opens Terms of Service modal
   */
  openTermsOfService = (): void => {
    this.openModal(this.getTermsOfServiceContent());
  };

  /**
   * Opens Professional Standards modal
   */
  openProfessionalStandards = (): void => {
    this.openModal(this.getProfessionalStandardsContent());
  };

  /**
   * Gets Privacy Policy content
   */
  private getPrivacyPolicyContent(): LegalContent {
    return {
      type: 'privacy',
      title: 'Privacy Policy',
      icon: 'shield',
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      contactInfo: {
        email: 'pietbergh.proanalysis@gmail.com',
        phone: '+27 71 181 8582'
      },
      sections: [
        {
          heading: 'Information We Collect',
          content: [
            'At PietBergh ProAnalysis, we collect information that you provide directly to us when you contact us for consultation services, request quotes, or engage our professional services.',
            'This may include your name, email address, phone number, business information, and details about your specific investigation or analysis needs.',
            'We may also collect information about your use of our website through cookies and analytics tools to improve your experience.'
          ]
        },
        {
          heading: 'How We Use Your Information',
          content: [
            'We use the information we collect to provide professional investigation and analysis services tailored to your specific needs.',
            'Your information helps us communicate with you about our services, respond to inquiries, and provide case updates.',
            'We may use your contact information to send you relevant information about our services, industry insights, or important updates.'
          ]
        },
        {
          heading: 'Information Sharing and Protection',
          content: [
            'We maintain strict confidentiality standards consistent with professional investigation practices and legal requirements.',
            'Your personal information is never sold, rented, or shared with third parties except as required by law or with your explicit consent.',
            'We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.',
            'All case-related information is handled under strict professional confidentiality agreements.'
          ]
        },
        {
          heading: 'Data Retention',
          content: [
            'We retain your personal information only as long as necessary to provide our services and comply with legal obligations.',
            'Case files and related documentation are maintained according to professional standards and regulatory requirements.',
            'You may request deletion of your personal information, subject to legal and professional retention requirements.'
          ]
        },
        {
          heading: 'Your Rights',
          content: [
            'You have the right to access, correct, or delete your personal information.',
            'You may opt out of promotional communications at any time.',
            'You can request information about how your data is processed and stored.',
            'For any privacy-related concerns or requests, please contact us using the information provided below.'
          ]
        }
      ]
    };
  }

  /**
   * Gets Terms of Service content
   */
  private getTermsOfServiceContent(): LegalContent {
    return {
      type: 'terms',
      title: 'Terms of Service',
      icon: 'document',
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      contactInfo: {
        email: 'pietbergh.proanalysis@gmail.com',
        phone: '+27 71 181 8582'
      },
      sections: [
        {
          heading: 'Service Agreement',
          content: [
            'By engaging PietBergh ProAnalysis for professional services, you agree to these terms and conditions.',
            'Our services include private investigation, evidence analysis, process reengineering, and linguistic services.',
            'All services are provided by qualified professionals with extensive law enforcement and investigation experience.'
          ]
        },
        {
          heading: 'Professional Standards',
          content: [
            'We adhere to the highest professional standards and ethical guidelines in all our investigations and analyses.',
            'Our work is conducted in compliance with South African law and international best practices.',
            'All investigations are performed within legal boundaries and with respect for individual rights and privacy.'
          ]
        },
        {
          heading: 'Confidentiality',
          content: [
            'We maintain strict confidentiality regarding all client matters and case information.',
            'Client communications and case details are protected under professional privilege where applicable.',
            'Information sharing is limited to what is necessary for service delivery and legal compliance.'
          ]
        },
        {
          heading: 'Limitation of Liability',
          content: [
            'Our liability is limited to the value of services provided for the specific engagement.',
            'We do not guarantee specific outcomes, as investigation results depend on available evidence and circumstances.',
            'Professional indemnity insurance covers our services as required by law.'
          ]
        },
        {
          heading: 'Payment and Billing',
          content: [
            'Service fees are agreed upon before commencement of work and may include retainer requirements.',
            'Billing is conducted according to agreed schedules and payment terms.',
            'Expenses and disbursements may be charged separately as agreed in the service contract.'
          ]
        },
        {
          heading: 'Termination',
          content: [
            'Either party may terminate the service agreement with appropriate notice as specified in the contract.',
            'Upon termination, all work product and confidential information remain subject to ongoing obligations.',
            'Final billing and return of materials will be completed according to professional standards.'
          ]
        }
      ]
    };
  }

  /**
   * Gets Professional Standards content
   */
  private getProfessionalStandardsContent(): LegalContent {
    return {
      type: 'standards',
      title: 'Professional Standards',
      icon: 'star',
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      contactInfo: {
        email: 'pietbergh.proanalysis@gmail.com',
        phone: '+27 71 181 8582'
      },
      sections: [
        {
          heading: 'Professional Qualifications',
          content: [
            'Brigadier Piet Bergh brings over 37 years of distinguished service in the South African Police Service (SAPS).',
            'Licensed as a private investigator with recognized professional credentials and ongoing training.',
            'Specialized expertise in evidence analysis, criminal investigation, and forensic methodologies.',
            'Certified in process reengineering and organizational analysis methodologies.'
          ]
        },
        {
          heading: 'Ethical Standards',
          content: [
            'We operate under strict ethical guidelines that prioritize integrity, honesty, and professional conduct.',
            'All investigations are conducted within legal frameworks and with respect for individual rights.',
            'We maintain professional objectivity and avoid conflicts of interest in all engagements.',
            'Client confidentiality is paramount and protected under professional privilege where applicable.'
          ]
        },
        {
          heading: 'Quality Assurance',
          content: [
            'All work is conducted using proven methodologies and best practices developed through decades of experience.',
            'We employ rigorous verification and validation processes to ensure accuracy and reliability.',
            'Continuous professional development ensures our skills and knowledge remain current with industry standards.',
            'Regular review and improvement of our processes maintains the highest quality standards.'
          ]
        },
        {
          heading: 'Professional Memberships',
          content: [
            'Active member of relevant professional associations and investigative bodies.',
            'Compliance with continuing education requirements and professional development standards.',
            'Participation in industry forums and knowledge sharing initiatives.',
            'Adherence to professional codes of conduct and ethical guidelines.'
          ]
        },
        {
          heading: 'Legal Compliance',
          content: [
            'Full compliance with South African legislation governing private investigation services.',
            'Adherence to data protection and privacy laws in all information handling practices.',
            'Compliance with relevant industry regulations and professional licensing requirements.',
            'Regular updates to ensure ongoing compliance with changing legal frameworks.'
          ]
        },
        {
          heading: 'Service Excellence',
          content: [
            'Commitment to delivering exceptional results through meticulous attention to detail.',
            'Transparent communication throughout all phases of service delivery.',
            'Timely completion of work within agreed timeframes and budgets.',
            'Ongoing client support and consultation as needed for optimal outcomes.'
          ]
        }
      ]
    };
  }
}