# PietBergh ProAnalysis

**Professional Investigation & Consulting Services Platform**

A Vue 3 TypeScript application showcasing the professional services of **Piet Bergh**, former SAPS Brigadier and Provincial Commander of the Hawks, now providing specialized private consulting in evidence analysis, process reengineering, and linguistic services.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🎯 Project Overview

This professional portfolio and service platform represents **37+ years of law enforcement excellence** transitioning into specialized private consulting. The application features a clean, professional design with enterprise-grade architecture showcasing three core service offerings:

- **🔍 Evidence Analysis & Review** - Forensic document examination and expert testimony
- **⚙️ Operational Process Reengineering (OPR)** - Strategic business optimization
- **📝 Professional Editorial & Translation Service** - Multilingual editorial and translation services

## ✨ Key Features

### 🎨 Professional Design System
- **Sophisticated UI/UX** with law enforcement-inspired blue and gold color scheme
- **Responsive design** optimized for all devices and screen sizes
- **Accessibility-first** approach with semantic HTML and ARIA compliance
- **Professional typography** and carefully crafted visual hierarchy

### 🏗️ Enterprise Architecture
- **Clean Architecture** with separation of concerns (Models → Services → Controllers → Views)
- **TypeScript-first** development with strict type safety
- **Component-driven** development with reusable UI components
- **Composable-based** state management for reactive data flow

### 📊 Dynamic Content Management
- **Portfolio showcase** with filterable project galleries
- **Testimonial system** with client feedback display
- **Contact forms** with EmailJS integration for direct communication
- **Timeline visualization** of career highlights and achievements

### 🔧 Modern Development Stack
- **Vue 3 Composition API** with `<script setup>` syntax
- **TypeScript** for type safety and enhanced developer experience
- **Tailwind CSS** for utility-first styling and rapid prototyping
- **Vite** for lightning-fast development and optimized builds

## 🛠️ Technical Stack

### Frontend Framework
- **Vue 3.4+** - Progressive JavaScript framework
- **Vue Router 4** - Official routing solution
- **TypeScript 5.9+** - Static type checking

### Styling & UI
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **PostCSS** - CSS post-processing
- **Custom Design System** - Professional brand guidelines

### Development Tools
- **Vite 5** - Next-generation frontend build tool
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Vue TSC** - TypeScript checking for Vue components

### Testing & Quality
- **Playwright** - End-to-end testing framework
- **Type checking** - Comprehensive TypeScript validation
- **Code formatting** - Automated with Prettier

### External Services
- **EmailJS** - Contact form email delivery
- **Vercel Speed Insights** - Performance monitoring

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AboutHero.vue           # About page hero section
│   ├── AchievementsList.vue    # Career achievements display
│   ├── ContactForm.vue         # Contact form with validation
│   ├── HeroSection.vue         # Homepage hero component
│   ├── NavigationBar.vue       # Main navigation
│   ├── PortfolioCard.vue       # Portfolio item cards
│   ├── ServiceDetail.vue       # Service detail sections
│   └── TestimonialCard.vue     # Client testimonial cards
│
├── composables/         # Reactive business logic
│   ├── useBusinessLogic.ts     # Core business operations
│   ├── useContactForm.ts       # Contact form management
│   ├── useNavigation.ts        # Navigation state
│   ├── usePortfolio.ts         # Portfolio data management
│   └── useServices.ts          # Services data & logic
│
├── controllers/         # Business logic orchestration
│   ├── AboutController.ts      # About page logic
│   ├── BusinessController.ts   # Core business operations
│   ├── ContactController.ts    # Contact form processing
│   ├── PortfolioController.ts  # Portfolio management
│   └── ServiceController.ts    # Service data management
│
├── models/              # TypeScript interfaces & types
│   ├── AboutContent.ts         # About page data structure
│   ├── ContactForm.ts          # Contact form interfaces
│   ├── Service.ts              # Service offering models
│   ├── SuccessStory.ts         # Portfolio/case study types
│   └── Testimonial.ts          # Client testimonial types
│
├── services/            # External API & data services
│   ├── ContentService.ts       # Content management
│   ├── EmailService.ts         # Email communication
│   └── TestimonialService.ts   # Testimonial data
│
├── utils/               # Pure utility functions
│   ├── colorUtils.ts           # Brand color management
│   ├── contentUtils.ts         # Content processing
│   ├── validationUtils.ts      # Form validation
│   └── emailServiceTest.ts     # Email service testing
│
├── views/               # Page-level components
│   ├── HomeView.vue            # Homepage/landing
│   ├── AboutView.vue           # About Piet Bergh
│   ├── ServicesView.vue        # Service offerings
│   ├── PortfolioView.vue       # Case studies/portfolio
│   ├── TestimonialsView.vue    # Client testimonials
│   └── ContactView.vue         # Contact information
│
└── assets/              # Static resources
    ├── business-card-*.svg     # Brand business cards
    ├── logo-*.svg              # Brand logo variants
    └── favicon.svg             # Site favicon
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** - JavaScript runtime
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RustedVikingOG/pietberghproanalysis.git
   cd pietberghproanalysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production with type checking |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Execute Playwright end-to-end tests |

