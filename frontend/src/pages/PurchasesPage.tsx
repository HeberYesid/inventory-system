import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { purchasesAPI, productsAPI, suppliersAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function PurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ supplierId: '', notes: '' });
  const [items, setItems] = useState<any[]>([{ productId: '', kilos: '', unitPrice: '' }]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [purchasesRes, productsRes, suppliersRes] = await Promise.all([
        purchasesAPI.getAll(),
        productsAPI.getAll(),
        suppliersAPI.getAll(),
      ]);
      setPurchases(purchasesRes.data);
      setProducts(productsRes.data);
      setSuppliers(suppliersRes.data);
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
      const purchaseData = {
        supplierId: parseInt(formData.supplierId),
        items: validItems.map(item => ({
          productId: parseInt(item.productId),
          kilos: parseFloat(item.kilos),
          unitPrice: parseFloat(item.unitPrice),
        })),
        notes: formData.notes,
      };

      await purchasesAPI.create(purchaseData);
      toast.success('Compra registrada exitosamente');
      setShowModal(false);
      setFormData({ supplierId: '', notes: '' });
      setItems([{ productId: '', kilos: '', unitPrice: '' }]);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrar compra');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compras</h1>
          <p className="text-gray-600 mt-1">Registro de compras a proveedores</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Compra
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">#{purchase.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{purchase.supplier.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${parseFloat(purchase.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(purchase.date), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{purchase.items.length} productos</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Nueva Compra</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor *</label>
                <select
                  required
                  value={formData.supplierId}
                  onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                  className="input"
                >
                  <option value="">Selecciona un proveedor</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

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
                        <option value="">Producto</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
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
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">Registrar Compra</button>
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

export default PurchasesPage;
