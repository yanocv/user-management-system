import express from 'express';
import { DepartmentController } from '@controllers/department';

const router = express.Router();

/** 事業部一覧を取得する.　*/
router.get('/', DepartmentController.findAll);

export { router as DepartmentRouter };
