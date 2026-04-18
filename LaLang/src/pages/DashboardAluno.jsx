import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { languages } from '../data/mockupData';

const DashboardAluno = () => {
  const currentUser = useStore(state => state.currentUser);
  const enrolledCourses = useStore(state => state.enrolledCourses);
  const certificates = useStore(state => state.certificates);

  const userCourses = enrolledCourses.filter(c => c.userId === currentUser?.id);
  const userCertificates = certificates.filter(c => c.userId === currentUser?.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-800">
            Bem-vindo, {currentUser?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 mt-2">Continue a sua jornada de aprendizagem</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div className="text-3xl font-bold">{userCourses.length}</div>
            <div className="text-primary-100">Cursos Inscritos</div>
          </div>
          <div className="card bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
            <div className="text-3xl font-bold">{userCertificates.length}</div>
            <div className="text-secondary-100">Certificados</div>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-3xl font-bold">0%</div>
            <div className="text-green-100">Progresso Médio</div>
          </div>
          <div className="card bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <div className="text-3xl font-bold">0h</div>
            <div className="text-yellow-100">Tempo de Estudo</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cursos */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl font-bold text-gray-800">Os Meus Cursos</h2>
                <Link to="/cursos" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver todos →
                </Link>
              </div>

              {userCourses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Ainda não tem cursos</h3>
                  <p className="text-gray-500 mb-6">Explore os nossos cursos e comece a aprender hoje mesmo!</p>
                  <Link to="/cursos" className="btn-primary">
                    Explorar Cursos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userCourses.map((course) => {
                    const lang = languages.find(l => l.id === course.languageId);
                    return (
                      <Link
                        key={course.id}
                        to={`/curso/${course.languageId}/${course.level}`}
                        className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-4xl mr-4">{lang?.flag}</span>
                          <div className="flex-grow">
                            <h3 className="font-semibold">{lang?.name} - {course.level}</h3>
                            <p className="text-sm text-gray-500">Inscrito em {new Date(course.enrolledAt).toLocaleDateString('pt-PT')}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">{course.progress || 0}%</div>
                            <div className="text-xs text-gray-500">concluído</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Progresso Recente */}
            <div className="card mt-6">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-6">Atividade Recente</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">Conta criada com sucesso</p>
                    <p className="text-sm text-gray-500">Bem-vindo à LaLang!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificados */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Certificados</h2>
              {userCertificates.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-gray-500 text-sm">Complete cursos para obter certificados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userCertificates.map((cert) => (
                    <div key={cert.id} className="p-3 bg-primary-50 rounded-xl">
                      <div className="font-medium text-primary-800">{cert.language} - {cert.level}</div>
                      <div className="text-xs text-primary-600">{cert.id}</div>
                    </div>
                  ))}
                </div>
              )}
              <Link to="/certificados" className="block mt-4 text-center text-primary-600 hover:text-primary-700 text-sm font-medium">
                Ver todos os certificados →
              </Link>
            </div>

            {/* Links Úteis */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Links Úteis</h2>
              <div className="space-y-2">
                <Link to="/progresso" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="font-medium">📊 Ver Progresso</div>
                  <div className="text-sm text-gray-500">Acompanhe o seu desenvolvimento</div>
                </Link>
                <Link to="/teste/placement-pt" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="font-medium">📝 Teste de Nível</div>
                  <div className="text-sm text-gray-500">Descubra o seu nível atual</div>
                </Link>
                <Link to="/premium" className="block p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors">
                  <div className="font-medium">⭐ Serviços Premium</div>
                  <div className="text-sm text-gray-500">Certificações e recursos extras</div>
                </Link>
              </div>
            </div>

            {/* Próximos Eventos */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Próximos Eventos</h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-gray-500 text-sm">Sem eventos agendados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAluno;
