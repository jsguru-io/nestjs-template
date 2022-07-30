import { RegisterOptions } from '@jsgurucompany/jsg-nestjs-common';

export const testRegisterOptions: RegisterOptions = {
  useValue: {
    connection: {
      models: [`${__dirname}/../../../**/*.model.{ts,js}`],
    },
    migrator: {
      path: '',
    },
  },
};
