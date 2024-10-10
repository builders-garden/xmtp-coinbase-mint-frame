import { appURL } from "@/lib/frames";

interface FrameNftProps {
  imgSrc: string;
  title: string;
  subtitle: string;
  description?: string;
}

const FrameNft = ({ imgSrc, title, subtitle, description }: FrameNftProps) => {
  return (
    <div tw="relative flex flex-col text-center items-center justify-center">
      <img
        src={imgSrc}
        alt={`${title} nft image`}
        tw="h-full"
        style={{
          opacity: 1,
          objectFit: "cover",
        }}
      />
      <div tw="w-full flex items-center justify-between absolute text-white bottom-[20px] text-[36px] px-[10px]">
        <div
          tw="max-w-3/4 flex px-4 rounded-xl py-0"
          style={{ backgroundColor: "rgba(0,0,0, 0.6)", lineHeight: "0.1" }}
        >
          <p>
            <b
              style={{
                fontFamily: "Urbanist-Bold",
                textAlign: "left",
              }}
            >
              {title.length > 44 ? `${title.slice(0, 44)}...` : title}
            </b>
          </p>
        </div>
        <div
          tw="flex px-4 rounded-xl py-0"
          style={{ backgroundColor: "rgba(0,0,0, 0.6)", lineHeight: "0.1" }}
        >
          <p tw="">{subtitle}</p>
          <p tw="">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FrameNft;
