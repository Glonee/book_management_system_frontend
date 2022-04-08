export const homepage: string = "/bms";
export const pages = [
    { name: "Home", to: homepage === "" ? "/" : homepage },
    { name: "Books", to: `${homepage}/books` },
    { name: "Borrow", to: homepage === "" ? "/" : homepage }
];