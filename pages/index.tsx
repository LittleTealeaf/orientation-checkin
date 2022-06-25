import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import TabView from "components/TabView";
import AddIcon from "@mui/icons-material/Add";

import { Room } from "@prisma/client";
import { Button, Dialog, Fab, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { buildSWRFetcher, createAuthKey, fetchAPI } from "libs/authentication";
import { NotNull } from "components/Dynamic";
import useSWR, { mutate } from "swr";

import { createContext, useContext } from "react";

const AuthContext = createContext("");

const RoomsTab = () => {
  const { data: rooms } = useSWR<Room[]>("/api/rooms/get", buildSWRFetcher(useAuthContext()));

  const auth = useAuthContext();

  const [editing, setEditing] = useState<Room | null>(null);

  return (
    <>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Room Table">
        <TableHead>
          <TableRow>
            <TableCell>Building</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Max Occupants</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms == null ? (
            <></>
          ) : (
            rooms.map((room, index) => (
              <TableRow key={index}>
                <TableCell>{room.building}</TableCell>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.spots}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setEditing(room)}>Edit</Button>
                  <Button onClick={() => {
                    fetchAPI(`/api/rooms/delete?id=${room.id}`,auth);
                    mutate('/api/rooms/get')
                  }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Fab
        sx={{
          position: "absolute",
          bottom: 50,
          right: 50,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={editing != null} onClose={() => setEditing(null)}>
        {NotNull(editing, () => (
          <>
            <div style={{
              padding: "10px"
            }}></div>
          </>
        ))}
      </Dialog>
    </>
  );
};

const Home = ({ auth }: { auth: string }) => {
  return (
    <>
      <AuthContext.Provider value={auth}>
        <TabView
          items={[
            {
              label: "Rooms",
              content: <RoomsTab />,
            },
            {
              label: "Master Sheet",
              content: <>testing</>,
            },

          ]}
        />
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
