import Image from "next/image";
import { Suspense } from "react";
import LoadingSpinner from "./_components/ui/loading-spinner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <div className="w-full space-y-8 p-8">
        <h1>Dashboard</h1>
      </div>
    </Suspense>
  );
}
