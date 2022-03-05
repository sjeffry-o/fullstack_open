import '../index.css'

const NotificationAck = ({ message }) => {
	if (message === null)
		return null
	if (message.startsWith("error"))
		return (
			<div className="error">
				{message}
			</div>
		)
	return (
		<div className="ack">
			{message}
		</div>
	)
}

export default NotificationAck
