import express from 'express';
import { buscarServicos, criarServico, buscarBarbeiros, buscarHorarios, cadastroBarbeiro } from '../controllers/services.controller.js'
const router = express.Router();

router.post('/cadastro-barbeiro', cadastroBarbeiro);
router.post('/cadastro-servico', criarServico);
router.get('/services', buscarServicos);
router.get('/barbeiros', buscarBarbeiros);
router.get('/horarios', buscarHorarios);

export default router;