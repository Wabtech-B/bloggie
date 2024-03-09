import { logout } from "@/actions/logout";
import Avatar from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChevronsUpDown, Globe, LogOut } from "lucide-react";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import ModeToggle from "./mode-toggle";

const ProfileDropdown = () => {
  const user = useCurrentUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-fit flex-align-center gap-x-3 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-border p-1 cursor-pointer">
            {user?.image ? (
              <Avatar size="small" src={user?.image} />
            ) : (
              <Avatar size="small" />
            )}
            <span>{user?.name?.split(" ")[1] || user?.name}</span>
            <div>
              <ChevronsUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <Link
              href="/admin/account"
              className="flex-align-center gap-x-2 pb-2 border-b cursor-pointer"
            >
              {user?.image ? <Avatar src={user?.image} /> : <Avatar />}
              <div>
                <h1 className="text-xl">{user?.name}</h1>
                <span className="opacity-80">{user?.email}</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex-align-center gap-x-2 cursor-pointer">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span>Website</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/admin/account"
              className="flex-align-center gap-x-2 mt-1 cursor-pointer"
            >
              <BiUserCircle className="text-xl text-gray-600 dark:text-gray-400" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <div className="md:hidden my-2">
            <ModeToggle />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild onClick={() => logout("/admin/sign-in")}>
            <div className="flex-align-center gap-x-2 cursor-pointer">
              <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span>logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
