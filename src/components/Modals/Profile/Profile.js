import React, { Component } from "react";
import classNames from "classnames";

import "./Profile.css";
import { Tab, Tabs, Label } from "@blueprintjs/core";

import Stats from "./Stats";
import History from "./History";
import Settings from "./Settings";

const headerBackground = function(user) {
  return {
    background: `url('${user.profileBackgroundURL}') center no-repeat`
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavbar: props.showNavbar || true,
      navbarTab: props.navbarTab || "Stats",
      user: props.user || {
        avatarurl:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/57/573f45615e0fe0e8dcbcd835538fa404994f5529_full.jpg",
        username: "Tacyarg | vgodogg.com",
        profileBackgroundURL:
          "https://media.giphy.com/media/KVZWZQoS0yqfIiTAKq/giphy.gif",
        steamProfileURL: "https://steamcommunity.com/id/tacyarg2/",
        steamid: "76561198403312375",
        tradeURL: "https://trade.opskins.com/t/3667841/6eX2NLWh"
      }
    };
  }

  handleTabChange(navbarTab) {
    return this.setState({ navbarTab });
  }

  render() {
    var { user, navbarTab } = this.state;
    var { showNavbar, callAction } = this.props;

    return (
      <div className="Profile-content">
        <div className="Profile-content-header">
          <img
            className="Profile-content-header-avatar"
            src={user.avatarurl}
            alt={user.username}
          />
          <div className="Profile-content-header-userdetails">
            <span className="Profile-content-header-username">
              {user.username}
            </span>
            <span className="Profile-content-header-steamurl">
              <b>SteamID:</b> {user.steamid}
            </span>
            {/* <span className="Profile-content-header-steamurl"><b>ProfileURL:</b> <a target="_Blank" href={user.steamProfileURL}>{user.steamProfileURL}</a></span> */}
          </div>
        </div>
        <div className="Profile-content-body">
          {showNavbar ? (
            <Tabs
              className="Profile-content-body-navbar"
              large={true}
              animate={true}
              onChange={this.handleTabChange.bind(this)}
              selectedTabId={navbarTab}
              renderActiveTabPanelOnly={true}
            >
              <Tab id="Stats" title="Stats" panel={<Stats />} />
              <Tab
                id="History"
                title="History"
                panel={<History callAction={callAction} />}
              />
              <Tab
                id="Settings"
                title="Settings"
                panel={<Settings callAction={callAction} user={user} />}
              />
            </Tabs>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Profile;
