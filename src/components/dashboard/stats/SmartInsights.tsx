import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useHybridProducts } from '@/hooks/useHybridData';
import { PRODUCT_VELOCITY, STOCK_ALERTS, formatCurrency, formatNumber } from '@/data/mockHistoricalData';
import { TimeFilter } from '../AdvancedStatsOverview';
interface SmartInsightsProps {
  timeFilter: TimeFilter;
}
const SmartInsights = ({
  timeFilter
}: SmartInsightsProps) => {
  const { data: products, isLoading, isFromApi } = useHybridProducts();
  
  const insights = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Generate smart insights based on data analysis
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStockProducts = products.filter(p => p.status === 'low_stock');
    const fastMovingProducts = PRODUCT_VELOCITY.filter(p => p.turnoverRate > 40);
    const slowMovingProducts = PRODUCT_VELOCITY.filter(p => p.turnoverRate < 10);
    const criticalAlerts = STOCK_ALERTS.filter(a => a.type === 'critical');
    return [{
      id: 1,
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Peluang Optimisasi Stok',
      message: `${slowMovingProducts.length} produk memiliki turnover rate rendah. Pertimbangkan untuk mengurangi stok atau promosi khusus.`,
      impact: 'high',
      timeframe: '1-2 minggu',
        actionable: true,
        data: {
          products: slowMovingProducts.slice(0, 3).map(p => p.productName),
          potentialSavings: slowMovingProducts.reduce((sum, p) => {
            const product = products.find(dp => dp.id === p.productId);
            return sum + (product ? product.price * product.stock * 0.1 : 0);
          }, 0)
        }
    }, {
      id: 2,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Prediksi Stok Habis',
      message: `${PRODUCT_VELOCITY.filter(p => p.daysUntilOutOfStock < 7).length} produk diprediksi akan habis dalam 7 hari berdasarkan pola konsumsi.`,
      impact: 'critical',
      timeframe: '3-7 hari',
      actionable: true,
      data: {
        products: PRODUCT_VELOCITY.filter(p => p.daysUntilOutOfStock < 7).slice(0, 3).map(p => p.productName),
        urgency: 'immediate'
      }
    }, {
      id: 3,
      type: 'insight',
      icon: Brain,
      title: 'Analisis Pola Seasonal',
      message: `Network Equipment menunjukkan peningkatan aktivitas 30% dibanding periode sebelumnya. Antisipasi permintaan tinggi.`,
      impact: 'medium',
      timeframe: '2-4 minggu',
      actionable: true,
      data: {
        category: 'Network Equipment',
        growthRate: 30,
        recommendation: 'Increase stock by 25%'
      }
    }, {
      id: 4,
      type: 'performance',
      icon: Target,
      title: 'Efisiensi Inventory',
      message: `Tingkat turnover inventory saat ini ${(fastMovingProducts.length / products.length * 100).toFixed(1)}%. Target optimal adalah 60%.`,
      impact: 'medium',
      timeframe: 'Ongoing',
      actionable: true,
      data: {
        currentRate: fastMovingProducts.length / products.length * 100,
        targetRate: 60,
        gap: 60 - fastMovingProducts.length / products.length * 100
      }
    }, {
      id: 5,
      type: 'recommendation',
      icon: Lightbulb,
      title: 'Rekomendasi Pembelian',
      message: `Berdasarkan analisis velocity, disarankan untuk melakukan reorder untuk ${PRODUCT_VELOCITY.filter(p => p.reorderRecommended).length} produk.`,
      impact: 'high',
      timeframe: 'Segera',
      actionable: true,
      data: {
        reorderCount: PRODUCT_VELOCITY.filter(p => p.reorderRecommended).length,
        estimatedCost: PRODUCT_VELOCITY.filter(p => p.reorderRecommended).reduce((sum, p) => {
          const product = products.find(dp => dp.id === p.productId);
          return sum + (product ? product.price * product.minStock : 0);
        }, 0)
      }
    }, {
      id: 6,
      type: 'trend',
      icon: Clock,
      title: 'Tren Temporal',
      message: `Pola aktivitas menunjukkan puncak pergerakan stok pada hari Selasa-Kamis. Optimalkan jadwal pengiriman.`,
      impact: 'low',
      timeframe: 'Ongoing',
      actionable: false,
      data: {
        peakDays: ['Selasa', 'Rabu', 'Kamis'],
        improvement: '15% efficiency gain'
      }
    }];
  }, [products, timeFilter]);
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'outline';
      default:
        return 'secondary';
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return TrendingUp;
      case 'alert':
        return AlertTriangle;
      case 'insight':
        return Brain;
      case 'performance':
        return Target;
      case 'recommendation':
        return Lightbulb;
      default:
        return Clock;
    }
  };

  if (isLoading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Smart Insights
          {isFromApi && (
            <Badge variant="secondary" className="text-xs bg-success/20 text-success ml-auto">
              AI-Powered
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = getTypeIcon(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getImpactColor(insight.impact)} className="text-xs">
                          {insight.impact}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.timeframe}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                    {insight.actionable && (
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="text-xs">
                          Take Action
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartInsights;