import { DataTable } from "./datatable";
import Columns from "./columns";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  coverImage: string;
  published: boolean;
  trashed: boolean;
  comments: number;
  views: number;
  date: Date;
};

interface PostListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostListProps) => {
  return (
    <div className="p-2 sm:p-4 border border-border rounded-xl shadow">
      <DataTable columns={Columns} data={posts} />
    </div>
  );
};

export default PostsList;
