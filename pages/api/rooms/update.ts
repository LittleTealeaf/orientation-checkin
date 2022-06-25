import { Prisma, PrismaClient } from "@prisma/client";
import { authenticate } from "libs/authentication";
import { Room } from "libs/schema";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (await authenticate(req, res)) {
    const { id, number, building, spots } = req.query;

    const data: Room = { id: Number(id) };

    if (number != null) {
      data.number = Number(number);
    }

    if (building != null) {
      data.building = String(building);
    }

    if (spots != null) {
      data.spots = Number(spots);
    }

    res.status(200).json(
      await client.room.update({
        where: {
          id: Number(id),
        },
        data,
      })
    );
  }
}
