
import React, { useState, useEffect, useCallback } from 'react';
import { TrendingItem, SEOResult, Country } from './types';
import { COUNTRIES } from './constants';
import { fetchTrendingItems, generateSEOContent } from './services/geminiService';
import TrendCard from './components/TrendCard';
import SEOResultDisplay from './components/SEOResultDisplay';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [trends, setTrends] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TrendingItem | null>(null);
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [generatingSEO, setGeneratingSEO] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const loadTrends = useCallback(async (country: Country) => {
    setLoading(true);
    setError(null);
    setSelectedItem(null);
    setSeoResult(null);
    try {
      const data = await fetchTrendingItems(country.name);
      setTrends(data);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      setError("Failed to load real-time trends. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrends(selectedCountry);
  }, [selectedCountry, loadTrends]);

  const handleItemClick = async (item: TrendingItem) => {
    setSelectedItem(item);
    setGeneratingSEO(true);
    setSeoResult(null);
    try {
      const result = await generateSEOContent(item, selectedCountry.name);
      setSeoResult(result);
    } catch (err) {
      setError("Failed to generate SEO content.");
    } finally {
      setGeneratingSEO(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const customItem: TrendingItem = {
      id: 'search-' + Date.now(),
      title: searchQuery,
      description: `Custom search for ${searchQuery}`,
      rank: 0,
      category: 'Entertainment'
    };

    setSelectedItem(customItem);
    setGeneratingSEO(true);
    setSeoResult(null);
    try {
      const result = await generateSEOContent(customItem, selectedCountry.name);
      setSeoResult(result);
    } catch (err) {
      setError("Failed to generate insights for this search.");
    } finally {
      setGeneratingSEO(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
              <i className="fa-brands fa-youtube text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                TrendSEO Master
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Real-time Insights</p>
            </div>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative w-full max-w-xl group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Movie or Serial name..."
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 pl-12 pr-24 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all placeholder:text-slate-600"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <button
              type="submit"
              disabled={!searchQuery.trim() || generatingSEO}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-slate-600 text-white px-4 py-1.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-600/20"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-4 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
            {COUNTRIES.slice(0, 5).map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                  selectedCountry.code === c.code
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{c.flag}</span>
                <span className="hidden xl:inline">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Trends Sidebar/List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Real-time Trends
                </h2>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <i className="fa-solid fa-earth-americas"></i> {selectedCountry.name} • Updated at {lastUpdate || '--:--'}
                </span>
              </div>
              <button 
                onClick={() => loadTrends(selectedCountry)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded transition-colors"
              >
                <i className="fa-solid fa-rotate"></i> Refresh
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-900 rounded-xl animate-pulse border border-slate-800"></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-2xl text-center">
                <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500 mb-2"></i>
                <p className="text-red-200">{error}</p>
                <button onClick={() => loadTrends(selectedCountry)} className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-sm">Try Again</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                {trends.map((item) => (
                  <TrendCard 
                    key={item.id || item.rank} 
                    item={item} 
                    isActive={selectedItem?.title === item.title && item.rank !== 0}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SEO Generation Result */}
          <div className="lg:col-span-7">
            {selectedItem ? (
              <div className="sticky top-28">
                {generatingSEO ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                      <i className="fa-solid fa-wand-magic-sparkles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Generating Insights...</h3>
                      <p className="text-slate-400 mt-2">Fetching real-time search volume and SEO keywords for "{selectedItem.title}"</p>
                    </div>
                    <div className="w-full max-w-xs bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 animate-progress"></div>
                    </div>
                  </div>
                ) : seoResult ? (
                  <SEOResultDisplay result={seoResult} item={selectedItem} />
                ) : null}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl p-12 text-slate-500 text-center">
                <i className="fa-solid fa-magnifying-glass text-4xl mb-4 text-slate-700"></i>
                <h3 className="text-xl font-medium text-slate-400">Search or Select an Item</h3>
                <p className="max-w-xs mt-2">Use the search box at the top or pick a trending item from the left to generate professional SEO content automatically.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress { animation: progress 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default App;
