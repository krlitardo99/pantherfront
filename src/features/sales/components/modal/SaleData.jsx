import { Table, Badge, Button, Card, Form } from "react-bootstrap";

import ProductSearchModal from "./ProductSearchModal";

import { useState, useEffect } from "react";

import EditDetailSale from "./EditDetailSale";

const SaleData = ({ saleSelected, onEditSale, onDeleteDetail }) => {
  const [showProductModal, setShowProductModal] = useState(false);

  const [productText, setProductText] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [newProducts, setNewProducts] = useState([]);

  const [total, setTotal] = useState(Number(saleSelected.total));

  const [showEditModal, setShowEditModal] = useState(false);

  const [detailSelected, setDetailSelected] = useState(null);

  const [detailsData, setDetailsData] = useState([]);

  const openEditModal = (detail) => {
    setDetailSelected(detail);

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const sendEditedData = (data) => {
    setDetailsData((prev) =>
      prev.map((detail) => {
        const sameItem =
  detail.id
    ? detail.id === data.id
    : detail.tempId === data.tempId;

        if (sameItem) {
          const subtotal =
            Number(data.quantity) * Number(data.product_data.original_price);

          return {
            ...detail,

            product: data.product_data.id,

            product_data: data.product_data,

            quantity: Number(data.quantity),

            subtotal: subtotal,
          };
        }

        return detail;
      }),
    );

    closeEditModal();
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);

    setProductText(`${product.name} - $${product.original_price}`);

    setShowProductModal(false);
  };

  const onDeleteNewProduct = (detailToDelete) => {
    const confirmDelete = window.confirm(
      `¿Eliminar ${detailToDelete.product_data?.name}?`,
    );

    if (!confirmDelete) return;

    setNewProducts((prev) =>
      prev.filter((detail) => detail !== detailToDelete),
    );

    setTotal((prev) => Number(prev) - Number(detailToDelete.subtotal));
  };
  const handleSaveChanges = () => {
    const data = {
      total: total,
      client: saleSelected.client,

      city: saleSelected.city,

      new_products: newProducts.map((detail) => ({
        product: detail.product_data.id,

        quantity: Number(detail.quantity),

        unit_price: Number(detail.unit_price),

        tax: Number(detail.tax),
      })),
    };

    console.log("DATOS A ENVIAR", saleSelected.id, data);

    onEditSale(saleSelected.id, data);
  };

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (saleSelected?.sales_detail) {
      setDetailsData(saleSelected.sales_detail);
    }
  }, [saleSelected]);

  // const handleAddProduct = () => {
  //   if (!selectedProduct) return;

  //   const subtotal = Number(selectedProduct.original_price) * Number(quantity);

  //   const newDetail = {
  //     product_data: selectedProduct,

  //     quantity,

  //     subtotal: subtotal,

  //     tax: 0,

  //     isNew: true,
  //   };

  //   setNewProducts((prev) => [...prev, newDetail]);

  //   setTotal((prev) => Number(prev) + subtotal);

  //   setSelectedProduct(null);

  //   setQuantity(1);
  // };

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const subtotal = Number(selectedProduct.original_price) * Number(quantity);

 const newDetail = {
  tempId: Date.now(),

  product_data: selectedProduct,

  product: selectedProduct.id,

  quantity: Number(quantity),

  subtotal: subtotal,

  tax: 0,

  isNew: true,
};

    setDetailsData((prev) => [...prev, newDetail]);

    setTotal((prev) => Number(prev) + subtotal);

    setSelectedProduct(null);

    setQuantity(1);
  };

  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* HEADER */}

          <div className="row">
            <div className="col">
              <h3 className="fw-bold mb-1">
                Venta #{saleSelected.number_invoice}
              </h3>

              <hr></hr>

              <p className="mb-2">
                <strong>Cliente:</strong> {saleSelected.client_data?.first_name}{" "}
                {saleSelected.client_data?.last_name}
              </p>

              <p className="mb-0">
                <strong>Ciudad:</strong> {saleSelected.city_data?.name}
              </p>
            </div>

            <div className="col-2">
              <Button onClick={() => setShowProductModal(true)}>
                Agregar item
              </Button>
            </div>
          </div>
          <hr />
          {/* TOTAL */}

          <div className="py-1 mt-4 row text-end">
            <h2>Total: ${total}</h2>
          </div>

          {/* PRODUCTO SELECCIONADO */}

          {selectedProduct && (
            <Card className="p-3 mt-3">
              <div className="row align-items-end">
                <div className="col">
                  <Form.Group>
                    <Form.Label>Producto</Form.Label>

                    <Form.Control value={selectedProduct.name} disabled />
                  </Form.Group>
                </div>

                <div className="col">
                  <Form.Group>
                    <Form.Label>Precio</Form.Label>

                    <Form.Control
                      value={selectedProduct.original_price}
                      disabled
                    />
                  </Form.Group>
                </div>

                <div className="col">
                  <Form.Group>
                    <Form.Label>Cantidad</Form.Label>

                    <Form.Control
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="col-auto">
                  <Button variant="success" onClick={handleAddProduct}>
                    Agregar
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* TABLA */}

          <div className="table-responsive mt-4">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>

                  <th>Cantidad</th>

                  <th>Precio Unitario</th>

                  <th>Impuesto</th>

                  <th>Subtotal</th>

                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* PRODUCTOS EXISTENTES */}

                {detailsData.map((detail, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">
                      {detail.isNew && (
                        <Badge className="mx-1" bg="info">
                          Nuevo
                        </Badge>
                      )}
                      {detail.product_data?.name}
                    </td>

                    <td>
                      <Badge bg="secondary">{detail.quantity}</Badge>
                    </td>

                    <td>${detail.product_data?.original_price}</td>

                    <td>${detail.tax}</td>

                    <td>${detail.subtotal}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => openEditModal(detail)}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteDetail(detail)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* NUEVOS PRODUCTOS

                {newProducts.map((detail, index) => (
                  <tr key={`new-${index}`}>
                    <td className="fw-semibold">
                      {detail.product_data?.name}

                      <Badge className="mx-1" bg="info">
                        Nuevo
                      </Badge>
                    </td>

                    <td>
                      <Badge bg="success">{detail.quantity}</Badge>
                    </td>

                    <td>${detail.product_data?.original_price}</td>

                    <td>${detail.tax}</td>

                    <td>${detail.subtotal}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => openEditModal(detail)}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteNewProduct(detail)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        <Card.Footer className="text-center mb-4">
          <Button
            onClick={() => handleSaveChanges()}
            className="mt-4"
            size="md"
            variant="warning"
          >
            Guardar cambios
          </Button>
        </Card.Footer>
      </Card>

      {/* MODAL BUSCADOR */}

      <ProductSearchModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        onSelectProduct={handleSelectProduct}
      />

      <EditDetailSale
        show={showEditModal}
        onHide={closeEditModal}
        detailSelected={detailSelected}
        sendEditedData={sendEditedData}
      />
    </>
  );
};

export default SaleData;
