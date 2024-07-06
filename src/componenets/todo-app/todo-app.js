import React from "react";
import "./todo-app.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

const TodoApp = () => {
  const todoData = [
    {
      status: "completed",
      description: "Completed task",
      created: "created 17 seconds ago",
      id: "task-1",
    },
    {
      status: "editing",
      description: "Editing task",
      created: "created 5 minutes ago",
      id: "task-2",
    },
    {
      status: "",
      description: "Active task",
      created: "created 5 minutes ago",
      id: "task-3",
    },
  ];
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

export default TodoApp;
