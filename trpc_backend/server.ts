import * as trpcExpress from "@trpc/server/adapters/express"
import * as trpc from "@trpc/server"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import express from "express"
import cors from "cors"
const prisma = new PrismaClient()
const appRouter = trpc
  .router()
  .mutation("createPost", {
    input: z.object({
      title: z.string().min(10),
      body: z.string().min(20),
    }),
    async resolve(req) {
      await prisma.post
        .create({ data: req.input })
        .catch((e: any) => console.log("ERROR", e))
    },
  })
  .query("posts", {
    async resolve(req) {
      return prisma.post.findMany()
    },
  })
  .query("post", {
    input: z.object({ id: z.number().min(1) }),

    async resolve(req) {
      return prisma.post.findUnique({ where: { id: req.input.id } })
    },
  })

export type AppRouter = typeof appRouter
const app = express()

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>
app.use(cors())
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
)
app.listen(4001)
