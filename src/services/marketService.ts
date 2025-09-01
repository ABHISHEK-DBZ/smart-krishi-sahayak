import axios from 'axios';

export interface MarketPrice {
  commodity: string;
  variety: string;
  market: string;
  state: string;
  district: string;
  price: {
    min: number;
    max: number;
    modal: number;
  };
  unit: string;
  arrivalDate: string;
  lastUpdated: string;
  trend?: {
    change: number;
    duration: 'day' | 'week' | 'month';
  };
}

interface Market {
  id: string;
  name: string;
  state: string;
  district: string;
  type: string;
}

export interface CommodityTrend {
  commodity: string;
  dates: string[];
  prices: number[];
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
}

class MarketService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private cachedPrices: Map<string, { data: MarketPrice[]; timestamp: number }>;
  private readonly cacheExpiry = 3600000; // 1 hour

  constructor() {
    this.apiKey = import.meta.env.VITE_AGMARKET_API_KEY || '';
    this.apiUrl = 'https://api.agmarket.gov.in/v1';
    this.cachedPrices = new Map();
  }

  private getCacheKey(params: { commodity?: string; state?: string; market?: string }): string {
    return `${params.commodity || ''}-${params.state || ''}-${params.market || ''}`;
  }

  async getMarkets(): Promise<Market[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/markets?apikey=${this.apiKey}`);
      return response.data.markets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }

  async getMarketsByState(state: string): Promise<Market[]> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/markets?state=${state}&apikey=${this.apiKey}`
      );
      return response.data.markets;
    } catch (error) {
      console.error('Error fetching markets by state:', error);
      return [];
    }
  }

  async getPrices(params: {
    commodity?: string;
    state?: string;
    market?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<MarketPrice[]> {
    const cacheKey = this.getCacheKey(params);
    const cachedData = this.cachedPrices.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiry) {
      return cachedData.data;
    }

    try {
      const queryParams = new URLSearchParams();
      if (params.commodity) queryParams.append('commodity', params.commodity);
      if (params.state) queryParams.append('state', params.state);
      if (params.market) queryParams.append('market', params.market);
      if (params.fromDate) queryParams.append('from_date', params.fromDate);
      if (params.toDate) queryParams.append('to_date', params.toDate);
      queryParams.append('apikey', this.apiKey);

      const response = await axios.get(`${this.apiUrl}/prices?${queryParams.toString()}`);
      const prices = response.data.prices;

      // Cache the data
      this.cachedPrices.set(cacheKey, {
        data: prices,
        timestamp: Date.now()
      });

      return prices;
    } catch (error) {
      console.error('Error fetching prices:', error);
      return [];
    }
  }

  async getCommodityTrend(commodity: string, duration: 'week' | 'month' | 'year'): Promise<CommodityTrend | null> {
    try {
      const endDate = new Date();
      const startDate = new Date();

      switch (duration) {
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
      }

      const prices = await this.getPrices({
        commodity,
        fromDate: startDate.toISOString().split('T')[0],
        toDate: endDate.toISOString().split('T')[0]
      });

      if (prices.length < 2) return null;

      const trend: CommodityTrend = {
        commodity,
        dates: prices.map(p => p.arrivalDate),
        prices: prices.map(p => p.price.modal),
        trend: 'stable',
        percentageChange: 0
      };

      const firstPrice = prices[0].price.modal;
      const lastPrice = prices[prices.length - 1].price.modal;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;

      trend.percentageChange = parseFloat(change.toFixed(2));
      trend.trend = change > 1 ? 'up' : change < -1 ? 'down' : 'stable';

      return trend;
    } catch (error) {
      console.error('Error calculating commodity trend:', error);
      return null;
    }
  }

  async getPriceAlerts(commodities: string[]): Promise<string[]> {
    const alerts: string[] = [];

    try {
      const trends = await Promise.all(
        commodities.map(commodity => this.getCommodityTrend(commodity, 'week'))
      );

      trends.forEach(trend => {
        if (!trend) return;

        const { commodity, percentageChange, trend: direction } = trend;

        if (Math.abs(percentageChange) > 10) {
          alerts.push(
            `${commodity} prices have ${direction === 'up' ? 'increased' : 'decreased'} by ${Math.abs(
              percentageChange
            )}% in the last week.`
          );
        }
      });

      return alerts;
    } catch (error) {
      console.error('Error getting price alerts:', error);
      return [];
    }
  }

  async getTopMarkets(commodity: string): Promise<Market[]> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/topmarkets?commodity=${commodity}&apikey=${this.apiKey}`
      );
      return response.data.markets;
    } catch (error) {
      console.error('Error fetching top markets:', error);
      return [];
    }
  }

  async getBestPriceMarkets(commodity: string, userLocation?: { lat: number; lon: number }): Promise<MarketPrice[]> {
    try {
      const prices = await this.getPrices({ commodity });
      
      if (!userLocation) {
        // If no location provided, return top 5 markets by price
        return prices
          .sort((a, b) => b.price.modal - a.price.modal)
          .slice(0, 5);
      }

      // If location provided, sort by price and distance
      const pricesWithDistance = await Promise.all(
        prices.map(async price => {
          try {
            // Get market coordinates
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${price.market},${price.state},India&key=${import.meta.env.VITE_GEOCODING_API_KEY}`
            );

            if (response.data.results && response.data.results.length > 0) {
              const { lat, lng } = response.data.results[0].geometry;
              const distance = this.calculateDistance(
                userLocation.lat,
                userLocation.lon,
                lat,
                lng
              );
              return { ...price, distance };
            }
            return { ...price, distance: Infinity };
          } catch (error) {
            return { ...price, distance: Infinity };
          }
        })
      );

      // Sort by a combination of price and distance
      return pricesWithDistance
        .sort((a: any, b: any) => {
          const priceScore = b.price.modal - a.price.modal;
          const distanceScore = (a.distance - b.distance) * 100; // Weight distance less than price
          return priceScore + distanceScore;
        })
        .slice(0, 5);
    } catch (error) {
      console.error('Error finding best price markets:', error);
      return [];
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async getSeasonalPriceGuide(commodity: string): Promise<string[]> {
    try {
      // Get last year's price data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);

      const prices = await this.getPrices({
        commodity,
        fromDate: startDate.toISOString().split('T')[0],
        toDate: endDate.toISOString().split('T')[0]
      });

      if (prices.length === 0) return [];

      // Group prices by month
      const monthlyPrices: { [key: string]: number[] } = {};
      prices.forEach(price => {
        const month = new Date(price.arrivalDate).getMonth();
        if (!monthlyPrices[month]) monthlyPrices[month] = [];
        monthlyPrices[month].push(price.price.modal);
      });

      // Calculate average prices for each month
      const monthlyAverages = Object.entries(monthlyPrices).map(([month, prices]) => ({
        month: parseInt(month),
        average: prices.reduce((a, b) => a + b, 0) / prices.length
      }));

      // Sort months by average price
      monthlyAverages.sort((a, b) => b.average - a.average);

      // Generate insights
      const insights: string[] = [];
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      insights.push(`Best months to sell ${commodity} (highest prices):`);
      monthlyAverages.slice(0, 3).forEach(({ month, average }) => {
        insights.push(`${monthNames[month]}: ₹${average.toFixed(2)} per unit`);
      });

      insights.push(`\nMonths to avoid selling (lowest prices):`);
      monthlyAverages.slice(-2).forEach(({ month, average }) => {
        insights.push(`${monthNames[month]}: ₹${average.toFixed(2)} per unit`);
      });

      return insights;
    } catch (error) {
      console.error('Error generating seasonal price guide:', error);
      return [];
    }
  }
}

export default new MarketService();
