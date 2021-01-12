import { Avatar, Grid, Menu, MenuItem, makeStyles, Divider } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { UsersContext } from '../../../context/UsersContext'
import { IUser } from '../../../model/IUser'

type UserPanelProps = {
  anchorEl: any;
  handleClose: () => void;
}

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'rgba(33,33,33,0.98)',
    color: ' white',
    padding: '15px',
    left: 950,
    '& ul': {
      minWidth: '268px'
    }
  },
  dividerColor: {
    backgroundColor: 'rgba(255,255,255,0.21)',
  },
});

const UserPanel: FC<UserPanelProps> = ({ anchorEl, handleClose }) => {

  const classes = useStyles();

  const UserState = useContext(UsersContext);

  const renderUserInfos = (): JSX.Element => {
    let user: IUser = UserState.state.users[0];
    return (
      <Grid container alignItems={"flex-start"} justify={"flex-end"} spacing={3} style={{ fontWeight: 600 }}>
        <Grid item xs={2} style={{ paddingLeft: '10px' }}>
          <Avatar src={user.avatar} />
        </Grid>
        <Grid item xs={10}>
          <Grid item>
            {`${user.lastname} ${user.firstname}`}
          </Grid>
          <Grid item>{user.email}</Grid>
          <Grid item style={{ paddingTop: '5px' }}>Gérer votre compte</Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.dividerColor} />
        </Grid>
      </Grid>
    )

  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PopoverClasses={{ paper: classes.paper }}
    >
      {renderUserInfos()}
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  )
}

export default UserPanel
