import { useState, useMemo, useEffect } from 'react';
import { Grid, List, SlidersHorizontal, ShoppingBag, Leaf, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { categories as staticCategories } from '../data/products';
import type { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductSkeleton';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function Shop() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { products: allProducts, loading } = useProducts();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
    const cat = params.get('category') as ProductCategory | null;
    if (cat) {
      setSelectedCategories([cat]);
    } else if (!params.has('category') && !params.has('q')) {
      setSelectedCategories([]);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    const query = searchQuery.toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [allProducts, searchQuery, selectedCategories, sortBy, priceRange]);

  const categories = useMemo(() =>
    staticCategories.map((cat) => ({
      ...cat,
      count: allProducts.filter((p) => p.category === cat.id).length,
    })),
    [allProducts]
  );

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3 dark:text-gray-200">{t('common.categories')}</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id as ProductCategory)}
                onCheckedChange={() => toggleCategory(cat.id as ProductCategory)}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer dark:text-gray-300">
                {cat.name} ({cat.count})
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-3 dark:text-gray-200">{t('common.price')}</h3>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-[#2D6A1B]"
          />
        </div>
        <p className="text-xs text-[#6B6B6B] dark:text-gray-400 mt-1">
          0 - {formatPrice(priceRange[1])}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title={t('shop.title')}
        description={t('shop.subtitle')}
      />

      {/* Hero Banner */}
      <div className="relative w-full bg-gradient-to-br from-[#F5F0E8] via-[#EDE6D6] to-[#E8E0D0] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#2D6A1B]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#C4952E]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#2D6A1B]/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2D6A1B] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                {t('shop.naturalShop')}
              </div>
              <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl font-light text-[#2A2A2A] leading-tight">
                {t('shop.title')}
              </h1>
              <p className="text-lg text-[#6B6B6B] max-w-xl leading-relaxed">
                {t('shop.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <a href="#products" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A1B] text-white font-semibold rounded-full hover:bg-[#1B4D0F] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  <span>{t('shop.browseProducts')}</span>
                </a>
                <a href="/about" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-[#1A1A1A] text-[#2D6A1B] font-semibold rounded-full border-2 border-[#2D6A1B]/20 hover:border-[#2D6A1B] hover:bg-[#2D6A1B]/5 transition-all duration-300">
                  <Heart size={20} className="group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                  <span>{t('shop.learnMore')}</span>
                </a>
              </div>
              <div className="flex items-center gap-8 justify-center md:justify-start pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img src="/poudres-graines.jpg" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                    <img src="/huiles-essentielles.jpg" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                    <img src="/cosmetiques.jpg" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                  </div>
                  <span className="text-sm text-[#6B6B6B]">+2k clients satisfaits</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#2D6A1B]/20 via-[#C4952E]/10 to-transparent rounded-[3rem] blur-2xl"></div>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-[#2D6A1B]/10 rounded-[2rem]"></div>
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/80 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="/image%20de%20vivre%20bio.jpeg"
                    alt="Huiles essentielles VIVRE BIO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white dark:bg-[#1A1A1A] px-5 py-3 rounded-2xl shadow-xl border border-[#DDD5C5] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D6A1B] rounded-full flex items-center justify-center">
                  <Leaf size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#2D6A1B]">100% Bio</p>
                  <p className="text-xs text-[#6B6B6B]">Certifié naturel</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#DDD5C5] dark:border-gray-700">
                <SlidersHorizontal size={18} className="text-[#2D6A1B]" />
                <h3 className="font-semibold text-sm uppercase tracking-wider dark:text-gray-200">{t('common.filter')}</h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <SheetTrigger asChild>
                    <button className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#DDD5C5] dark:border-gray-600 rounded-full text-sm text-[#2A2A2A] dark:text-gray-200 hover:bg-white transition-colors">
                      <SlidersHorizontal size={16} />
                      {t('common.filter')}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 dark:bg-gray-900">
                    <SheetHeader>
                      <SheetTitle className="dark:text-gray-100">{t('common.filter')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="relative flex-1 sm:w-80">
                  <input
                    type="text"
                    placeholder={t('common.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 border border-[#DDD5C5] dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-sm text-[#2A2A2A] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A1B] transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 text-sm rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 px-4">
                    <SelectValue placeholder={t('shop.sortBy')} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="popularity">{t('shop.sortOptions.popularity')}</SelectItem>
                    <SelectItem value="priceAsc">{t('shop.sortOptions.priceAsc')}</SelectItem>
                    <SelectItem value="priceDesc">{t('shop.sortOptions.priceDesc')}</SelectItem>
                    <SelectItem value="newest">{t('shop.sortOptions.newest')}</SelectItem>
                    <SelectItem value="name">{t('shop.sortOptions.name')}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-600 rounded-full p-1 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#2D6A1B] text-white shadow-sm' : 'text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#2D6A1B] text-white shadow-sm' : 'text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-medium text-[#6B6B6B] dark:text-gray-400 uppercase tracking-wider">
                {filteredProducts.length} {t('shop.results')}
              </p>
            </div>

            {loading ? (
              <ProductGridSkeleton count={9} viewMode={viewMode} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-xl font-light text-[#6B6B6B] dark:text-gray-400">{t('common.emptySearch')}</p>
                 <button 
                   onClick={() => {setSearchQuery(''); setSelectedCategories([]); setPriceRange([0, 20000])}}
                   className="mt-4 text-sm text-[#2D6A1B] underline underline-offset-4 hover:text-[#1B4D0F]"
                 >
                   {t('shop.resetFilters')}
                 </button>
              </div>
            ) : (
              <div id="products" className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
