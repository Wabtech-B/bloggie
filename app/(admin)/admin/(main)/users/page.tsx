import React from "react";
import { getUsers } from "@/actions/users";
import UsersList from "../_components/users/users-list";
import RoleFilters from "../_components/users/role-filters";
import { formatWord } from "@/lib/utils";
import { UserRole } from "@prisma/client";

const Users = async ({
  searchParams,
}: {
  searchParams: { role: string; search: string };
}) => {
  const users = await getUsers(
    searchParams.role as UserRole,
    searchParams.search
  );

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name!,
    email: user.email,
    role: formatWord(user.role),
    image: user.image!,
    date: user.createdAt,
  }));

  return (
    <div>
      <RoleFilters />
      <UsersList users={formattedUsers} />
    </div>
  );
};

export default Users;
