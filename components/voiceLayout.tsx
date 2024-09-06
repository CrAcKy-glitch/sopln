export default function VoiceLayout({ children }: { children: any }) {
  return (
    <>
      <div className="max-w-full p-3 justify-start mx-auto min-h-full py-2 flex-row flex">
        <div className="">{children}</div>
      </div>
    </>
  );
}
