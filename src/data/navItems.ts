import type { NavItem, NavGroup, MenuItem } from '@/types/navigation'

export const createItems: MenuItem[] = [
  { title: 'New Recruitment', icon: 'mdi-briefcase-outline' },
  { title: 'Add Candidate', icon: 'mdi-account-plus-outline' },
  { title: 'Schedule Interview', icon: 'mdi-calendar-plus' },
]

export const navItems: NavItem[] = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
  { title: 'Analysis', icon: 'mdi-chart-line', path: '/analysis' },
]

// export const navGroups: NavGroup[] = [
//   {
//     title: 'Recruitments',
//     icon: 'mdi-account-group',
//     items: ['My Recruitments', 'My Applications', 'My Recruitment Requests'],
//   },
//   {
//     title: 'CV Library',
//     icon: 'mdi-file-document-multiple',
//     items: ['Search CVs', 'Favorite CVs', 'Recent CVs'],
//   },
// ]

export const navGroups: NavGroup[] = [
  {
    title: 'Recruitments',
    icon: 'mdi-account-group',
    items: [
      { title: 'My Recruitments', path: '/recruitment' },
      { title: 'My Applications', path: '/recruitment/applications' },
      { title: 'My Recruitment Requests', path: '/recruitment/requests' },
    ],
  },
  {
    title: 'CV Library',
    icon: 'mdi-file-document-multiple',
    items: [
      { title: 'Search CVs', path: '/cv-library/search' },
      { title: 'Favorite CVs', path: '/cv-library/favorites' },
      { title: 'Recent CVs', path: '/cv-library/recent' },
    ],
  },
]

