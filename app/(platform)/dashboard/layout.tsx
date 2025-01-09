import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@components/custom/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger />
                <div className="mx-10 mt-3">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
