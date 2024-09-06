import { DeveloperNotes } from "@app/components/developerNotes";
import Layout from "@app/components/layout";
import PostContent from "@app/components/postContent";
import { PostForm } from "@app/components/postForm";
import { RightLayout } from "@app/components/rightLayout";
import UsernameForm from "@app/components/userNameForm";
import useUserInfo from "@app/contexts/useUserInfo";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ClipBoardPopup } from "@app/components/copiedToClipboard";
import React, { useEffect, useState } from "react";
import { useClipBoardPopup } from "@app/contexts/useClipBoard";

export function TextMode() {
  const { status, userInfo, setUserInfo } = useUserInfo();
  const [posts, setPosts] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const { clipBoardPopup, setClipBoardPopup } = useClipBoardPopup();

  async function getPosts() {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data.allPosts);
      setLikes(response.data.findLike);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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
    return <div>Loading User Info</div>;
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div className="flex flex-row left-0">
      <RightLayout>
        <DeveloperNotes />
      </RightLayout>
      <Layout>
        <PostForm onPost={getPosts} placeholder={"Shoot Your Question Here"} />
        <div className="all-posts">
          <PostContent
            posts={posts}
            likes={likes}
            commentsCount={0}
            clipBoardPopup={setClipBoardPopup}
          />
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
      <div className={clipBoardPopup ? "visible" : "invisible"}>
        <ClipBoardPopup />
      </div>
    </div>
  );
}

export default TextMode;
