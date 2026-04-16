import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileOrders from "./ProfileOrders";
const ProfileDetails = () => {
  return (
    <div>
      <div className="w-full lg:w-3/4 space-y-6">
        <ProfileInfo />
        <ProfileOrders />
      </div>
    </div>
  );
};

export default ProfileDetails;
