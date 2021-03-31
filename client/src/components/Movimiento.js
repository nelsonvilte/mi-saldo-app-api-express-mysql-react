import React from "react";

const Movimiento = (props) => {
  return (
    <div className="container">
      <hr />
      <h3>Últimos movimientos</h3>
      <div className="row">
        <div className="col">Salario</div>
        <div className="col">+ 2.200</div>
        <div className="col">22/02/2018</div>
        <div className="col">
          <button type="submit" className="btn btn-primary">
            {"Editar"}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">Transporte</div>
        <div className="col">- 1.500</div>
        <div className="col">02/12/2021</div>
        <div className="col">
          <button type="submit" className="btn btn-primary">
            {"Editar"}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">Comida</div>
        <div className="col">- 500</div>
        <div className="col">09/01/2020</div>
        <div className="col">
          <button type="submit" className="btn btn-primary">
            {"Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movimiento;
