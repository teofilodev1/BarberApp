import bcrypt from 'bcryptjs';
import { ROTAS_ADMIN, ROTAS_PUBLICAS } from './config/auth.js';

module.exports = async function hashSenha(req, res, next) {
  try {
    if (!req.body.senha) return next();

    req.body.senha = await bcrypt.hash(req.body.senha, SALT_ROUNDS);
    next();
  } catch {
    next(new Error('Erro ao processar senha'));
  }
}
