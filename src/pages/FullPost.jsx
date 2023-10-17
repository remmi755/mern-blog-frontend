import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import axios from "../axios";

import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setComments(res.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting article");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `https://mern-blog-hpx8.onrender.com${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isEditable
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        data={data}
        comments={comments}
        setComments={setComments}
        isLoading={false}
        authorId={data.user._id}
      >
        <Index
          id={data._id}
          data={data}
          comments={comments}
          setComments={setComments}
        />
      </CommentsBlock>
    </>
  );
};
