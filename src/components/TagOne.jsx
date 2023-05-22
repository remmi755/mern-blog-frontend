import React from "react";
import Stack from "@mui/joy/Stack";
import Item from "@mui/joy/Stack";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "./Post";

const TagOne = () => {
  const [data, setData] = React.useState();
  const { name } = useParams();

  React.useEffect(() => {
    axios
      .get(`tags/${name}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении одного тега ");
      });
  }, [name]);

  const tagName = name.toUpperCase();

  return (
    <div>
      <h1>{`#${tagName}`}</h1>
      <Stack spacing={2}>
        {data?.map((obj, index) => (
          <Item key={index}>
            {" "}
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              // isEditable={userData?._id === obj.user?._id}
            />
          </Item>
        ))}
      </Stack>
    </div>
  );
};

export default TagOne;