## 🏗️ Development Workflow

### Code Architecture Principles

Following the **Frontend Service Project Coding Standards**:

1. **Clean Architecture** - Models → Services → Controllers → Views
2. **TypeScript-first** - Explicit types for all public APIs
3. **Component Composition** - Small, focused, reusable components
4. **Tailwind Styling** - Utility-first CSS with responsive design
5. **Business Logic Separation** - Keep logic in composables and controllers

### Example Implementation Pattern

```typescript
// Model (src/models/Service.ts)
export interface Service {
  id: string;
  title: string;
  category: 'evidence-analysis' | 'process-reengineering' | 'editing-translation';
  description: string;
  features: string[];
}

// Service (src/services/ContentService.ts)
export class ContentService {
  static getServices(): Service[] {
    // Data retrieval logic
  }
}

// Controller (src/controllers/ServiceController.ts)
export class ServiceController {
  getServices(): Service[] {
    return ContentService.getServices();
  }
}

// Composable (src/composables/useServices.ts)
export function useServices() {
  const controller = new ServiceController();
  const services = ref<Service[]>([]);
  
  const loadServices = async () => {
    services.value = controller.getServices();
  };
  
  return { services, loadServices };
}
```

## 🧪 Testing

The project includes comprehensive testing with Playwright:

```bash
# Run all tests
npm run test

# Run tests in headed mode
npm run test -- --headed

# Run specific test file
npm run test tests-examples/demo-todo-app.spec.ts
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

The build process:
1. **Type checking** with Vue TSC
2. **Code bundling** with Vite
3. **Asset optimization** and minification
4. **Source map generation** for debugging

### Build Output
- `dist/` - Production-ready files
- Optimized bundle splitting for performance
- Static assets with cache-friendly naming

## 🎨 Brand Guidelines

### Color Scheme
- **Primary Blues**: Navy (`#1e3a8a`), Royal (`#1d4ed8`), Sky (`#0ea5e9`)
- **Accent Golds**: Dark (`#d97706`), Medium (`#f59e0b`), Light (`#fbbf24`)
- **Professional Neutrals**: Clean grays and whites for balance

### Typography
- **Professional hierarchy** with clear information architecture
- **Responsive scaling** across all device sizes
- **Accessibility compliance** with proper contrast ratios

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow coding standards** as defined in `.github/copilot-instructions.md`
4. **Commit changes** (`git commit -m 'feat: add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open Pull Request**

### Coding Standards
- **TypeScript-only** - No untyped JavaScript
- **Explicit return types** for all functions
- **Kebab-case** filenames
- **Tailwind CSS** for styling
- **Component separation** of concerns

## 📞 Contact & Support

**Piet Bergh** - Former SAPS Brigadier & Professional Analyst

- **Website**: [pietberghproanalysis.com](https://pietberghproanalysis.com)
- **Email**: Contact via website form
- **LinkedIn**: Professional consultation inquiries

---

## 📄 License

This project represents proprietary professional services content. All rights reserved.

**Built with** ❤️ **and professional excellence by** [RustedVikingOG](https://github.com/RustedVikingOG)

---

*"Meticulous Service for Impeccable Results"* - **PietBergh ProAnalysis**
