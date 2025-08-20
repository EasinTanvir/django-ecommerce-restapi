import getServerCredentials from "@/utils/session";
import React from "react";

const UserPage = async () => {
  const session = await getServerCredentials();

  console.log("session", session);
  return <div>UserPage</div>;
};

export default UserPage;
