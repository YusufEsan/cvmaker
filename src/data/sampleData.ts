import { CVData } from '../types/cv';
import { v4 as uuidv4 } from 'uuid';

export const sampleData: CVData = {
  metadata: {
    template: 'the-grid',
    themeColor: '#db2777',
    fontFamily: 'Outfit, sans-serif',
    language: 'tr',
    spacing: 1.2,
  },
  personalInfo: {
    fullName: 'Arda Teknoloji',
    title: 'Senior Software Architect',
    email: 'arda@tech.com',
    phone: '+90 555 123 45 67',
    location: 'İstanbul, TR',
    website: 'www.ardatech.dev',
    avatar: '',
    social: [],
  },
  experience: [
    {
      id: uuidv4(),
      company: 'Antigravity AI Systems',
      position: 'Lead Developer',
      startDate: 'Oca 2022',
      endDate: 'Devam Ediyor',
      current: true,
      description: [
        'Agentic AI sistemlerinin mimarisini sıfırdan tasarladım ve ölçeklenebilir bir altyapı kurdum.',
        'Next.js ve Python tabanlı mikroservislerin birbiriyle olan iletişimini gRPC ve WebSockets kullanarak optimize ettim.',
        'Yapay zeka modellerinin (LLM) gerçek zamanlı kod üretimi yapabilmesi için özel prompt mühendisliği ve caching mekanizmaları geliştirdim.',
        'Ekibin kod kalitesini artırmak için CI/CD süreçlerini otomatize ettim ve unit test kapsamını %90 üzerine çıkardım.',
        'Müşteri geri bildirimlerine dayanarak UI/UX süreçlerini iyileştirdim ve kullanıcı etkileşimini %35 artırdım.'
      ]
    },
    {
      id: uuidv4(),
      company: 'Global Tech Corp',
      position: 'Full Stack Developer',
      startDate: 'Haz 2018',
      endDate: 'Ara 2021',
      current: false,
      description: [
        'Dünya çapında 1 milyondan fazla kullanıcısı olan e-ticaret platformunun frontend performansını %40 oranında artırdım.',
        'React ve Redux kullanarak karmaşık state yönetimi süreçlerini basitleştirdim ve uygulama hızını optimize ettim.',
        'Backend tarafında Node.js ve PostgreSQL ile yüksek trafikli API uç noktaları tasarladım ve yönettim.',
        'Ödeme sistemleri entegrasyonu (Stripe, PayPal) süreçlerini uçtan uca güvenli bir şekilde tamamladım.',
        'Micro-frontend mimarisine geçiş sürecinde aktif rol alarak farklı ekiplerin bağımsız çalışabilmesini sağladım.'
      ]
    },
    {
      id: uuidv4(),
      company: 'NextGen Soft',
      position: 'Junior Software Engineer',
      startDate: 'Oca 2016',
      endDate: 'May 2018',
      current: false,
      description: [
        'Kurumsal ERP yazılımlarının geliştirilmesinde Java Spring Boot ve Angular kullanarak aktif görev aldım.',
        'Veritabanı sorgularını optimize ederek raporlama hızını %50 oranında iyileştirdim.',
        'Mobil öncelikli (Mobile-first) web tasarımları geliştirerek tüm cihazlarda kusursuz bir kullanıcı deneyimi sağladım.'
      ]
    },
    {
      id: uuidv4(),
      company: 'Startup Lab',
      position: 'Software Intern',
      startDate: 'Haz 2015',
      endDate: 'Eyl 2015',
      current: false,
      description: [
        'Python ve Django kullanarak MVP aşamasındaki projelerin backend servislerini geliştirdim.',
        'HTML, CSS ve JavaScript ile responsive arayüzler tasarladım.'
      ],
      pageBreak: true // Bu maddeyi 2. sayfaya zorlamak için
    }
  ],
  education: [
    {
      id: uuidv4(),
      school: 'İstanbul Teknik Üniversitesi',
      degree: 'Lisans',
      field: 'Bilgisayar Mühendisliği',
      startDate: '2014',
      endDate: '2018',
    },
    {
      id: uuidv4(),
      school: 'Stanford University',
      degree: 'Sertifika',
      field: 'Machine Learning Specialization',
      startDate: '2019',
      endDate: '2020',
    }
  ],
  skills: [
    {
      id: uuidv4(),
      category: 'Frontend',
      items: [
        { id: uuidv4(), name: 'React', level: 95 },
        { id: uuidv4(), name: 'Next.js', level: 90 },
        { id: uuidv4(), name: 'Tailwind CSS', level: 98 },
        { id: uuidv4(), name: 'TypeScript', level: 92 }
      ]
    },
    {
      id: uuidv4(),
      category: 'Backend',
      items: [
        { id: uuidv4(), name: 'Node.js', level: 85 },
        { id: uuidv4(), name: 'Python', level: 80 },
        { id: uuidv4(), name: 'PostgreSQL', level: 88 },
        { id: uuidv4(), name: 'Redis', level: 75 }
      ]
    }
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Antigravity CV Engine v1',
      description: 'Modern, yüksek performanslı ve çoklu sayfa destekli CV oluşturma platformu.',
      link: 'github.com/cv-engine'
    }
  ],
  customSections: []
};
