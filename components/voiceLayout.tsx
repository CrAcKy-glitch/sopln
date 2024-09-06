export default function VoiceLayout({ children }: { children: any }) {
  return (
    <>
      <div className="max-w-screen-xl  mx-auto min-h-screen p-4 flex flex-row lg:flex-row items-start lg:items-start lg:space-x-4">
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </>
  );
}
