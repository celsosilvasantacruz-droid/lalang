import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { initialUsers, generateCertificate } from '../data/mockupData';

export const useStore = create(
  persist(
    (set, get) => ({
      // Estado
      users: initialUsers,
      currentUser: null,
      enrolledCourses: [],
      progress: {},
      certificates: [],
      payments: [],
      testimonials: [],
      notifications: [],
      courseContent: {},
      
      // Auth
      login: (email, password) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ currentUser: { ...user, password: undefined } });
          return { success: true, user };
        }
        return { success: false, error: 'Credenciais inválidas' };
      },
      
      logout: () => {
        set({ currentUser: null });
      },
      
      register: (userData) => {
        const existingUser = get().users.find(u => u.email === userData.email);
        if (existingUser) {
          return { success: false, error: 'Email já registado' };
        }
        
        const newUser = {
          id: uuidv4(),
          ...userData,
          createdAt: new Date().toISOString(),
          active: true
        };
        
        set(state => ({
          users: [...state.users, newUser],
          currentUser: { ...newUser, password: undefined }
        }));
        
        return { success: true, user: newUser };
      },
      
      // Gestão de utilizadores (Admin)
      createUser: (userData) => {
        const existingUser = get().users.find(u => u.email === userData.email);
        if (existingUser) {
          return { success: false, error: 'Email já registado' };
        }
        
        const newUser = {
          id: uuidv4(),
          ...userData,
          createdAt: new Date().toISOString(),
          active: true
        };
        
        set(state => ({
          users: [...state.users, newUser]
        }));
        
        return { success: true, user: newUser };
      },
      
      updateUser: (userId, updates) => {
        set(state => ({
          users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u),
          currentUser: state.currentUser?.id === userId 
            ? { ...state.currentUser, ...updates }
            : state.currentUser
        }));
      },
      
      deleteUser: (userId) => {
        set(state => ({
          users: state.users.filter(u => u.id !== userId)
        }));
      },
      
      // Cursos
      enrollCourse: (courseData) => {
        const enrollment = {
          id: uuidv4(),
          userId: get().currentUser?.id,
          ...courseData,
          enrolledAt: new Date().toISOString(),
          status: 'active',
          progress: 0
        };
        
        set(state => ({
          enrolledCourses: [...state.enrolledCourses, enrollment]
        }));
        
        return { success: true, enrollment };
      },
      
      // Conteúdo de cursos (para professores/gestores)
      addCourseContent: (contentData) => {
        const content = {
          id: uuidv4(),
          ...contentData,
          createdAt: new Date().toISOString(),
          createdBy: get().currentUser?.id
        };
        
        set(state => ({
          courseContent: {
            ...state.courseContent,
            [contentData.languageId]: {
              ...state.courseContent[contentData.languageId],
              [contentData.level]: [
                ...(state.courseContent[contentData.languageId]?.[contentData.level] || []),
                content
              ]
            }
          }
        }));
        
        return { success: true, content };
      },
      
      // Progresso
      updateProgress: (courseId, moduleId, lessonId, completed) => {
        set(state => {
          const progress = { ...state.progress };
          if (!progress[courseId]) progress[courseId] = {};
          if (!progress[courseId][moduleId]) progress[courseId][moduleId] = {};
          progress[courseId][moduleId][lessonId] = { completed, completedAt: new Date().toISOString() };
          
          return { progress };
        });
      },
      
      // Certificados
      issueCertificate: (courseId, language, level) => {
        const userId = get().currentUser?.id;
        const cert = generateCertificate(userId, courseId, language, level);
        
        set(state => ({
          certificates: [...state.certificates, cert]
        }));
        
        return cert;
      },
      
      // Pagamentos
      createPayment: (paymentData) => {
        const payment = {
          id: uuidv4(),
          userId: get().currentUser?.id,
          ...paymentData,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        
        set(state => ({
          payments: [...state.payments, payment]
        }));
        
        return payment;
      },
      
      updatePaymentStatus: (paymentId, status) => {
        set(state => ({
          payments: state.payments.map(p => 
            p.id === paymentId ? { ...p, status, paidAt: new Date().toISOString() } : p
          )
        }));
      },
      
      // Notificações
      addNotification: (notification) => {
        const newNotif = {
          id: uuidv4(),
          ...notification,
          read: false,
          createdAt: new Date().toISOString()
        };
        
        set(state => ({
          notifications: [...state.notifications, newNotif]
        }));
      },
      
      markNotificationRead: (notifId) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === notifId ? { ...n, read: true } : n
          )
        }));
      },
      
      // Reset
      reset: () => {
        set({
          users: initialUsers,
          currentUser: null,
          enrolledCourses: [],
          progress: {},
          certificates: [],
          payments: [],
          notifications: [],
          courseContent: {}
        });
      }
    }),
    {
      name: 'lalang-storage'
    }
  )
);
