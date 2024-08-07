import { NextRequest, NextResponse } from "next/server";
import { mint1155Creator } from "@/lib/transaction";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const { searchParams } = url;
  const chain = searchParams.get("chain") || "zora";
  const collection = searchParams.get("collection") || "";
  const tokenId = searchParams.get("token_id") || "";
  const user_address = searchParams.get("user_address") || "";

  try {
    const txCalldata = await mint1155Creator(
      chain,
      collection,
      tokenId,
      user_address
    );
    return NextResponse.json(txCalldata);
  } catch (e) {
    console.log("mint error", e);
    return NextResponse.error();
  }
}