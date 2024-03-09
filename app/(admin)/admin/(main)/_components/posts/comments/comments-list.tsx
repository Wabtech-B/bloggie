import Columns from "./columns";
import { DataTable } from "./datatable";

type TComment = {
  id: string;
  comment: string;
  name: string;
  email: string;
  isApproved: boolean;
  date: Date;
};

interface CommentListProps {
  comments: TComment[];
}

const CommentsList = ({ comments }: CommentListProps) => {
  return (
    <div className="p-2 sm:p-4 border border-border rounded-xl shadow">
      <DataTable columns={Columns} data={comments} />
    </div>
  );
};

export default CommentsList;
