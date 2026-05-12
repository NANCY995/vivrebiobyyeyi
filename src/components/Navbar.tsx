import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sun, Moon, Search, Globe } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { useThemeStore } from '../store/themeStore';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.getItemCount());
  const favCount = useFavoriteStore((s) => s.getCount());
  const { theme, toggleTheme } = useThemeStore();
  const { i18n, t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: t('common.home'), href: '/' },
    { label: t('common.shop'), href: '/shop' },
    { label: t('common.faq'), href: '/faq' },
    { label: t('common.testimonials'), href: '/testimonials' },
    { label: t('common.contact'), href: '/contact' },
  ];

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="header-inner">
            <nav className="nav-left hidden lg:flex">
              {navLinks.slice(0, 4).map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`nav-link ${location.pathname === l.href ? 'text-[#2D6A1B] font-semibold' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <Link to="/" className="logo">
              <span className="logo-vivre">VIVRE</span>
              <span className="logo-bio">BIO</span>
            </Link>

            <div className="nav-right">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="icon-btn"
                aria-label={t('common.search')}
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              <button
                onClick={toggleTheme}
                className="icon-btn"
                aria-label={theme === 'light' ? t('common.darkMode') : t('common.lightMode')}
              >
                {theme === 'light' ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className="icon-btn flex items-center gap-1">
                  <Globe size={18} strokeWidth={1.8} />
                  <span className="text-xs hidden sm:inline">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-[#1A1A1A] border border-[#DDD5C5] dark:border-gray-700">
                  <DropdownMenuItem onClick={() => i18n.changeLanguage('fr')} className="cursor-pointer dark:text-gray-200">
                    {t('common.french')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => i18n.changeLanguage('en')} className="cursor-pointer dark:text-gray-200">
                    {t('common.english')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/favorites"
                className="icon-btn relative"
                aria-label={t('common.favorites')}
              >
                <Heart size={18} strokeWidth={1.8} />
                {favCount > 0 && (
                  <span className="cart-count">{favCount}</span>
                )}
              </Link>

               <Link
                to="/cart"
                className="icon-btn relative"
                aria-label={t('common.cart')}
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                {itemCount > 0 && (
                  <span className="cart-count">{itemCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="bg-white dark:bg-[#1A1A1A] border-b border-[#DDD5C5] dark:border-gray-700 py-4 shadow-md">
          <div className="max-w-2xl mx-auto px-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={t('common.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDD5C5] dark:border-gray-600 rounded-md bg-[#F5F0E8] dark:bg-gray-700 text-[#2A2A2A] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A1B]"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
