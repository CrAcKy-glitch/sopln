export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="max-w-xl mx-auto min-h-full py-2">{children}</div>
    </>
  );
}
