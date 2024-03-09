"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { Dispatch, SetStateAction, useState } from "react";
import { SingleImageDropzone } from "./single-image-dropzone";
import { Button } from "./ui/button";

export function ImageUpload({
  setImage,
}: {
  setImage: Dispatch<SetStateAction<string>>;
}) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<
    "PENDING" | "COMPLETE" | "ERROR" | number
  >("PENDING");

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <Button
        variant="secondary"
        className="w-full mt-2"
        onClick={async () => {
          if (file) {
            try {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: async (newProgress) => {
                  setProgress(newProgress);
                  if (newProgress === 100) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setProgress("COMPLETE");
                  }
                },
              });
              setImage(res.url);
            } catch (err) {
              setProgress("ERROR");
            }
          }
        }}
        disabled={!file || progress !== "PENDING"}
      >
        {progress === "PENDING"
          ? "Upload"
          : progress === "COMPLETE"
          ? "Done"
          : typeof progress === "number"
          ? `Uploading (${Math.round(progress)}%)`
          : "Error"}
      </Button>
    </div>
  );
}
