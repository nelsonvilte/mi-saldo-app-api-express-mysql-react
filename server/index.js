const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
//configurar conexion a base de datos local
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "2012.20",
  database: "movimientos",
});
//rutas
app.post("/create", (req, res) => {
  const tipo = req.body.tipo;
  const monto = req.body.monto;
  const descripcion = req.body.descripcion;
  const fecha = req.body.fecha;

  db.query(
    "INSERT INTO PRESUPUESTO(tipo, monto,descripcion, fecha) VALUES (?,?,?,?)",
    [tipo, monto, descripcion, fecha],
    (err, resutl) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Datos insertados");
      }
    }
  );
});

app.get("/movimiento", (req, res) => {
  db.query("SELECT * FROM presupuesto order by id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/totalgastos", (req, res) => {
  db.query(
    "SELECT ROUND(SUM (monto),2) as Total FROM presupuesto WHERE tipo=2",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/totalegresos", (req, res) => {
  db.query(
    "SELECT ROUND(SUM (monto),1) as Total FROM presupuesto WHERE tipo=1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;
  const monto = req.body.monto;
  const fecha = req.body.fecha;
  db.query(
    "UPDATE presupuesto SET descripcion=?, monto=?, fecha = ? WHERE id = ?",
    [descripcion, monto, fecha, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM presupuesto WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server running....  ");
});
