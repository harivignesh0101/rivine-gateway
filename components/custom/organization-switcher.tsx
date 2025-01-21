"use client";

import React from "react";

import {OrganizationSwitcher} from "@clerk/nextjs";
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes";


export function OrganizationSwitcherComponent() {
    const { theme } = useTheme()
    return(
        <OrganizationSwitcher appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
        }} />
    )
}
