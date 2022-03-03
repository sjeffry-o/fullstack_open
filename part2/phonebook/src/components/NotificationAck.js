import '../index.css'

const NotificationAck = ({ message }) => {
	if (message === null)
		return null
	return (
		<div className="ack">
			{message}
		</div>
	)
}

export default NotificationAck
