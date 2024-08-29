import { PostInterface } from "@app/lib/models/post";
import Link from "next/link";
import TimeAgo from "timeago-react";
import Avatar from "./avatar";
import PostButton from "./postButtons";
import { likeInterface } from "@app/lib/models/like";
import Image from "next/image";

interface PostContentProps {
  posts: PostInterface[];
  big?: boolean;
  likes: likeInterface[];
  commentsCount: number;
}

export default function PostContent({
  posts,
  likes,
  big = false,
}: PostContentProps) {
  return (
    <div className="flex min-w-full p-1">
      {posts.length ? (
        <div className="grow space-y-2">
          {posts.map((post, key) => (
            <div
              key={key}
              className="border-b border-b-twitterLightGray py-4 px-2 w-full bg-twitterBorder rounded-xl"
            >
              <Link
                href={`/${post.author?.username}/status/${post._id}`}
                key={post._id}
                className=""
              >
                <div>
                  <div className="flex  space-x-3 ">
                    <Avatar
                      image={post.author.image}
                      alt={post.author.name}
                      className="rounded-full"
                      width={40}
                      height={40}
                      username={post.author.username}
                    />
                    <div className="flex  space-x-1">
                      <div className="items-center">
                        <p className="font-bold">{post.author.name}</p>

                        <p className="text-xs text-twitterLightGray">
                          {`@${post.author.username}`}
                        </p>
                      </div>

                      <p className="text-twitterLightGray text-sm">
                        <TimeAgo datetime={post.createdAt} locale="UTC" />
                      </p>
                    </div>
                  </div>
                  {big ? (
                    <div className="font-bold p-1">
                      {post.image ? (
                        <Image
                          src={post.image}
                          width={250}
                          height={250}
                          alt={post.author.name}
                        />
                      ) : (
                        ""
                      )}
                      {post.text}
                    </div>
                  ) : (
                    <div className="mt-2 p-2">
                      {post.image ? (
                        <Image
                          src={post.image}
                          width={250}
                          height={250}
                          alt={post.author.name}
                        />
                      ) : (
                        ""
                      )}
                      {post.text}
                    </div>
                  )}
                </div>
              </Link>
              <PostButton
                id={post._id}
                likesDefault={post.likesCount}
                likedByMeDefault={likes.some((like) => like.post === post._id)}
                comments={post.commentsCount}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>{big ? <div></div> : <div>Nothing to display</div>}</div>
      )}
    </div>
  );
}
