import Image from "next/image";
import Link from "next/link";

type UILogoProps = {};

const UILogo = (props: UILogoProps) => {
  return (
    <Link href="/">
      <span className="sr-only">Pretz</span>
      <Image src="/logo.svg" alt="Pretz logo" height={80} width={80} />
    </Link>
  );
};

export default UILogo;
