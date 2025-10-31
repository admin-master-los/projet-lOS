import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

/**
 * Composant TopBar
 * Barre supérieure avec user menu et déconnexion
 */

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-[#0A0A0B] border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumbs placeholder */}
        <div className="flex-1">
          {/* Les breadcrumbs seront ajoutés ici */}
        </div>

        {/* Right side - User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>

            {/* User info */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-white">
                {user?.email?.split('@')[0] || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>

            {/* Chevron */}
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0A0A0B] border border-gray-700/50 rounded-xl shadow-xl overflow-hidden z-50 animate-dropdown">
              {/* User info (mobile) */}
              <div className="px-4 py-3 border-b border-gray-700/50 sm:hidden">
                <p className="text-sm font-medium text-white">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    navigate('/admin/settings');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Settings size={16} />
                  <span className="text-sm">Paramètres</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default TopBar;
