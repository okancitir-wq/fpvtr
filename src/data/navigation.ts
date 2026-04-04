export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Karşılaştırma', href: '/karsilastirma' },
  { label: 'Hesaplayıcılar', href: '/hesaplayici' },
  { label: 'Forum', href: '/forum' },
  { label: 'İletişim', href: '/iletisim' },
];
