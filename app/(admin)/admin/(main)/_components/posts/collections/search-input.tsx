import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface SearchInputProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="relative my-3 flex-1">
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <Input
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8 placeholder:text-muted-foreground"
      />
    </div>
  );
};

export default SearchInput;
