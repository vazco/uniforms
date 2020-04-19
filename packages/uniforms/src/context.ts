import { createContext } from 'react';

import { Context } from './types';

export const context = createContext<Context<any> | null>(null);
