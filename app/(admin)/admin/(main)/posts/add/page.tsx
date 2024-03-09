import { getPostCategories } from "@/actions/categories";
import AddPostForm from "../../_components/posts/add-post-form";

const AddPost = async () => {
  const categories = await getPostCategories();
  return (
    <>
      <AddPostForm categories={categories} />
    </>
  );
};

export default AddPost;
