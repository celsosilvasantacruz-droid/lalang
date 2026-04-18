import React from 'react';
import { Link } from 'react-router-dom';
import { premiumServices } from '../data/mockupData';

const PremiumServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-800 mb-4">
            Serviços Premium ⭐
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Potencie a sua aprendizagem com serviços exclusivos e certificações oficiais
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {premiumServices.map((service) => (
            <div key={service.id} className="card group hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  service.id.includes('cert') ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  service.id.includes('translation') ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                  'bg-gradient-to-br from-purple-400 to-pink-500'
                }`}>
                  <span className="text-2xl">
                    {service.id.includes('cert') ? '🎓' : 
                     service.id.includes('translation') ? '🌐' : '✨'}
                  </span>
                </div>
                {service.id.includes('cert') && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Popular
                  </span>
                )}
              </div>
              
              <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <span className="text-3xl font-bold gradient-text">
                    {service.price}€
                  </span>
                  {service.period && (
                    <span className="text-gray-500 text-sm">/{service.period}</span>
                  )}
                </div>
                <Link
                  to={`/checkout/${service.id}`}
                  className="btn-primary text-sm"
                >
                  Adquirir
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card mb-12">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 text-center">
            Compare os Níveis de Certificação
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Característica</th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold">Digital</div>
                    <div className="text-sm text-gray-500">Gratuito</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold">Impresso</div>
                    <div className="text-sm text-gray-500">19,99€</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Certificado em PDF', free: true, paid: true },
                  { feature: 'Numeração sequencial', free: true, paid: true },
                  { feature: 'Verificação online', free: true, paid: true },
                  { feature: 'Diploma impresso', free: false, paid: true },
                  { feature: 'Envio por correio', free: false, paid: true },
                  { feature: 'Suporte prioritário', free: false, paid: true }
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.free ? (
                        <span className="text-green-500 text-xl">✓</span>
                      ) : (
                        <span className="text-red-400 text-xl">✗</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.paid ? (
                        <span className="text-green-500 text-xl">✓</span>
                      ) : (
                        <span className="text-red-400 text-xl">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="card">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Quanto tempo demora a receber o diploma impresso?',
                a: 'O diploma impresso é enviado em 5-7 dias úteis após a confirmação do pagamento. O envio é feito via correio registado.'
              },
              {
                q: 'Posso obter reembolso dos serviços premium?',
                a: 'Sim, pode solicitar reembolso até 14 dias após a compra, desde que não tenha utilizado o serviço.'
              },
              {
                q: 'Os certificados CAPLE são oficiais?',
                a: 'Sim, os nossos cursos preparam para os exames oficiais CAPLE/CIPLE. O certificado final é emitido pela LaLang e é reconhecido internacionalmente.'
              },
              {
                q: 'Como funciona a tradução automática?',
                a: 'O serviço de tradução utiliza IA avançada para traduzir voz, vídeo e texto em tempo real, suportando mais de 100 idiomas.'
              }
            ].map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                  <span className="font-medium text-gray-800">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="p-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumServices;
