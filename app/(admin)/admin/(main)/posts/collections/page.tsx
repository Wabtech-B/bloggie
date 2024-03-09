import React from "react";
import CollectionsList from "../../_components/posts/collections/collections-list";
import { getCollections } from "@/actions/collections";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const Collections = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") notFound();
  const collections = await getCollections(searchParams.search);
  return (
    <div>
      <CollectionsList items={collections} />
    </div>
  );
};

export default Collections;
