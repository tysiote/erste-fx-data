import { configureStore } from '@reduxjs/toolkit'
import FxDataReducer from './reducers/fx-data-reducer/fx-data-reducer'

export const store = configureStore({
  reducer: {
    fxData: FxDataReducer
  }
})
