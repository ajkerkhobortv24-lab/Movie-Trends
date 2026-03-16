
import React, { useState } from 'react';
import { SEOResult, TrendingItem } from '../types';
import SearchAnalytics from './SearchAnalytics';

interface SEOResultDisplayProps {
  result: SEOResult;
  item: TrendingItem;
}

const SEOResultDisplay: React.FC<SEOResultDisplayProps> = ({ result, item }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'seo' | 'analytics'>('seo');

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Result Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">SEO Blueprint & Insights</h2>
            <p className="text-white/70 text-sm">Optimized for "{item.title}"</p>
          </div>
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
            <i className="fa-solid fa-chart-line text-white text-xl"></i>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/50">
        <button 
          onClick={() => setActiveTab('seo')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
            activeTab === 'seo' ? 'border-red-500 text-white bg-red-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <i className="fa-solid fa-rocket mr-2"></i> SEO Package
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
            activeTab === 'analytics' ? 'border-blue-500 text-white bg-blue-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <i className="fa-solid fa-magnifying-glass-chart mr-2"></i> Search Analytics
        </button>
      </div>

      <div className="p-6 space-y-8 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar">
        {activeTab === 'seo' ? (
          <>
            {/* Title Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-heading text-red-500"></i> Optimized Title
                </h4>
                <button 
                  onClick={() => copyToClipboard(result.title, 'title')}
                  className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  {copiedSection === 'title' ? <><i className="fa-solid fa-check"></i> Copied</> : <><i className="fa-solid fa-copy"></i> Copy</>}
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-lg font-bold text-white shadow-inner">
                {result.title}
              </div>
            </div>

            {/* Top Search Keywords (Actual User Queries) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-magnifying-glass text-red-500"></i> Top Search Keywords (User Queries)
                </h4>
                <button 
                  onClick={() => copyToClipboard(result.keywords.join('\n'), 'keywords')}
                  className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  {copiedSection === 'keywords' ? <><i className="fa-solid fa-check"></i> Copied</> : <><i className="fa-solid fa-copy"></i> Copy Keywords</>}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                {result.keywords.map((kw, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <i className="fa-solid fa-search text-[10px] text-slate-600"></i>
                    <span className="truncate">{kw}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-align-left text-red-500"></i> SEO Friendly Description
                </h4>
                <button 
                  onClick={() => copyToClipboard(result.description, 'description')}
                  className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  {copiedSection === 'description' ? <><i className="fa-solid fa-check"></i> Copied</> : <><i className="fa-solid fa-copy"></i> Copy</>}
                </button>
              </div>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                {result.description}
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-tags text-red-500"></i> Best Tags (#Tags)
                </h4>
                <button 
                  onClick={() => copyToClipboard(result.tags.join(', '), 'tags')}
                  className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  {copiedSection === 'tags' ? <><i className="fa-solid fa-check"></i> Copied</> : <><i className="fa-solid fa-copy"></i> Copy Tags</>}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs border border-slate-700 hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-default">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          result.analytics && <SearchAnalytics data={result.analytics} />
        )}

        {/* Strategy Insight */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <div>
            <h5 className="text-sm font-bold text-blue-400 mb-1">SEO Strategy Insight</h5>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              {result.strategy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOResultDisplay;
