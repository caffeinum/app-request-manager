
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { 
  createAppRequestInputSchema, 
  getAppRequestInputSchema, 
  updateAppRequestInputSchema 
} from './schema';
import { createAppRequest } from './handlers/create_app_request';
import { getAppRequests } from './handlers/get_app_requests';
import { getAppRequest } from './handlers/get_app_request';
import { updateAppRequest } from './handlers/update_app_request';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  createAppRequest: publicProcedure
    .input(createAppRequestInputSchema)
    .mutation(({ input }) => createAppRequest(input)),
    
  getAppRequests: publicProcedure
    .query(() => getAppRequests()),
    
  getAppRequest: publicProcedure
    .input(getAppRequestInputSchema)
    .query(({ input }) => getAppRequest(input)),
    
  updateAppRequest: publicProcedure
    .input(updateAppRequestInputSchema)
    .mutation(({ input }) => updateAppRequest(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
