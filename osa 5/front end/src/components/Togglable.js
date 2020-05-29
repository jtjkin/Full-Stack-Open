import React /*, {useState, useImperativeHandle}*/ from 'react'
import PropTypes from 'prop-types'

const Togglable = /*React.forwardRef(*/(props, /*ref*/) => {
  //const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: props.visibility ? 'none' : ''}
  const showWhenVisible = {display: props.visibility ? '' : 'none'}

  const toggleVisibility = () => {
    props.setVisibility(!props.visibility)
  }

  /*
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  */

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}/*)*/

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable