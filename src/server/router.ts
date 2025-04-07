import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Task } from "../types/task";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

// In-memory task store
export let tasks: Task[] = [
  { id: 1, description: "Complete the project report", completed: false },
  { id: 2, description: "Clean the house", completed: true },
];

export const appRouter = t.router({
  getTasks: t.procedure.query(() => {
    return tasks;
  }),

  getTaskById: t.procedure.input(z.number()).query(({ input }) => {
    // TODO
  }),

  createTask: t.procedure
    .input(
      z.object({
        description: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
      // TODO
    }),

  // TODO: update and delete task
});

export type AppRouter = typeof appRouter;
