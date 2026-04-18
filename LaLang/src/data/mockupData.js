import { v4 as uuidv4 } from 'uuid';

// Dados iniciais de utilizadores
export const initialUsers = [
  {
    id: 'admin-001',
    email: 'admin@lalang.pt',
    password: 'Admin123!',
    name: 'Administrador Global',
    role: 'admin',
    createdAt: new Date().toISOString(),
    active: true
  }
];

// Dados das línguas disponíveis
export const languages = [
  {
    id: 'pt',
    name: 'Português',
    flag: '🇵🇹',
    nativeName: 'Português',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Língua oficial de Portugal, Brasil e vários países africanos.',
    totalStudents: 15420,
    rating: 4.9
  },
  {
    id: 'en',
    name: 'Inglês',
    flag: '🇬🇧',
    nativeName: 'English',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Língua universal de comunicação internacional.',
    totalStudents: 45890,
    rating: 4.8
  },
  {
    id: 'es',
    name: 'Espanhol',
    flag: '🇪🇸',
    nativeName: 'Español',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Segunda língua materna mais falada no mundo.',
    totalStudents: 32100,
    rating: 4.9
  },
  {
    id: 'fr',
    name: 'Francês',
    flag: '🇫🇷',
    nativeName: 'Français',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Língua de diplomacia e cultura refinada.',
    totalStudents: 18900,
    rating: 4.7
  },
  {
    id: 'de',
    name: 'Alemão',
    flag: '🇩🇪',
    nativeName: 'Deutsch',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Língua da engenharia e filosofia.',
    totalStudents: 12300,
    rating: 4.8
  },
  {
    id: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    nativeName: 'Italiano',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'Língua da arte, música e gastronomia.',
    totalStudents: 8500,
    rating: 4.9
  }
];

// Módulos de conteúdo
export const generateModules = () => {
  const modules = {};
  
  languages.forEach(lang => {
    modules[lang.id] = {
      A1: [
        { id: 'm1', title: 'Introdução e Saudações', lessons: 8, duration: '2h', completed: false },
        { id: 'm2', title: 'Alfabeto e Pronúncia', lessons: 6, duration: '1.5h', completed: false },
        { id: 'm3', title: 'Números e Cores', lessons: 5, duration: '1h', completed: false },
        { id: 'm4', title: 'Família e Casa', lessons: 7, duration: '2h', completed: false },
        { id: 'm5', title: 'Comida e Bebida', lessons: 6, duration: '1.5h', completed: false }
      ],
      A2: [
        { id: 'm1', title: 'Rotina Diária', lessons: 8, duration: '2h', completed: false },
        { id: 'm2', title: 'Compras e Preços', lessons: 6, duration: '1.5h', completed: false },
        { id: 'm3', title: 'Transportes e Direções', lessons: 5, duration: '1.5h', completed: false },
        { id: 'm4', title: 'Tempo e Clima', lessons: 6, duration: '2h', completed: false },
        { id: 'm5', title: 'Passatempos e Hobbies', lessons: 7, duration: '2h', completed: false }
      ],
      B1: [
        { id: 'm1', title: 'Experiências Passadas', lessons: 10, duration: '3h', completed: false },
        { id: 'm2', title: 'Planos Futuros', lessons: 8, duration: '2h', completed: false },
        { id: 'm3', title: 'Saúde e Bem-estar', lessons: 7, duration: '2h', completed: false },
        { id: 'm4', title: 'Trabalho e Carreira', lessons: 9, duration: '2.5h', completed: false },
        { id: 'm5', title: 'Viagens e Turismo', lessons: 8, duration: '2h', completed: false }
      ],
      B2: [
        { id: 'm1', title: 'Debates e Opiniões', lessons: 12, duration: '4h', completed: false },
        { id: 'm2', title: 'Meio Ambiente', lessons: 10, duration: '3h', completed: false },
        { id: 'm3', title: 'Tecnologia e Inovação', lessons: 9, duration: '3h', completed: false },
        { id: 'm4', title: 'Arte e Cultura', lessons: 11, duration: '3.5h', completed: false },
        { id: 'm5', title: 'Política e Sociedade', lessons: 10, duration: '3h', completed: false }
      ],
      C1: [
        { id: 'm1', title: 'Análise Literária', lessons: 14, duration: '5h', completed: false },
        { id: 'm2', title: 'Redação Académica', lessons: 12, duration: '4h', completed: false },
        { id: 'm3', title: 'Discursos Formais', lessons: 10, duration: '3.5h', completed: false },
        { id: 'm4', title: 'Negócios Internacionais', lessons: 15, duration: '5h', completed: false }
      ],
      C2: [
        { id: 'm1', title: 'Maestria Linguística', lessons: 20, duration: '8h', completed: false },
        { id: 'm2', title: 'Tradução Avançada', lessons: 15, duration: '6h', completed: false },
        { id: 'm3', title: 'Literatura Clássica', lessons: 18, duration: '7h', completed: false }
      ]
    };
  });
  
  return modules;
};

