"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

interface RedirectToCoinbaseProps {
  chainId: string;
  nftType: string;
  collectionAddress: string;
  tokenId?: string;
}
export const RedirectToCoinbase = ({
  chainId,
  nftType,
  collectionAddress,
  tokenId,
}: RedirectToCoinbaseProps) => {
  useEffect(() => {
    redirect(
      `https://wallet.coinbase.com/nft/mint/eip155:${chainId}:${nftType}:${collectionAddress}${
        tokenId ? `:${tokenId}` : ""
      }`
    );
  });
  return <></>;
};
