# Project Structure Documentation

## Overview
This document describes the organized structure of the ATS (Applicant Tracking System) Vue.js application.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── atoms/          # Atomic design components (basic building blocks)
│   │   ├── CdButton.vue
│   │   ├── CdDropdown.vue
│   │   ├── CdDropzone.vue
│   │   ├── CdLabel.vue
│   │   ├── CdTextInput.vue
│   │   └── index.ts    # Exports all atomic components
│   ├── molecules/      # Molecular components (combinations of atoms)
│   │   ├── CdCityDropdown.vue
│   │   ├── CdCountryDropdown.vue
│   │   ├── CdRichTextEditor.vue
│   │   ├── CdStepper.vue
│   │   └── index.ts    # Exports all molecular components
│   ├── candidates/     # Candidate-specific components
│   ├── header/         # Header and navigation components
│   ├── job-detail/     # Job detail page components
│   ├── layout/         # Layout and structure components
│   ├── profile/        # Profile-related components
│   ├── recruitment/    # Recruitment process components
│   ├── BaseInput.vue   # Base input component
│   └── index.ts        # Exports all components
├── views/              # Page-level components
│   ├── Jobs/          # Job-related views
│   │   └── tabs/      # Job creation wizard tabs
│   │       ├── components/  # Shared tab components
│   │       ├── step1/       # Step 1 components
│   │       ├── step2/       # Step 2 components
│   │       ├── step3/       # Step 3 components
│   │       ├── step4/       # Step 4 components
│   │       └── step5/       # Step 5 components
│   ├── index.ts       # Exports all views
│   └── *.vue          # Individual view components
├── types/              # TypeScript type definitions
│   ├── interfaces/     # Interface definitions
│   ├── home.ts         # Home page types
│   ├── navigation.ts   # Navigation types
│   └── index.ts        # Exports all types
├── stores/             # Pinia state management
│   ├── counter.ts      # Counter store example
│   └── index.ts        # Exports all stores
├── styles/             # CSS and styling
│   ├── base.css        # Base styles and variables
│   ├── main.css        # Main application styles
│   ├── responsive.css  # Responsive design styles
│   ├── style.css       # Additional custom styles
│   └── index.ts        # Exports all styles
├── router/             # Vue Router configuration
├── plugins/            # Vue plugins (Vuetify, etc.)
├── data/               # Static data and configuration
├── assets/             # Static assets (images, icons, etc.)
├── App.vue             # Root application component
├── main.ts             # Application entry point
└── index.ts            # Main application exports
```

## Component Organization

### Atomic Design Pattern
- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Combinations of atoms (dropdowns, form fields)
- **Organisms**: Complex components (forms, cards, tables)
- **Templates**: Page layouts
- **Pages**: Complete views

### Feature-Based Organization
Components are also organized by feature/domain:
- `candidates/` - Candidate management
- `jobs/` - Job posting and management
- `recruitment/` - Recruitment process
- `profile/` - User profile management

## Import Patterns

### Using the Index Files
```typescript
// Import specific components
import { CdButton, CdTextInput } from '@/components'

// Import specific views
import { HomeView, CandidatesView } from '@/views'

// Import types
import { Candidate, CandidateStatus } from '@/types'

// Import stores
import { useCounterStore } from '@/stores'
```

### Direct Imports (Alternative)
```typescript
// Import directly from specific folders
import CdButton from '@/components/atoms/CdButton.vue'
import HomeView from '@/views/HomeView.vue'
```

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `CdButton.vue`)
- **Views**: PascalCase (e.g., `HomeView.vue`)
- **Utilities**: camelCase (e.g., `navItems.ts`)
- **Types**: camelCase (e.g., `candidate-types.ts`)

### Folders
- **Feature folders**: kebab-case (e.g., `job-detail/`)
- **Component categories**: kebab-case (e.g., `atomic-design/`)

## Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Components are properly categorized and exported
4. **Developer Experience**: Clear import paths and organization
5. **Team Collaboration**: Consistent structure across the project
6. **Testing**: Easier to locate and test specific components

## Adding New Components

### Atomic Components
1. Create the component in `src/components/atoms/`
2. Add export to `src/components/atoms/index.ts`
3. Component is automatically available in `src/components/index.ts`

### Feature Components
1. Create the component in the appropriate feature folder
2. Add export to `src/components/index.ts`
3. Import where needed

### New Views
1. Create the view in `src/views/`
2. Add export to `src/views/index.ts`
3. Add route in `src/router/index.ts`

## Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Consistent Naming**: Follow established naming conventions
3. **Proper Exports**: Always export through index files
4. **Type Safety**: Use TypeScript interfaces for all data structures
5. **Component Composition**: Prefer composition over inheritance
6. **Documentation**: Keep this structure document updated

## Migration Notes

If you're migrating from the old structure:
1. Update imports to use the new index files
2. Ensure all components are properly exported
3. Update any build configurations if needed
4. Test that all imports work correctly
