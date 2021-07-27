import { Button, Card } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const UserPage = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Something wrong!!!");
    }
  };

  return (
    <>
      <Card
        title="User Detail"
        extra={<Button onClick={handleLogOut}>Log out</Button>}
        style={{ width: 600, margin: "auto" }}
      >
        <p>Email: {currentUser.email}</p>
      </Card>
    </>
  );
};

export default UserPage;
