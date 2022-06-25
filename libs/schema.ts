export type Student = {
    id: number;
    nameFirst?: string;
    nameLast?: string;
    roomId?: number;
}

export type Room = {
    id: number;
    number?: number;
    building?: string;
    spots?: number;
}
