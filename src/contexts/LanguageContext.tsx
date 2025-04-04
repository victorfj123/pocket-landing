import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define supported languages and their display names
export type Language = 'en' | 'pt';

export const languages: Record<Language, string> = {
  en: 'English',
  pt: 'Português'
};

// Translation content interface
export interface TranslationContent {
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  order: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    button: string;
  };
}

// Define translations
export const translations: Record<Language, TranslationContent> = {
  en: {
    features: {
      title: 'Everything You Need',
      description: 'PocketCV combines all the essential networking tools for students and young professionals in one simple platform.',
      items: [
        {
          title: 'Centralize Your Links',
          description: 'Store and share all your professional links in one place - LinkedIn, portfolio, resume, and contact information.'
        },
        {
          title: 'NFC Enabled',
          description: 'Share your profile instantly with a tap of your PocketCV card on any NFC-enabled smartphone.'
        },
        {
          title: 'Student Focused',
          description: 'Designed specifically for university students and young professionals entering the job market.'
        },
        {
          title: 'Memorable URLs',
          description: 'Get your own personalized link that\'s easy to remember and share with potential employers.'
        },
        {
          title: 'CV Integration',
          description: 'Upload and share your resume or CV directly through your personal link for seamless job applications.'
        },
        {
          title: 'Contact Integration',
          description: 'Add your contact information and social profiles so recruiters can easily reach out to you.'
        }
      ]
    },
    cta: {
      title: 'See it in action',
      description: 'Take a look at an example profile to see how PocketCV helps you share your professional identity with a simple tap.',
      button: 'View Example Profile'
    },
    order: {
      title: 'Ready to Order?',
      description: 'Fill out the form below to place your order. We\'ll get back to you as soon as possible.'
    },
    contact: {
      title: 'Get in Touch',
      description: 'Have questions about PocketCV? Reach out to us directly.',
      button: 'Contact Us Now'
    }
  },
  pt: {
    features: {
      title: 'Tudo o Que Você Precisa',
      description: 'O PocketCV combina todas as ferramentas essenciais de networking para estudantes e jovens profissionais em uma única plataforma simples.',
      items: [
        {
          title: 'Centralize Seus Links',
          description: 'Armazene e compartilhe todos os seus links profissionais em um só lugar - LinkedIn, portfólio, currículo e informações de contato.'
        },
        {
          title: 'Habilitado para NFC',
          description: 'Compartilhe seu perfil instantaneamente com um toque do seu cartão PocketCV em qualquer smartphone com NFC.'
        },
        {
          title: 'Focado em Estudantes',
          description: 'Projetado especificamente para estudantes universitários e jovens profissionais entrando no mercado de trabalho.'
        },
        {
          title: 'URLs Memoráveis',
          description: 'Obtenha seu próprio link personalizado que é fácil de lembrar e compartilhar com potenciais empregadores.'
        },
        {
          title: 'Integração com CV',
          description: 'Faça upload e compartilhe seu currículo diretamente através do seu link pessoal para candidaturas simplificadas.'
        },
        {
          title: 'Integração de Contatos',
          description: 'Adicione suas informações de contato e perfis sociais para que recrutadores possam entrar em contato facilmente.'
        }
      ]
    },
    cta: {
      title: 'Veja em ação',
      description: 'Dê uma olhada em um perfil de exemplo para ver como o PocketCV ajuda você a compartilhar sua identidade profissional com um simples toque.',
      button: 'Ver Perfil de Exemplo'
    },
    order: {
      title: 'Pronto para Encomendar?',
      description: 'Preencha o formulário abaixo para fazer seu pedido. Entraremos em contato o mais breve possível.'
    },
    contact: {
      title: 'Entre em Contato',
      description: 'Tem perguntas sobre o PocketCV? Entre em contato conosco diretamente.',
      button: 'Contate-nos Agora'
    }
  }
};

// Create language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get saved language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('pocketcv-language');
    return (savedLanguage as Language) || 'en';
  });
  
  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pocketcv-language', language);
  }, [language]);
  
  // Get translations for current language
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
