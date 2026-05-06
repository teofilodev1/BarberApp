import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

// Inseriro um novo serviço a tabela serviços no banco de dados
export async function criarServico(req, res) {
  try {
    const { name, description, price, durationMin, category, imageUrl, image } = req.body;

    const servico = await prisma.servico.create({
      data: {
        name,
        description,
        price: parseFloat(price), 
        durationMin: parseInt(durationMin), 
        category,
        imageUrl: imageUrl || image || null    
      },
    });

    res.status(201).json(servico);
  } catch (error) {
    console.error("ERRO COMPLETO:", error);
    res.status(500).json({ message: "Erro ao criar serviço", error });
  }
}
// deletar servico
export async function DeleteServicos(req, res) {
  try {
    const { id } = req.body;
    const deleteServico = await prisma.servico.delete({
      where: { id },
    }) 
    res.status(200).json(deleteServico);
  } catch (error){
  res.status(500).json({message: "Erro ao deletar usuarios", error})
  }
}

// Cadastrar novo barbeiro no banco de dados
export async function cadastroBarbeiro(req, res) {
  try {
    const { nome, email, senha, especialidade, experiencia, imageUrl } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha || !especialidade) {
      return res.status(400).json({ erro: "nome, email, senha e especialidade são obrigatórios" });
    }

    // Verifica se email já existe
    const emailExistente = await prisma.barbeiro.findUnique({
      where: { email }
    });
    if (emailExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const barbeiro = await prisma.barbeiro.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        especialidade,
        experiencia: experiencia || null,
        imageUrl: imageUrl || null
      },
    });

    // Remove a senha do retorno por segurança
    const { senha: _, ...barbeiroSemSenha } = barbeiro;
    res.status(201).json(barbeiroSemSenha);

  } catch (error) {
    console.error("ERRO COMPLETO:", error);
    res.status(500).json({ message: "Erro ao cadastrar barbeiro", error });
  }
}

//deletar barbeiro
export async function DeleteBarbeiros(req, res) {
  try {
    const { id } = req.body;
    const deleteBarbeiro = await prisma.barbeiro.delete({
      where: { id },
    }) 
    res.status(201).json(deleteBarbeiro);
  } catch (error){
  res.status(500).json({message: "Erro ao deletar usuarios", error})
  }
}

// Buscar serviços no banco de dados
export async function buscarServicos(req, res) {
  try {
    const servicos = await prisma.servico.findMany();

    res.json(servicos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar serviços", error });
  }
}

// Buscar barbeiros no banco de dados
export async function buscarBarbeiros(req, res) {
  try {
    const barbeiros = await prisma.barbeiro.findMany({
      select: {
        id: true,
        nome: true,
        especialidade: true,
        experiencia: true,
        imageUrl: true,
        isActive: true,
      }
    });

    res.json(barbeiros);
  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ message: "Erro ao buscar barbeiros", error });
  }
}

// Buscar horarios no banco de dados
export async function buscarHorarios(req, res) {
  try {
    const horarios = await prisma.horarios.findMany();

    res.json(horarios);
  } catch(error) {
    res.status(500).json({ message: "Erroao buscar barbeiros", error});
  }
};