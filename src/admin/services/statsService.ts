import { supabase } from '../../lib/supabaseClient';

/**
 * Service pour récupérer les statistiques du dashboard
 * Compte le nombre d'éléments dans chaque table
 */

export interface DashboardStats {
  contactsCount: number;
  projectsCount: number;
  blogPostsCount: number;
  servicesCount: number;
  sectorsCount: number;
  navigationItemsCount: number;
  skillsCount: number;
  chatbotKnowledgeCount: number;
}

/**
 * Récupère toutes les statistiques du dashboard
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Exécuter toutes les requêtes en parallèle pour optimiser
    const [
      contactsResult,
      projectsResult,
      blogPostsResult,
      servicesResult,
      sectorsResult,
      navigationResult,
      skillsResult,
      chatbotResult,
    ] = await Promise.all([
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('sectors').select('id', { count: 'exact', head: true }),
      supabase.from('navigation').select('id', { count: 'exact', head: true }),
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('chatbot_knowledge').select('id', { count: 'exact', head: true }),
    ]);

    return {
      contactsCount: contactsResult.count || 0,
      projectsCount: projectsResult.count || 0,
      blogPostsCount: blogPostsResult.count || 0,
      servicesCount: servicesResult.count || 0,
      sectorsCount: sectorsResult.count || 0,
      navigationItemsCount: navigationResult.count || 0,
      skillsCount: skillsResult.count || 0,
      chatbotKnowledgeCount: chatbotResult.count || 0,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

/**
 * Récupère les derniers contacts (activité récente)
 */
export const getRecentContacts = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('id, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts récents:', error);
    return [];
  }
};

/**
 * Récupère les derniers projets créés
 */
export const getRecentProjects = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, status, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets récents:', error);
    return [];
  }
};

/**
 * Récupère les derniers articles de blog
 */
export const getRecentBlogPosts = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, status, published_at, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des articles récents:', error);
    return [];
  }
};

/**
 * Récupère les statistiques d'évolution sur 30 jours
 * (pour graphique optionnel)
 */
export const getStatsEvolution = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [contactsData, projectsData, blogPostsData] = await Promise.all([
      supabase
        .from('contacts')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('projects')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('blog_posts')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString()),
    ]);

    // Grouper par jour
    const groupByDay = (data: any[]) => {
      const grouped: Record<string, number> = {};
      data.forEach((item) => {
        const date = new Date(item.created_at).toLocaleDateString('fr-FR');
        grouped[date] = (grouped[date] || 0) + 1;
      });
      return grouped;
    };

    return {
      contacts: groupByDay(contactsData.data || []),
      projects: groupByDay(projectsData.data || []),
      blogPosts: groupByDay(blogPostsData.data || []),
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'évolution:', error);
    return { contacts: {}, projects: {}, blogPosts: {} };
  }
};
