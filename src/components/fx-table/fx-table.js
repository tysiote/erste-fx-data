import React, { useState } from 'react'
import { useStore } from 'react-redux'
import PropTypes from 'prop-types'
import { fxShape } from './shapes'
import { CurrencyRow } from '../currency-row'
import { FormControlLabel, Switch } from '@mui/material'

import './fx-table.scss'

// initialData for testing purposes
export const FxTable = ({ initialData }) => {
  const store = useStore()
  const [showIncomplete, setShowIncomplete] = useState(false)
  const data = initialData ?? store.getState().fxData.filteredData

  function handleOnIncompleteChange(event) {
    setShowIncomplete(event.target.checked)
  }

  const renderNoData = () => {
    return <div className="no-data">There is no data to be displayed</div>
  }

  const renderIncompleteSwitch = () => {
    return (
      <FormControlLabel
        id="currency-switch"
        data-testid="currency-switch"
        control={<Switch checked={showIncomplete} onChange={handleOnIncompleteChange} />}
        label="Show unknown rates"
      />
    )
  }

  const renderCurrencyRows = () => {
    return data.map((item) => {
      const { currency: abbr, nameI18N: name, exchangeRate, flags } = item
      const isComplete = !!(abbr && exchangeRate)
      if (!showIncomplete && !isComplete) {
        return null
      }

      return (
        <CurrencyRow
          isComplete={isComplete}
          name={name}
          abbr={abbr}
          exchangeRate={exchangeRate}
          hasFlag={!!flags}
          key={`currency-row-${abbr}`}
        />
      )
    })
  }

  return (
    <div className="fx-table">
      {data?.length ? (
        <>
          {renderIncompleteSwitch()}
          {renderCurrencyRows()}
        </>
      ) : (
        renderNoData()
      )}
    </div>
  )
}

FxTable.propTypes = {
  initialData: PropTypes.arrayOf(fxShape)
}

FxTable.defaultProps = {
  initialData: null
}
