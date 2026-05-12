import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// @ts-ignore
import { ArrowRight, Calendar, Clock, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    date: '12 Mai 2024',
    readTime: '5 min',
    image: '/poudres-graines.jpg',
    slug: 'bienfaits-moringa'
  },
  {
    id: 2,
    date: '05 Mai 2024',
    readTime: '8 min',
    image: '/huiles-essentielles.jpg',
    slug: 'guide-huiles-essentielles'
  },
  {
    id: 3,
    date: '28 Avril 2024',
    readTime: '6 min',
    image: '/argiles.jpg',
    slug: 'detox-argiles'
  },
  {
    id: 4,
    date: '15 Avril 2024',
    readTime: '7 min',
    image: '/miel-produits.jpg',
    slug: 'pourquoi-le-bio'
  },
  {
    id: 5,
    date: '10 Avril 2024',
    readTime: '6 min',
    image: '/thes-infusion.jpg',
    slug: 'art-infusions'
  },
  {
    id: 6,
    date: '02 Avril 2024',
    readTime: '10 min',
    image: '/cosmetiques.jpg',
    slug: 'cosmetique-maison'
  }
];

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
       <Helmet>
         <title>{t('footer.blog')} - VIVRE BIO</title>
         <meta name="description" content={t('blog.blogDesc')} />
       </Helmet>

      <div className="relative bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-24 border-b border-[#DDD5C5] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="/hero-vivrebio.jpg" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('blog.savoir')}
           </span>
           <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light text-[#2A2A2A] dark:text-gray-100 mb-6">
             {t('footer.blog')}
           </h1>
           <p className="text-lg text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
             {t('blog.subtitle')}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
             <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100 flex items-center gap-3">
               <BookOpen className="text-[#2D6A1B]" /> {t('blog.lastPosts')}
             </h2>
          </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(t('blog.categories', { returnObjects: true })).map(([key, label]) => (
                <button key={key} className="px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 text-[#6B6B6B] dark:text-gray-400 hover:border-[#2D6A1B] hover:text-[#2D6A1B] transition-all whitespace-nowrap">
                  {label as string}
                </button>
              ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
             <article key={post.id} className="group bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#DDD5C5] dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
               <div className="relative h-64 overflow-hidden">
                 <img 
                   src={post.image} 
                   alt={t(`blog.posts.${post.id}.title`)} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#2D6A1B] shadow-sm uppercase tracking-wider">
                   {t(`blog.posts.${post.id}.category`)}
                 </div>
               </div>
               <div className="p-8">
                 <div className="flex items-center gap-4 text-xs text-[#6B6B6B] dark:text-gray-400 mb-4">
                   <div className="flex items-center gap-1">
                     <Calendar size={14} />
                     {post.date}
                   </div>
                   <div className="flex items-center gap-1">
                     <Clock size={14} />
                     {post.readTime}
                   </div>
                 </div>
                 <h3 className="font-['Cormorant_Garamond'] text-2xl font-normal text-[#2A2A2A] dark:text-gray-100 mb-3 group-hover:text-[#2D6A1B] transition-colors">
                   {t(`blog.posts.${post.id}.title`)}
                 </h3>
                 <p className="text-sm text-[#6B6B6B] dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                   {t(`blog.posts.${post.id}.excerpt`)}
                 </p>
                 <Link 
                   to={`/blog/${post.slug}`} 
                   className="inline-flex items-center gap-2 text-sm font-bold text-[#2D6A1B] hover:text-[#1B4D0F] transition-colors group/link"
                 >
                   {t('blog.readArticle')} <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </article>
          ))}
        </div>

        <div className="mt-32 relative rounded-[3rem] p-12 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[#2D6A1B]"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Heart size={32} />
            </div>
             <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light text-white mb-6">
               {t('blog.newsletterTitle')}
             </h3>
             <p className="text-white/80 mb-10 leading-relaxed text-lg font-light">
               {t('blog.newsletterBody')}
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <input 
                 type="email" 
                 placeholder={t('blog.newsletterPlaceholder')}
                 className="px-6 py-4 rounded-full bg-white text-[#2A2A2A] focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-80 shadow-lg"
               />
               <button className="bg-white text-[#2D6A1B] px-8 py-4 rounded-full font-bold hover:bg-[#F5F0E8] transition-all shadow-lg active:scale-95">
                 {t('blog.subscribe')}
               </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
