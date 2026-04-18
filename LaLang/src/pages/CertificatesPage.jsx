import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { languages } from '../data/mockupData';

const CertificatesPage = () => {
  const currentUser = useStore(state => state.currentUser);
  const certificates = useStore(state => state.certificates);
  const issueCertificate = useStore(state => state.issueCertificate);
  
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [certificateType, setCertificateType] = useState('digital');

  const userCertificates = certificates.filter(c => c.userId === currentUser?.id);

  const handleRequestCertificate = () => {
    if (selectedLanguage && selectedLevel) {
      const cert = issueCertificate(`course-${selectedLanguage}-${selectedLevel}`, selectedLanguage, selectedLevel);
      setShowRequestModal(false);
      setSelectedLanguage('');
      setSelectedLevel('');
      alert(`Certificado ${cert.id} emitido com sucesso!`);
    }
  };

  const certificateTemplate = (cert, isPreview = false) => (
    <div className={`bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-8 rounded-2xl border-2 border-primary-200 ${isPreview ? 'opacity-50' : ''}`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">LL</span>
          </div>
        </div>
        <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">LaLang</h3>
        <p className="text-sm text-gray-500 mb-6">Plataforma de Aprendizagem de Línguas</p>
        
        <div className="py-6 border-y border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Certificamos que</p>
          <h4 className="font-display text-xl font-bold text-gray-800">{currentUser?.name}</h4>
          <p className="text-sm text-gray-500 mt-2">completou com êxito o curso de</p>
          <h5 className="font-display text-2xl font-bold gradient-text mt-2">
            {languages.find(l => l.id === cert.language)?.name} - Nível {cert.level}
          </h5>
        </div>
        
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p><strong>Nº Certificado:</strong> {cert.id}</p>
          <p><strong>Código de Verificação:</strong> {cert.verificationCode}</p>
          <p><strong>Data de Emissão:</strong> {new Date(cert.emissionDate).toLocaleDateString('pt-PT')}</p>
          <p><strong>Válido até:</strong> {new Date(cert.validUntil).toLocaleDateString('pt-PT')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard/aluno" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-800 mt-4">
            Certificados e Diplomas 📜
          </h1>
          <p className="text-gray-500 mt-2">Gira os seus certificados e solicite novos diplomas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificates List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl font-bold text-gray-800">Os Meus Certificados</h2>
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="btn-primary text-sm"
                >
                  + Solicitar Certificado
                </button>
              </div>

              {userCertificates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Sem certificados ainda</h3>
                  <p className="text-gray-500 mb-6">Complete cursos para obter certificados</p>
                  <Link to="/cursos" className="btn-primary">
                    Explorar Cursos
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {userCertificates.map((cert) => (
                    <div key={cert.id} className="border rounded-xl overflow-hidden">
                      {certificateTemplate(cert)}
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-primary-600 hover:text-primary-700">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                          </button>
                          <button className="flex items-center text-primary-600 hover:text-primary-700">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Partilhar
                          </button>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cert.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          Válido
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificate Types */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Tipos de Diploma</h2>
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📱</span>
                    <div>
                      <h3 className="font-semibold text-primary-800">Digital</h3>
                      <p className="text-sm text-primary-600">Certificado em PDF para download imediato</p>
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary-700">Gratuito</div>
                </div>
                <div className="p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📮</span>
                    <div>
                      <h3 className="font-semibold text-secondary-800">Impresso + Envio</h3>
                      <p className="text-sm text-secondary-600">Diploma impresso enviado por correio</p>
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-bold text-secondary-700">19,99€</div>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Verificar Certificado</h2>
              <p className="text-gray-500 text-sm mb-4">
                Introduza o código de verificação para validar um certificado
              </p>
              <input
                type="text"
                placeholder="Código de verificação"
                className="input-field mb-4"
              />
              <button className="btn-primary w-full">
                Verificar
              </button>
            </div>

            {/* Info */}
            <div className="card bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
              <h3 className="font-bold mb-2">📊 Numeração Sequencial</h3>
              <p className="text-sm text-white/80">
                Todos os certificados têm numeração sequencial única e podem ser 
                verificados online através do código de verificação.
              </p>
            </div>
          </div>
        </div>

        {/* Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="font-display text-xl font-bold mb-4">Solicitar Certificado</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Língua</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Selecione...</option>
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.flag} {lang.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Selecione...</option>
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Diploma</label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="certType"
                        value="digital"
                        checked={certificateType === 'digital'}
                        onChange={(e) => setCertificateType(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Digital (Gratuito)</div>
                        <div className="text-sm text-gray-500">Download imediato em PDF</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="certType"
                        value="printed"
                        checked={certificateType === 'printed'}
                        onChange={(e) => setCertificateType(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Impresso + Envio (19,99€)</div>
                        <div className="text-sm text-gray-500">Enviado para a sua morada</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleRequestCertificate}
                  disabled={!selectedLanguage || !selectedLevel}
                  className={`flex-grow py-3 rounded-xl font-medium ${
                    !selectedLanguage || !selectedLevel
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  Solicitar
                </button>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="btn-outline"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;
