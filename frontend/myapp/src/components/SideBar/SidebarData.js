import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/dashboard"
    },
    {
        title: "Tools",
        icon: <CreateIcon />,
        link: "/Tools"
    },
    /*{
        title: "Favorite Tools",
        icon: <FavoriteIcon />,
        link: "#"
    },*/
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    },
    {
        title: "Upgrade & Credits",
        icon: <AccountBalanceWalletIcon />,
        link: "/upgrade"
    }
]