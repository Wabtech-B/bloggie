"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
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
    router.push(`/search/?${createQueryString("q", searchTerm)}`);
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <SearchIcon className="text-slate-500 w-5 h-5" />
        </div>
        <Input
          placeholder="Search for posts..."
          className="pl-8 bg-white dark:bg-gray-900 border rounded-full w-full "
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchInput;
