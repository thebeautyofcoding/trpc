import { createReactQueryHooks } from "@trpc/react"
import type { AppRouter } from "C:\\Users\\Heiner\\myprojects\\trpc\\trpc_backend"

export const trpc = createReactQueryHooks<AppRouter>()
