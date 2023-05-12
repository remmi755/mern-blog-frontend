import React from 'react';
import styles from './UserInfo.module.scss';

import Avatar from "@mui/material/Avatar";
import { stringAvatar } from '../AvatarHelpers'

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
    console.log(fullName)
  return (
    <div className={styles.root}>
      {/*  <Avatar alt={fullName} src="https://mui.com/static/images/avatar/2.jpg" />*/}
        {fullName ?
            (<Avatar  className={styles.avatar} {...stringAvatar(fullName)} />) : (
            <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
        )}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
