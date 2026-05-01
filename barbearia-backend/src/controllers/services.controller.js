import prisma from '../lib/prisma.js';

export async function criarServico(req, res) {
  try {
    const { name, description, price, durationMin, category, imageUrl } = req.body;

    const servico = await prisma.servico.create({
      data: {
        id,
        name,
        description,
        price,
        durationMin,
        category
      },
    });

    res.status(201).json(servico);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar serviço", error });
  }
}

export async function buscarServicos(req, res) {
  try {
    const servicos = await prisma.servico.findMany();

    res.json(servicos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar serviços", error });
  }
}

export async function buscarBarbeiros(req, res) {
  try {
    const barbeiros = await prisma.barbeiro.findMany();

    res.json(barbeiros);
  } catch(error) {
    res.status(500).json({ message: "Erro ao buscar barbeiros, error "})
  }
}

export async function buscarHorarios(req, res) {
  try {
    const horarios = await prisma.horarios.findMany();

    res.json(horarios);
  } catch(error) {
    res.status(500).json({ message: "Erroao buscar barbeiros, error "})
  }
}