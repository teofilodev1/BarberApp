import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

// login para clientes
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
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // ─── Gera token ───────────────────────────────────────────
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    res.json({ token });

} catch (error) {
    console.error('ERRO LOGIN:', error);
    next(error); 
  }
}

// login para barbeiros ao painel de agendamentos
export async function loginBarbeiro(req, res, next) {
  try {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    // Busca o barbeiro
    const barbeiro = await prisma.barbeiro.findUnique({
      where: { email }
    });

    // Verifica se existe
    if (!barbeiro) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    // Verifica se está ativo
    if (!barbeiro.isActive) {
      return res.status(403).json({ erro: "Conta desativada, entre em contato com o administrador" });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, barbeiro.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    // Gera o token com role fixo "barbeiro"
    const token = jwt.sign(
      { id: barbeiro.id, role: "barbeiro" }, // 👈 role fixo pois não está no schema
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      token,
      barbeiro: {
        id: barbeiro.id,
        nome: barbeiro.nome,
        email: barbeiro.email,
        especialidade: barbeiro.especialidade
      }
    });

  } catch (error) {
    console.error("ERRO LOGIN:", error);
    next(error);
  }
}