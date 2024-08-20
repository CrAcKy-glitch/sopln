export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="max-w-xl mx-auto border-l border-r border-twitterBorder min-h-full py-2">
        {children}
      </div>
    </>
  );
}
