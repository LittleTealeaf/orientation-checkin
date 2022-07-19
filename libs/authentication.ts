import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export const fetchAPI = async (path: string, auth: string) =>
    fetch(path, {
        method: "POST",
        headers: {
            authorization: auth,
        },
    }).then((response) => response.json());

export const buildSWRFetcher = (auth: string) => (args: string) =>
    fetch(args, {
        method: "POST",
        headers: {
            authorization: auth,
        },
    }).then((response) => response.json());

async function cleanAuthKeys() {
    const client = new PrismaClient();
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
    const client = new PrismaClient();
    await cleanAuthKeys();
    const auth = (await client.authentication.create({ data: {} })).auth;
    client.$disconnect();
    return auth;
}

export async function authenticate(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
    const client = new PrismaClient();
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
        client.$disconnect();
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
