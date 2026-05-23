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

import { fetchSaleByIdAsync } from "../store/salesSlice";

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

  const handleSave = () => {
    console.log({
      selectedClient,
      selectedProduct,
    });

    onHide();
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

        {/* ========================= */}
        {/* ERROR */}
        {/* ========================= */}

        {error && <Alert variant="danger">Error al cargar venta</Alert>}

        {/* ========================= */}
        {/* SALE DETAIL */}
        {/* ========================= */}

        {saleSelected && idSelected && !loading && (
          <SaleData saleSelected={saleSelected} />
        )}

        {!idSelected && <NewSaleForm />}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>

        {!idSelected && (
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SaleModal;
