import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  TrendingUp,
  X,
  Rocket,
  CheckCircle2,
  Award,
  Code2,
  Server,
  Cloud,
  AlertTriangle,
  Zap,
  Clock,
  Users,
} from 'lucide-react';
import { useProjects } from '../lib/useSupabaseData';

const Portfolio: React.FC = () => {
  const { data: projects, loading } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🚀 Fonction pour ouvrir la modale avec un projet
  const openProjectModal = (project: any, index: number) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
    setIsAnimating(true);
    setTimeout(() => setIsModalOpen(true), 50);
  };

  // 🔒 Fonction pour fermer la modale
  const closeProjectModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProject(null);
    }, 300);
  };

  // 🔐 Bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // ⌨️ Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeProjectModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Portfolio{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Projets
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez quelques-unes de mes réalisations les plus impactantes
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {!loading && projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Action buttons overlay */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => window.open(project.link, '_blank')}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                      >
                        <ExternalLink size={16} className="text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-purple-500 hover:border-purple-500 transition-all duration-300">
                        <Github size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                      <Github size={18} className="text-cyan-400" />
                      Stack Technique
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                      <TrendingUp size={18} className="text-purple-400" />
                      Résultats Obtenus
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {project.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="text-center bg-white/5 rounded-lg p-3"
                        >
                          <div className="text-sm font-bold text-purple-400">
                            {result}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openProjectModal(project, index)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-semibold hover:scale-105 inline-flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <ExternalLink size={18} />
                        Voir le projet
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        document
                          .querySelector('#contact')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="flex-1 border-2 border-cyan-400 text-cyan-400 px-4 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 font-semibold hover:scale-105 inline-flex items-center justify-center gap-2"
                    >
                      Projet similaire ?
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à lancer votre projet ?
          </h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transformons ensemble vos idées en réalité digitale. Discutons de
            votre vision et créons quelque chose d'exceptionnel.
          </p>
          <button
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-10 py-4 rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-bold text-lg hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Démarrer maintenant</span>
          </button>
        </div>
      </div>

      {/* 🎭 MODALE IMMERSIVE FULL-SCREEN PROJET - STYLE PROJECTMODAL.TSX APPLIQUÉ */}
      {isModalOpen &&
        selectedProject &&
        selectedProject.content_project_modal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop avec image du projet */}
            <div
              className="fixed inset-0 bg-black/80"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${selectedProject.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            />

            {/* Modal Content */}
            <div className="relative min-h-screen flex items-start justify-center p-4">
              <div className="relative w-full max-w-6xl bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-3xl shadow-2xl my-8">
                {/* Close Button */}
                <button
                  onClick={closeProjectModal}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-10"
                >
                  <X size={24} className="text-white" />
                </button>

                {/* Header Section */}
                <div className="p-8 pb-0">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {selectedProject.content_project_modal.hero_title}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                      {selectedProject.content_project_modal.hero_subtitle}
                    </p>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {selectedProject.content_project_modal.metrics
                      .slice(0, 4)
                      .map((metric: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center"
                        >
                          <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-white mb-1">
                            {metric.value}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="px-8 pb-8 space-y-10">
                  {/* Full Description */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Zap className="text-cyan-400" />
                      Description complète
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedProject.content_project_modal.description}
                    </p>
                  </div>

                  {/* Challenge & Solution - 2 colonnes */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Challenge */}
                    <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <AlertTriangle className="text-orange-400" />
                        {selectedProject.content_project_modal.challenge.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {
                          selectedProject.content_project_modal.challenge
                            .description
                        }
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-green-400" />
                        {selectedProject.content_project_modal.solution.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {
                          selectedProject.content_project_modal.solution
                            .description
                        }
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <CheckCircle2 className="text-green-400" />
                      Fonctionnalités principales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.content_project_modal.solution.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-white/5 rounded-lg p-4"
                          >
                            <CheckCircle2
                              size={20}
                              className="text-green-400 mt-0.5 flex-shrink-0"
                            />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Github className="text-cyan-400" />
                      Stack technique
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Frontend */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Code2 size={20} className="text-cyan-400" />
                          <h3 className="text-lg font-bold text-white">
                            Frontend
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.content_project_modal.technologies.frontend.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Backend */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Server size={20} className="text-purple-400" />
                          <h3 className="text-lg font-bold text-white">
                            Backend
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.content_project_modal.technologies.backend.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Infrastructure */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Cloud size={20} className="text-orange-400" />
                          <h3 className="text-lg font-bold text-white">
                            Infrastructure
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.content_project_modal.technologies.infrastructure.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <TrendingUp className="text-purple-400" />
                      Résultats obtenus
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {selectedProject.content_project_modal.metrics.map(
                        (result: any, index: number) => (
                          <div
                            key={index}
                            className="text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
                          >
                            <div className="text-3xl font-bold text-purple-400 mb-2">
                              {result.value}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {result.label}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              {result.description}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {selectedProject.content_project_modal.testimonial && (
                    <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                      <div className="text-center max-w-4xl mx-auto">
                        <div className="text-6xl text-cyan-400 mb-4">"</div>
                        <p className="text-xl md:text-2xl text-gray-200 italic leading-relaxed mb-6">
                          {
                            selectedProject.content_project_modal.testimonial
                              .quote
                          }
                        </p>
                        <div className="border-t border-gray-700 pt-6">
                          <p className="text-lg font-bold text-white">
                            {
                              selectedProject.content_project_modal.testimonial
                                .author
                            }
                          </p>
                          <p className="text-cyan-400 text-sm">
                            {
                              selectedProject.content_project_modal.testimonial
                                .role
                            }
                          </p>
                          <p className="text-gray-400 text-sm">
                            {
                              selectedProject.content_project_modal.testimonial
                                .company
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    {selectedProject.content_project_modal.demo_link && (
                      <button
                        onClick={() =>
                          window.open(
                            selectedProject.content_project_modal.demo_link,
                            '_blank'
                          )
                        }
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-bold text-lg hover:scale-105 inline-flex items-center justify-center gap-3 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-3">
                          <ExternalLink size={24} />
                          Voir la démo
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        closeProjectModal();
                        document
                          .querySelector('#contact')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 font-bold text-lg hover:scale-105 inline-flex items-center justify-center gap-3"
                    >
                      {selectedProject.content_project_modal.cta_text}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};

export default Portfolio;
