import { DataTable } from "./datatable";
import Columns from "./columns";

type Category = {
  id: string;
  name: string;
  date: Date;
  posts: number;
};

interface CategoryListProps {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoryListProps) => {
  return (
    <div className="p-2 sm:p-4 border border-border rounded-xl shadow">
      <DataTable columns={Columns} data={categories} />
    </div>
  );
};

export default CategoriesList;
