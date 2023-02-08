import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import './search-bar.scss'

export const SearchBar = ({ initialValue, onChange, disabled }) => {
  const [value, setValue] = useState(initialValue)

  function handleOnValueChange(event) {
    const newValue = event.target.value
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <TextField
          id="search-input"
          label="Search"
          variant="standard"
          value={value}
          onChange={handleOnValueChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool
}

SearchBar.defaultProps = {
  initialValue: '',
  disabled: false
}
