import Layout from "@app/components/layout";
import PostContent from "@app/components/postContent";
import { PostInterface } from "@app/lib/models/post";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { likeInterface } from "@app/lib/models/like";
import Loader from "@app/components/loading";
import useUserInfo from "@app/hooks/useUserInfo";
import { PostForm } from "@app/components/postForm";
import TrailBack from "@app/components/trailBack";

export default function PostPage() {
  const router = useRouter();
  const [post, setPost] = useState<PostInterface | null>(null);
  const [likes, setLikes] = useState<likeInterface[]>([]);
  const [replylikes, setReplyLikes] = useState<likeInterface[]>([]);
  const [replies, setReplies] = useState<PostInterface[]>([]);
  const { id } = router.query;
  const { userInfo } = useUserInfo();

  async function fetchPost() {
    try {
      const postResponse = await axios.get(`/api/posts?id=${id}`);
      setPost(postResponse.data.post);
      setLikes(postResponse.data.like || []);

      const repliesResponse = await axios.get(`/api/posts?parent=${id}`);
      setReplies(repliesResponse.data.replies || []);
      setReplyLikes(repliesResponse.data.likes || []);
    } catch (error) {
      throw new Error("Function not implemented.");
    }
  }

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  return (
    <Layout>
      {post?._id ? (
        <div className="py-5">
          <TrailBack text="Shoot" />

          <PostContent
            posts={[post]}
            likes={likes || []}
            commentsCount={0}
            big={true}
            clipBoardPopup={() => {}}
          />

          {!!userInfo && (
            <div className="border-t border-twitterBorder">
              <PostForm
                placeholder={"Shoot something back"}
                compact="reply"
                reply={{ parent: id }}
                onPost={fetchPost}
              />
              <div className="mt-1">
                <PostContent
                  commentsCount={0}
                  posts={replies}
                  likes={replylikes}
                  clipBoardPopup={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}
