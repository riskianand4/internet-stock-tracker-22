interface ApiConfig {
  baseURL: string;
  apiKey: string;
  enabled: boolean;
}

export class InventoryApiService {
  private config: ApiConfig | null = null;

  constructor(config?: ApiConfig) {
    if (config) {
      this.config = config;
    }
  }

  setConfig(config: ApiConfig) {
    this.config = config;
  }

  getConfig(): ApiConfig | null {
    return this.config;
  }

  // Generic request method for custom endpoints
  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.config || !this.config.enabled) {
      throw new Error('API not configured or disabled');
    }

    const url = `${this.config.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.config.apiKey,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }

  // Products
  async getProducts(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/products${queryString}`);
  }

  // Stock Movements
  async getStockMovements(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/stock/movements${queryString}`);
  }

  // Create product
  async createProduct(productData: any): Promise<any> {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  // Update product
  async updateProduct(id: string, productData: any): Promise<any> {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  // Delete product
  async deleteProduct(id: string): Promise<any> {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE'
    });
  }

  // Get product stock alerts  
  async getProductStockAlerts(): Promise<any> {
    return this.request('/api/products/alerts/low-stock');
  }

  // Analytics
  async getAnalyticsOverview(): Promise<any> {
    return this.request('/api/analytics/overview');
  }

  // Convenience method for getting inventory stats
  async getInventoryStats(): Promise<any> {
    const overview = await this.getAnalyticsOverview();
    if (overview.success) {
      const data = overview.data;
      return {
        success: true,
        data: {
          totalProducts: data.products?.total || 0,
          totalValue: data.stock?.totalValue || 0,
          lowStockCount: data.products?.lowStock || 0,
          outOfStockCount: 0,
          topProducts: [],
        }
      };
    }
    return overview;
  }

  // Analytics endpoints
  async getAnalyticsTrends(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/analytics/trends${queryString}`);
  }

  async getCategoryAnalysis(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/analytics/category-analysis${queryString}`);
  }

  async getStockVelocity(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/analytics/stock-velocity${queryString}`);
  }

  async getStockAlerts(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/analytics/alerts${queryString}`);
  }

  async getSmartInsights(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/api/analytics/insights${queryString}`);
  }

  // AI Chat endpoints
  async sendAIMessage(message: string, context?: any): Promise<any> {
    return this.request('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });
  }

  async getAISuggestions(): Promise<any> {
    return this.request('/api/ai/suggestions');
  }
}

// Global instance management
let globalApiService: InventoryApiService | null = null;

export const initializeApiService = (config: ApiConfig): InventoryApiService => {
  globalApiService = new InventoryApiService(config);
  return globalApiService;
};

export const getApiService = (): InventoryApiService | null => {
  return globalApiService;
};

export default InventoryApiService;