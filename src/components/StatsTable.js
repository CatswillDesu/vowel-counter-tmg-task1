function StatsTable({ statsSet }) {
  return (
      statsSet.length ?
      (<table className="stats-table">
        <thead className="stats-table__table-head">
          <tr className="stats-table__row stats-table__headers">
            <th className="stats-table__header stats-row__text">
              Текст
            </th>
            <th className="stats-table__header stats-row__words-count">
              <span className="hidden-sm">Количество</span> слов
            </th>
            <th className="stats-table__header stats-row__vowels-count">
              <span className="hidden-sm">Количество</span> гласных
            </th>
          </tr>
        </thead>
        <tbody>
        { statsSet.map(({ text, words, vowels }) => (
          <tr className="stats-table__row stats-row" key={text.length + words * vowels}>
            <td className="stats-item stats-row__text">{ text }</td>
            <td className="stats-item stats-row__words-count">{ words }</td>
            <td className="stats-item stats-row__vowels-count">{ vowels }</td>
          </tr>
        )) }
        </tbody>
      </table>) : ''
  )
}

export default StatsTable