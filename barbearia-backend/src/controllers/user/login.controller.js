import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import prisma from '../../lib/prisma.js';

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    // ─── Busca usuário ────────────────────────────────────────
    const usuario = await prisma.user.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // ─── Compara senha com hash do banco ──────────────────────
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // ─── Gera token ───────────────────────────────────────────
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });

} catch (error) {
  console.error('ERRO LOGIN:', error); // ← adiciona isso
  next(new Error('Erro ao realizar login'));
}
}