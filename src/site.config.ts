export const siteConfig = {
  companyName: 'FALXTER株式会社',
  companyNameEn: 'FALXTER K.K.',
  representative: '蒲地章悟',
  address: '東京都八王子市八日町10-2',
  phone: '050-3697-8926',
  email: 'customer@falxter.co.jp',
  domain: 'https://falxter.co.jp',
  brandColor: '#7d0015',
  logoPath: 'https://dummyimage.com/200x50/7d0015/ffffff.png&text=FALXTER',
  navLinks: [
    { href: '/', label: 'TOP' },
    { href: '/services', label: 'サービス' },
    { href: '/works', label: '実績' },
    { href: '/web', label: '中小企業向けWeb制作' },
    { href: '/about', label: '会社概要' },
    { href: '/contact', label: '問い合わせ' }
  ],
  footerLinks: [
    { href: '/privacy', label: 'プライバシーポリシー' }
  ],
  ogImage: 'https://dummyimage.com/1200x630/7d0015/ffffff.png&text=FALXTER'
};

export type SiteConfig = typeof siteConfig;
