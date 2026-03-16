
export interface TrendingItem {
  id: string;
  title: string;
  description: string;
  rank: number;
  category: 'Movie' | 'Serial' | 'Entertainment';
}

export interface SearchHistoryPoint {
  label: string;
  value: number;
}

export interface KeywordVolume {
  keyword: string;
  percentage: number;
}

export interface AnalyticsData {
  todayTotal: string;
  last24h: string;
  last48h: string;
  last7d: string;
  last30d: string;
  last1y: string;
  chartData: SearchHistoryPoint[];
  topKeywords: KeywordVolume[];
}

export interface SEOResult {
  title: string;
  description: string;
  tags: string[];
  keywords: string[];
  strategy: string;
  analytics?: AnalyticsData;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}
