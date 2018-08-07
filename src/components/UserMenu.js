import React, { Component } from 'react'
import { Menu } from '@blueprintjs/core'

class UserMenu extends Component {
  render() {

    const {auth} = this.props

    return (
      <Menu
        // large={true}
      >
        <Menu.Item text="Profile" icon="user" />
        <Menu.Item text="Settings" icon="cog" />
        <Menu.Item text="My Cases" icon="box" />
        <Menu.Divider />
        <Menu.Item text="Logout" icon="log-out" onClick={auth.logout} />
      </Menu>
    )
  }
}

export default UserMenu

