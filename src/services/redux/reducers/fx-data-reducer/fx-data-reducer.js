import { createSlice } from '@reduxjs/toolkit'

export const fxDataReducer = createSlice({
  name: 'fx-data',
  initialState: {
    data: [],
    filteredData: [],
    baseCurrency: ''
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload
    },
    filterData: (state, action) => {
      state.filteredData = action.payload
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload
    }
  }
})

export const { updateData, filterData, setBaseCurrency } = fxDataReducer.actions
export default fxDataReducer.reducer
