function NotificationFooter({ errorMessage, invalidIds }) {
  return (
    errorMessage ? 
    (<footer className="notification">
      { errorMessage }
      { 
        invalidIds.length ? 
        (<span className="notification__invalid-values">Неверные идентификаторы строк: { invalidIds.join(', ') }</span>) : ''
      }
    </footer>) : ''
  )
}

export default NotificationFooter