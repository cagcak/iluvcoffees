import { registerAs } from '@nestjs/config';

import * as pkg from '../../../package.json';

export default registerAs('common', () => ({
  version: pkg.version,
}));
