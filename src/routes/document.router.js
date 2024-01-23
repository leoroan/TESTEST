import { Router } from "express";
import { loader, __dirname } from "../utils.js";
import fs from 'fs';

const router = Router();

// Este endpoint requiere en el cuerpo del mensaje el nombre de la carpeta bajo la key "folder" (req.body.folder)
router.post("/upload", loader.single("file"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No se ha recibido ningún archivo.");
    }

    // Log file details and form data
    // console.log('File stored in folder:', req.file.destination);
    // console.log('Uploaded file details:', req.file);
    // console.log('Form data:', req.body);

    res.json({
      message: `El archivo se subió correctamente a la carpeta de ${req.body.destinationFolder}`
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: "Hubo un error al subir el archivo",
    });
  }
});

router.get('/file/:folder', (req, res) => {
  const folderName = req.params.folder;
  const rutaCarpeta = __dirname + `/public/data/${folderName}`;
  fs.readdir(rutaCarpeta, (error, archivos) => {
    if (error) {
      console.error(`Error al leer la carpeta: ${error}`);
      res.status(500).json({ "Error": 'Error interno del servidor' });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({ archivos });
  });
});

router.delete('/file/:folder/:fileName', (req, res) => {
  const folderName = req.params.folder;
  const fileName = req.params.fileName; //full name with extension! 
  const filePath = __dirname + `/public/data/${folderName}/${fileName}`;
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ "Error": 'File not found' });
    return;
  }
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error(`Error al borrar el archivo: ${error}`);
      res.status(500).send('Error interno del servidor al borrar el archivo');
      return;
    }
    res.json({ "Success": 'File deleted successfully' });
  });
});

router.put('/file', (req, res) => {
  const { folder, oldFileName, newFileName } = req.body;

  if (!folder || !oldFileName || !newFileName) {
    res.status(400).json({ "Error": 'Missing required parameters' });
    return;
  }

  const oldFilePath = __dirname + `/public/data/${folder}/${oldFileName}`;
  const newFilePath = __dirname + `/public/data/${folder}/${newFileName}`;

  if (!fs.existsSync(oldFilePath)) {
    res.status(404).json({ "Error": 'File not found' });
    return;
  }

  fs.rename(oldFilePath, newFilePath, (error) => {
    if (error) {
      console.error(`Error al renombrar el archivo: ${error}`);
      res.status(500).send('Error interno del servidor al renombrar el archivo');
      return;
    }

    res.json({ "Success": 'File name updated successfully' });
  });
});

export default router;