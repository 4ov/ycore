import * as trpc from "https://esm.sh/@trpc/server";

const t = trpc.initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const mainRouter = router({
    greet: publicProcedure.query(() => {
        return "Hello world";
    }),
});



export type MainRouter = typeof mainRouter