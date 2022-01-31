const config = require("./config");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

//configurar conexion a base de datos local
const db = mysql.createConnection({
  user: config.USER,
  host: config.HOST,
  password: config.PASSWORD, 
  database: config.DBNAME,
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
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Datos insertados");
      }
    }
  );
});

app.get("/movimiento", (req, res) => {
  db.query("SELECT * FROM presupuesto order by id desc", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.get("/totalgastos", (req, res) => {
  db.query(
    "SELECT ROUND(SUM (monto),2) as Total FROM presupuesto WHERE tipo=2",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/totalegresos", (req, res) => {
  db.query(
    "SELECT ROUND(SUM (monto),1) as Total FROM presupuesto WHERE tipo=1",
    (error, result) => {
      if (error) {
        console.log(error);
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
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM presupuesto WHERE id = ?", id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(config.PORT, config.HOST, function () {
  console.log(`Server runing... on http://${config.HOST}:${config.PORT}`);
});
