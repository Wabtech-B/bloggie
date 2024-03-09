import { getComments } from "@/actions/comments";
import GoBack from "@/components/goback";
import CommentsList from "../../../_components/posts/comments/comments-list";

const Comments = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) => {
  const comments = await getComments(params.id, searchParams.search);

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    comment: comment.content,
    name: comment.name!,
    email: comment.email,
    isApproved: comment.isApproved,
    date: comment.createdAt,
  }));

  return (
    <div>
      <GoBack />
      <CommentsList comments={formattedComments} />
    </div>
  );
};

export default Comments;
