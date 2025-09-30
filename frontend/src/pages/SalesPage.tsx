import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { salesAPI, productsAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ notes: '' });
  const [items, setItems] = useState<any[]>([{ productId: '', kilos: '', unitPrice: '' }]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [salesRes, productsRes] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
      ]);
      setSales(salesRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { productId: '', kilos: '', unitPrice: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const kilos = parseFloat(item.kilos) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (kilos * price);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validItems = items.filter(item => item.productId && item.kilos && item.unitPrice);
    
    if (validItems.length === 0) {
      toast.error('Agrega al menos un producto');
      return;
    }

    try {
      const saleData = {
        items: validItems.map(item => ({
          productId: parseInt(item.productId),
          kilos: parseFloat(item.kilos),
          unitPrice: parseFloat(item.unitPrice),
        })),
        notes: formData.notes,
      };

      await salesAPI.create(saleData);
      toast.success('Venta registrada exitosamente');
      setShowModal(false);
      setFormData({ notes: '' });
      setItems([{ productId: '', kilos: '', unitPrice: '' }]);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrar venta');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
          <p className="text-gray-600 mt-1">Registro de ventas realizadas</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Venta
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Notas</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">#{sale.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    ${parseFloat(sale.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(sale.date), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{sale.items.length} productos</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{sale.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Nueva Venta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Productos *</label>
                  <button type="button" onClick={addItem} className="text-primary-600 text-sm hover:text-primary-700">
                    + Agregar Producto
                  </button>
                </div>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(index, 'productId', e.target.value)}
                        className="input flex-1"
                        required
                      >
                        <option value="">Selecciona producto</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Stock: {parseFloat(p.stockKilos).toFixed(2)} kg)
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.001"
                        placeholder="Kilos"
                        value={item.kilos}
                        onChange={(e) => updateItem(index, 'kilos', e.target.value)}
                        className="input w-24"
                        required
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Precio"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                        className="input w-28"
                        required
                      />
                      {items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-700 p-2">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input"
                  rows={2}
                  placeholder="Información adicional..."
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-semibold text-green-700">
                  <span>Total Venta:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">Registrar Venta</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesPage;
