const express = require("express");
const router = express.Router();
const Citas = require("../models/Citas");
 
//Registrar
router.post("/", async (req, res) => {
  try {
    const cita = new Citas(req.body);
    await cita.save();
    res.status(201).json(cita);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

//Listar
 
router.get("/", async (req, res) => {
  try {
    const citas = await Citas.find();
    res.json(citas)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
 
router.get("/:id", async (req, res) => {
  try {
    const citas = await Citas.findById(req.params.id);
    if (!citas) return res.status(404).json({message: 'No se encontro cita'})
    res.json(citas)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
 
 
module.exports = router;