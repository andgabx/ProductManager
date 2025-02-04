import { ShoppingCartIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => {
  return (
    <Link

      href="/"

      className="relative z-20 flex items-center space-x-2 bg-background py-1 text-sm font-normal text-black"
    >
      <ShoppingCartIcon size={24} className="flex-shrink-0 text-primary-dark" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre text-lg font-medium text-primary-dark dark:text-white"
      >
        Stock Manager
      </motion.span>
    </Link>
  );
};


export default Logo;
