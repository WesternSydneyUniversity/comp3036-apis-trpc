import { beforeEach, describe, expect, it } from "vitest";
import { createContext } from "../src/server/context";
import { appRouter, tasks } from "../src/server/router";

describe("Task Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(async () => {
    caller = appRouter.createCaller(
      await createContext({
        req: new Request("http://localhost"),
        resHeaders: new Headers(),
      } as any)
    );
    tasks.splice(
      0,
      tasks.length,
      ...[
        { id: 1, description: "Complete the project report", completed: false },
        { id: 2, description: "Clean the house", completed: true },
      ]
    );
    console.log(tasks);
  });

  it("should get all tasks", async () => {
    const tasks = await caller.getTasks();
    console.log(tasks);
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toMatchObject({
      description: "Complete the project report",
      completed: false,
    });
  });

  it("should get task by ID", async () => {
    const task = await caller.getTaskById(1);
    expect(task).toMatchObject({
      id: 1,
      description: "Complete the project report",
    });
  });

  it("should throw error for non-existent task", async () => {
    await expect(caller.getTaskById(999)).rejects.toThrow("Task not found");
  });

  it("should create a new task", async () => {
    const newTask = await caller.createTask({
      description: "New Task",
      completed: true,
    });
    expect(newTask).toMatchObject({ description: "New Task", completed: true });
    const tasks = await caller.getTasks();
    expect(tasks).toHaveLength(3);
  });

  it("should update a task", async () => {
    const updatedTask = await caller.updateTask({
      id: 1,
      description: "Updated Task",
      completed: true,
    });
    expect(updatedTask).toMatchObject({
      id: 1,
      description: "Updated Task",
      completed: true,
    });
  });

  it("should delete a task", async () => {
    const result = await caller.deleteTask(1);
    expect(result).toEqual({ message: "Task deleted" });
    const tasks = await caller.getTasks();
    expect(tasks).toHaveLength(1);
  });
});
