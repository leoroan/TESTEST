import { fileURLToPath } from "url";
import multer from "multer";
import { dirname } from "path";
import { formatTimestamp } from "./helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __dirname };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    if (req.body.destinationFolder === 'formulario') {
      folder = 'formularios';
    } else if (req.body.destinationFolder === 'normativa') {
      folder = 'normativas';
    } else {
      const error = new Error('Destination folder not provided in the request body');
      return cb(error, error);
    }
    req.body.destinationFolder = folder;
    cb(null, __dirname + '/public/data/' + folder);
  },

  filename: function (req, file, cb) {
    // const timestamp = formatTimestamp();
    // cb(null, `${timestamp}_${file.originalname}`);
    cb(null, file.originalname);
  },
});

export const loader = multer({ storage });