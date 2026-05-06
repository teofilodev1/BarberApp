import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function conectarBanco() {
  try {
    await prisma.$connect();
    console.log('✅ Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1); // encerra o servidor se não conectar
  }
}

export default prisma;