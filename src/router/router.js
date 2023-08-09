import Jordan from "../components/pages/Jordan/Jordan";
import NewBalance from "../components/pages/NewBalance/NewBalance";
import Nike from "../components/pages/Nike/Nike";
import NikeSB from "../components/pages/NikeSB/NikeSB";

export const routes = [
    {path: '/brands/nike', element: <Nike />, key: 0},
    {path: '/brands/nike-sb', element: <NikeSB />, key: 1},
    {path: '/brands/new-balance', element: <NewBalance />, key: 2},
    {path: '/brands/jordan', element: <Jordan />, key: 3}
]