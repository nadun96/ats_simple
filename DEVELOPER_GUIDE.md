# Developer Guide - ATS Simple

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Building
```bash
npm run build
```

## Project Organization

### 🏗️ Component Architecture

Our project follows the **Atomic Design** pattern combined with **Feature-Based** organization:

```
src/components/
├── atoms/          # Basic building blocks (buttons, inputs)
├── molecules/      # Combinations of atoms (forms, dropdowns)
├── candidates/     # Candidate management features
├── jobs/           # Job posting features
├── recruitment/    # Recruitment process features
└── layout/         # Layout components
```

### 📁 File Structure

- **Components**: `src/components/` - Reusable UI components
- **Views**: `src/views/` - Page-level components
- **Types**: `src/types/` - TypeScript definitions
- **Stores**: `src/stores/` - Pinia state management
- **Styles**: `src/styles/` - CSS and styling

## 🚀 Development Workflow

### Adding New Components

1. **Atomic/Molecular Components**:
   ```bash
   # Create in appropriate folder
   touch src/components/atoms/CdNewComponent.vue
   
   # Add to index file
   echo "export { default as CdNewComponent } from './CdNewComponent.vue'" >> src/components/atoms/index.ts
   ```

2. **Feature Components**:
   ```bash
   # Create in feature folder
   touch src/components/candidates/NewCandidateFeature.vue
   
   # Add to main components index
   echo "export { default as NewCandidateFeature } from './candidates/NewCandidateFeature.vue'" >> src/components/index.ts
   ```

3. **Views**:
   ```bash
   # Create new view
   touch src/views/NewFeatureView.vue
   
   # Add to views index
   echo "export { default as NewFeatureView } from './NewFeatureView.vue'" >> src/views/index.ts
   
   # Add route in router/index.ts
   ```

### Import Patterns

```typescript
// ✅ Recommended - Clean imports from index files
import { CdButton, CdTextInput } from '@/components'
import { HomeView, CandidatesView } from '@/views'
import { Candidate, CandidateStatus } from '@/types'

// ✅ Alternative - Direct imports for specific needs
import CdButton from '@/components/atoms/CdButton.vue'
import HomeView from '@/views/HomeView.vue'
```

### Naming Conventions

- **Components**: PascalCase (`CdButton.vue`)
- **Views**: PascalCase (`HomeView.vue`)
- **Files**: camelCase (`candidate-types.ts`)
- **Folders**: kebab-case (`job-detail/`)

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Structure
```
src/
├── components/
│   └── __tests__/     # Component tests
└── views/
    └── __tests__/     # View tests
```

## 🔧 Code Quality

### Linting
```bash
npm run lint          # Run all linters
npm run lint:eslint   # ESLint only
npm run lint:oxlint   # Oxlint only
```

### Formatting
```bash
npm run format        # Prettier formatting
```

### Component Organization Check
```bash
npm run organize      # Validate component organization
```

## 📚 Key Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component library
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vite** - Build tool and dev server

## 🎨 Styling

### CSS Architecture
- **Base**: CSS variables and reset styles
- **Main**: Application-wide styles
- **Responsive**: Mobile-first responsive utilities
- **Components**: Component-specific styles

### CSS Variables
```css
:root {
  --primary-color: #1976d2;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
}
```

### Utility Classes
```css
.mt-1 { margin-top: var(--space-xs); }
.mb-2 { margin-bottom: var(--space-sm); }
.pt-3 { padding-top: var(--space-md); }
```

## 🔄 State Management

### Pinia Stores
```typescript
// Example store structure
export const useCandidateStore = defineStore('candidate', {
  state: () => ({
    candidates: [],
    loading: false
  }),
  actions: {
    async fetchCandidates() {
      // Implementation
    }
  }
})
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 959px
- **Desktop**: ≥ 960px

### Utility Classes
```css
.hide-mobile     /* Hidden on mobile */
.hide-tablet     /* Hidden on tablet */
.hide-desktop    /* Hidden on desktop */
.mobile-only     /* Visible only on mobile */
.desktop-only    /* Visible only on desktop */
```

## 🚨 Common Issues & Solutions

### Component Not Found
```bash
# Check if component is exported
npm run organize

# Verify import path
import { ComponentName } from '@/components'
```

### Type Errors
```bash
# Run type check
npm run type-check

# Check type definitions in src/types/
```

### Styling Issues
```bash
# Verify CSS imports in main.ts
# Check component scoped styles
# Validate CSS variable usage
```

## 📖 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Pinia Documentation](https://pinia.vuejs.org/)

## 🤝 Contributing

1. Follow the established naming conventions
2. Use the index files for clean imports
3. Maintain the atomic design structure
4. Write tests for new components
5. Update documentation as needed
6. Run `npm run organize` before committing

## 📝 Notes

- Always use the index files for imports when possible
- Keep components focused on a single responsibility
- Use TypeScript interfaces for all data structures
- Follow the established folder structure
- Test responsive behavior on multiple screen sizes
