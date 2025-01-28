import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
