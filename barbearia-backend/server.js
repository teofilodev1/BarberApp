import 'dotenv/config';
import express        from 'express';
import cors           from 'cors';
import helmet         from 'helmet';
import authMiddleware from './src/middleware/auth.middleware.js';
import userRouter     from './src/routes/user.routes.js';
import serviceRouter from './src/routes/services.routes.js'

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Infraestrutura ───────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());         // parseia application/json
app.use(express.urlencoded({ extended: true })); // parseia form data
// ─── Rotas ───────────────────────────────────────────────────
app.use('/api', userRouter);
app.use('/api', serviceRouter);

// ─── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// ─── Servidor ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});