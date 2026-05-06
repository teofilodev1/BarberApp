import express         from 'express';
import { login, loginBarbeiro}       from '../controllers/login.controller.js';
import { cadastro }    from '../controllers/cadastro.controller.js';
const router = express.Router();

router.post('/login', login);
router.post('/login-barbeiro', loginBarbeiro);
router.post('/cadastro', cadastro)

export default router;