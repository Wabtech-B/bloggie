import Image from "next/image";
import { cn } from "@/lib/utils";

const NoResults = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn("w-full h-full text-center", className)}>
      <div>
        <div className="relative w-40 h-40 mx-auto dark:opacity-60">
          <Image
            src="/no-results.png"
            alt="No results"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-muted-foreground">No {title}</h1>
      </div>
    </div>
  );
};

export default NoResults;
