import { fetchRequestHandler } from 'https://esm.sh/@trpc/server@10.34.1/adapters/fetch'
import { mainRouter } from '~/lib/trpc.ts';

function ALL(req: Request) {
    console.log(req);

    return fetchRequestHandler({
        endpoint: '/trpc',
        req,
        router: mainRouter,
        createContext: ()=>({})
    })
}

export { ALL as GET, ALL as POST };
