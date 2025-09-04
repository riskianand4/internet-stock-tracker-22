import { useHybridData } from '@/hooks/useHybridData';
import { HISTORICAL_DATA, CATEGORY_TRENDS, PRODUCT_VELOCITY, STOCK_ALERTS, getDataForPeriod } from '@/data/mockHistoricalData';
import { DUMMY_PRODUCTS } from '@/data/dummyProducts';
import type { AnalyticsOverview, TrendData, CategoryData, VelocityData, SmartInsight, StockAlert } from '@/types/analytics';

// Hook for analytics overview/KPI data
export function useAnalyticsOverview(timeFilter: string = 'month'): ReturnType<typeof useHybridData<AnalyticsOverview>> {
  const days = timeFilter === 'week' ? 7 : 
               timeFilter === 'month' ? 30 :
               timeFilter === 'quarter' ? 90 :
               timeFilter === 'year' ? 365 : 30;

  return useHybridData<AnalyticsOverview>({
    localData: {
      totalProducts: DUMMY_PRODUCTS.length,
      totalValue: DUMMY_PRODUCTS.reduce((sum, p) => sum + p.price * p.stock, 0),
      lowStockCount: DUMMY_PRODUCTS.filter(p => p.status === 'low_stock').length,
      outOfStockCount: DUMMY_PRODUCTS.filter(p => p.status === 'out_of_stock').length,
      stockMovements: 120,
      avgDailyMovements: 15,
      turnoverRate: 45,
      stockHealth: 85
    },
    localFunction: () => {
      const currentData = getDataForPeriod(HISTORICAL_DATA, days);
      const previousData = getDataForPeriod(HISTORICAL_DATA, days * 2).slice(0, days);
      
      const current = currentData[currentData.length - 1] || HISTORICAL_DATA[HISTORICAL_DATA.length - 1];
      const previous = previousData[previousData.length - 1] || HISTORICAL_DATA[0];
      
      const avgCurrentValue = currentData.reduce((sum, d) => sum + d.totalValue, 0) / currentData.length;
      const avgPreviousValue = previousData.reduce((sum, d) => sum + d.totalValue, 0) / previousData.length;
      
      const totalStockMovements = currentData.reduce((sum, d) => sum + d.stockMovements, 0);
      const avgStockMovements = totalStockMovements / currentData.length;
      
      return {
        totalProducts: current.totalProducts,
        totalValue: avgCurrentValue,
        totalValueGrowth: ((avgCurrentValue - avgPreviousValue) / avgPreviousValue) * 100,
        lowStockCount: current.lowStockCount,
        outOfStockCount: current.outOfStockCount,
        stockMovements: totalStockMovements,
        avgDailyMovements: avgStockMovements,
        turnoverRate: (avgStockMovements / current.totalProducts) * 100,
        stockHealth: Math.max(0, 100 - (current.lowStockCount * 10) - (current.outOfStockCount * 20))
      };
    },
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getAnalyticsOverview();
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}

// Hook for trend analysis data
export function useAnalyticsTrends(timeFilter: string = 'month'): ReturnType<typeof useHybridData<TrendData[]>> {
  const days = timeFilter === 'week' ? 7 : 
               timeFilter === 'month' ? 30 :
               timeFilter === 'quarter' ? 90 :
               timeFilter === 'year' ? 365 : 30;

  return useHybridData<TrendData[]>({
    localData: getDataForPeriod(HISTORICAL_DATA, days),
    localFunction: () => getDataForPeriod(HISTORICAL_DATA, days),
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getAnalyticsTrends({ timeFilter, days });
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}

// Hook for category analysis data
export function useCategoryAnalysis(): ReturnType<typeof useHybridData<CategoryData[]>> {
  return useHybridData<CategoryData[]>({
    localData: CATEGORY_TRENDS,
    localFunction: () => CATEGORY_TRENDS,
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getCategoryAnalysis();
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}

// Hook for stock velocity data
export function useStockVelocity(): ReturnType<typeof useHybridData<VelocityData[]>> {
  return useHybridData<VelocityData[]>({
    localData: PRODUCT_VELOCITY,
    localFunction: () => PRODUCT_VELOCITY,
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getStockVelocity();
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}

// Hook for stock alerts data
export function useStockAlerts(): ReturnType<typeof useHybridData<StockAlert[]>> {
  return useHybridData<StockAlert[]>({
    localData: STOCK_ALERTS,
    localFunction: () => STOCK_ALERTS,
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getStockAlerts();
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}

// Hook for smart insights data
export function useSmartInsights(timeFilter: string = 'month'): ReturnType<typeof useHybridData<SmartInsight[]>> {
  return useHybridData<SmartInsight[]>({
    localData: [],
    localFunction: () => {
      // Generate insights from local data
      const lowStockProducts = DUMMY_PRODUCTS.filter(p => p.status === 'low_stock');
      const fastMovingProducts = PRODUCT_VELOCITY.filter(p => p.turnoverRate > 40);
      const slowMovingProducts = PRODUCT_VELOCITY.filter(p => p.turnoverRate < 10);
      
      return [
        {
          id: 1,
          type: 'opportunity',
          title: 'Peluang Optimisasi Stok',
          message: `${slowMovingProducts.length} produk memiliki turnover rate rendah.`,
          impact: 'high',
          timeframe: '1-2 minggu',
          actionable: true
        },
        {
          id: 2,
          type: 'alert',
          title: 'Prediksi Stok Habis',
          message: `${PRODUCT_VELOCITY.filter(p => p.daysUntilOutOfStock < 7).length} produk diprediksi akan habis dalam 7 hari.`,
          impact: 'critical',
          timeframe: '3-7 hari',
          actionable: true
        }
      ];
    },
    apiFunction: async () => {
      const { getApiService } = await import('@/services/inventoryApi');
      const service = getApiService();
      if (service) {
        return service.getSmartInsights({ timeFilter });
      }
      throw new Error('API service not available');
    },
    autoRefresh: true,
  });
}