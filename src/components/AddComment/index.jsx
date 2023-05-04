import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/slices/posts";

export const Index = ({ id, data, setData, isLoading }) => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");

  const writeComment = (event) => {
    setComment(event.target.value);
  };

  const onSubmitComment = async () => {
    try {
      const user = {
        fullName: userData.fullName,
        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
      };

      const fields = {
        ...data,
        comments: [
          ...data.comments,
          {
            user: user,
            text: comment,
          },
        ],
      };

      await axios.post(`comments/${id}`, fields);
      setComment("");
      // setData(data);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при отправке on backend комментария!");
    }
  };
  React.useEffect(() => {
    dispatch(fetchComments());
  }, [data]);
  // console.log(data);

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            value={comment}
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
