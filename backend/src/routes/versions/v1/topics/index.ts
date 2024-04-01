import express from 'express';
import { TopicController } from '@controllers/topic';

const router = express.Router();

/**
 * 最新トピックスを５件取得するAPI
 */
router.get('/', TopicController.findAll);

export { router as TopicRouter };
