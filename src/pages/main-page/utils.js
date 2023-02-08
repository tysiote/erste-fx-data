export const filterDataByKeyword = (data, keyword) =>
  data.filter(
    (item) =>
      item.currency?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.nameI18N?.toLowerCase().includes(keyword.toLowerCase())
  )

// I consider data without specified currency as not necessary to even bother with ...
// There are also data without the exact exchange rate specified - I can filter them out here, but I decided to show them anyway
// I also assume we don't want to see EUR to EUR comparison
export const processFetchedFxData = (fxData, baseCurrency) =>
  fxData.filter((item) => item.currency?.trim().length && item.currency !== baseCurrency)

export const stripHashtagFromHash = (hash) => hash.slice(1)
