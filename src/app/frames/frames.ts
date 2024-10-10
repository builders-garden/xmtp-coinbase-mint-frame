/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { getLensFrameMessage, isLensFrameActionPayload } from "frames.js/lens";
import {
  DEFAULT_DEBUGGER_HUB_URL,
  FRAMES_BASE_PATH,
  appURL,
} from "@/lib/frames";
import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";

export const frames = createFrames({
  basePath: FRAMES_BASE_PATH,
  baseUrl: appURL(),
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: "/images",
    }),
    farcasterHubContext({
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
          }),
    }),
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }

          return getXmtpFrameMessage(body);
        },
      },
    }),
    openframes({
      clientProtocol: {
        id: "lens",
        version: "1.0.0",
      },
      handler: {
        isValidPayload: (body) => isLensFrameActionPayload(body),
        getFrameMessage: async (body) => {
          if (!isLensFrameActionPayload(body)) {
            return undefined;
          }

          return getLensFrameMessage(body);
        },
      },
    }),
  ],
});
