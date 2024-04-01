import express from 'express';
import { AppController } from '@controllers/app';

const router = express.Router();

/**
 * アプリケーションIDを発行するエンドポイント
 */
router.get('/', AppController.create);

export { router as AppRouter };
