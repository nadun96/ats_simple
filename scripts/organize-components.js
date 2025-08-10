#!/usr/bin/env node

/**
 * Component Organization Utility
 *
 * This script helps maintain the component organization by:
 * 1. Checking for missing exports in index files
 * 2. Validating component naming conventions
 * 3. Suggesting organizational improvements
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SRC_DIR = path.join(__dirname, '..', 'src')
const COMPONENTS_DIR = path.join(SRC_DIR, 'components')
const VIEWS_DIR = path.join(SRC_DIR, 'views')

/**
 * Get all Vue components in a directory recursively
 */
function getVueComponents(dir) {
  const components = []

  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        scanDirectory(filePath)
      } else if (file.endsWith('.vue')) {
        const relativePath = path.relative(SRC_DIR, filePath)
        components.push({
          name: file.replace('.vue', ''),
          path: relativePath,
          fullPath: filePath
        })
      }
    }
  }

  scanDirectory(dir)
  return components
}

/**
 * Check if a component is exported in its index file
 */
function checkComponentExports(components, indexPath) {
  if (!fs.existsSync(indexPath)) {
    return { missing: components, extra: [] }
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8')
  const exportedComponents = []

  // Extract exported component names from index file
  const exportMatches = indexContent.match(/export.*from.*['"]([^'"]+)['"]/g)
  if (exportMatches) {
    exportMatches.forEach(match => {
      const pathMatch = match.match(/['"]([^'"]+)['"]/)
      if (pathMatch) {
        const componentPath = pathMatch[1]
        const componentName = path.basename(componentPath, '.vue')
        exportedComponents.push(componentName)
      }
    })
  }

  const missing = components.filter(comp => !exportedComponents.includes(comp.name))
  const extra = exportedComponents.filter(name => !components.find(comp => comp.name === name))

  return { missing, extra }
}

/**
 * Validate component naming conventions
 */
function validateNaming(components) {
  const issues = []

  components.forEach(comp => {
    // Check PascalCase for components
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(comp.name)) {
      issues.push({
        component: comp.name,
        path: comp.path,
        issue: 'Component name should be PascalCase'
      })
    }

    // Check for consistent prefix (Cd for custom design components)
    if (comp.path.includes('/atoms/') || comp.path.includes('/molecules/')) {
      if (!comp.name.startsWith('Cd')) {
        issues.push({
          component: comp.name,
          path: comp.path,
          issue: 'Atomic/Molecular components should start with "Cd" prefix'
        })
      }
    }
  })

  return issues
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Analyzing component organization...\n')

  // Get all components
  const components = getVueComponents(COMPONENTS_DIR)
  const views = getVueComponents(VIEWS_DIR)

  console.log(`📁 Found ${components.length} components and ${views.length} views\n`)

  // Check component exports
  const componentExports = checkComponentExports(components, path.join(COMPONENTS_DIR, 'index.ts'))
  const viewExports = checkComponentExports(views, path.join(VIEWS_DIR, 'index.ts'))

  // Validate naming
  const namingIssues = validateNaming([...components, ...views])

  // Report results
  console.log('📋 Export Status:')
  console.log(`   Components: ${componentExports.missing.length} missing, ${componentExports.extra.length} extra`)
  console.log(`   Views: ${viewExports.missing.length} missing, ${viewExports.extra.length} extra`)

  if (componentExports.missing.length > 0) {
    console.log('\n❌ Missing component exports:')
    componentExports.missing.forEach(comp => {
      console.log(`   - ${comp.name} (${comp.path})`)
    })
  }

  if (viewExports.missing.length > 0) {
    console.log('\n❌ Missing view exports:')
    viewExports.missing.forEach(view => {
      console.log(`   - ${view.name} (${view.path})`)
    })
  }

  if (namingIssues.length > 0) {
    console.log('\n⚠️  Naming convention issues:')
    namingIssues.forEach(issue => {
      console.log(`   - ${issue.component} (${issue.path}): ${issue.issue}`)
    })
  }

  if (componentExports.missing.length === 0 &&
      viewExports.missing.length === 0 &&
      namingIssues.length === 0) {
    console.log('\n✅ All components are properly organized!')
  }

  console.log('\n💡 Tips:')
  console.log('   - Use the index files for clean imports')
  console.log('   - Follow PascalCase naming for components')
  console.log('   - Use "Cd" prefix for atomic/molecular components')
  console.log('   - Keep feature-based organization for complex components')
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { main, getVueComponents, checkComponentExports, validateNaming }
