import './dashboard.scss';
import Sidebar from "../../components/sidebar"
import React, { useState } from 'react';
import ProductForm from '../../components/Product/ProductForm';
 
const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleAddProduct = (product) => {
      setProducts([...products, { ...product, productId: Date.now() }]);
      setIsModalOpen(false);
    };
  
    const handleEditProduct = (product) => {
      setProducts(products.map(p => (p.productId === product.productId ? product : p)));
      setIsModalOpen(false);
    };
  
    const handleDeleteProduct = (productId) => {
      setProducts(products.filter(p => p.productId !== productId));
    };
  
    const handleOpenModal = (product = null) => {
      setCurrentProduct(product);
      setIsModalOpen(true);
    };
  
    return (
      <div className="bg-gray-100 p-8 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Gestión de Productos</h1>
  
          <div className="mb-4 text-right">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleOpenModal()}
            >
              Agregar Producto
            </button>
          </div>
  
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Product ID</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Categoría</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.productId}>
                  <td className="py-2">{product.productId}</td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.category}</td>
                  <td className="py-2">{product.price}</td>
                  <td className="py-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                      onClick={() => handleOpenModal(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDeleteProduct(product.productId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {isModalOpen && (
          <ProductForm
            product={currentProduct}
            onSave={currentProduct ? handleEditProduct : handleAddProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    );
  };

export default Dashboard;
