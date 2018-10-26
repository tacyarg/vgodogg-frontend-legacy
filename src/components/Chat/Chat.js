import React, { Component } from 'react'
import './Chat.css'
import {
  AnchorButton,
  Classes,
  ContextMenu,
  ContextMenuTarget,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import classNames from 'classnames'

import Modal from '../Modal/Modal'
import Profile from '../Profile/Profile'

const Message = ({ onClick, message, onContextMenu }) => {
  var htmlMessage = { __html: message.message }
  return (
    <div
    onClick={onClick}
      className="Chat-message bp3-dark"
      style={{ color: 'white', background: '#182026' }}
      key={message.id}
      onContextMenu={onContextMenu}
    >
      <div className="Chat-user">
        <img
          className="Chat-avatar"
          src={message.user.avatarurl}
          alt={message.user.username}
        />
        <div className="Chat-username">{message.user.username}</div>
      </div>
      <div
        className="Chat-message-message"
        dangerouslySetInnerHTML={htmlMessage}
      />
    </div>
  )
}

const AdminMenu = ({ user, message, callAction }) => {
  const minute = 60 * 1000
  const hour = 60 * minute
  const muteUser = function(userid, muteTime) {
    return callAction('setUserMuted', { userid, muteTime })
  }

  return (
    <Menu
      className="bp3-dark"
      style={{ color: 'white', background: '#10161A' }}
    >
      {/* <MenuItem icon="cross" text="Ban" /> */}
      <MenuItem
        icon="graph-remove"
        text="Mute (5 Min)"
        onClick={e => muteUser(message.user.id, 5 * minute)}
      />
      <MenuItem
        icon="graph-remove"
        text="Mute (20 Min)"
        onClick={e => muteUser(message.user.id, 20 * minute)}
      />
      <MenuItem
        icon="graph-remove"
        text="Mute (1 Hr)"
        onClick={e => muteUser(message.user.id, hour)}
      />
      <MenuItem
        icon="graph-remove"
        text="Mute (24 Hr)"
        onClick={e => muteUser(message.user.id, 24 * hour)}
      />
      <MenuItem
        icon="graph-remove"
        text="Fuck this guy"
        onClick={e => muteUser(message.user.id, 9999999 * hour)}
      />
      {/* <MenuItem icon="delete" text="Delete" /> */}
      {/* <MenuItem icon="history" text="Clear" /> */}
      <MenuDivider />
      <MenuItem disabled={true} text={message.user.username} />
    </Menu>
  )
}

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isContextMenuOpen: false,
      modalContent: null,
      modalProps: null
    }
  }

  // MODAL FUNCTIONS

  openModal = (component, props = {}) => {
    // if not component is provided, just toggle.
    if (component) {
      this.setState({
        modalContent: component,
        modalProps: props
      })
    }

    this.modal.toggleOverlay()
  }

  openProfile = (userid) => {
    this.openModal(Profile, {userid})
  }

  showContextMenu = (e, message) => {
    console.log(message)
    // must prevent default to cancel parent's context menu
    e.preventDefault()
    // invoke static API, getting coordinates from mouse event
    ContextMenu.show(
      <AdminMenu
        user={this.props.user}
        message={message}
        callAction={this.props.callAction}
      />,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    )
    // indicate that context menu is open so we can add a CSS class to this element
    this.setState({ isContextMenuOpen: true })
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  sendMessage(e) {
    if (e.key !== 'Enter') return
    this.props.callAction('sendChatMessage', {
      message: this.input.value,
    })
    this.input.value = ''
  }

  render() {
    const { modalContent } = this.state
    const {
      messages,
      stats,
      user,
      actions,
      auth,
      callAction,
      serverState,
    } = this.props
    return (
      <div className="Chat-wrapper">
        <Modal
          {...this.state.modalProps}
          onRef={ref => (this.modal = ref)}
          InnerComponent={modalContent}
          auth={auth}
          callAction={callAction}
          serverState={serverState}
          onSubmit={this.openModal}
        />
        <div
          className="Chat-header bp3-dark"
          style={{ color: 'white', background: '#10161A' }}
        >
          <div className="Chat-header-stats">
            <span>
              <b>Opened:</b> {stats.allTime.cases.opened.toLocaleString()}
            </span>
            <span>
              <b>Rewarded:</b> {stats.allTime.cases.totalValue.toLocaleString()}
            </span>
          </div>
          <div className="Chat-header-social">
            <AnchorButton
              minimal={true}
              icon={<FaTwitter />}
              target="_blank"
              href="https://twitter.com/VgoDogg"
            />
            <AnchorButton
              minimal={true}
              icon={<FaDiscord />}
              target="_blank"
              href="https://discord.gg/rhqgyxT"
            />
          </div>
        </div>
        <div className="Chat-body">
          {messages.map((message, index) => {
            return (
              <Message
                onClick={e => {
                  this.openProfile(message.user.id)
                }}
                message={message}
                onContextMenu={e => {
                  if (!user.admin) return
                  this.showContextMenu(e, message)
                }}
              />
            )
          })}
          {/* fake div to allow scroll to bottom... */}
          <div
            ref={el => {
              this.el = el
            }}
          />
        </div>
        <div
          className="Chat-input-wrapper"
          style={{ color: 'white', background: '#10161A' }}
        >
          <input
            style={{ color: 'white', background: '#182026' }}
            disabled={!user}
            className="Chat-input"
            type="text"
            placeholder="Say something..."
            onKeyUp={this.sendMessage.bind(this)}
            ref={node => (this.input = node)}
          />
        </div>
      </div>
    )
  }
}

export default Chat
