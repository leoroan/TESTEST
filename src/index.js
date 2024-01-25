// import { sequelize } from "./connection.js";
import express from "express";
import { __dirname } from "./utils.js";
import documentsRouter from "./routes/document.router.js";
import sistemaRouter from "./routes/sistemas.router.js";
import agendaRouter from "./routes/agenda.router.js";

// genéricos
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Routes
// app.use("/api/entity", Entidad);
app.use("/api/docs", documentsRouter);
app.use("/api/sistemas", sistemaRouter);
app.use("/api/agenda", agendaRouter);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection success');
//     return sequelize.sync();
//   })
//   .then(() => {
//     console.log('Sync models');
//     app.listen(8080, () => {
//       console.log(`Server listen on http://localhost:${8080}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Connection fail', error);
//   });

app.listen(8000, () => {
  console.log(`Server listen on KOYEB at 8000`);
});
