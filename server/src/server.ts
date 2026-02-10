import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';

// Konfigürasyonları yükle (.env dosyasını okur)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Temel Middleware'ler
app.use(cors());          // Farklı domainlerden gelen isteklere izin ver
app.use(helmet());        // Güvenlik başlıklarını ekle
app.use(express.json());  // JSON verilerini okuyabilmemizi sağlar

// Test Route'u (Sağlık Kontrolü)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Smart Document Assistant API is running! 🚀',
    env: process.env.NODE_ENV || 'development',
  });
});
// Sunucuyu Başlat
const startServer = async() =>{
  try {
    await connectDB();
    app.listen(PORT, () =>{
      console.log(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
      `);
    })
  } catch (error) {
    console.error(`Failed to start server`, error);
    process.exit(1);
  }
}

startServer();