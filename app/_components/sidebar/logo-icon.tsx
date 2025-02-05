import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="text-md relative z-20 flex items-center space-x-2 bg-primary-light py-1 font-normal"
    >
      <ShoppingCartIcon className="flex-shrink-0 text-background" />
    </Link>





  );
};

export default LogoIcon;
