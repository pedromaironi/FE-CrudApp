import "./dashboard.scss";
import Sidebar from "../../components/sidebar";
import React, { useState, useEffect, useReducer } from "react";
import ProductForm from "../../components/Product/ProductForm";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "../../actions/product.actions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.ProductsReducer
  ); // Asegúrate de que el nombre del estado coincida

  const [currentProduct, setCurrentProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(""); // Añade tu lógica para obtener el token

  useEffect(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlZHJvbWFpcm9uaSIsInN1YiI6IjY2NjdjN2U2Yjc1MTY5MWE1ODY5ODAzYyIsImlhdCI6MTcxODI1MzI4NSwiZXhwIjoxNzE4NTEyNDg1fQ._U6LpFjU7ld7IfiDij_FdD5eYxNgJdF-DcHoWSeeQR4"
    );
    if (token) {
      fetchProducts(dispatch, token);
    }
  }, [token, dispatch]);

  const handleAddProduct = (product) => {
    addProduct(dispatch, product, token);
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    console.log(product)
    editProduct(dispatch, product, token);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(dispatch, productId, token);
  };

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Manejo de Productos
        </h1>

        <div className="mb-4 text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleOpenModal()}
          >
            Agregar Producto
          </button>
        </div>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

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
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-2 text-center">{product._id}</td>
                <td className="py-2 text-center">{product.name}</td>
                <td className="py-2 text-center">{product.category}</td>
                <td className="py-2 text-center">{product.price}</td>
                <td className="py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                    onClick={() => handleOpenModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDeleteProduct(product._id)}
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
