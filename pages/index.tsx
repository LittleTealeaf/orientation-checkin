import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import TabView from "components/TabView";

import { PrismaClient, Room } from "@prisma/client";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { createAuthKey } from "libs/authentication";

const RoomsTab = ({ auth }: { auth: string }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  function updateRooms() {
    fetch("/api/rooms/get", {
      method: "POST",
      headers: {
        authorization: auth,
      },
    })
      .then((res) => res.json())
      .then(setRooms);
  }

  useEffect(updateRooms, [auth]);

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="Room Table">
        <TableHead>
          <TableRow>
            <TableCell>Building</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Max Occupants</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.building}</TableCell>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.spots}</TableCell>
              <TableCell>
                <Button onClick={updateRooms}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const Home = ({ auth }: { auth: string }) => {
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
            content: <RoomsTab auth={auth} />,
          },
        ]}
      />
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

export default Home;
