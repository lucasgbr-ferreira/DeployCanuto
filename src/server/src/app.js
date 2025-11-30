import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import './models/index.js';

import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageGetRoutes from './routes/imageGetRoutes.js';
import concessionariaRoutes from './routes/concessionariaRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
import profilePhotoRoutes from './routes/profilePhotoRoutes.js';
import veiculoPhotoRoutes from './routes/veiculoPhotoRoutes.js';

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

// CORS CORRETO
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite chamadas sem origin (pré-flight, mobile, Postman, SSR etc.)
      if (!origin) return callback(null, true);

      // Permite o domínio do frontend
      if (origin === allowedOrigin) return callback(null, true);

      console.error("❌ CORS blocked:", origin);
      return callback(new Error(`CORS not allowed for ${origin}`), false);
    },
    credentials: true,
  })
);

// Headers extra (importante p/ cookies e auth)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/media', imageGetRoutes);
app.use('/api/concessionarias', concessionariaRoutes);
app.use("/api/profile/photo", profilePhotoRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/veiculo-photos', veiculoPhotoRoutes);

app.get('/', (req, res) => res.send('GesCar API running'));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection ok');

    await sequelize.sync();
    console.log('✅ Models synced safely - existing data preserved');
    console.log('✅ Setup inicial concluído');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to start server:', err);
    process.exit(1);
  }
};

start();
