import { createContext } from 'react';

export interface Context {}

export default createContext<{ uniforms?: Context }>({});
