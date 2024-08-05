import {
  Sequelize,
  DataTypes,
  Model,
  Association,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import { App } from "./app.model";
import { Company } from "@database/models/company.model";
import { Department } from "@database/models/department.model";
import { Employee } from "@database/models/employee.model";
import { HouseStatus } from "@database/models/houseStatus.model";

interface EmployeeStatusAttributes {
  composite_id: string;
  employee_id: number;
  application_id: string;
  business_manager: string;
  department_id: number;
  commissioning_status_id: number;
  house_status_id: number;
  is_deleted: boolean;
  created_id: string;
  modified_id: string;
}

interface EmployeeStatusCreationAttributes
  extends Optional<EmployeeStatusAttributes, "is_deleted"> {}

export class EmployeeStatus
  extends Model<EmployeeStatusAttributes, EmployeeStatusCreationAttributes>
  implements EmployeeStatusAttributes
{
  declare composite_id: string;
  declare employee_id: number;
  declare application_id: string;
  declare business_manager: string;
  declare department_id: number;
  declare commissioning_status_id: number;
  declare house_status_id: number;
  declare is_deleted: boolean;
  declare created_id: string;
  declare modified_id: string;
  declare readonly created: Date;
  declare readonly modified: Date;

  declare getApp: BelongsToGetAssociationMixin<App>;
  declare setApp: BelongsToSetAssociationMixin<App, number>;
  declare createApp: BelongsToCreateAssociationMixin<App>;

  declare readonly app?: App;

  declare getCompany: BelongsToGetAssociationMixin<Company>;
  declare setCompany: BelongsToSetAssociationMixin<Company, number>;
  declare createCompany: BelongsToCreateAssociationMixin<Company>;

  declare readonly company?: Company;

  declare getHouse_status: BelongsToGetAssociationMixin<HouseStatus>;
  declare setHouse_status: BelongsToSetAssociationMixin<HouseStatus, number>;
  declare createHouse_status: BelongsToCreateAssociationMixin<HouseStatus>;

  declare readonly house_status?: HouseStatus;

  declare getDepartment: BelongsToGetAssociationMixin<Department>;
  declare setDepartment: BelongsToSetAssociationMixin<Department, number>;
  declare createDepartment: BelongsToCreateAssociationMixin<Department>;

  declare readonly department?: Department;

  declare getEmployee: BelongsToGetAssociationMixin<Employee>;
  declare setEmployee: BelongsToSetAssociationMixin<Employee, number>;
  declare createEmployee: BelongsToCreateAssociationMixin<Employee>;

  declare readonly employee?: Employee;

  declare static associations: {
    app: Association<EmployeeStatus, App>;
    company: Association<EmployeeStatus, Company>;
    employee: Association<EmployeeStatus, Employee>;
  };
}

export const EmployeeStatusInit = (sequelize: Sequelize) => {
  EmployeeStatus.init(
    {
      composite_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        // primaryKey: true,
        unique: "CompositePrimaryKey",
        allowNull: false,
      },
      application_id: {
        type: DataTypes.STRING,
        // primaryKey: true,
        unique: "CompositePrimaryKey",
        allowNull: false,
      },
      business_manager: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commissioning_status_id: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      house_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.TEXT,
        defaultValue: false,
        allowNull: false,
      },
      created_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      modified_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_status",
      charset: "utf8",
      timestamps: true,
      createdAt: "created",
      updatedAt: "modified",
    }
  );
};
