import { DataTable } from "./datatable";
import Columns from "./columns";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  date: Date;
};

interface UserListProps {
  users: User[];
}

const UsersList = ({ users }: UserListProps) => {
  return (
    <div className="p-2 sm:p-4 border border-border rounded-xl shadow">
      <DataTable columns={Columns} data={users} />
    </div>
  );
};

export default UsersList;
