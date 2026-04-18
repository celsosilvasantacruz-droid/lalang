import React from 'react';
import { partners, successCases } from '../data/mockupData';

const PartnersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-bold text-gray-800 mb-4">
            Protocolos e Parcerias 🤝
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Trabalhamos com as melhores instituições para oferecer certificações 
            reconhecidas internacionalmente
          </p>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-8 text-center">
            Os Nossos Parceiros
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="card text-center group hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{partner.logo}</div>
                <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
                  {partner.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                  {partner.type}
                </span>
                <p className="text-gray-500 text-sm">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="card mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">
            Certificações Reconhecidas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📜</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">CAPLE</h3>
              <p className="text-gray-500 text-sm">
                Certificado de Aptidão em Português Língua Estrangeira
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📜</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">CIPLE</h3>
              <p className="text-gray-500 text-sm">
                Certificado Inicial de Português Língua Estrangeira
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📜</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">DEPLE</h3>
              <p className="text-gray-500 text-sm">
                Diploma Elementar de Português Língua Estrangeira
              </p>
            </div>
          </div>
        </div>

        {/* Success Cases */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-8 text-center">
            Casos de Sucesso
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((story) => (
              <div key={story.id} className="card bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{story.name}</div>
                    <div className="text-sm text-gray-500">{story.country} {story.flag}</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-600 italic mb-4">
                  "{story.testimonial}"
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-700">
                    {story.language} - {story.level}
                  </span>
                  <div className="flex">
                    {[...Array(story.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-8">
            Números que Falam por Si
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Alunos Formados</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">180+</div>
              <div className="text-primary-100">Módulos de Conteúdo</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-primary-100">Línguas Disponíveis</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-primary-100">Taxa de Satisfação</div>
            </div>
          </div>
        </div>

        {/* Become Partner */}
        <div className="card">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">
              Interesse em Parceria?
            </h2>
            <p className="text-gray-500 mb-6 max-w-xl mx-auto">
              Se representa uma instituição de ensino ou empresa interessada em estabelecer 
              uma parceria com a LaLang, entre em contacto connosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:parcerias@lalang.pt" className="btn-primary">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  parcerias@lalang.pt
                </span>
              </a>
              <a href="tel:+351210000000" className="btn-outline">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +351 210 000 000
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
