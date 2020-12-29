import React from "react";
import "../styles/Header.css";
import { Avatar } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import SearchIcon from "@material-ui/icons/Search";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useStateValue } from "./../StateProvider";

const Header = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessAlarmIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input placeholder="wyszukaj" />
      </div>
      <div className="header__right">
        <ContactSupportIcon />
      </div>
    </div>
  );
};
export default Header;
