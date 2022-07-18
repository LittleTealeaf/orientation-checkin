import React, { useEffect, useState } from "react";
import { buildSWRFetcher, createAuthKey, fetchAPI } from "libs/authentication";

import { createContext, useContext } from "react";
import { TabPane, TabView } from "components/TabView";

const AuthContext = createContext("");


const Home = ({ auth }: { auth: string }) => {
  return (
    <>
      <AuthContext.Provider value={auth}>
        <TabView>
          <TabPane label="hello">
            <div>
              {"I am the world"}
            </div>
          </TabPane>
        </TabView>
      </AuthContext.Provider>
    </>
  );
};

export async function getServerSideProps() {
  const auth = await createAuthKey();

  return {
    props: {
      auth,
    },
  };
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default Home;
