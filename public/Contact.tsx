import React, { useState } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { ContactForm } from '../types';
import ChatBot from './ChatBot';

// Extension de l'interface pour inclure le consentement RGPD
interface ExtendedContactForm extends ContactForm {
  rgpdConsent: boolean;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ExtendedContactForm>({
    name: '',
    email: '',
    company: '',
    budget: '',
    project: '',
    rgpdConsent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ExtendedContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✨ État pour contrôler l'ouverture du ChatBot
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const budgetRanges = [
    'Moins de 5K€',
    '5K€ - 15K€',
    '15K€ - 30K€',
    '30K€ - 50K€',
    'Plus de 50K€',
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ExtendedContactForm> = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation de l'entreprise
    if (!formData.company.trim()) {
      newErrors.company = "Le nom de l'entreprise est requis";
    }

    // Validation du budget
    if (!formData.budget) {
      newErrors.budget = 'Veuillez sélectionner une tranche de budget';
    }

    // Validation de la description du projet
    if (!formData.project.trim()) {
      newErrors.project = 'La description du projet est requise';
    } else if (formData.project.trim().length < 20) {
      newErrors.project =
        'Veuillez fournir une description plus détaillée (minimum 20 caractères)';
    }

    // ✅ Validation du consentement RGPD (CRITIQUE)
    if (!formData.rgpdConsent) {
      newErrors.rgpdConsent =
        'Vous devez accepter la politique de confidentialité pour continuer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Simulation de l'envoi du formulaire
        // Dans un cas réel, remplacer par un appel API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Formulaire soumis avec consentement RGPD:', formData);

        setIsSubmitted(true);

        // Réinitialisation après 5 secondes
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            budget: '',
            project: '',
            rgpdConsent: false,
          });
        }, 5000);
      } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (
    field: keyof ExtendedContactForm,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Effacer l'erreur dès que l'utilisateur commence à corriger
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ✨ Fonction pour ouvrir WhatsApp avec message pré-rempli
  const handleOpenWhatsApp = () => {
    // Numéro WhatsApp au format international (sans espaces ni caractères spéciaux)
    const phoneNumber = '2250545130739';

    // Message pré-rempli (optionnel)
    const message = encodeURIComponent(
      "Bonjour Léonce, je souhaite discuter d'un projet avec vous."
    );

    // URL WhatsApp (compatible mobile et desktop)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Ouvrir dans un nouvel onglet
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCloseChatBot = () => {
    console.log('✖ Fermeture du ChatBot');
    setIsChatBotOpen(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Contactez-
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              moi
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Prêt à transformer votre vision en réalité digitale ? Discutons de
            votre projet
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:contact@leonce-ouattara.com"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      contact@leonce-ouattara.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                    <a
                      href="tel:+225054513739"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      +225 05 45 13 07 39
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Localisation
                    </h3>
                    <p className="text-gray-400">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-semibold hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group"
                aria-label="Planifier un rendez-vous"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  <Calendar size={20} />
                  Planifier un RDV
                </span>
              </button>

              {/* ✨ Bouton Chat en direct - Redirection WhatsApp */}
              <button
                onClick={handleOpenWhatsApp}
                className="w-full border-2 border-cyan-400 text-cyan-400 px-6 py-4 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 font-semibold hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group"
                aria-label="Démarrer un chat WhatsApp"
              >
                <MessageCircle size={20} />
                <span>Chat en direct</span>
                {/* Badge WhatsApp */}
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  WhatsApp
                </span>
              </button>
            </div>

            {/* RGPD Badge */}
            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">
                    Données sécurisées
                  </p>
                  <p className="text-gray-400 text-xs">
                    Conforme RGPD • Chiffrement SSL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-white font-medium mb-2"
                      >
                        Nom complet <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-700/50 focus:border-cyan-500/50'
                        } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 transition-all duration-300`}
                        placeholder="Jean Dupont"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? 'name-error' : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-red-400 text-sm mt-1 flex items-center gap-1"
                        >
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-white font-medium mb-2"
                      >
                        Email professionnel{' '}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-700/50 focus:border-cyan-500/50'
                        } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 transition-all duration-300`}
                        placeholder="vous@entreprise.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? 'email-error' : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-red-400 text-sm mt-1 flex items-center gap-1"
                        >
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company and Budget */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Field */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-white font-medium mb-2"
                      >
                        Entreprise <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange('company', e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.company
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-700/50 focus:border-cyan-500/50'
                        } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 transition-all duration-300`}
                        placeholder="ACME Corporation"
                        aria-required="true"
                        aria-invalid={!!errors.company}
                        aria-describedby={
                          errors.company ? 'company-error' : undefined
                        }
                      />
                      {errors.company && (
                        <p
                          id="company-error"
                          className="text-red-400 text-sm mt-1 flex items-center gap-1"
                        >
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Budget Field */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-white font-medium mb-2"
                      >
                        Budget estimé <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) =>
                          handleInputChange('budget', e.target.value)
                        }
                        className={`w-full bg-white/5 border ${
                          errors.budget
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-700/50 focus:border-cyan-500/50'
                        } rounded-xl py-3 px-4 text-white focus:outline-none focus:bg-white/10 transition-all duration-300 cursor-pointer`}
                        aria-required="true"
                        aria-invalid={!!errors.budget}
                        aria-describedby={
                          errors.budget ? 'budget-error' : undefined
                        }
                      >
                        <option value="" className="bg-gray-800">
                          Sélectionnez votre budget
                        </option>
                        {budgetRanges.map((range) => (
                          <option
                            key={range}
                            value={range}
                            className="bg-gray-800"
                          >
                            {range}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p
                          id="budget-error"
                          className="text-red-400 text-sm mt-1 flex items-center gap-1"
                        >
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.budget}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label
                      htmlFor="project"
                      className="block text-white font-medium mb-2"
                    >
                      Description du projet{' '}
                      <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="project"
                      value={formData.project}
                      onChange={(e) =>
                        handleInputChange('project', e.target.value)
                      }
                      rows={6}
                      className={`w-full bg-white/5 border ${
                        errors.project
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-700/50 focus:border-cyan-500/50'
                      } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none`}
                      placeholder="Décrivez votre projet : objectifs, besoins techniques, cible, délais souhaités, défis spécifiques..."
                      aria-required="true"
                      aria-invalid={!!errors.project}
                      aria-describedby={
                        errors.project ? 'project-error' : undefined
                      }
                    />
                    {errors.project && (
                      <p
                        id="project-error"
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.project}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Minimum 20 caractères • {formData.project.length}/500
                    </p>
                  </div>

                  {/* ✅ RGPD Consent Checkbox - SECTION CRITIQUE */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="pt-0.5">
                        <input
                          id="rgpdConsent"
                          type="checkbox"
                          checked={formData.rgpdConsent}
                          onChange={(e) =>
                            handleInputChange('rgpdConsent', e.target.checked)
                          }
                          className={`w-5 h-5 rounded border-2 ${
                            errors.rgpdConsent
                              ? 'border-red-500'
                              : 'border-cyan-500/50'
                          } bg-white/5 text-cyan-500 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-0 cursor-pointer transition-all duration-300`}
                          aria-required="true"
                          aria-invalid={!!errors.rgpdConsent}
                          aria-describedby={
                            errors.rgpdConsent
                              ? 'rgpd-error'
                              : 'rgpd-description'
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="rgpdConsent"
                          className="text-white text-sm leading-relaxed cursor-pointer"
                        >
                          J'accepte que mes données personnelles soient
                          collectées et traitées conformément à la{' '}
                          <a
                            href="/politique-confidentialite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 transition-colors duration-300"
                          >
                            politique de confidentialité
                            <ExternalLink size={12} />
                          </a>{' '}
                          et au RGPD. <span className="text-red-400">*</span>
                        </label>
                        <p
                          id="rgpd-description"
                          className="text-gray-400 text-xs mt-2"
                        >
                          Vos données sont stockées de manière sécurisée et ne
                          seront jamais partagées avec des tiers sans votre
                          consentement.
                        </p>
                        {errors.rgpdConsent && (
                          <p
                            id="rgpd-error"
                            className="text-red-400 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                            {errors.rgpdConsent}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.rgpdConsent}
                    className={`w-full px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3 relative overflow-hidden group ${
                      isSubmitting || !formData.rgpdConsent
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105'
                    }`}
                    aria-label="Envoyer le formulaire de contact"
                    title={
                      !formData.rgpdConsent
                        ? 'Veuillez accepter la politique de confidentialité pour continuer'
                        : ''
                    }
                  >
                    {!formData.rgpdConsent ? (
                      <span className="relative z-10 flex items-center gap-3">
                        <Shield size={20} />
                        Acceptez la politique de confidentialité
                      </span>
                    ) : isSubmitting ? (
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Envoi en cours...
                      </span>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-3">
                          <Send size={20} />
                          Envoyer ma demande
                        </span>
                      </>
                    )}
                  </button>

                  {/* Footer Info */}
                  <p className="text-gray-400 text-sm text-center">
                    Réponse garantie sous 24h • Consultation gratuite • Devis
                    personnalisé
                  </p>
                </form>
              ) : (
                // Success Message
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Merci pour votre intérêt. Je reviendrai vers vous sous 24h
                    pour discuter de votre projet en détail.
                  </p>
                  <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto">
                    <p className="text-green-400 font-medium mb-2">
                      📧 Email de confirmation envoyé
                    </p>
                    <p className="text-gray-300 text-sm">
                      En attendant, consultez mes projets récents pour vous
                      inspirer !
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Composant ChatBot conditionnel avec contrôle */}
      {isChatBotOpen && (
        <div className="chatbot-wrapper">
          <ChatBot defaultOpen={true} onClose={handleCloseChatBot} />
        </div>
      )}

      {/* Styles personnalisés pour les animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        /* Style personnalisé pour la checkbox */
        input[type="checkbox"]:checked {
          background-color: rgb(6, 182, 212);
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default Contact;
