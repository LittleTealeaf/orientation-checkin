import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  var query = {};

  if (id != null) {
    query = {
      where: {
        id: Number(id),
      },
    };
  }

  res.status(200).json(await client.room.findMany(query));
}
