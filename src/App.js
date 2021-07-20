import { useState } from 'react'
import axios from 'axios'

import { apiUrl, apiKey } from './util'
import { getWordsCount, getVowelsCount } from './util/vowels'

import InputHeader from './components/InputHeader'
import StatsTable from './components/StatsTable'
import NotificationFooter from './components/NotificationFooter'

import './assets/styles.css'

function App() {
  const [idsInput, changeIdsInput] = useState('') // could be replaced with redux store (or mobx) but I feel like there would be too much excessive architecture for this kind of small app  
  const [invalidIds, setInvalidIds] = useState([])
  const [statisticsSet, setStatisticsSet] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = ({ target }) => changeIdsInput(target.value)

  const getStringById = async (id) => {
    try {
      const { data: { text: string } } = await axios.get(`${apiUrl}/textstrings/${+id}`, { headers: {
        'TMG-Api-Key': apiKey
      } })
      return string
    } catch (err) {
      console.log(invalidIds)
      if (!invalidIds.length) { // skip if there's already validation warning
        setErrorMessage('Произошла ошибка во время получения текста с сервера. Пожалуйста, проверьте ваше соединение и попробуйте еще раз.')
      }
    }
  }

  const countVowels = async (e) => {
    e.preventDefault()

    setStatisticsSet([]) // reset outdated state values
    setInvalidIds([])
    setErrorMessage('')
    setIsLoading(true)

    let identifiers = idsInput.split(',').filter(id => !!id.trim()) // split and trim from spaces input string
    identifiers = [...new Set(identifiers)] // avoid basic duplicates
    identifiers = identifiers.reduce((ids, id) => {
      if (!(ids.findIndex(idItem => !isNaN(idItem) && +idItem === +id) > -1)) {
        ids.push(id)
      }
      return ids
    }, []) // aviod number converted duplicates

    if (!identifiers.length) {
      setErrorMessage('Введите индентификаторы для того, чтобы сгенерировать текст.')
      setIsLoading(false)
      return 
    }

    const invalidIdentifiers = identifiers.filter(id => isNaN(id) || id < 1 || id > 20)
    if (invalidIdentifiers.length) { // show error message, but continue with valid values
      setErrorMessage('Ошибка валидации. Пожалуйста, введите идентификаторы в верном формате (от 1 до 20).')
      setInvalidIds(invalidIdentifiers)
    }

    const strings = [] // fetch strings from api by its id's
    for (let i = 0; i < identifiers.length; i++) {
      const string = await getStringById(identifiers[i])
      if (string) {
        strings.push(string)
      }
    }

    const stats = strings.reduce((statsSet, string) => { // get statistics object with string value and counts
      statsSet.push({
        text: string,
        words: getWordsCount(string),
        vowels: getVowelsCount(string)
      })

      return statsSet
    }, [])

    setIsLoading(false)
    setStatisticsSet(stats)
  } 

  return (
    <div className="app">
      <div className="container">
        <InputHeader idsInput={idsInput} handleInputChange={handleInputChange} handleCount={countVowels} isLoading={isLoading} />
        <StatsTable statsSet={statisticsSet} />
        <NotificationFooter errorMessage={errorMessage} invalidIds={invalidIds} />
      </div>
    </div>
  )
}

export default App
