import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Action {
  icon: JSX.Element;
  text: string;
  onclick?: () => void;
}

const BulkActions = ({ actions }: { actions: Action[] }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Bulk Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.text}
              asChild
              onClick={action.onclick}
            >
              <div
                className={cn(
                  "flex-align-center gap-x-2",
                  action.text === "Delete Selected" && "!text-red-500"
                )}
              >
                <span
                  className={cn(
                    "text-muted-foreground",
                    action.text === "Delete Selected" && "!text-red-500"
                  )}
                >
                  {action.icon}
                </span>
                <span>{action.text}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BulkActions;
