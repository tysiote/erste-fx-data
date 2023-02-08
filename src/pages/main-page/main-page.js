import React, { useEffect, useState } from 'react'
import './main-page.scss'
import { useDispatch } from 'react-redux'
import {
  updateData,
  filterData,
  setBaseCurrency
} from '../../services/redux/reducers/fx-data-reducer/fx-data-reducer'
import { FxTable, SearchBar } from '../../components'
import { filterDataByKeyword, processFetchedFxData } from './utils'
import { useStore } from 'react-redux'
import { useHash } from './useHash'

const URL = 'https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343'

export const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const [errorFetching, setErrorFetching] = useState(false)
  const [hash, updateHash] = useHash()
  const [searchedKeyword, setSearchedKeyword] = useState(hash ?? '')
  const dispatch = useDispatch()
  const store = useStore()
  const data = store.getState().fxData.data

  useEffect(() => {
    fetch(URL)
      .then((result) => {
        if (result.ok) {
          result.json().then((fetchedData) => {
            console.log(fetchedData)
            setLoading(false)
            // I can throw out the rest of data, since I don't need it for this project
            const dataToStore = processFetchedFxData(fetchedData.fx)
            dispatch(updateData(dataToStore))
            dispatch(setBaseCurrency(fetchedData.baseCurrency))
            dispatch(
              filterData(
                searchedKeyword ? filterDataByKeyword(dataToStore, searchedKeyword) : dataToStore
              )
            )
          })
        } else {
          setErrorFetching(true)
          setLoading(false)
        }
      })
      .catch((err) => {
        setErrorFetching(true)
        setLoading(false)
        console.log(err)
      })
  }, [])

  function handleOnSearchChange(newValue) {
    setSearchedKeyword(newValue)
    const newFilteredData = filterDataByKeyword(data, newValue)

    dispatch(filterData(newFilteredData))
    updateHash(newValue)
  }

  const renderLoadingStatus = () => {
    return <div className="loading">Loading . . .</div>
  }

  const renderErrorStatus = () => {
    return <div className="error">Error fetching</div>
  }

  const renderStatus = () => {
    if (errorFetching) {
      return renderErrorStatus()
    }

    if (loading) {
      return renderLoadingStatus()
    }
  }

  const renderSearchInfo = () => {
    if (!searchedKeyword?.length) {
      return null
    }

    return (
      <div className="search-info">{`Displaying only currencies including ${searchedKeyword}:`}</div>
    )
  }

  const renderFxTable = () => {
    return <FxTable />
  }

  const displayingCurrencies = !loading && !errorFetching

  return (
    <div className="main-page">
      <div className="header">George FE Test</div>
      <div className="search-bar-wrapper">
        <SearchBar disabled={loading} initialValue={hash} onChange={handleOnSearchChange} />
      </div>
      {renderStatus()}
      {displayingCurrencies && renderSearchInfo()}
      {displayingCurrencies && renderFxTable()}
    </div>
  )
}
