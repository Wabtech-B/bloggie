"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <p>It may be Network issues or internal server error</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

export default ErrorPage;
