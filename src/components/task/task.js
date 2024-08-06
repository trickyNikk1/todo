import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default function Task({
  onPlay = () => {},
  onStop = () => {},
  onDeleted = () => {},
  onEdit = () => {},
  onSubmit = () => {},
  onScratched = () => {},
  title: defaultTitle = '',
  status = '',
  timer = 0,
  num = '',
  time = new Date(),
}) {
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(time, { includeSeconds: true }))
  const [title, setTitle] = useState(defaultTitle)
  useEffect(() => {
    const intervalId = setInterval(() => setTimeAgo(formatDistanceToNow(time, { includeSeconds: true })), 5000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  const handleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(title, num)
  }
  const formatTimer = (min, sec) => {
    const minStr = Math.trunc(min / 10) ? `${min}` : `0${min}`
    const secStr = Math.trunc(sec / 10) ? `${sec}` : `0${sec}`
    return minStr + ':' + secStr
  }

  const timeAgoText = 'created ' + timeAgo + ' ago'
  const id = 'checkbox-' + num
  const min = Math.trunc(timer / 60)
  const sec = timer - min * 60
  const task = (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} onClick={onScratched} defaultChecked={status === 'completed'} />
      <label htmlFor={id}>
        <span className="title">{title}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onPlay}></button>
          <button className="icon icon-pause" onClick={onStop}></button>
          {formatTimer(min, sec)}
        </span>
        <span className="description">{timeAgoText}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit} />
      <button className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
  const taskForm = (
    <div>
      <form onSubmit={handleSubmit} onBlur={handleSubmit}>
        <input className="edit" onChange={handleChange} value={title} autoFocus></input>
      </form>
    </div>
  )
  return status === 'editing' ? taskForm : task
}
Task.propTypes = {
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  onScratched: PropTypes.func,
  title: PropTypes.string,
  status: PropTypes.string,
  timer: PropTypes.number,
  num: PropTypes.string,
  time: PropTypes.instanceOf(Date),
}
