import Spinner from './Spinner'

function InputHeader({ idsInput, handleInputChange, handleCount, isLoading }) {
  return (
    <form className="identifiers-form">
      <label className="identifiers-form__label" htmlFor="id-input">Идентификаторы строк:</label>
      <input 
        className="identifiers-form__input" 
        id="id-input"
        value={idsInput}
        onChange={handleInputChange}
      />
      <button className="identifiers-form__count-btn" onClick={handleCount}>{ isLoading ? <Spinner /> : 'Подсчитать' }</button>
    </form>
  )
}

export default InputHeader