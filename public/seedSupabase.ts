import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  navigation,
  services,
  sectors,
  projects,
  blogPosts,
  chatbotKnowledgeBase,
  skills,
} from '../src/data/index';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement manquantes !');
  console.error('Assurez-vous que VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définis dans .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('🚀 Démarrage du seed de la base de données...\n');

  try {
    console.log('📊 Insertion de navigation...');
    const { error: navError } = await supabase
      .from('navigation')
      .upsert(navigation, { onConflict: 'id' });

    if (navError) throw navError;
    console.log(`✅ ${navigation.length} éléments de navigation insérés\n`);

    console.log('🛠️ Insertion des services...');
    const { error: servicesError } = await supabase
      .from('services')
      .upsert(services, { onConflict: 'id' });

    if (servicesError) throw servicesError;
    console.log(`✅ ${services.length} services insérés\n`);

    console.log('🏢 Insertion des secteurs...');
    const sectorsData = sectors.map(sector => ({
      id: sector.id,
      title: sector.title,
      description: sector.description,
      services: sector.services,
      icon: sector.icon,
    }));

    const { error: sectorsError } = await supabase
      .from('sectors')
      .upsert(sectorsData, { onConflict: 'id' });

    if (sectorsError) throw sectorsError;
    console.log(`✅ ${sectorsData.length} secteurs insérés\n`);

    console.log('💼 Insertion des projets...');
    const projectsData = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      results: project.results,
      link: project.link,
      content_project_modal: (project as any).content_project_modal || null,
    }));

    const { error: projectsError } = await supabase
      .from('projects')
      .upsert(projectsData, { onConflict: 'id' });

    if (projectsError) throw projectsError;
    console.log(`✅ ${projectsData.length} projets insérés\n`);

    console.log('📝 Insertion des articles de blog...');
    const blogPostsData = blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      read_time: post.readTime,
      image: post.image,
      content_blog: (post as any).content_blog || '',
    }));

    const { error: blogError } = await supabase
      .from('blog_posts')
      .upsert(blogPostsData, { onConflict: 'id' });

    if (blogError) throw blogError;
    console.log(`✅ ${blogPostsData.length} articles de blog insérés\n`);

    console.log('🤖 Insertion de la base de connaissance chatbot...');
    const { error: chatbotError } = await supabase
      .from('chatbot_knowledge')
      .upsert(chatbotKnowledgeBase, { onConflict: 'id' });

    if (chatbotError) throw chatbotError;
    console.log(`✅ ${chatbotKnowledgeBase.length} éléments de connaissance insérés\n`);

    console.log('🎯 Insertion des compétences...');
    const skillsData = skills.map(skill => ({ name: skill }));

    const { error: skillsError } = await supabase
      .from('skills')
      .upsert(skillsData, { onConflict: 'name', ignoreDuplicates: true });

    if (skillsError) throw skillsError;
    console.log(`✅ ${skillsData.length} compétences insérées\n`);

    console.log('🎉 Seed terminé avec succès !');
    console.log('\n📊 Résumé :');
    console.log(`   - Navigation: ${navigation.length} éléments`);
    console.log(`   - Services: ${services.length} éléments`);
    console.log(`   - Secteurs: ${sectorsData.length} éléments`);
    console.log(`   - Projets: ${projectsData.length} éléments`);
    console.log(`   - Articles: ${blogPostsData.length} éléments`);
    console.log(`   - Chatbot KB: ${chatbotKnowledgeBase.length} éléments`);
    console.log(`   - Compétences: ${skillsData.length} éléments`);

  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}

seedData();
