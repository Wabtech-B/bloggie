import DeleteAccount from "../_components/account/delete-account";
import PasswordChangeForm from "../_components/account/password-change-form";
import ProfileDetails from "../_components/account/profile-details";
import ProfileUpdateForm from "../_components/account/profile-update-form";

const Profile = () => {
  return (
    <>
      <div className="p-2 sm:p-4 border border-border rounded-lg shadow">
        <ProfileDetails />
        <div className="mt-6">
          <ProfileUpdateForm />
          <PasswordChangeForm />
          <DeleteAccount />
        </div>
      </div>
    </>
  );
};

export default Profile;
