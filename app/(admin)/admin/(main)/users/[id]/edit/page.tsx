import { getUser } from "@/actions/users";
import EditUserForm from "../../../_components/users/edit-user-form";

const EditUser = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  return <EditUserForm user={user!} />;
};

export default EditUser;
