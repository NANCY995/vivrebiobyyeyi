import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { asset } from '../lib/assets';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    date: '12 Mai 2024',
    readTime: '5 min',
    image: asset('/poudres-graines.jpg'),
    slug: 'bienfaits-moringa',
  },
  {
    id: 2,
    date: '05 Mai 2024',
    readTime: '8 min',
    image: asset('/huiles-essentielles.jpg'),
    slug: 'guide-huiles-essentielles',
  },
  {
    id: 3,
    date: '28 Avril 2024',
    readTime: '6 min',
    image: asset('/argiles.jpg'),
    slug: 'detox-argiles',
  },
  {
    id: 4,
    date: '15 Avril 2024',
    readTime: '7 min',
    image: asset('/miel-produits.jpg'),
    slug: 'pourquoi-le-bio',
  },
  {
    id: 5,
    date: '10 Avril 2024',
    readTime: '6 min',
    image: asset('/thes-infusion.jpg'),
    slug: 'art-infusions',
  },
  {
    id: 6,
    date: '02 Avril 2024',
    readTime: '10 min',
    image: asset('/cosmetiques.jpg'),
    slug: 'cosmetique-maison',
  },
];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Seo title="Article non trouvé" description="L'article demandé n'existe pas." />
        <h1 className="text-2xl font-semibold mb-4">{t('blog.notFound')}</h1>
        <Link to="/blog" className="text-[#2D6A1B] hover:underline">
          <ArrowLeft size={16} className="inline mr-1" />
          {t('blog.backToBlog')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={t(`blog.posts.${post.id}.title`)}
        description={t(`blog.posts.${post.id}.excerpt`)}
        ogImage={post.image}
      />

      <div className="relative bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-24 border-b border-[#DDD5C5] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#2D6A1B] transition-colors no-underline mb-6">
            <ArrowLeft size={16} />
            {t('blog.backToBlog')}
          </Link>
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
            {t(`blog.posts.${post.id}.category`)}
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] mb-6">
            {t(`blog.posts.${post.id}.title`)}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#6B6B6B]">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <img
          src={post.image}
          alt={t(`blog.posts.${post.id}.title`)}
          className="w-full h-96 object-cover rounded-2xl shadow-lg mb-12"
          loading="lazy"
        />
        <div className="prose prose-lg max-w-none text-[#6B6B6B] leading-relaxed">
          <p className="text-xl font-light text-[#2A2A2A] mb-8">
            {t(`blog.posts.${post.id}.excerpt`)}
          </p>
          {[1, 2, 3].map((section) => {
            const content = t(`blog.posts.${post.id}.content.${section}`, { defaultValue: '' });
            if (!content) return null;
            return (
              <div key={section} className="mb-8">
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] mb-4">
                  {t(`blog.posts.${post.id}.heading.${section}`, { defaultValue: '' })}
                </h2>
                <p>{content}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-[#DDD5C5]">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white px-8 py-3 rounded-full font-semibold transition-all no-underline"
          >
            {t('blog.shopCta')} <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </>
  );
}
