import { useEffect, useState } from 'react';
import { Package, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';
import { productsAPI, purchasesAPI, salesAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface Stats {
  totalProducts: number;
  totalStock: number;
  lowStockProducts: number;
  recentPurchases: number;
  recentSales: number;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    recentPurchases: 0,
    recentSales: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [productsRes, purchasesRes, salesRes] = await Promise.all([
        productsAPI.getAll(),
        purchasesAPI.getAll(),
        salesAPI.getAll(),
      ]);

      const productsList = productsRes.data;
      const totalStock = productsList.reduce(
        (sum: number, p: any) => sum + parseFloat(p.stockKilos),
        0
      );
      const lowStock = productsList.filter((p: any) => parseFloat(p.stockKilos) < 10);

      setStats({
        totalProducts: productsList.length,
        totalStock: Math.round(totalStock),
        lowStockProducts: lowStock.length,
        recentPurchases: purchasesRes.data.length,
        recentSales: salesRes.data.length,
      });

      setProducts(productsList.slice(0, 5));
    } catch (error) {
      toast.error('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Stock Total (kg)',
      value: stats.totalStock,
      icon: Package,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Stock Bajo',
      value: stats.lowStockProducts,
      icon: AlertCircle,
      color: 'bg-red-500',
      bgLight: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      name: 'Compras',
      value: stats.recentPurchases,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      name: 'Ventas',
      value: stats.recentSales,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Resumen general del sistema de inventario
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgLight} p-3 rounded-lg`}>
                  <Icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Productos Recientes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock (kg)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {parseFloat(product.stockKilos).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        parseFloat(product.stockKilos) < 10
                          ? 'bg-red-100 text-red-800'
                          : parseFloat(product.stockKilos) < 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {parseFloat(product.stockKilos) < 10
                        ? 'Stock Bajo'
                        : parseFloat(product.stockKilos) < 50
                        ? 'Stock Medio'
                        : 'Stock Alto'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
