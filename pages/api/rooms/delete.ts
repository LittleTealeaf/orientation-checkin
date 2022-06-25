import { PrismaClient } from "@prisma/client";
import { authenticate } from "libs/authentication";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(await authenticate(req,res)) {
        const {id} = req.query;

        res.status(200).json(await client.room.delete({
            where: {
                id: Number(id)
            }
        }))
    }
}
