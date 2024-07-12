import React from 'react'
import { createRoot } from 'react-dom/client'

import TodoApp from './components/todo-app'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<TodoApp />)
