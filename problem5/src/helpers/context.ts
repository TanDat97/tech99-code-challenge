import httpContext from 'express-http-context';

export const CURRENT_USER_CONTEXT_KEY = 'current_user';

export class Context {
  constructor() {}

  get user() {
    return httpContext.get(CURRENT_USER_CONTEXT_KEY);
  }

  setUser(user) {
    httpContext.set(CURRENT_USER_CONTEXT_KEY, user);
  }
}
