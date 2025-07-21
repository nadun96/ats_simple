import type { NavItem, NavGroup, MenuItem } from '@/types/navigation'

export const createItems: MenuItem[] = [
  { title: 'New Recruitment', icon: 'mdi-briefcase-outline' },
  { title: 'Add Candidate', icon: 'mdi-account-plus-outline' },
  { title: 'Schedule Interview', icon: 'mdi-calendar-plus' },
]

export const navItems: NavItem[] = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Analysis', icon: 'mdi-chart-line' },
]

export const navGroups: NavGroup[] = [
  {
    title: 'Recruitments',
    icon: 'mdi-account-group',
    items: ['My Recruitments', 'My Applications', 'My Recruitment Requests'],
  },
  {
    title: 'CV Library',
    icon: 'mdi-file-document-multiple',
    items: ['Search CVs', 'Favorite CVs', 'Recent CVs'],
  },
]
