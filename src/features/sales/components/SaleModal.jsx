import { useState, useEffect } from "react";

import {
  Modal,
  Button,
  Form,
  ListGroup,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";

import NewSaleForm from "./modal/NewSaleForm";
import SaleData from "./modal/SaleData";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchSaleByIdAsync,
  fetchSalesAsync,
  createSaleAsync,
  updateSalesDetailAsync,
  deleteSalesDetailAsync,
  updateSaleAsync,
} from "../store/salesSlice";

const SaleModal = ({ show, onHide, idSelected = null, onClosedModal }) => {
  const dispatch = useDispatch();

  const { saleSelected, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    if (!idSelected) return;

    if (!saleSelected || saleSelected.id !== idSelected) {
      console.log("Cargando venta ID:", idSelected);
      dispatch(fetchSaleByIdAsync(idSelected));
    }
  }, [idSelected, saleSelected, dispatch]);

  useEffect(() => {
    if (saleSelected) {
      console.log("Datos de venta recibidos:", saleSelected, loading);
    }
    if (error) {
      console.error("Error al cargar:", error);
    }
  }, [saleSelected, error]);

  const handleSave = (saleData) => {
    console.log("GUARDANDO LA DATA...", saleData);
    dispatch(createSaleAsync(saleData));

    //onHide();
  };
  const handleEdit = async (idSale, data) => {
    const response = await dispatch(
      updateSaleAsync({
        id: idSale,

        data: data,
      }),
    );

    if (response.meta.requestStatus === "fulfilled") {
      alert("Venta actualizada");

      // RECARGAR TABLA
      dispatch(fetchSalesAsync());
    } else {
      alert("Error actualizando");
    }
  };

  const handleDelete = async (detail) => {
    const confirmDelete = window.confirm(
      `¿Eliminar ${detail.product_data?.name}?`,
    );

    if (!confirmDelete) return;

    const response = await dispatch(deleteSalesDetailAsync(detail.id));

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(fetchSaleByIdAsync(idSelected));
    } else {
      alert("Error eliminando");
    }
  };

  return (
    
      <Modal
        show={show}
        onHide={onHide}
        onExited={onClosedModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {idSelected ? "Detalle de Venta" : "Nueva Venta"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* ========================= */}
          {/* LOADING */}
          {/* ========================= */}

          {loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">Error al cargar venta</Alert>}

          {saleSelected && idSelected && !loading && (
            <SaleData
              saleSelected={saleSelected}
              onEditSale={handleEdit}
              onDeleteDetail={handleDelete}
            />
          )}

          {!idSelected && <NewSaleForm handleSave={handleSave} />}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
};

export default SaleModal;
