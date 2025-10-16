function Messages( {messages } ) {
    return <>
        {messages.map((message) => {
            return <div key={message.id} >
                Name: {message.author}
                <br />
                Message: {message.message}
                <br />
                <br />
            </div>
        })}
    </>
}

export default Messages;