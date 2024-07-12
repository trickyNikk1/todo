import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './footer.css'
import TasksFilter from '../tasks-filter'
export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    onClear: () => {},
    onChangeFilter: () => {},
  }
  static propTypes = {
    todoCount: PropTypes.number,
    onClear: PropTypes.func,
    onChangeFilter: PropTypes.func,
  }
  render() {
    const { todoCount, onClear, onChangeFilter } = this.props
    console.log(todoCount)
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter onChangeFilter={onChangeFilter} />
        <button className="clear-completed" onClick={onClear}>
          Clear completed
        </button>
      </footer>
    )
  }
}
