import express from 'express';
import { HouseStatusController } from '@controllers/houseStatus';

const router = express.Router();

/**　在籍状況一覧を取得する.　*/
router.get('/', HouseStatusController.findAll);

export { router as HouseStatusRouter };
