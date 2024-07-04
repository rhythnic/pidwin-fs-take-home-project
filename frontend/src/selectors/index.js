import { path } from 'ramda';

export const userSelector = path(["login", "user"]);
export const tokenSelector = path(["login", "token"]);
export const tossesSelector = path(["coinToss", "tosses"]);