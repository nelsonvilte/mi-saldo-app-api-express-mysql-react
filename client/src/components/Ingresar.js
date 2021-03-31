import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import Axios from "axios";

const Ingresar = ({ nuevoMovimiento, estadoMovmiento }) => {
  const [tipo, setType] = useState(0);
  const [monto, setMonto] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  const [movimientoList, setMovimientoList] = useState([]);
  const [operaciones, setOperaciones] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [formEdit, setFormEdit] = useState({
    id: 0,
    descripcion: "",
    monto: 0,
    fecha: "",
  });

  const handleInputChange = (event) => {
    setFormEdit({
      ...formEdit,
      [event.target.name]: event.target.value,
    });
  };

  const abrirModalEditar = (registro) => {
    setModalEditar(true);
    setFormEdit(registro);
  };

  const cerrarModalEditar = () => {
    setModalEditar(false);
  };

  const updateRegistro = (id) => {
    Axios.put("http://localhost:3001/update", {
      descripcion: formEdit.descripcion,
      monto: formEdit.monto,
      fecha: formEdit.fecha,
      id: id,
    }).then((response) => {
      setMovimientoList(
        movimientoList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                descripcion: val.descripcion,
                monto: val.monto,
                fecha: val.fecha,
              }
            : val;
        })
      );
    });
    estadoMovmiento(true);
    cerrarModalEditar();
  };

  const addMovimiento = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/create", {
      tipo: tipo,
      monto: monto,
      descripcion: descripcion,
      fecha: fecha,
    }).then(() => {
      if (tipo !== " ") {
        tipo === 2 && setMonto(monto);
        nuevoMovimiento(monto);
        estadoMovmiento(true);
        setMovimientoList([
          ...movimientoList,
          {
            tipo: tipo,
            monto: monto,
            descripcion: descripcion,
            fecha: fecha,
          },
        ]);
      }
    });
  };

  const getOperaciones = () => {
    setIsCalling(true);

    Axios.get("http://localhost:3001/movimiento")
      .then((response) => {
        setOperaciones(response.data);
        setIsCalling(false);
      })
      .catch((error) => {
        console.log(error);
        setIsCalling(false);
      });
  };

  useEffect(() => {
    getOperaciones();
  }, [movimientoList]);

  const abrirModalDelete = (registro) => {
    setModalDelete(true);
    setFormEdit(registro);
  };

  const cerrarModalDelete = () => {
    setModalDelete(false);
  };

  const deleteRegistro = (id) => {
    let url = `http://localhost:3001/delete/${id}`;
    Axios.delete(url).then((response) => {
      setMovimientoList(
        movimientoList.filter((val) => {
          return val.id !== id;
        })
      );
    });
    estadoMovmiento(true);
    cerrarModalDelete();
  };

  if (isCalling) return <p>Cargando .....</p>;

  return (
    <div className="container-fluid">
      {" "}
      <form
        className="form-row justify-content-center needs-validation"
        onSubmit={(e) => addMovimiento(e)}
      >
        <div className="form-group mx-sm-3 mb-2">
          <div className="align-items-center">
            <select
              id="tipo"
              className="form-select form-control form-control-xs"
              aria-label="Default select example"
              required={true}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <option value="">tipo</option>
              <option value="1">+</option>
              <option value="2">-</option>
            </select>
          </div>
        </div>
        <div className="form-group row mx-sm-3 mb-2">
          <div className="col-xs-2">
            <label htmlFor="inputMonto" className="sr-only">
              Monto
            </label>
            <input
              id="inputMonto"
              type="number"
              className="form-control"
              required={true}
              placeholder="$"
              step="any"
              onChange={(event) => {
                setMonto(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputDescripcion" className="sr-only">
            Descripción egreso o ingreso
          </label>
          <input
            type="text"
            className="form-control"
            required={true}
            id="inputDescripcion"
            placeholder="Descripción"
            onChange={(event) => {
              setDescripcion(event.target.value);
            }}
          />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputDate" className="sr-only">
            Fecha{" "}
          </label>
          <input
            type="date"
            className="form-control"
            required={true}
            id="inputDate"
            min="2018-01-01"
            max="2030-12-31"
            onChange={(event) => {
              setFecha(event.target.value);
            }}
          />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <button type="submit" className="btn btn-success">
            {"Agregar"}
          </button>
        </div>
      </form>
      {/********* Listado de registros **********/}
      <div className="row ">
        <div className="col">
          <hr />

          <h3>Últimos movimientos</h3>

          <ul className="list-group ">
            {operaciones.map((val, key) => (
              <div
                className="row border-bottom align-items-center"
                key={val.id}
              >
                <div className="col-3">{val.descripcion}</div>
                <div className="col-3">
                  {val.tipo === "1" ? "+" : "-"}

                  {val.monto}
                </div>
                <div className="col-2"> {val.fecha}</div>
                <div className="col-4">
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={() => {
                        abrirModalEditar(val);
                      }}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => {
                        abrirModalDelete(val);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {/********* Fin Listado de registros **********/}
      {/********** Modal para editar registro *********/}
      <Modal isOpen={modalEditar} centered>
        <ModalHeader>
          <div>
            <h3>Actualizar registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nº de resgistro</label>

            <input
              className="form-control"
              name="id"
              readOnly
              type="text"
              value={formEdit.id}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descricpión</label>

            <input
              className="form-control"
              name="descripcion"
              type="text"
              value={formEdit.descripcion}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Monto</label>
            <input
              className="form-control"
              name="monto"
              type="text"
              value={formEdit.monto}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha</label>
            <div></div>
            <input
              className="form-control"
              type="text"
              readOnly
              value={formEdit.fecha}
            />
          </FormGroup>

          <FormGroup>
            <label>Nueva fecha</label>
            <input
              type="date"
              className="form-control"
              required={true}
              name="fecha"
              min="2018-01-01"
              max="2030-12-31"
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              updateRegistro(formEdit.id);
            }}
          >
            Actualizar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              cerrarModalEditar();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/********** Fin Modal editar **********/}
      {/********** Modal para confirmar eliminación de registro **********/}
      <Modal isOpen={modalDelete} centered>
        <ModalBody>Estás seguro que deseas eliminar el registro</ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteRegistro(formEdit.id);
            }}
          >
            Sí
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              cerrarModalDelete();
            }}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Ingresar;
