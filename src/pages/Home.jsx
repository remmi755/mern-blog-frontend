import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { CommentsBlock } from "../components";
import {
  fetchComments,
  fetchPosts,
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchTags,
} from "../redux/slices/posts";

export const Home = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  const onSortByNewest = () => {
    dispatch(fetchSortByNewest());
  };

  const onSortByPopularity = () => {
    dispatch(fetchSortByPopularity());
  };

  const handleChange = (event, newValue) => {
    return setValue(newValue);
  };

  console.log(posts);
  console.log(tags);
  console.log(comments);

  // console.log(isPostLoading);
  return (
    <>
      <Tabs
        onChange={handleChange}
        style={{ marginBottom: 15 }}
        value={value}
        aria-label="basic tabs example"
      >
        <Tab onClick={onSortByNewest} label="New" />
        <Tab onClick={onSortByPopularity} label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts &&
            posts.items.map((obj, index) => (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                // imageUrl={
                //   obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                // }
                // imageUrl={obj.imageUrl ? obj.imageUrl : ""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user?._id}
              />
            ))}

          {/*{(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>*/}
          {/*  isPostLoading ? (*/}
          {/*    <Post key={index} isLoading={true} />*/}
          {/*  ) : (*/}
          {/*    <Post*/}
          {/*      key={index}*/}
          {/*      id={obj._id}*/}
          {/*      title={obj.title}*/}
          {/*      imageUrl={obj.imageUrl ? "obj.imageUrl" : ""}*/}
          {/*      user={obj.user}*/}
          {/*      createdAt={obj.createdAt}*/}
          {/*      viewsCount={obj.viewsCount}*/}
          {/*      commentsCount={obj.comments.length}*/}
          {/*      tags={obj.tags}*/}
          {/*      isEditable={userData?._id === obj.user?._id}*/}
          {/*    />*/}
          {/*  )*/}
          {/*)}*/}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            comments={comments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
