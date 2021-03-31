# Mi saldo app | API Rest: Node.js + Express.js + MySQL + React + Bootstrap
Demo project to manage a personal budget. 
This is a basic application crud that uses API Rest development with Node.js, Express and MySQL in the backend, and React, Bootstrap in de frontend.
 
# Database
1. Install MySQL
2. Create a database "movimientos"
3. Add the table "presupuesto":
' CREATE TABLE `movimientos`.`presupuesto` (
  `id` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `monto` FLOAT NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `fecha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
); '

# Development Server
1. folder /client
2. run  "npm start"
Open your browser on http://localhost:3000/

# Express Server
1. folder /server
2. run: "node index.js"
3. Open your browser on http://localhost:3001/
