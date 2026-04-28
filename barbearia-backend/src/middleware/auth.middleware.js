import jwt from 'jsonwebtoken'
import { ROTAS_ADMIN, ROTAS_PUBLICAS } from './config/auth.js';

function verificarRotaPublica(path) {
  return ROTAS_PUBLICAS.includes(path);
}

function verificarRotaAdmin(path) {
  return ROTAS_ADMIN.some(rota => path.startsWith(rota));
}

function extrairToken(headers) {
  return headers.authorization?.split(' ')[1] ?? null;
}

async function authMiddleware(req, res, next) {
  if (verificarRotaPublica(req.path)) return next();

  const token = extrairToken(req.headers);
  if (!token) return res.status(401).json({ erro: 'Não autenticado' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }

  if (verificarRotaAdmin(req.path) && req.user.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  next();
}

export default authMiddleware;