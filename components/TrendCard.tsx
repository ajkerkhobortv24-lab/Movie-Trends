
import React from 'react';
import { TrendingItem } from '../types';

interface TrendCardProps {
  item: TrendingItem;
  isActive: boolean;
  onClick: () => void;
}

const TrendCard: React.FC<TrendCardProps> = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative text-left w-full p-4 rounded-2xl border transition-all duration-300 ${
        isActive 
          ? 'bg-red-600 border-red-500 shadow-xl shadow-red-600/20 scale-[1.02]' 
          : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
      }`}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
          isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-red-500'
        }`}>
          #{item.rank}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              isActive ? 'bg-white/30 text-white' : 'bg-red-600/10 text-red-500'
            }`}>
              {item.category}
            </span>
            <span className={`text-[10px] ${isActive ? 'text-white/60' : 'text-slate-500'}`}>
              Trending Now
            </span>
          </div>
          <h3 className={`font-bold truncate text-base ${isActive ? 'text-white' : 'text-slate-100'}`}>
            {item.title}
          </h3>
          <p className={`text-xs line-clamp-1 mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
            {item.description}
          </p>
        </div>
        <div className={`flex-shrink-0 flex items-center ${isActive ? 'text-white' : 'text-slate-700'}`}>
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </div>
      </div>
    </button>
  );
};

export default TrendCard;
