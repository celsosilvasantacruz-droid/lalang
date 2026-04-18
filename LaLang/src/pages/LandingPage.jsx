import React from 'react';
import { Link } from 'react-router-dom';
import { languages, successCases } from '../data/mockupData';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Aprenda Línguas de Forma
                <span className="block text-secondary-300">Inteligente e Divertida</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-lg">
                Domine 6 idiomas com metodologias certificadas, professores especializados 
                e certificações reconhecidas internacionalmente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/cursos" className="btn-primary inline-flex items-center justify-center">
                  <span>Explorar Cursos</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/registo" className="btn-secondary inline-flex items-center justify-center">
                  Começar Gratuitamente
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-pulse-glow">
                    <div className="grid grid-cols-3 gap-4">
                      {languages.slice(0, 6).map((lang, i) => (
                        <div key={lang.id} className="text-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all cursor-pointer transform hover:scale-105">
                          <div className="text-4xl mb-2">{lang.flag}</div>
                          <div className="text-sm font-medium">{lang.name}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <div className="text-3xl font-bold">50.000+</div>
                      <div className="text-primary-200">Alunos Aprendendo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Porquê Escolher a LaLang?</h2>
            <p className="section-subtitle">Descubra as vantagens exclusivas da nossa plataforma</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Certificações Oficiais',
                desc: 'Obtenha certificações CAPLE, CIPLE e outras reconhecidas internacionalmente.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: '👨‍🏫',
                title: 'Professores Certificados',
                desc: 'Aprenda com professores nativos e certificados em ensino de línguas.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: '📱',
                title: 'Aprendizagem Flexível',
                desc: 'Estude onde e quando quiser com acesso multiplataforma.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: '🏆',
                title: 'Progressão Clara',
                desc: 'Sistema de níveis A1-C2 com acompanhamento detalhado do progresso.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: '💬',
                title: 'Prática Conversacional',
                desc: 'Sessões de conversação com falantes nativos e IA avançada.',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: '📜',
                title: 'Diplomas Reconhecidos',
                desc: 'Diplomas com numeração sequencial válidos para processos oficiais.',
                color: 'from-teal-500 to-cyan-500'
              }
            ].map((feature, i) => (
              <div key={i} className="card group hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Línguas Disponíveis</h2>
            <p className="section-subtitle">Explore os nossos cursos em 6 idiomas diferentes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <Link key={lang.id} to="/cursos" className="card group cursor-pointer overflow-hidden">
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{lang.flag}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{lang.name}</h3>
                    <p className="text-gray-500 text-sm">{lang.nativeName}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{lang.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    <strong className="text-primary-600">{lang.totalStudents.toLocaleString()}</strong> alunos
                  </span>
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {lang.rating}/5
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {lang.levels.slice(0, 4).map((level) => (
                      <span key={level} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                        {level}
                      </span>
                    ))}
                    {lang.levels.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{lang.levels.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-primary-500/5 group-hover:to-primary-500/10 transition-all"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Casos de Sucesso</h2>
            <p className="section-subtitle">O que os nossos alunos dizem sobre nós</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((testimonial) => (
              <div key={testimonial.id} className="card bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.country} {testimonial.flag}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                    {testimonial.language} - {testimonial.level}
                  </span>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Pronto para Começar a Sua Jornada Linguística?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Junte-se a mais de 50.000 alunos e comece a aprender hoje mesmo. 
            O primeiro módulo é gratuito!
          </p>
          <Link to="/registo" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Criar Conta Gratuita
          </Link>
          <p className="mt-4 text-primary-200 text-sm">
            Administrador: admin@lalang.pt | Password: Admin123!
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
