import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    onChangeFilter: () => {},
  }
  static propTypes = {
    onChangeFilter: PropTypes.func,
  }

  state = {
    filters: ['all', 'active', 'completed'],
    activeFilter: 'all',
  }

  handleClick = (event) => {
    const newFilter = event.target.innerText.toLowerCase()
    this.setState(({ filters }) => {
      return {
        filters,
        activeFilter: newFilter,
      }
    })
    this.props.onChangeFilter(newFilter)
  }
  render() {
    const { filters, activeFilter } = this.state
    const filterElements = filters.map((filter, id) => {
      return (
        <li key={id}>
          <button className={filter === activeFilter ? 'selected' : ''} onClick={this.handleClick}>
            {filter[0].toUpperCase() + filter.slice(1)}
          </button>
        </li>
      )
    })
    return <ul className="filters">{filterElements}</ul>
  }
}
