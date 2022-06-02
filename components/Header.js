import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Image src="/logo.svg" width={200} height={50} alt="logo" />
    </header>
  );
}

export default Header;
