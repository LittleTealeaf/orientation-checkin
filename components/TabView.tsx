import { Box } from "@mui/material";
import { ComponentProps, PropsWithChildren, PropsWithoutRef, PropsWithRef, SyntheticEvent, useState } from "react";


export function TabView({children}: ComponentProps<any> & {
    children?: Element[] | Element
}) {

    const tabs: Element[] = [];

    if(children instanceof Array) {
        children.forEach((item) => {
            tabs.push(item);
        })
    } else {
        tabs.push(children);
    }

    return <></>
}

export function TabPane({}: PropsWithChildren & {
    label?: string;
}) {

    return <></>
}
