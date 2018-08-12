import React, { Component } from 'react'
import './Chat.css'

import {
  Tag,
} from "@blueprintjs/core"

class Chat extends Component {
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" })
  }
  
  componentDidMount() {
    this.scrollToBottom()
  }
  
  componentDidUpdate() {
    this.scrollToBottom()
  }

  sendMessage(e) {
    if(e.key !== 'Enter') return
    this.props.callAction('sendChatMessage', {
      message: this.input.value
    })
    this.input.value = ""
  }

  render() {
    const { messages, stats } = this.props
    return (
      <div className="chat">
        <div className="chat-header">
          <Tag
            minimal={true}
            large={true}
          >
            <b>Opened:</b> {stats.allTime.cases.opened} <b>Total Value:</b> ${stats.allTime.cases.totalValue.toFixed(2)}
          </Tag>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => {
            var htmlMessage = { __html: message.message }
            return (
              <div className="message" key={message.id}>
                <div className="user">
                  <img className="avatar" src={message.user.avatarurl} alt={message.user.username} />
                  <div className="username">{message.user.username}</div>
                </div>
                <div className="message-message" dangerouslySetInnerHTML={htmlMessage}></div>
              </div>
            )
          })}
          {/* fake div to allow scroll to bottom... */}
          <div ref={el => { this.el = el; }} />
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Say something..." 
            onKeyUp={this.sendMessage.bind(this)}
            ref={(node) => (this.input = node)}
          />
        </div>
      </div>
    )
  }
}

export default Chat;

