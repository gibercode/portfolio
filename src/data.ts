export const profile = {
  name: 'Giberson Lara',
  github: 'https://github.com/gibercode',
  linkedin: 'https://www.linkedin.com/in/giberson-lara-3b9421161/',
  email: 'giberlara@gmail.com',
  whatsapp: 'https://wa.me/584242012127',
};

export interface Project {
  title: string;
  href?: string;
  tags: string[];
  tagsEn?: string[];
  es: string;
  en: string;
}

export const projects: Project[] = [
  { title: 'kuroclothes', href: 'https://kuroclothes.com/', tags: ['Astro', 'TypeScript'], es: 'Catálogo web de una marca de ropa.', en: 'Web catalog for a clothing brand.' },
  { title: 'aitune', href: 'https://aitune.vercel.app/', tags: ['TypeScript', 'IA'], tagsEn: ['TypeScript', 'AI'], es: 'App que sugiere música con inteligencia artificial.', en: 'App that suggests music with artificial intelligence.' },
  { title: 'image-microfrontends', href: 'https://image-main-micro.vercel.app/', tags: ['Microfrontends', 'TypeScript'], es: 'Buscador de imágenes armado con varios microfrontends, cada uno en su propio repositorio.', en: 'Image search built from several microfrontends, each in its own repository.' },
  { title: 'bolsi-app', href: 'https://play.google.com/store/apps/details?id=com.gibercode.bolsi&hl=es', tags: ['TypeScript', 'Android'], es: 'Bolsi, tu calculadora de tasas, disponible en Google Play.', en: 'Bolsi, your rate calculator, available on Google Play.' },
  { title: 'tasahub', href: 'https://www.tasahub.net/', tags: ['SaaS', 'API', 'Frontend'], es: 'SaaS con frontend y API: se integra en otros productos y se paga por la integración.', en: 'SaaS with a frontend and an API: integrate it into other products and pay per integration.' },
  { title: 'to-do-list-extension', href: 'https://chromewebstore.google.com/detail/to-do-list-extension/ehmdfekgloppchngidkpofakcpmbdbpl', tags: ['TypeScript', 'Chrome'], es: 'Extensión de Chrome para guardar tus tareas diarias.', en: 'Chrome extension to save your daily tasks.' },
];

type Term = string | [es: string, en: string];

export interface StackGroup {
  es: string;
  en: string;
  items: Term[];
}

export const stack: StackGroup[] = [
  { es: 'API', en: 'API', items: ['NestJS', 'Node.js', 'Express', 'Flask', 'Python'] },
  { es: 'Frontend', en: 'Frontend', items: ['Angular', 'TypeScript', 'React', 'Next.js', 'Vue', 'Astro'] },
  { es: 'Móvil', en: 'Mobile', items: ['React Native', 'Capacitor', 'PWA'] },
  { es: 'Bases de datos', en: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { es: 'IA', en: 'AI', items: ['Claude', 'Codex', 'LLMs', ['Automatizaciones', 'Automations']] },
  { es: 'Despliegue', en: 'Deployment', items: [['Servidores VPS', 'VPS servers'], 'Docker', ['Pipelines CI/CD', 'CI/CD pipelines'], 'GitHub Actions', 'AWS'] },
];
