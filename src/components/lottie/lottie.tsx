"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

interface ILottieProps {
  height?: string | number;
  width?: string | number;
  animationData: any;
  direction?: "left" | "right";
}
export const LottieAnimation = ({
  height,
  width,
  animationData,
  direction = "left",
}: ILottieProps) => {
  const isLeftDirection = direction === "left";

  return (
    <div
      style={{
        transform: isLeftDirection ? "scaleX(-1)" : "scaleX(1)",
        display: "inline-block",
      }}
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={height}
        width={width}
        isClickToPauseDisabled
      />
    </div>
  );
};
