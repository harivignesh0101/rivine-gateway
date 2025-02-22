import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@components/custom/app-sidebar"
import {HeaderPanel} from "@components/custom/header-panel";
import {Separator} from "@components/ui/separator";
import {ScrollArea} from "@components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderPanel/>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset
                    className="h-full peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4)-var(--header-height))]">
                    <SidebarTrigger className="ml-2 mt-2 sticky"/>
                    <ScrollArea className="h-[calc(100svh-theme(spacing.4)-(var(--header-height)*2))]">
                        <div className="p-2">
                            {children}
                        </div>
                    </ScrollArea>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
