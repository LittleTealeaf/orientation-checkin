import type { NextPage } from "next";
import React, { useState } from "react";
import TabView from "components/TabView";

import { PrismaClient } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const RoomsTab = () => {
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="Room Table">
        <TableHead>
          <TableRow>
            <TableCell>Building</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <TabView
        items={[
          {
            label: "Master Sheet",
            content: <>testing</>,
          },
          {
            label: "Rooms",
            content: <RoomsTab />,
          },
        ]}
      />
    </>
  );
};

export async function getStaticProps() {


  return {
    props: {}
  }
}

export default Home;
