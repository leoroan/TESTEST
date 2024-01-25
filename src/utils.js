import { fileURLToPath } from "url";
import multer from "multer";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __dirname };

// Guardo los archivos en la carpeta data/formularios o data/normativas, si no existen devuelve error.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.destinationFolder !== 'formularios' && req.body.destinationFolder !== 'normativas') {
      const error = new Error('Destination folder not provided in the request body or folder name does not exist');
      return cb(error, error);
    }
    // req.body.destinationFolder = folder;
    cb(null, __dirname + '/files/data/' + req.body.destinationFolder);
  },

  filename: function (req, file, cb) {
    // const timestamp = formatTimestamp();
    // cb(null, `${timestamp}_${file.originalname}`);
    cb(null, file.originalname);
  },
});

export const loader = multer({ storage });