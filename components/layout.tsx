export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="max-w-xl mx-auto min-h-full py-2 flex">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
