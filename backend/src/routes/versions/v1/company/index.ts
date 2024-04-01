import express from 'express';
import { CompanyController } from '@controllers/company';

const router = express.Router();

/**　会社一覧情報を取得する.　*/
router.get('/', CompanyController.findAll);

export { router as CompanyRouter };
