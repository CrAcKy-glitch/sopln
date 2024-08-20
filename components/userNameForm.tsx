import useUserInfo from "@app/hooks/useUserInfo";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Loader from "./loading";

import React, { useEffect, useState } from "react";

export default function UsernameForm() {
  const { userInfo, status } = useUserInfo();
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const defaultUsername = userInfo?.email?.split("@")[0];
  useEffect(() => {
    if (status !== "loading" && userName === "" && defaultUsername) {
      setUserName(defaultUsername);
    }
  }, [status, userName, defaultUsername]);
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/user", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: userName }),
    });
    router.reload();
  }
  if (status == "unauthenticated") {
    return;
  }
  if (status === "loading" || !userInfo) {
    return <Loader />;
  }

  if (userInfo && !userInfo.username) {
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          Set your username
          <form className="text-center space-y-1" onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-black rounded-full bg-twitterLightGray p-3"
            />
            <button
              className="block bg-twitterBlue w-full rounded-full p-1"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </>
    );
  }
}
