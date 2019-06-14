import countries from '../data/countries'

export const getCountries = () => {
  return countries.map( ({name,code,dial_code,currency_name,currency_symbol,currency_code}) => {
    return {code, dial_code,}
  })
}

export const getCountriesCode = () => {
  return countries.map( ({name,code,dial_code,currency_name,currency_symbol,currency_code}) => {
    return {code, dial_code}
  })
}
