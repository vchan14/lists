export interface MenuItem {
  id: number
  label: string
  route: string
}

export const menuItems: MenuItem[] = [
  { id: 1, label: 'Home', route: '/' },
  { id: 2, label: 'About', route: '/about' },
  { id: 3, label: 'Contact', route: '/contact' },
  { id: 4, label: 'Stars', route: '/stars' }
]
