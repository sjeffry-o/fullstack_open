import { useState, forwardRef, useImperativeHandle } from 'react'

const TogglableBlog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {props.blog.title} {props.blog.author}<button id="showButton" onClick={toggleVisibility}> {props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.blog.title} {props.blog.author}
        <button onClick={toggleVisibility}>hide</button>
        {props.children}
      </div>
    </div>
  )
})

export default TogglableBlog
