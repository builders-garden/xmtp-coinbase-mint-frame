import { appURL, FRAMES_BASE_PATH } from "@/lib/frames";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { RedirectToCoinbase } from "@/app/components/RedirectToCoinbase";

interface HomeProps {
  params: {
    nftType: string;
    chainId: string;
    collectionAddress: string;
  };
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  return {
    title: "XMTP x Base x Zora",
    description: "Mint with a frame on zora...",
    other: {
      ...(await fetchMetadata(
        new URL(
          `${FRAMES_BASE_PATH}/eip155?chainId=${params.chainId}&nftType=${params.nftType}&collection=${params.collectionAddress}`,
          appURL()
        )
      )),
    },
  };
}
export default function Home({ params }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RedirectToCoinbase
        chainId={params.chainId}
        nftType={params.nftType}
        collectionAddress={params.collectionAddress}
      />
    </main>
  );
}
