import { getPostsByTag } from "@/actions/home/posts";
import HomeBreadcrumbs from "@/components/home-breadcrumbs";
import NoResults from "@/components/no-results";
import CardOne from "@/components/posts/post-cards/card-one";
import { Metadata } from "next";
import PostPagination from "../../_components/post-pagination";

export function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Metadata {
  return {
    title: decodeURI(params.tag),
  };
}

type Params = {
  searchParams: {
    page: string;
    limit: string;
  };
  params: { tag: string };
};

const TagPage = async ({ params, searchParams }: Params) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 8;

  const { posts, pages } = await getPostsByTag(decodeURI(params.tag), {
    page,
    limit,
  });

  return (
    <div className="max-w-7xl mx-auto px-3">
      <div className="my-2 flex justify-end">
        <HomeBreadcrumbs separator="/" />
      </div>
      <div className="flex-center-between flex-col sm:flex-row gap-3">
        <h1 className="text-xl md:text-3xl font-bold mt-3">
          {decodeURI(params.tag)}
        </h1>

        {posts.length > 0 && <PostPagination pages={pages} />}
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <CardOne
            key={post.id}
            post={post}
            showAuthor={false}
            showTags={false}
            showDescription={true}
          />
        ))}
      </div>
      {posts.length < 1 && <NoResults title="Posts Found" />}
    </div>
  );
};

export default TagPage;
