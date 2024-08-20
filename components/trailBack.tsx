import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TrailBack({ text }: { text: string }) {
  return (
    <>
      <div className="flex flex-row sticky top-0 border-b border-b-twitterBorder p-3 w-full grow">
        <Link href={"/home"} className="font-bold  text-xl">
          <ArrowLeftOutlined className="font-bold" />
        </Link>
        <div className="font-extrabold text-xl">{text}</div>
      </div>
    </>
  );
}
