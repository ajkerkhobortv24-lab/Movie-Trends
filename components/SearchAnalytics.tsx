
import React from 'react';
import { AnalyticsData } from '../types';

interface SearchAnalyticsProps {
  data: AnalyticsData;
}

const SearchAnalytics: React.FC<SearchAnalyticsProps> = ({ data }) => {
  const maxVal = Math.max(...data.chartData.map(d => d.value), 1);
  
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Today', val: data.todayTotal, icon: 'fa-calendar-day', color: 'text-red-500' },
          { label: 'Last 24h', val: data.last24h, icon: 'fa-clock', color: 'text-orange-500' },
          { label: 'Last 48h', val: data.last48h, icon: 'fa-history', color: 'text-amber-500' },
          { label: 'Last 7 Days', val: data.last7d, icon: 'fa-calendar-week', color: 'text-green-500' },
          { label: 'Last 30 Days', val: data.last30d, icon: 'fa-calendar-alt', color: 'text-blue-500' },
          { label: 'Total 1 Year', val: data.last1y, icon: 'fa-globe', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-colors">
            <i className={`fa-solid ${stat.icon} ${stat.color} mb-2 text-sm`}></i>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{stat.label}</span>
            <span className="text-lg font-black text-white">{stat.val}</span>
          </div>
        ))}
      </div>

      {/* Visual Graph */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h5 className="text-xs font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
          <i className="fa-solid fa-chart-area text-blue-500"></i> Search Popularity Trend (Last 30 Days)
        </h5>
        <div className="h-40 flex items-end gap-2 px-2">
          {data.chartData.map((point, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div 
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 group-hover:from-red-600 group-hover:to-red-400"
                style={{ height: `${(point.value / maxVal) * 100}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-950 text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {point.value.toLocaleString()} searches
                </div>
              </div>
              <span className="text-[8px] text-slate-600 font-bold uppercase rotate-45 mt-2 origin-left truncate w-8">{point.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword Distribution */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h5 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
          <i className="fa-solid fa-pie-chart text-purple-500"></i> Keyword Volume Distribution
        </h5>
        <div className="space-y-4">
          {data.topKeywords.map((kw, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-slate-300">{kw.keyword}</span>
                <span className="text-slate-500">{kw.percentage}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${kw.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAnalytics;
