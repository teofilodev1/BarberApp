import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import prisma from '../../lib/prisma.js';

export async function cadastro(req, res, next) {
  try {
    const { nome, email, telefone, senha } = req.body;
    // ─── Verifica se email já existe ───────────────────────────────
    const emailExistente = await prisma.user.findUnique({
      where: { email }
    });
    if (emailExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }
    // ─── Hash da senha ─────────────────────────────────────────────
    const senhaHash = await bcrypt.hash(senha, 10);
    // ─── Cria usuário ─────────────────────────────────────────────
    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        telefone,
        senha: senhaHash
      }
    });
    res.status(201).json({ usuario });
} catch (error) {
  console.error('ERRO CADASTRO:', error); // ← adiciona isso
  next(new Error('Erro ao cadastrar usuário'));
}
};