import { useEffect, useState } from "react";

import "./App.css";

import Egresos from "./components/Egresos";
import Header from "./components/Header";
import Ingresos from "./components/Ingresos";
import Saldo from "./components/Saldo";
import Ingresar from "./components/Ingresar";
import Axios from "axios";

function App() {
  const [saldo, setSaldo] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [ingreso, setIngreso] = useState(0);

  const [nuevoMovimiento, setNuevoMovimiento] = useState(0);
  const [estadoMovmiento, setEstadoMovmiento] = useState(false);

  const addTotalgastos = () => {
    Axios.get("http://localhost:3001/totalgastos").then((res) => {
      setGastos(res.data[0].Total);
    });
  };

  useEffect(() => {
    addTotalgastos();
  }, [estadoMovmiento]);

  const addTotalIngresos = () => {
    Axios.get("http://localhost:3001/totalegresos").then((res) => {
      setIngreso(res.data[0].Total);
    });
  };

  useEffect(() => {
    addTotalIngresos();
  }, [estadoMovmiento]);

  useEffect(() => {
    setSaldo(ingreso - gastos);
  }, [ingreso, gastos, nuevoMovimiento]);

  useEffect(() => {
    if (estadoMovmiento) {
      const nuevoSaldo = ingreso - gastos;
      setSaldo(nuevoSaldo);
      setNuevoMovimiento(0);
      setEstadoMovmiento(false);
    }
  }, [ingreso, gastos, saldo, estadoMovmiento]);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Saldo saldo={saldo} ingresosTotal={ingreso} />
        <Ingresos nuevoIngreso={ingreso} />
        <Egresos nuevoGasto={gastos} />
        <Ingresar
          nuevoMovimiento={setNuevoMovimiento}
          estadoMovmiento={setEstadoMovmiento}
        />
      </div>
    </div>
  );
}

export default App;
