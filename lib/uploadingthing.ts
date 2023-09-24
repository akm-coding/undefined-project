import { generateReactHelpers } from "@uploadthing/react/hooks";

import { OurFileRouter } from "@/app/api/uploadingthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
