import Avatar from "@app/components/avatar";
import Cover from "@app/components/cover";
import Layout from "@app/components/layout";
import PostContent from "@app/components/postContent";
import TrailBack from "@app/components/trailBack";
import useUserInfo from "@app/hooks/useUserInfo";
import { likeInterface } from "@app/lib/models/like";
import { PostInterface } from "@app/lib/models/post";
import { Users } from "@app/lib/models/user";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;
  const { userInfo } = useUserInfo();
  const [user, setUser] = useState<Users | null>();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [likes, setLikes] = useState<likeInterface[]>([]);
  async function fetchUserProfile() {
    await axios.get("/api/user?handle=" + username).then((response) => {
      setUser(response.data.user);
    });
  }
  async function fetchPosts() {
    await axios.get("/api/posts?author=" + username).then((response) => {
      setPosts(response.data.posts);
      setLikes(response.data.findLike);
    });
  }

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <div>
          <TrailBack text={String(user?.username)} />
          {userInfo?._id === user?._id ? (
            <Cover
              onUpload={fetchUserProfile}
              handler="owner"
              backgroundImageSrc={String(user?.cover)}
            />
          ) : (
            <Cover backgroundImageSrc={String(user?.cover)} />
          )}

          <Avatar
            image={String(user?.image)}
            alt={user?.name}
            width={120}
            height={120}
            profile={true}
            className="rounded-full -mt-16 "
          />
        </div>
        <div className="flex flex-row justify-between items-start">
          <div className="flex-col p-2">
            <div className="font-bold text-xl">{user?.name}</div>
            <div className="text-sm text-twitterLightGray leading-3">{`@${user?.username}`}</div>
            <div className="mt-5">{user?.bio ? user?.bio : "Hey there!"}</div>
          </div>
          <div className="flex items-center p-1">
            <button className="bg-twitterBlue rounded-full px-5 py-2 text-white">
              {userInfo?._id === user?._id ? "Edit" : "Follow"}
            </button>
          </div>
        </div>
        <div className="text-xl font-bold px-2 pt-1 border-b border-twitterBlue shrink">
          Posts
        </div>
        <PostContent posts={posts} likes={likes} commentsCount={0} />
      </Layout>
    </>
  );
}
