import renderer from 'react-test-renderer'
import { FxTable } from './fx-table'
import { Provider } from 'react-redux'
import { store } from '../../services/redux/store'

const testData = [
  {
    currency: 'USD',
    nameI18N: 'US Dollar',
    exchangeRate: {
      buy: 1,
      middle: 1.1,
      sell: 1.2
    },
    flags: ['provided'],
    precision: 2
  },
  {
    currency: 'MXN',
    nameI18N: 'Mexican Peso',
    exchangeRate: {
      buy: 22,
      middle: 23,
      sell: 24
    }
  },
  {
    currency: 'LVL',
    exchangeRate: {
      buy: 0.6,
      middle: 0.7,
      sell: 0.8
    },
    flags: ['provided']
  },
  {
    currency: '',
    exchangeRate: {
      buy: 0.6,
      middle: 0.7,
      sell: 0.8
    },
    flags: ['provided']
  },
  {
    currency: 'CZK'
  }
]

it('display the correct number of elements', () => {
  const component = renderer.create(
    <Provider store={store}>
      <FxTable initialData={testData} />
    </Provider>
  )
  // first child there is always Label (switch component)
  // 4th item (5th child) should not be displayed (currency not specified)
  // 5th item (6th child) should not be displayed (exchange rate not specified and is hidden by default)
  expect(component.toJSON().children.length).toBe(4)

  const firstCurrencyLabelWrapper = component.toJSON().children.at(1).children.at(0)
  expect(firstCurrencyLabelWrapper.children.length).toBe(2) // should contain flag and label

  const secondCurrencyLabelWrapper = component.toJSON().children.at(2).children.at(0)
  expect(secondCurrencyLabelWrapper.children.length).toBe(1) // should contain label only
})
