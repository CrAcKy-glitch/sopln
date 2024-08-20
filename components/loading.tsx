import { Loading3QuartersOutlined } from "@ant-design/icons";
import { PulseLoader } from "react-spinners";

export default function Loader() {
  const animate = {
    animation: "spin 2s linear infinite",
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center text-4xl">
        <PulseLoader color="#ffffff" />
      </div>
    </>
  );
}
