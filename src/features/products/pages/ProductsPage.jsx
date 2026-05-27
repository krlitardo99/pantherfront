import ProductsTable from "../components/ProductsTable";

import ProductModal from "../components/modal/ProductModal";

//import ProductsTable from "../components/ProductsTable";

//import ProductModal from "../components/ProductModal";

import { useState, useEffect } from "react";

import { Spinner, Alert, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductsAsync,
  deleteProductAsync,
  createProductAsync,
} from "../store/productsSlice";

import SearchBar from "../../../components/common/SearchBar";

import NewProductModal from "../components/modal/NewProductModal";

//import filterProducts from "../utils/filterProducts";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);

  const [productSelected, setProductSelected] = useState(null);

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    handleSearch(searchText);
  }, [products, dateFrom, dateTo]);

  const handleSearch = (text) => {
    let filtered = [...products];

    if (text.trim()) {
      filtered = filtered.filter((product) => {
        return (
          product.name?.toLowerCase().includes(text.toLowerCase()) ||
          product.description?.toLowerCase().includes(text.toLowerCase()) ||
          product.barcode?.toLowerCase().includes(text.toLowerCase()) ||
          String(product.stock).includes(text) ||
          String(product.original_price).includes(text)
        );
      });
    }

    setFilteredProducts(filtered);
  };

 

  const showProductDetail = (product) => {
    setProductSelected(product);
    setShowProductModal(true);
    console.log("Data recibida del hijo:", product.id);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar esta venta?");

    if (!confirmDelete) return;

    const response = await dispatch(deleteProductAsync(id));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Venta eliminada");
    } else {
      alert("Error eliminando");
    }
  };

  const createProduct = async (data) => {
    const response = await dispatch(createProductAsync(data));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Producto creado");

      setShowProductModal(false);
    } else {
      alert("Error creando producto");
    }
  };

  const showNewProductModal = () => {
    setProductSelected(null);

    setShowProductModal(true);
  };

  const closeModal = () => {
    setShowProductModal(false);
  };
  const cleanIdModal = () => {
    setIdProductSelected(null);
  };
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error cargando ventas</Alert>;
  }

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-10">
          <h2>Productos</h2>
        </div>

        <div className="col-2 text-end">
          <Button onClick={showNewProductModal}>Nuevo producto</Button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-4">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearch}
            placeholder="Buscar ventas..."
          />
        </div>

        <div className="col-2">
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => {
              setDateFrom("");

              setDateTo("");

              setSearchText("");

              setFilteredProducts(products);
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>

      <ProductsTable
        products={filteredProducts}
        onViewProduct={showProductDetail}
        onDeleteProduct={deleteProduct}
      />

      {
  productSelected ? (

    <ProductModal
      show={showProductModal}
      onHide={closeModal}
      productSelected={productSelected}
    />

  ) : (

    <NewProductModal
      show={showProductModal}
      onHide={closeModal}
      onSave={createProduct}
    />

  )
}
    </div>
  );
};

export default ProductsPage;
