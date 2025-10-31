import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  TrendingUp, 
  Users, 
  FolderOpen, 
  FileText, 
  Mail,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

/**
 * Dashboard admin - Vue d'ensemble
 * Affiche les statistiques et l'activité récente
 */

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Stats temporaires (seront remplacées par vraies stats en Phase 3)
  const stats = [
    {
      label: 'Contacts',
      value: '0',
      icon: Mail,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/50',
    },
    {
      label: 'Projets',
      value: '0',
      icon: FolderOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/50',
    },
    {
      label: 'Articles',
      value: '0',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
    },
    {
      label: 'Visiteurs',
      value: '0',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Bienvenue, {user?.email?.split('@')[0] || 'Admin'} ! Voici un aperçu de votre activité.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white/5 border ${stat.borderColor} rounded-xl p-6 hover:scale-105 transition-transform`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <TrendingUp size={16} className="text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Success Message - Phase 2 */}
      <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-green-400 font-semibold mb-2">
              ✅ Phase 2 terminée avec succès !
            </h3>
            <p className="text-gray-300 mb-4">
              Le layout admin est maintenant complet et fonctionnel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Layout admin avec Sidebar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>TopBar avec user menu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Breadcrumbs fonctionnels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Composants UI réutilisables</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>React Query configuré</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Toast notifications actifs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps - Phase 3 */}
      <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Clock size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📋 Prochaines étapes (Phase 3 & suivantes)
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>→ Phase 3 : Dashboard avec vraies statistiques et graphiques</li>
              <li>→ Phase 4 : CRUD Navigation</li>
              <li>→ Phase 5 : CRUD Services</li>
              <li>→ Phase 6 : CRUD Secteurs</li>
              <li>→ Phase 7 : CRUD Projets</li>
              <li>→ Phase 8 : CRUD Blog avec éditeur Markdown</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle size={24} className="text-blue-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-blue-400 font-semibold mb-2">
              ℹ️ Information
            </h3>
            <p className="text-gray-300 text-sm">
              Les statistiques affichées sont actuellement à 0 car aucune donnée n'a été créée.
              Elles se mettront à jour automatiquement dès que vous ajouterez du contenu via les sections CRUD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
