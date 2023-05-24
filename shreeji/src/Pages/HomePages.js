import React from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";
const HomePages = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Shreeji-Home"}>
      <h1>HomePages</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePages;
