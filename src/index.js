import express from "express";
import cors from "cors";
import { __dirname } from "./utils.js";
// import Entidad from "./routes/Entidad.router.js";
import documentsRouter from "./routes/document.router.js";
// import '../models/associate.js';

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
// app.use(express.json());

// const corsOptions = {
//   origin: 'http://localhost:5173', // Specify the origin of your frontend
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true, // Enable CORS credentials
// };
// app.use(cors(corsOptions));
// app.options('*', cors());

//Routes
// app.use("/api/entity", Entidad);
app.use("/api/docs", documentsRouter);


app.listen(8000, () => {
  console.log(`Server listening...`);
});
