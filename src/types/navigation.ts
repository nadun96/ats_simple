export interface NavItem {
  title: string
  path: string
  icon?: string
}

export interface NavGroup {
  title: string
  icon?: string
  items: NavItem[]
}

export interface MenuItem {
  title: string
  icon: string
}
