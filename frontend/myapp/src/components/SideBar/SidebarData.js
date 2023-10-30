import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/dashboard"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    } ,
    {
        title: "Upgrade & Credits",
        icon: <AccountBalanceWalletIcon />,
        link: "/upgrade"
    }
]
