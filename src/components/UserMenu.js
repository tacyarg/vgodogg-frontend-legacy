import React, { Component } from 'react'
import { Menu } from '@blueprintjs/core'

class UserMenu extends Component {
  render() {
    return (
      <Menu
        // large={true}
      >
        <Menu.Item text="Profile" icon="person" />
        <Menu.Item text="Settings" icon="cog" />
        <Menu.Divider />
        <Menu.Item text="Logout" icon="log-out" />
      </Menu>
    )
  }
}

export default UserMenu

