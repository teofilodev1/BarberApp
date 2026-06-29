import 'dotenv/config';
import express        from 'express';
import cors           from 'cors';
import helmet         from 'helmet';
import authMiddleware from './src/middleware/auth.middleware.js';
import userRouter     from './src/routes/user.routes.js';
import serviceRouter  from './src/routes/services.routes.js';
import { conectarBanco } from './src/lib/prisma.js';

const app  = express();
const PORT = process.env.PORT || 3000;

const origensPermitidas = [
  'https://teofilodev1.github.io',
  'http://localhost:5173',
];

// ─── Infraestrutura ───────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex: Postman, curl)
    if (!origin || origensPermitidas.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado para origem: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rotas ───────────────────────────────────────────────────
app.use('/api', userRouter);
app.use('/api', serviceRouter);

// ─── Health check (útil para o Render saber que o server está vivo) ──
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ─── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// ─── Servidor ─────────────────────────────────────────────────
conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta! ${PORT}`);
  });
});