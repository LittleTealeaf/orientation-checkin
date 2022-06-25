import { NextApiRequest, NextApiResponse } from "next";


export type Parameters = {
    id?: number;
    groupId?: number;
    groupName?: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
}
