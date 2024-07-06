import React from "react";
import { createRoot } from "react-dom/client";

import TodoApp from "./componenets/todo-app";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<TodoApp />);
