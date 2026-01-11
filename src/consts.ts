import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'ZeroDay',
  description:
    'Security researcher, bug bounty hunter, and CTF player. Building the future of cybersecurity.',
  href: 'https://colonwq.me',
  author: 'ZeroDay',
  locale: 'en-US',
  featuredPostCount: 3,
  postsPerPage: 6,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/sprints',
    label: 'sprints',
  },
  {
    href: '/ctfs',
    label: 'ctfs',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/writendquit',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/writendquit',
    label: 'Twitter',
  },
  {
    href: 'https://ctftime.org/team/writendquit',
    label: 'CTFtime',
  },
  {
    href: 'mailto:contact@colonwq.me',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Discord: 'lucide:message-circle',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export const BUG_BOUNTY_STATS = [
  { company: 'Google', bugs: 12, severity: 'Critical', reward: '$15,000' },
  { company: 'Microsoft', bugs: 8, severity: 'High', reward: '$8,500' },
  { company: 'Meta', bugs: 5, severity: 'Medium', reward: '$3,200' },
  { company: 'Apple', bugs: 3, severity: 'High', reward: '$5,000' },
]

export const PROJECT_STATS = [
  { name: 'Security Tools', count: 15, icon: 'lucide:shield' },
  { name: 'CTF Challenges', count: 42, icon: 'lucide:flag' },
  { name: 'Vulnerabilities Found', count: 89, icon: 'lucide:bug' },
  { name: 'Open Source Contributions', count: 127, icon: 'lucide:git-branch' },
]


