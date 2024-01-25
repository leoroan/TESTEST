import { Router } from 'express';
import agendaService from '../services/filesystem/agenda.service.js';

const router = Router();
const ags = new agendaService();

router.get('/', async (req, res) => {
  try {
    let agenda = await ags.getAll();
    res.send(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo obtener la agenda." });
  }
})

router.get('/:tid', async (req, res) => {
  try {
    let telId = req.params.tid;
    let tel = await ags.getById(telId);
    res.send(tel);
  } catch (error) {
    // console.error(error);
    res.status(500).send({ message: "No se pudo obtener el telefono." + error });
  }
})

router.put('/:tid', async (req, res) => {
  try {
    let telId = req.params.tid;
    let nuevoTelefono = req.body;
    let agenda = await ags.update(telId, nuevoTelefono);
    res.send(agenda);
  } catch (error) {
    // console.error(error);
    res.status(500).send({ message: "No se pudo actualizar la agenda." + error });
  }
})

router.post('/', async (req, res) => {
  try {
    let result = await ags.save(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo guardar el telefono en la agenda." });
  }
})

router.delete('/:tid', async (req, res) => {
  try {
    let telId = req.params.tid;
    let agenda = await ags.delete(telId);
    res.status(201).send(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo eliminar el telefono de la agenda." });
  }
});

export default router;