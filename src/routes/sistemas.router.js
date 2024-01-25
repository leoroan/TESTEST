import { Router } from 'express';
import SistemasService from '../services/filesystem/sistemas.service.js';

const router = Router();
const ss = new SistemasService();

router.get('/', async (req, res) => {
  try {
    let sistemas = await ss.getAll();
    res.send(sistemas);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo obtener los sistemas." });
  }
})

router.get('/:sid', async (req, res) => {
  try {
    let sistemaId = req.params.sid;
    let sistema = await ss.getById(sistemaId);
    res.send(sistema);
  } catch (error) {
    // console.error(error);
    res.status(500).send({ message: "No se pudo obtener el sistema." + error });
  }
})

router.put('/:sid', async (req, res) => {
  try {
    let sistemaId = req.params.sid;
    let nuevoSistema = req.body;
    let sistema = await ss.update(sistemaId, nuevoSistema);
    res.send(sistema);
  } catch (error) {
    // console.error(error);
    res.status(500).send({ message: "No se pudo actualizar el sistema." + error });
  }
})

router.post('/', async (req, res) => {
  try {
    let result = await ss.save(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo guardar el sistema." });
  }
})

export default router;