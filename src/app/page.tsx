"use client";

import { trpc } from "../utils/trpc";

export default function Home() {
  const { data: tasks, refetch } = trpc.getTasks.useQuery();
  const createMutation = trpc.createTask.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteMutation = trpc.deleteTask.useMutation({
    onSuccess: () => refetch(),
  });

  const handleCreate = () => {
    createMutation.mutate({ description: "New Task", completed: false });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={handleCreate}>Add Task</button>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            {task.description} - {task.completed ? "Done" : "Pending"}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
