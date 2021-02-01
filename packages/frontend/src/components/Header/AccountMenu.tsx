/*
 * CS3099 Group A3
 */

import React from "react";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserIcon from "../../components/UserIcon";

interface AccountMenuProps {
  username: string;
  onLogout: () => void;
}

const AccountMenu = (props: AccountMenuProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <UserIcon username={props.username} small />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    dense
                    onClick={() => {
                      location.href = "/user/" + props.username;
                    }}
                  >
                    <PersonIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={"button"}
                    dense
                    onClick={() => {
                      location.href = "/account";
                    }}
                  >
                    <SettingsIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Settings
                  </MenuItem>
                  <MenuItem dense onClick={props.onLogout}>
                    <ExitToAppIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AccountMenu;
