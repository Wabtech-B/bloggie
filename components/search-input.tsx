"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (!value) params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString("search", searchTerm)}`);
  };

  return (
    <form onSubmit={onSubmit} className="w-full sm:w-fit">
      <div className="relative">
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <SearchIcon className="text-slate-500 w-5 h-5" />
        </div>
        <Input
          placeholder="Search...hit enter after"
          className="pl-8"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchInput;
