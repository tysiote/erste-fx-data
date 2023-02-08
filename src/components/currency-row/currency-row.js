import React from 'react'
import PropTypes from 'prop-types'
import { exchangeRateShape } from '../fx-table/shapes'
import { useStore } from 'react-redux'
import './currency-row.scss'
import useImage from './useImage'

export const CurrencyRow = ({ hasFlag, exchangeRate, abbr, name, isComplete }) => {
  const store = useStore()
  const baseCurrency = store.getState().fxData.baseCurrency
  const flagPath = `${abbr.toLowerCase().slice(0, 2)}.png`
  const { error, image } = useImage(flagPath)

  const renderFlag = () => {
    if (error) {
      return null
    }

    return <img src={image} alt={`${abbr}-img`} />
  }

  const renderExchangeRate = () => {
    const rate = exchangeRate
      ? `1 ${baseCurrency} = ${exchangeRate?.middle} ${abbr}`
      : 'Unknown exchange rate'
    return <div className="currency-rate">{rate}</div>
  }

  const currencyRowClassName = `currency-row ${isComplete ? '' : 'incomplete'}`

  return (
    <div className={currencyRowClassName}>
      <div className="currency-label-wrapper">
        {hasFlag && renderFlag()}
        <div className="currency-label">{`${abbr} ${name ? ` - ${name}` : ''}`}</div>
      </div>
      {renderExchangeRate()}
    </div>
  )
}

CurrencyRow.propTypes = {
  abbr: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  exchangeRate: exchangeRateShape,
  name: PropTypes.string,
  hasFlag: PropTypes.bool
}

CurrencyRow.defaultProps = {
  hasFlag: false,
  name: null,
  exchangeRate: null
}
