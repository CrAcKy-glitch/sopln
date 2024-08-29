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
  const { userInfo, setUserInfo } = useUserInfo();
  const [user, setUser] = useState<Users | null>();
  const [originalUser, setOriginalUser] = useState<Users | null>();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [likes, setLikes] = useState<likeInterface[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [canFetchFollow, setCanFetchFollow] = useState<boolean>(false);
  const isProfile = userInfo?._id === user?._id;
  async function fetchUserProfile() {
    await axios.get("/api/user?handle=" + username).then((response) => {
      setUser(response.data.user);
      setOriginalUser(response.data.user);
    });
  }
  async function fetchPosts() {
    await axios.get("/api/posts?author=" + username).then((response) => {
      setPosts(response.data.posts);
      setLikes(response.data.findLike);
      setCanFetchFollow(true);
    });
  }
  async function fetchFollow() {
    await axios
      .post("/api/follow", {
        targetUser: user?._id,
        fetch: true,
      })
      .then((response) => {
        response.data ? setIsFollowing(true) : setIsFollowing(false);
      });
  }

  async function updateProfile() {
    editMode();
    await axios.put("/api/profile", {
      bio: user?.bio,
      name: user?.name,
    });
    setUserInfo((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        bio: user?.bio || prev.bio,
        name: user?.name || prev.name,
        _id: prev._id,
        email: prev.email,
        image: prev.image,
        username: prev.username,
        cover: prev.cover,
        location: prev.location,
      };
    });
  }
  async function follow() {
    setIsFollowing(!isFollowing);
    axios.post("/api/follow/", {
      targetUser: user?._id,
    });
  }

  function editMode() {
    setIsEditMode(!isEditMode);
  }
  function cancel() {
    editMode();
    setUser(originalUser);
  }

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
    if (canFetchFollow && user?._id) {
      fetchFollow();
    }
  }, [canFetchFollow, user?._id]);

  return (
    <>
      <Layout>
        <div>
          <TrailBack text={String(user?.username)} />

          <Cover
            onUpload={fetchUserProfile}
            handler={userInfo?._id === user?._id}
            backgroundImageSrc={String(user?.cover)}
          />
          <div className="rounded-full p-3 bg-black">
            <Avatar
              image={String(user?.image)}
              alt={user?.name}
              width={120}
              height={120}
              profile={true}
              className="rounded-full -mt-16"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-start ">
          <div className="flex-col py-2 px-3">
            {isEditMode ? (
              <input
                type="text"
                value={user?.name || ""}
                onChange={(e) => {
                  const newName = e.target.value;
                  setUser((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      name: newName,
                    };
                  });
                }}
                className="py-2 px-1 bg-twitterBorder rounded-full"
              />
            ) : (
              <div className="font-bold text-xl">{user?.name}</div>
            )}
            <div className="text-sm text-twitterLightGray my-1 leading-3">{`@${user?.username}`}</div>
            {isEditMode ? (
              <textarea
                value={user?.bio}
                onChange={(e) => {
                  const newBio = e.target.value;
                  setUser((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      bio: newBio,
                    };
                  });
                }}
                className="rounded w-60 bg-twitterBorder my-1"
              />
            ) : (
              <div className="mt-5">{user?.bio ? user?.bio : "Hey there!"}</div>
            )}
          </div>
          <div className="flex items-center p-1">
            {isProfile ? (
              <>
                <button
                  className={`bg-twitterBlue rounded-full px-5 py-2 text-white ${
                    isEditMode ? "invisible" : "visible"
                  }`}
                  onClick={editMode}
                >
                  Edit Profile
                </button>
                {isEditMode ? (
                  <div className="space-x-1">
                    <button
                      className="bg-twitterWhite text-black rounded-full p-2"
                      onClick={cancel}
                    >
                      Cancel
                    </button>{" "}
                    <button
                      className="bg-twitterBlue rounded-full p-2"
                      onClick={() => {
                        updateProfile();
                      }}
                    >
                      Save Profile
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : isFollowing ? (
              <button
                onClick={follow}
                className="bg-twitterWhite text-black rounded-full px-5 py-2"
              >
                Following
              </button>
            ) : (
              <button
                onClick={follow}
                className="bg-twitterBlue rounded-full px-5 py-2 text-white"
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <div className="text-xl font-bold px-2 pt-1 border-b border-twitterBlue shrink">
          Shoots
        </div>
        <PostContent posts={posts} likes={likes} commentsCount={0} />
      </Layout>
    </>
  );
}
