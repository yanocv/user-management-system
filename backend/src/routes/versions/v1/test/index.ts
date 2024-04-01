import express, { Request, Response } from 'express';
import { DB } from '@database/index';
import { Employee } from '@database/models/employee.model';
import { EmployeeStatusDummy } from '@database/models/employeeStatusDummy.model';
import { Department } from '@database/models/department.model';
import { App } from '@database/models/app.model';
import { User } from '@database/models/user.model';
import { EmployeeStatus } from '@database/models/employeeStatus.model';
import { Company } from '@database/models/company.model';
import { Transaction } from 'sequelize';
import moment from 'moment';
import { HouseStatus } from '@database/models/houseStatus.model';
import { Permission } from '@database/models/permission.model';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const comp = await User.findOne({
    where: {
      // composite_id: '1-4ae77ddd-a9df-4a1b-a20d-9a783811b6ce',
      username: 'system',
    },
    // include: [
    //   {
    //     model: App,
    //     as: 'app',
    //     required: true,
    //   },
    //   {
    //     model: Company,
    //     as: 'company',
    //     required: true,
    //   },
    //   {
    //     model: EmployeeStatus,
    //     as: 'employee_status',
    //     required: true,
    //   },
    // ],
  });

  for (const c in comp) {
    console.log(c);
  }

  console.log(JSON.parse(JSON.stringify(comp)));

  // try {
  //   const emp = await Employee.create({
  //     // application_id: uuid,
  //     application_id: 'uuid',
  //     employee_id: 1,
  //     first_name: 'セキュア',
  //     last_name: '花子',
  //     first_name_hiragana: 'せきゅあ',
  //     last_name_hiragana: `はなこ`,
  //     company_id: 1,
  //     birthday: `1995-07-07`,
  //     sex: 0,
  //     age: 38,
  //     mail: `sample@secure-i.jp`,
  //     telephone: '09012345678',
  //     enter_date: '2018-01-15',
  //     retire_date: '',
  //     enrollment_year: '2年',
  //     enrollment_month: '3か月',
  //     enrollment_day: '186日',
  //     // is_deleted: false,
  //     created_id: 'system',
  //     modified_id: 'system',
  //   });
  // } catch (e) {
  //   console.log(e);
  // }

  // const uuid1 = '52fed3ff-5a3d-4ecd-ac99-f05e151356ea';
  // const uuid2 = '0acbeb22-d70b-4a72-8b42-59dc6d9d5ac5';

  // const app = await App.findByPk(uuid1);
  // const app2 = await App.findOne({
  //   where: {
  //     application_id: uuid2,
  //   },
  //   include: [
  //     {
  //       model: User,
  //       as: 'user',
  //       required: true,
  //     },
  //   ],
  //   // raw: true,
  //   nest: true,
  // });
  // console.log(JSON.parse(JSON.stringify(app2)));

  // console.log(App.associations.user);
  // console.log(App.associations.employee);

  // const user = await User.findOne({
  //   where: {
  //     application_id: uuid1,
  //     username: 'system',
  //   },
  // });
  // console.log(user);
  // const user = await User.findAll();

  // if (app && user && app2) {
  //   const users = await app2.getUser();
  //   // console.log();
  //   const count = (await app.countEmployee()) + 1;
  //   await app.createEmployee({
  //     composite_id: `${count}-${app.application_id}`,
  //     employee_id: 7,
  //     application_id: app.application_id,
  //     first_name: 'セキュア',
  //     last_name: '太郎',
  //     first_name_hiragana: 'セキュア',
  //     last_name_hiragana: 'たろう',
  //     company_id: 10,
  //     birthday: `19850708`,
  //     sex: 0,
  //     age: 38,
  //     mail: `sample1@secure-i.jp`,
  //     telephone: `09012345678`,
  //     enter_date: '2020-01-13',
  //     retire_date: '2020-01-13',
  //     enrollment_year: '10年',
  //     enrollment_month: '8ヶ月',
  //     enrollment_day: '365日',
  //     is_deleted: false,
  //     created_id: 'system',
  //     modified_id: 'system',
  //   });
  //   console.log(await app.countUser());
  //   // console.log(await app.getUser());
  //   // console.log(await app.hasUser(user));
  //   // await app.addUser(users[0]);
  //   // console.log(await app.hasUser(user));
  //   // console.log(app2.user);
  //   // console.log(await app.countUser());
  //   // console.log(await app.getUser());
  //   // console.log(await app.hasUsUsers(new User()));
  //   // console.log(app.getUsers({}));
  //   // console.log(app.getUsers());
  // }

  // if (app) {
  //   app.createEmployee({
  //     // application_id: uuid,
  //     application_id: app.application_id,
  //     employee_id: 2,
  //     first_name: 'セキュア',
  //     last_name: '花子',
  //     first_name_hiragana: 'せきゅあ',
  //     last_name_hiragana: `はなこ`,
  //     company_id: 1,
  //     birthday: `1995-07-07`,
  //     sex: 0,
  //     age: 38,
  //     mail: `sample@secure-i.jp`,
  //     telephone: '09012345678',
  //     enter_date: '2018-01-15',
  //     retire_date: '',
  //     enrollment_year: '2年',
  //     enrollment_month: '3か月',
  //     enrollment_day: '186日',
  //     // is_deleted: false,
  //     created_id: 'system',
  //     modified_id: 'system',
  //   });
  // }
  // if (app2) {
  //   app2.createEmployee({
  //     // application_id: uuid,
  //     application_id: app2.application_id,
  //     employee_id: 1,
  //     first_name: 'セキュア',
  //     last_name: '花子',
  //     first_name_hiragana: 'せきゅあ',
  //     last_name_hiragana: `はなこ`,
  //     company_id: 1,
  //     birthday: `1995-07-07`,
  //     sex: 0,
  //     age: 38,
  //     mail: `sample@secure-i.jp`,
  //     telephone: '09012345678',
  //     enter_date: '2018-01-15',
  //     retire_date: '',
  //     enrollment_year: '2年',
  //     enrollment_month: '3か月',
  //     enrollment_day: '186日',
  //     // is_deleted: false,
  //     created_id: 'system',
  //     modified_id: 'system',
  //   });
  // }
  // console.log(JSON.parse(JSON.stringify(app)));

  // const emp = await Employee.create({
  //   firstName: '開発',
  //   lastName: '太郎',
  //   firstNameHiragana: 'かいはつ',
  //   lastNameHiragana: 'たろう',
  //   companyId: 10,
  //   birthday: '1985-07-08',
  //   sex: 0,
  //   mail: 'sample@secure-i.jp',
  //   telephone: '09012345678',
  //   enterDate: new Date(),
  //   retireDate: null,
  //   enrollmentYear: '3年',
  //   enrollmentMonth: '38ヶ月',
  //   enrollmentDay: '1178日',
  //   createdId: 'system',
  //   modifiedId: 'system',
  // });

  // console.log(emp);
  // Company.create({
  //   companyName: 'test',
  // });
  // await Employee.create({
  //   firstName: 'a',
  //   lastName: 'b',
  //   companyId: 1,
  // });

  // const emp = await Employee.findOne({
  //   where: {
  //     firstName: 'a',
  //   },
  //   include: [
  //     {
  //       model: Company,
  //       required: true,
  //       as: 'company',
  //     },
  //   ],
  //   nest: true,
  //   raw: true,
  // });

  // console.log(emp);
  // // console.log(emp!.getCompany({ limit: 0 }));
  // console.log(Employee.associations.company.associationType);
  // console.log(Employee.associations.company.identifier);
  // console.log(Employee.associations.company.foreignKey);
  // console.log(Employee.associations.company.source);
  // console.log(Employee.associations.company.target);
  // console.log(Employee.associations.company.as);

  // const comp = await Company.findOne({
  //   where: {
  //     id: 1,
  //   },
  //   include: [
  //     {
  //       model: Employee,
  //       required: true,
  //       as: 'employee',
  //     },
  //   ],
  //   nest: true,
  //   raw: false,
  // });

  // // console.log(comp);
  // // console.log(JSON.parse(JSON.stringify(await comp!.addEmployee())));
  // console.log(Company.associations.employee.associationType);
  // console.log(Company.associations.employee.identifier);
  // console.log(Company.associations.employee.foreignKey);
  // console.log(Company.associations.employee.source);
  // console.log(Company.associations.employee.target);
  // console.log(Company.associations.employee.as);

  res.status(200).json({
    statusCode: 2000,
    message: 'Success get employee information data.',
  });
});

export { router as TestRouter };
