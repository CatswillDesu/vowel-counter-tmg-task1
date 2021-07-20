function StatsTable({ statsSet }) {
  return (
      statsSet.length ?
      (<table className="stats-table">
        <thead>
          <tr className="stats-table__headers">
            <th className="stats-table__header">
              Текст
            </th>
            <th className="stats-table__header">
              Количество слов
            </th>
            <th className="stats-table__header">
              Количество гласных
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