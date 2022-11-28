import * as trpcNext from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from "@/backend/router";
import { inferProcedureOutput } from "@trpc/server";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type inferQueryResponse<TRouteKey extends keyof AppRouter["_def"]> =
  inferProcedureOutput<AppRouter["_def"][TRouteKey]>;
