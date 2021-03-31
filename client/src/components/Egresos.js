import React, { Fragment } from "react";

const Egresos = ({ nuevoGasto }) => {
  return (
    <Fragment>
      <div className="alert alert-primary">(-) Egresos $ {nuevoGasto}</div>
    </Fragment>
  );
};

export default Egresos;
