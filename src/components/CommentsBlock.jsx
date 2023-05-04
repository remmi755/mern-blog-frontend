import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useSelector } from "react-redux";
import axios from "../axios";

export const CommentsBlock = ({
  data,
  items,
  children,
  authorId,
  isLoading = true,
}) => {
  const [value, setValue] = React.useState("");
  // const [comments, setComments] = React.useState(items);
  const userDataId = useSelector((state) => state.auth.data?._id);

  const onSetValue = (comment) => {
    setValue(comment);
  };

  console.log(value);

  React.useEffect(() => {
    const removeComment = async () => {
      try {
        const comments = items.filter((obj) => obj.text !== value);

        console.log(comments);

        // setComments(comments);

        const fields = {
          ...data,
          comments: comments,
        };

        await axios.post(`comments/${data._id}`, fields);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении комментария!");
      }
    };
    removeComment();
  }, [value]);

  console.log(items);

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items)?.map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj?.user.fullName} src={obj.user.avatarUrl} />
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
              {userDataId === authorId ? (
                <ListItemIcon
                  onClick={() => onSetValue(obj.text)}
                  // onClick={() => setValue(obj.text)}
                >
                  <AddIcon />
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
