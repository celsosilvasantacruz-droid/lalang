import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { languages, generateModules } from '../data/mockupData';

const DashboardProfessor = () => {
  const currentUser = useStore(state => state.currentUser);
  const users = useStore(state => state.users);
  const addCourseContent = useStore(state => state.addCourseContent);
  
  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [showAddContent, setShowAddContent] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'video',
    duration: ''
  });

  const modules = generateModules();
  const students = users.filter(u => u.role === 'aluno');

  const handleAddContent = (e) => {
    e.preventDefault();
    addCourseContent({
      languageId: selectedLanguage,
      level: selectedLevel,
      ...newContent
    });
    setNewContent({ title: '', description: '', type: 'video', duration: '' });
    setShowAddContent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-800">
            Dashboard do Professor 👨‍🏫
          </h1>
          <p className="text-gray-500 mt-2">Gerencie conteúdos e acompanhe os seus alunos</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-3xl font-bold text-primary-600">{students.length}</div>
            <div className="text-gray-500">Total de Alunos</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-secondary-600">{languages.length}</div>
            <div className="text-gray-500">Línguas Disponíveis</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-green-600">6</div>
            <div className="text-gray-500">Níveis por Língua</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-yellow-600">∞</div>
            <div className="text-gray-500">Módulos Criados</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gestão de Conteúdos */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl font-bold text-gray-800">Gestão de Conteúdos</h2>
                <button
                  onClick={() => setShowAddContent(true)}
                  className="btn-primary text-sm"
                >
                  + Adicionar Conteúdo
                </button>
              </div>

              {/* Language & Level Selector */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Língua</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="input-field w-auto"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="input-field w-auto"
                  >
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {modules[selectedLanguage]?.[selectedLevel]?.map((module, index) => (
                  <div key={module.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.lessons} lições • {module.duration}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                          Editar
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Content Modal */}
              {showAddContent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                    <h3 className="font-display text-xl font-bold mb-4">Adicionar Novo Conteúdo</h3>
                    <form onSubmit={handleAddContent} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                        <input
                          type="text"
                          value={newContent.title}
                          onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                        <textarea
                          value={newContent.description}
                          onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                          className="input-field"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                          <select
                            value={newContent.type}
                            onChange={(e) => setNewContent({...newContent, type: e.target.value})}
                            className="input-field"
                          >
                            <option value="video">Vídeo</option>
                            <option value="text">Texto</option>
                            <option value="quiz">Quiz</option>
                            <option value="audio">Áudio</option>
                            <option value="interactive">Interativo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duração</label>
                          <input
                            type="text"
                            value={newContent.duration}
                            onChange={(e) => setNewContent({...newContent, duration: e.target.value})}
                            className="input-field"
                            placeholder="ex: 15min"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button type="submit" className="btn-primary flex-grow">
                          Adicionar
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddContent(false)}
                          className="btn-outline"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alunos Recentes */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Alunos Recentes</h2>
              {students.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">👥</div>
                  <p className="text-gray-500 text-sm">Sem alunos registados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {students.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {student.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ações Rápidas */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
              <div className="space-y-2">
                <button className="w-full p-3 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors text-left">
                  📝 Criar Quiz
                </button>
                <button className="w-full p-3 bg-secondary-50 text-secondary-700 rounded-xl hover:bg-secondary-100 transition-colors text-left">
                  📊 Ver Estatísticas
                </button>
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left">
                  📧 Enviar Mensagem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfessor;
