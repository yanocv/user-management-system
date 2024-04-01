import express, { Request, Response } from 'express';

import { AnalysisController } from '@controllers/analysis';

const router = express.Router();

/**
 * グループ全体の以下情報を返却する.
 *     2021年1月~12月の社員数
 *     現在の社員数
 *     前月の新入社員
 *     前月の退職者数
 */
router.get('/employees', AnalysisController.employeesAll);

/**
 * companyIdに該当する会社の以下情報を返却する.
 *     2021年1月~12月の社員数
 *     現在の社員数
 *     前月の新入社員
 *     前月の退職者数
 */
router.get('/employees/:companyId', AnalysisController.companyEmployees);

/**
 * 開発、ＮＷ、検証事業部の稼働率と非稼働率を返却する.
 */
router.get('/comparison', AnalysisController.departmentsComparison);

/**
 * 各事業部の社員数を返却する.
 * 数値は employee_status_dummy.house_status_id が 0 or 4 の総数
 */
router.get('/departments', AnalysisController.departmentsRatio);

export { router as AnalysisRouter };
