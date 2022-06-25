import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

async function cleanAuthKeys() {
  await client.authentication.deleteMany({
    where: {
      id: {
        in: (
          await client.authentication.findMany()
        )
          .filter((auth) => {
            return auth.lastUsed == null || Math.abs(new Date().getTime() - auth.lastUsed.getTime()) / (60 * 60 * 1000) > 5;
          })
          .map((item) => item.id),
      },
    },
  });
}

export async function createAuthKey() {
  await cleanAuthKeys();
  return (await client.authentication.create({ data: {} })).auth;
}

export async function authenticate(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const { authorization } = req.headers;

  if (authorization == null) {
    res.status(401).json({ message: "Authorization not included" });
  } else if (
    (await client.authentication.count({
      where: {
        auth: authorization,
      },
    })) == 0
  ) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }

  await client.authentication.updateMany({
    where: {
      auth: authorization,
    },
    data: {
      lastUsed: new Date(),
    },
  });

  return true;
}
