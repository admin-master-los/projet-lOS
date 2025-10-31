import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRecentContacts,
  getRecentProjects,
  getRecentBlogPosts,
  getStatsEvolution,
} from '../services/statsService';

/**
 * Hooks React Query pour le dashboard
 * Gère le cache et les refetch automatiques
 */

/**
 * Hook pour récupérer les statistiques globales
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook pour récupérer les contacts récents
 */
export const useRecentContacts = (limit = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-contacts', limit],
    queryFn: () => getRecentContacts(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Hook pour récupérer les projets récents
 */
export const useRecentProjects = (limit = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-projects', limit],
    queryFn: () => getRecentProjects(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Hook pour récupérer les articles récents
 */
export const useRecentBlogPosts = (limit = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-blog-posts', limit],
    queryFn: () => getRecentBlogPosts(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Hook pour récupérer l'évolution des stats
 */
export const useStatsEvolution = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats-evolution'],
    queryFn: getStatsEvolution,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
