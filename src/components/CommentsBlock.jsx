import React from "react";

import { SideBlock } from "./SideBlock";

import { stringAvatar } from './AvatarHelpers'

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListItemIcon from "@mui/material/ListItemIcon";

import { useSelector } from "react-redux";
import axios from "../axios";

export const CommentsBlock = ({
  data,
    comments,
    setComments,
  children,
  authorId,
  isLoading = true,
}) => {
  const [value, setValue] = React.useState("");
  const userDataId = useSelector((state) => state.auth.data?._id);

    const removeComment = async (value) => {
      try {
        setValue(value);
       const commentsNew = comments.filter((obj) => obj.text !== value);
          setComments(commentsNew)

        const fields = {
          ...data,
          comments: commentsNew,
        };

        await axios.post(`comments/${data._id}`, fields);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении комментария!");
      }
    };

console.log(userDataId === authorId)
console.log(userDataId)
console.log(authorId)

  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : comments)?.map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  // <Avatar alt={obj?.user.fullName} src={obj.user.avatarUrl} />
                  <Avatar {...stringAvatar(obj.user.fullName)}  />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                  value={obj.text}
                />
              )}
              {userDataId === authorId && userDataId !== undefined ? (
                <ListItemIcon
                    style={{ cursor: "pointer"}}
                  // onClick={() => onSetValue(obj.text)}
                  onClick={() => removeComment(obj.text)}
                >
                  <DeleteForeverIcon/>
                </ListItemIcon>
              ) : (
                ""
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
