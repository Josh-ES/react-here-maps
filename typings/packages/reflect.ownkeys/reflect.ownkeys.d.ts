declare module 'reflect.ownkeys' {
    type PropertyKey = string | number | symbol;
    function ownKeys(target: any): Array<PropertyKey>;
    export = ownKeys;
}