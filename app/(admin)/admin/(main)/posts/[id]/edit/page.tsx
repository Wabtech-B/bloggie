import { getPostCategories } from "@/actions/categories";
import { getPost } from "@/actions/posts";
import EditPostForm from "../../../_components/posts/edit-post-form";

const EditPost = async ({ params }: { params: { id: string } }) => {
  const categories = await getPostCategories();
  const post = await getPost(params.id);
  return (
    <>
      <EditPostForm categories={categories} post={post!} />
    </>
  );
};

export default EditPost;
