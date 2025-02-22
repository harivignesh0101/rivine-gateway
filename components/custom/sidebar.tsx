import Link from "next/link";

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {ServerCog, Users} from "@node_modules/lucide-react";
import {ModeToggle} from "@components/ui/mode-toggle";
import React from "react";
import {OrganizationSwitcherComponent} from "@components/custom/organization-switcher";
import {UserButtonComponent} from "@components/custom/user-button-component";
import {ProjectSwitcher} from "@components/custom/project-switcher";

export function AppSidebar() {
    const items = [
        {
            title: "Instances",
            url: "/dashboard/gateway/instances",
            icon: ServerCog,
        },
        {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
        }
        ]

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex justify-start items-center">
                            <span>
                                <OrganizationSwitcherComponent />
                            </span>
                        </div>
                    </div>

                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-center">
                    <ModeToggle></ModeToggle>
                </div>
                <div className="flex justify-center">
                    <UserButtonComponent></UserButtonComponent>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
