import express from 'express';
import { EmployeeController } from '@controllers/employee';

const router = express.Router();

/** 全社員情報取得 */
router.get('/', EmployeeController.findAll);
/** 社員情報取得 */
router.get('/:id', EmployeeController.findOne);
/** 社員新規作成 */
router.post('/', EmployeeController.create);
/** 社員更新 */
router.put('/:id', EmployeeController.update);
/** 社員削除 */
router.delete('/:id', EmployeeController.delete);
/** 全社員削除 */
// WARNING: Not yet implemented.
// router.delete('/', EmployeeController.deleteAll);

export { router as EmployeeRouter };
