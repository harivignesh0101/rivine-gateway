"use client";

import React from "react";

import {OrganizationSwitcher} from "@clerk/nextjs";
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes";


export function OrganizationSwitcherComponent() {
    const { resolvedTheme } = useTheme()
    return(
        <OrganizationSwitcher appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }} />
    )
}
