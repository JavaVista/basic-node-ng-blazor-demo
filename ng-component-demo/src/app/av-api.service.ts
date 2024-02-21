import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AvApiService {
  private avKey = environment.AV_KEY;

  constructor() { }

  async fetchStockData(symbol: string): Promise<any> {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.avKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Information && data.Information.includes('Thank you for using Alpha Vantage!')) {
        throw new Error('API rate limit exceeded');
      }

      if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
        throw new Error('Invalid symbol or no price data available');
      }

      return { price: +data['Global Quote']['05. price'] };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }

  async searchStocksData(keyword: string): Promise<any> {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${this.avKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Information && data.Information.includes('Thank you for using Alpha Vantage!')) {
        throw new Error('API rate limit exceeded');
      }

      if (!data['bestMatches']) {
        throw new Error('No matches found');
      }

      return data['bestMatches'].map((match: { [x: string]: any; }) => ({
        symbol: match['1. symbol'],
        name: match['2. name']
      }));
    } catch (error) {
      console.error('Error searching stock symbols:', error);
      throw error;
    }
  }
}
