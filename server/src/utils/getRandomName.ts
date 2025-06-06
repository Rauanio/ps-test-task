import { randomBytes } from 'crypto';

export const getRandomImageName = () => randomBytes(16).toString('hex');
