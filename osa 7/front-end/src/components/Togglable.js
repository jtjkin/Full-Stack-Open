import React from 'react'
import PropTypes from 'prop-types'

import { Button } from './style-components/generalStyles'

const Togglable = (props) => {

  const hideWhenVisible = {display: props.visibility ? 'none' : ''}
  const showWhenVisible = {display: props.visibility ? '' : 'none'}

  const toggleVisibility = () => {
    props.setVisibility(!props.visibility)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable