import { SearchIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export function Searchbar({
  value,
  onSubmit,
  placeholder = "Search...",
}: {
  value: string | undefined;
  onSubmit: (value: string | undefined) => unknown;
  placeholder?: string;
}) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  useEffect(() => setInternalValue(value ?? ""), [value]);

  const applySearch = useCallback(
    (data: FormData) => {
      const query = data.get("query");
      onSubmit(query ? String(query) : undefined);
    },
    [onSubmit],
  );

  return (
    <form action={applySearch} className="flex w-72 items-center gap-1">
      <Input
        name="query"
        placeholder={placeholder}
        className="bg-input rounded-full text-black"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onSubmit(undefined)}
        >
          <XIcon />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button type="submit" variant="ghost" size="icon">
        <SearchIcon />
        <span className="sr-only">Apply search</span>
      </Button>
    </form>
  );
}