// Lições detalhadas
export const generateLessons = () => {
  return {
    'pt-A1-m1': {
      title: 'Introdução e Saudações',
      lessons: [
        { id: 'l1', title: 'Olá e Adeus', type: 'video', duration: '10min', content: 'Aprenda as saudações básicas em português.' },
        { id: 'l2', title: 'Apresentações', type: 'text', duration: '15min', content: 'Como se apresentar em português.' },
        { id: 'l3', title: 'Perguntas Básicas', type: 'interactive', duration: '20min', content: 'Perguntas essenciais do dia-a-dia.' },
        { id: 'l4', title: 'Vocabulário Essencial', type: 'flashcards', duration: '15min', content: 'Palavras mais usadas.' },
        { id: 'l5', title: 'Exercícios Práticos', type: 'quiz', duration: '25min', content: 'Teste os seus conhecimentos.' },
        { id: 'l6', title: 'Conversação', type: 'audio', duration: '20min', content: 'Diálogos práticos.' },
        { id: 'l7', title: 'Pronúncia', type: 'video', duration: '15min', content: 'Exercícios de pronúncia.' },
        { id: 'l8', title: 'Avaliação do Módulo', type: 'exam', duration: '30min', content: 'Avaliação final do módulo.' }
      ]
    }
  };
};

// Testes de avaliação
export const tests = [
  {
    id: 'placement-pt',
    language: 'pt',
    title: 'Teste de Nivelamento - Português',
    description: 'Descubra o seu nível atual de português',
    type: 'placement',
    duration: 30,
    questions: 25,
    passingScore: 60
  },
  {
    id: 'cert-caple',
    language: 'pt',
    title: 'Certificação CAPLE',
    description: 'Preparação para certificação oficial de português',
    type: 'certification',
    duration: 120,
    questions: 50,
    passingScore: 75
  }
];

// Serviços Premium
export const premiumServices = [
  {
    id: 'advanced-level',
    title: 'Aprofundamento de Nível',
    description: 'Conteúdos avançados para atingir proficiência máxima',
    price: 29.99,
    features: ['Conteúdos exclusivos', 'Exercícios avançados', 'Feedback personalizado', 'Aulas de conversação']
  },
  {
    id: 'caple-cert',
    title: 'Certificação CAPLE',
    description: 'Preparação completa para certificação oficial portuguesa',
    price: 149.99,
    features: ['Simulados oficiais', 'Correções detalhadas', 'Dicas de examinadores', 'Garantia de aprovação']
  },
  {
    id: 'ciple-cert',
    title: 'Certificação CIPLE',
    description: 'Preparação para certificação inicial de português',
    price: 79.99,
    features: ['Material didático', 'Práticas orais', 'Exercícios escritos', 'Certificado de conclusão']
  },
  {
    id: 'translation-voice',
    title: 'Tradução de Voz',
    description: 'Tradução automática em tempo real por voz',
    price: 9.99,
    period: 'mês',
    features: ['Tradução instantânea', '100+ idiomas', 'Alta precisão', 'Offline disponível']
  },
  {
    id: 'translation-video',
    title: 'Tradução de Vídeo',
    description: 'Legendas automáticas para vídeos',
    price: 14.99,
    period: 'mês',
    features: ['Legendas automáticas', 'Exportação múltipla', 'Edição manual', 'Integração API']
  },
  {
    id: 'translation-text',
    title: 'Tradução de Texto',
    description: 'Tradução profissional de documentos',
    price: 4.99,
    period: 'mês',
    features: ['Documentos ilimitados', 'Formatos variados', 'Glossário personalizado', 'Histórico']
  },
  {
    id: 'interactive-activities',
    title: 'Atividades Interativas',
    description: 'Jogos e exercícios para aferição formativa',
    price: 19.99,
    features: ['Jogos educativos', 'Competições', 'Rankings', 'Prémios virtuais']
  }
];

