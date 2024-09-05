import EditableImage from "./editableImage";

export default function Cover({
  backgroundImageSrc,
  handler,
  onUpload,
}: {
  backgroundImageSrc: string;
  handler?: boolean;
  onUpload: Function;
}) {
  return (
    <>
      <EditableImage
        dragPrompt={true}
        className={"h-40 w-full rounded-xl"}
        backgroundImageSrc={backgroundImageSrc}
        imageClassName={"h-40 w-full"}
        nextImageHeight={500}
        nextImageWidth={600}
        owner={handler}
        onChange={onUpload}
        type={"COVER"}
      />
    </>
  );
}
