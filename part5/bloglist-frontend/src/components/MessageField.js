const MessageField = (props) => {
  if (props.errorMessage)
    return (
      <div className='error'>
        {props.errorMessage}
      </div>
    )
  if (props.infoMessage)
    return (
        <div className='info'>
          {props.infoMessage}
        </div>
    )
  return (
    <div>
    </div>
  )
}

export default MessageField