// Parceiros e Protocolos
export const partners = [
  {
    id: 'camoes',
    name: 'Instituto Camões',
    type: 'Parceiro Oficial',
    logo: '🏛️',
    description: 'Parceria para certificação oficial de português língua estrangeira.'
  },
  {
    id: 'universidade-lisboa',
    name: 'Universidade de Lisboa',
    type: 'Protocolo Académico',
    logo: '🎓',
    description: 'Protocolo para estágios e investigação em linguística aplicada.'
  },
  {
    id: 'erasmus',
    name: 'Programa Erasmus+',
    type: 'Parceiro Europeu',
    logo: '🇪🇺',
    description: 'Integração no programa europeu de mobilidade estudantil.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Education',
    type: 'Parceiro Tecnológico',
    logo: '💻',
    description: 'Integração com ferramentas Microsoft para educação.'
  }
];

// Casos de sucesso
export const successCases = [
  {
    id: 1,
    name: 'Maria Silva',
    country: 'Brasil',
    flag: '🇧🇷',
    language: 'Português',
    level: 'B2',
    testimonial: 'Consegui obter a certificação CAPLE em apenas 6 meses graças à LaLang!',
    rating: 5
  },
  {
    id: 2,
    name: 'John Smith',
    country: 'Reino Unido',
    flag: '🇬🇧',
    language: 'Inglês',
    level: 'C1',
    testimonial: 'Os métodos interativos tornaram o aprendizado divertido e eficaz.',
    rating: 5
  },
  {
    id: 3,
    name: 'Hans Mueller',
    country: 'Alemanha',
    flag: '🇩🇪',
    language: 'Alemão',
    level: 'B1',
    testimonial: 'Excelente plataforma para aprender novos idiomas de forma estruturada.',
    rating: 4
  }
];

// Métodos de pagamento
export const paymentMethods = [
  { id: 'debit', name: 'Cartão de Débito', icon: '💳', description: 'Visa, Mastercard, Maestro' },
  { id: 'credit', name: 'Cartão de Crédito', icon: '💳', description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', description: 'Pagamento seguro via PayPal' },
  { id: 'googlepay', name: 'Google Pay', icon: '🔵', description: 'Pagamento rápido com Google Pay' },
  { id: 'applepay', name: 'Apple Pay', icon: '🍎', description: 'Pagamento com Apple Pay' }
];

// Função para gerar certificados
export const generateCertificate = (userId, courseId, language, level) => {
  const now = new Date();
  const year = now.getFullYear();
  const sequence = String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0');
  
  return {
    id: `CERT-${year}-${sequence}`,
    userId,
    courseId,
    language,
    level,
    emissionDate: now.toISOString(),
    validUntil: new Date(now.setFullYear(now.getFullYear() + 5)).toISOString(),
    verificationCode: uuidv4().substring(0, 8).toUpperCase()
  };
};

// Estado inicial da aplicação
export const getInitialState = () => ({
  users: JSON.parse(localStorage.getItem('lalang_users')) || initialUsers,
  currentUser: JSON.parse(localStorage.getItem('lalang_currentUser')) || null,
  courses: JSON.parse(localStorage.getItem('lalang_courses')) || [],
  progress: JSON.parse(localStorage.getItem('lalang_progress')) || {},
  certificates: JSON.parse(localStorage.getItem('lalang_certificates')) || [],
  payments: JSON.parse(localStorage.getItem('lalang_payments')) || [],
  testimonials: JSON.parse(localStorage.getItem('lalang_testimonials')) || successCases
});
