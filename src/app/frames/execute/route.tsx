// import opensea from "@api/opensea";
import { mint721or1155Creator } from "@/lib/transaction";
import { frames } from "@/app/frames/frames";
import { Button, transaction } from "frames.js/core";
import { appURL } from "@/lib/frames";
import FrameNft from "@/app/components/FrameNft";
import { isSupportedChain } from "@/lib/utils";

export const POST = frames(async (ctx) => {
  const searchParams = new URLSearchParams(ctx.url.searchParams);
  const user_address = await ctx.walletAddress();
  const chain = searchParams.get("chain") || "";
  const collectionAddress = searchParams.get("collection") || "";
  const tokenId = searchParams.get("token_id") || "";
  const tokenStandard = searchParams.get("token_standard") || "";

  try {
    if (
      !chain ||
      !collectionAddress ||
      (chain && !isSupportedChain(chain)) ||
      !user_address ||
      !tokenStandard ||
      (tokenStandard === "erc1155" && !tokenId) ||
      (tokenStandard !== "erc1155" && tokenStandard !== "erc721")
    ) {
      throw new Error("Invalid parameters");
    }

    const txCalldata = await mint721or1155Creator(
      chain,
      collectionAddress,
      user_address,
      tokenStandard,
      tokenId
    );
    console.log("txCalldata", txCalldata);
    return transaction(txCalldata);
  } catch (e) {
    console.error("mint error", e);
    const errorMsg = (e as Error).message || "";
    return {
      image: (
        <FrameNft
          imgSrc={`${appURL()}/images/frame-failed.png`}
          title={errorMsg}
          subtitle={collectionAddress}
        />
      ),
      buttons: [
        <Button action="post" key="1" target="/">
          Home
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  }
});
