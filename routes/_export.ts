// Exports router modules for serverless env that doesn't support the dynamic import.
// This module will be updated automaticlly in develoment mode, do NOT edit it manually.

import * as $0 from "./_app.tsx";
import * as $1 from "./_404.tsx";
import * as $2 from "./index.tsx";
import * as $3 from "./todos.tsx";
import * as $4 from "./~/dl.ts";
import * as $5 from "./trpc/[...path].ts";

export default {
  "/_app": $0,
  "/_404": $1,
  "/": $2,
  "/todos": $3,
  "/~/dl": $4,
  "/trpc/:path+": $5,
};
