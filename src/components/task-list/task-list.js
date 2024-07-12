import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onEdit: () => {},
    onSubmit: () => {},
    onScratched: () => {},
    todos: [],
  }
  propTypes = {
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onSubmit: PropTypes.func,
    onScratched: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.object),
  }
  render() {
    const { todos, onScratched, onDeleted, onEdit, onSubmit } = this.props
    const elements = todos.map((itemProps) => {
      const { num, status } = itemProps
      return (
        <li className={status} key={num}>
          <Task
            onDeleted={() => onDeleted(num)}
            onScratched={() => onScratched(num)}
            onEdit={() => onEdit(num, false)}
            onSubmit={(description, num) => onSubmit(description, num)}
            {...itemProps}
          />
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
