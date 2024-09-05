import Image from "next/image";
import { Button } from "antd"; // If you're using Ant Design Button, replace this line
import heartIcon from "../svgs/heart.svg";
import retweetIcon from "../svgs/retweet.svg";
import commentIcon from "../svgs/comment.svg";
import shareIcon from "../svgs/share.svg";
import loaderIcon from "../svgs/loader.svg";

interface IconProps {
  className?: string;
  onClick?: () => void;
}

const buttonStyle = {
  border: "none",
  background: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
};

export const HeartIcon = ({ className, onClick }: IconProps) => (
  <Button onClick={onClick} className={className} style={buttonStyle}>
    <Image src={heartIcon} alt="Heart Icon" width={24} height={24} />
  </Button>
);

export const RetweetIcon = ({ className, onClick }: IconProps) => (
  <Button onClick={onClick} className={className} style={buttonStyle}>
    <Image src={retweetIcon} alt="Retweet Icon" width={24} height={24} />
  </Button>
);

export const CommentIcon = ({ className, onClick }: IconProps) => (
  <Button onClick={onClick} className={className} style={buttonStyle}>
    <Image src={commentIcon} alt="Comment Icon" width={24} height={24} />
  </Button>
);

export const ShareIcon = ({ className, onClick }: IconProps) => (
  <Button onClick={onClick} className={className} style={buttonStyle}>
    <Image src={shareIcon} alt="Share Icon" width={24} height={24} />
  </Button>
);

export const LoaderIcon = ({ className, onClick }: IconProps) => (
  <Button onClick={onClick} className={className} style={buttonStyle}>
    <Image src={loaderIcon} alt="Loader Icon" width={24} height={24} />
  </Button>
);
