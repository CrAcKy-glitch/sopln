import { Users } from "@app/lib/models/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState<Users | null>();
  const [userInfoStatus, setUserInfoStatus] = useState<String>("loading");
  async function getUserInfo() {
    if (status === "loading") return;

    await fetch("/api/user?id=" + session?.user?.id).then((response) => {
      response.json().then((data) => {
        setUserInfo(data.user);
        setUserInfoStatus("true");
      });
    });
  }
  useEffect(() => {
    getUserInfo();
  }, [status]);

  return { userInfo, status, setUserInfo };
}
