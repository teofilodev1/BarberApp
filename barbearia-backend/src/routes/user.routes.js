import express         from 'express';
import { login }       from '../controllers/user/login.controller.js';
import { cadastro }    from '../controllers/user/cadastro.controller.js';
const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro)

export default router;