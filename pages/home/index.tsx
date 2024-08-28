import Layout from "@app/components/layout";
import PostContent from "@app/components/postContent";
import { PostForm } from "@app/components/postForm";
import UsernameForm from "@app/components/userNameForm";
import useUserInfo from "@app/hooks/useUserInfo";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function Home() {
  const { status, userInfo, setUserInfo } = useUserInfo();
  const [posts, setPosts] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const router = useRouter();
  async function getPosts() {
    const posts = await axios.get("/api/posts").then((posts) => {
      setPosts(posts.data.allPosts);
      setLikes(posts.data.findLike);
    });
  }
  async function logout() {
    if (userInfo?._id) {
      setUserInfo(null);
      await signOut();
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (status === "loading") {
    return (
      <>
        <div>Loading User Info</div>
      </>
    );
  }
  if (!userInfo?.username) {
    return (
      <>
        <div>
          <UsernameForm />
        </div>
      </>
    );
  }
  return (
    <Layout>
      <h1 className="py-4">
        <Image
          src={"/sopln.jpeg"}
          alt="logo"
          width={150}
          height={150}
          className="rounded-xl"
        />
      </h1>
      <PostForm onPost={getPosts} placeholder={"Shoot Your Question Here"} />
      <div className="all-posts">
        <PostContent posts={posts} likes={likes} commentsCount={0} />
      </div>
      <div className="justify-center flex py-2">
        <button
          className="bg-twitterWhite text-black px-5 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}

export default Home;
