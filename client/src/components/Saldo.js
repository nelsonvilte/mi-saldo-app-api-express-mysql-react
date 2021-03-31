import React, { Fragment } from "react";

const controlSaldo = (egreso, saldo) => {
  let claseControl;

  if (egreso / 4 > saldo) {
    claseControl = "alert alert-danger";
  } else if (egreso / 2 > saldo) {
    claseControl = "alert alert-warning";
  } else {
    claseControl = "alert alert-success";
  }

  return claseControl;
};

const Saldo = ({ saldo, ingresosTotal }) => {
  return (
    <Fragment>
      <div className={controlSaldo(ingresosTotal, saldo)}>
        Saldo disponible: $ {saldo}
      </div>
    </Fragment>
  );
};

export default Saldo;
