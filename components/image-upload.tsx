import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { cn } from "../utils/common-utils";

type ImageUploadProps = {
  url?: string;
  file?: File;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  className?: string;
};

export const ImageUpload = ({
  url,
  file,
  setFile,
  className,
}: ImageUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const fileUrl = file ? URL.createObjectURL(file) : url;

  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFile(event.target.files?.[0]);
    },
    [setFile]
  );

  const onDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const onDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    setDragging(true);
    event.preventDefault();
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      setDragging(false);
      event.preventDefault();
      setFile(event.dataTransfer.files[0]);
    },
    [setFile]
  );

  return (
    <label
      className={cn(
        "relative w-full h-[calc(100vw-3rem)] sm:max-w-[473px] sm:h-[calc(50vw-6rem)] sm:max-h-[504px] bg-input rounded-lg border-dashed border-2 flex flex-col items-center justify-center",
        dragging && "border-primary",
        className
      )}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {fileUrl && (
        <>
          <Image
            src={fileUrl}
            alt="Uploaded image"
            width={473}
            height={504}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
        </>
      )}
      <MdOutlineFileDownload className="w-6 h-6 m-2 fill-text z-10" />
      <p className="text-sm max-sm:hidden z-10">Drop an image here</p>
      <p className="text-sm sm:hidden z-10">Upload an image here</p>
      <input
        type="file"
        onChange={onFileChange}
        accept=".webp, .gif, .svg, .png, .jpg, .jpeg"
        className="hidden"
      />
    </label>
  );
};
