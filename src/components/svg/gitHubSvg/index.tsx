import Image from "next/image";
import githubSVG from "@public/images/github.svg";

function GitHubSvg({ size = 24 }: { size?: number }) {
  return (
    <>
      <Image
        color="#fff"
        src={githubSVG}
        width={size}
        height={size}
        alt="github-svg"
      />
    </>
  );
}

export { GitHubSvg };
