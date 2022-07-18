import { Box, Tab, Tabs } from "@mui/material";
import { ComponentProps, PropsWithChildren, PropsWithoutRef, PropsWithRef, SyntheticEvent, useState } from "react";

export function TabView(
    props: ComponentProps<any> & {
        children?: Element[] | Element;
    }
) {

    const tabs: Element[] = [];



    if(props.children != null) {
        const children: Element[] | Element = props.children;

        if(children instanceof Array) {
            children.forEach((item) => tabs.push(item));
        } else {
            tabs.push(children);
        }
    }

    const [index, setIndex] = useState(0);

    const handleEvent = (event: React.SyntheticEvent, newValue: number) => {
        setIndex(newValue);
    }

    console.log(tabs);

    return (
        <>
            <Tabs value={index} onChange={handleEvent}>
                {/* {tabs.map((tab,index) => (
                    <Tab key={index} label={tab.props.label} />
                ))} */}
            </Tabs>

        </>
    );
}

export function TabPane({
    children,
    label,
}: PropsWithChildren & {
    label?: string;
}) {

    console.log(label);

    return <div key={label}>
        {children}
    </div>
    ;
}
