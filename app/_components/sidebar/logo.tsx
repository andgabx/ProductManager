import { ShoppingCartIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => {
  return (
    <Link

      href="/"

      className="relative z-20 flex items-center space-x-2 bg-primary-light py-1 text-sm font-normal text-background"
    >
      <ShoppingCartIcon size={24} className="flex-shrink-0 text-background" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre text-lg font-medium text-background"

      >
        Stock Manager
      </motion.span>

    </Link>
  );
};


export default Logo;
