import { server } from './server';
global.beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
global.afterEach(() => server.resetHandlers());
global.afterAll(() => server.close());
