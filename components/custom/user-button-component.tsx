"use client";

import React from "react";

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes";


export function UserButtonComponent() {
    const { theme } = useTheme()
    return(
        <UserButton appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
        }} />
    )
}
