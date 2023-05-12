import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useSelector } from "react-redux";

export const Index = ({ id, data, comments, setComments }) => {
  const userData = useSelector((state) => state.auth.data);
  const [commentAdd, setCommentAdd] = React.useState("");

  const writeComment = (event) => {
    setCommentAdd(event.target.value);
  };

  const onSubmitComment = async () => {
    try {
      if(commentAdd) {
        const user = {
          fullName: userData.fullName,
          avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
        };

        const fields = {
          ...data,
          comments: [
            ...comments,
            {
              user: user,
              text: commentAdd,
            },
          ],
        };

        setComments(fields.comments)

        await axios.post(`comments/${id}`, fields);
        setCommentAdd('');
      }
    } catch (err) {
      console.warn(err);
      alert("Ошибка при отправке on backend комментария!");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            value={commentAdd}
            onChange={(e) => writeComment(e)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmitComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
