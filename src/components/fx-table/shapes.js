import PropTypes from 'prop-types'

export const exchangeRateShape = PropTypes.shape({
  middle: PropTypes.number.isRequired
})

export const fxShape = PropTypes.shape({
  currency: PropTypes.string.isRequired,
  nameI18N: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  exchangeRate: exchangeRateShape
})
