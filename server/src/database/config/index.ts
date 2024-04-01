import path from 'path';
import { Options } from 'sequelize';

const config: Options = {
  dialect: 'sqlite',
  storage: path.resolve(`${__dirname}`, '../management.sqlite'),
  // NOTE: Setting a custom timezone is not supported by SQLite. dates are always returned as UTC.
  // timezone: '+9:00',
};

export { config };
