import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { authenticate } from "libs/authentication";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (await authenticate(req, res)) {
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
}
