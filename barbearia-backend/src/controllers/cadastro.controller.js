import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export async function cadastro(req, res, next) {
  try {
    const { nome, email, telefone, senha } = req.body;

    // ─── Validação básica dos campos ───────────────────────────────
    if (!nome || !email || !telefone || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // ─── Verifica se email já existe ───────────────────────────────
    const emailExistente = await prisma.user.findUnique({
      where: { email }
    });
    if (emailExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // ─── Hash da senha ─────────────────────────────────────────────
    const senhaHash = await bcrypt.hash(senha, 10);

    // ─── Cria usuário ──────────────────────────────────────────────
    const usuario = await prisma.user.create({
      data: { nome, email, telefone, senha: senhaHash },
      select: { id: true, nome: true, email: true, telefone: true, criadoEm: true }
    });

    return res.status(201).json({ usuario });

  } catch (error) {
    console.error('ERRO CADASTRO:', error);
    next(error); 
  }
}