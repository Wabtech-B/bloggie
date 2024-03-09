"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const roles = [
  {
    label: "All",
    role: "ALL",
  },
  {
    label: "Admin",
    role: "ADMIN",
  },
  {
    label: "Author",
    role: "AUTHOR",
  },
];

const RoleFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clickedRole = searchParams.get("role") || "ALL";
  const pathname = usePathname();

  /**
   * Creates a query string with the specified role parameter.
   * @param {string} role - The role parameter to include in the query string.
   * @returns {string} - The generated query string.
   */
  const createQueryString = useCallback((role: string) => {
    const params = new URLSearchParams();
    params.set("role", role);
    return params.toString();
  }, []);

  /**
   * Updates the roles and redirects the user to the appropriate page based on the selected role.
   */
  const onClick = (role: string) => {
    const currentRoles = clickedRole.split(",");
    let updatedRoles;
    if (currentRoles.includes(role)) {
      updatedRoles = currentRoles.filter((role) => role !== role);
    } else {
      updatedRoles = [role];
    }

    const updatedQueryString = createQueryString(role);
    if (role === "ALL") {
      router.push(`/admin/users`, { scroll: false });
    } else {
      router.push(`${pathname}?${updatedQueryString}`, { scroll: false });
    }
  };

  return (
    <div className="flex-align-center gap-2 mb-5 overflow-auto hide-scrollbar">
      {roles.map((role) => (
        <div
          key={role.role}
          onClick={() => onClick(role.role)}
          className={cn(
            "px-3 py-1 cursor-pointer shrink-0 select-none",
            clickedRole.includes(role.role) &&
              "border-b-2 border-b-brand text-brand"
          )}
        >
          {role.label}
        </div>
      ))}
    </div>
  );
};

export default RoleFilters;
