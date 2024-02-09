import UserTable from "@/app/ui/user/UserTable";
import React from "react";

const UsersPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-10">User list</h1>
      </div>

      {/* User table */}
      <div>
        <UserTable></UserTable>
      </div>
    </div>
  );
};

export default UsersPage;
