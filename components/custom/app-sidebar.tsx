import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {ServerCog, Users} from "lucide-react";
import Link from "next/link";
import {ProjectSwitcher} from "@components/custom/project-switcher";

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <Sidebar className="top-[--header-height]" variant="sidebar" {...props} collapsible="icon">
            <SidebarHeader>
                <ProjectSwitcher
                    versions={data.versions}
                    defaultVersion={data.versions[0]}
                />
            </SidebarHeader>
            <SidebarContent>
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
            <SidebarRail />
        </Sidebar>
    );
}
