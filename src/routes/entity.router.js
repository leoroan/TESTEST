import { Router } from "express";
import { Entidad } from "../../models/Entidad.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const entidad = await Entidad.findAll({
      include: [
        {
          model: subsecretariaAsociate,
          as: 'subsecretarias',
          attributes: [], // No necesitas recuperar atributos de la tabla intermedia
          through: { attributes: [] }, // No necesitas recuperar atributos de la tabla intermedia
          include: [
            {
              model: entidad,
              as: 'subsecretaria',
              attributes: ['id', 'name'], // Recupera los atributos necesarios de la entidad asociada
            },
          ],
          required: false // No es necesario incluir la relación si no hay datos
        },
        {
          model: direccionAsociate,
          as: 'direcciones',
          attributes: [],
          through: { attributes: [] },
          include: [
            {
              model: entidad,
              as: 'direccion',
              attributes: ['id', 'name'],
            },
          ],
          required: false
        },
      ],
    });

    return res.json(entidad);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const entidadId = req.params.id;
    const entidad = await Entidad.findByPk(entidadId);
    if (!entidad) {
      return res.status(404).json({ message: 'Entidad not found' });
    }
    res.status(200).json(entidad);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const entidad = req.body;
    const save = await Entidad.create(entidad);
    return res.status(201).json({ entidad: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newItem = req.body;

  try {
    const response = await Entidad.update(newItem, {
      where: { id: id }
    });

    if (response[0] === 1) {
      res.status(200).json({ mensaje: 'updated succesfully' });
    } else {
      res.status(404).json({ mensaje: 'no item fund to update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Entidad.destroy({
      where: { id: id }
    });
    if (!response) return res.json({ error: "not found" });
    res.json({ response });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error",
      error,
    });
  }
});

export default router;