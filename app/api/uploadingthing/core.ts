// Resource: https://docs.uploadthing.com/nextjs/appdir#creating-your-first-fileroute
// Above resource shows how to setup uploadthing. Copy paste most of it as it is.
// We're changing a few things in the middleware and configs of the file upload i.e., "media", "maxFileCount"

import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const getUser = async () => await currentUser();

export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => {
      const user = await getUser();
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
