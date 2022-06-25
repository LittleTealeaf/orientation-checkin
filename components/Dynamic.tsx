


export function NotNull(value: any | null, func: () => JSX.Element) {
    if(value != null) {
        return func();
    } else {
        return <></>;
    }
}


export function NotAnyNull(value: Array<any>, func: () => JSX.Element) {
    if(value.filter(i => i == null).length > 0) {
        return <></>
    } else {
        return func();
    }
}
