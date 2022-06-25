import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    await client.room
      .create({
        data: {},
      })
      .then((i) => i.id)
  );
}
