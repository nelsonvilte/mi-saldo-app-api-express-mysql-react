import React, { Fragment } from "react";

const Ingresos = ({ nuevoIngreso }) => {
  return (
    <Fragment>
      <div className="alert alert-info">(+) Ingresos $ {nuevoIngreso}</div>
    </Fragment>
  );
};

export default Ingresos;
