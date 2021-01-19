import React, { useEffect, useState } from 'react';
import { Avatar, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { ChatRounded, DonutLargeRounded, MoreVert, Search } from '@material-ui/icons';
import SidebarRow from './SidebarRow';
import db, { auth } from '../config/firebase';
import { useStateValue } from '../Context/StateProvider';
import './Sidebar.css';

const ITEM_HEIGHT = 54;

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const createChat = () => {
    setAnchorEl(null);
    const roomName = prompt('Enter Room Name: ');
    if (roomName?.trim()) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };
  const signout = () => {
    setAnchorEl(null);
    auth.signOut();
  };

  return (
    <div className="sidebar">
      <Grid className="sidebar__header" container direction="row">
        <Grid className="sidebar__avatar" item sm={2}>
          <Avatar
            src={`${user?.photoURL ? user?.photoURL : ''}`}
            alt={`${user?.displayName ? user?.displayName : 'User'}`}
          />
        </Grid>
        <Grid item sm={2} />
        <Grid item sm={2} />
        <Grid container item sm={6}>
          <Grid item sm={3} />
          <Grid item sm={3}>
            <IconButton>
              <DonutLargeRounded className="sidebar__icon" />
            </IconButton>
          </Grid>
          <Grid item sm={3}>
            <IconButton>
              <ChatRounded className="sidebar__icon" />
            </IconButton>
          </Grid>
          <Grid item sm={3}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert className="sidebar__icon" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={createChat}>Create A Room</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
              <MenuItem onClick={signout}>Log out</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <Search />
          <input type="text" placeholder="Search or Start New Chat" />
        </div>
      </div>
      <div className="sidebar__Chats">
        {rooms.map(({ id, data }) => (
          <SidebarRow key={id} id={id} name={data?.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
