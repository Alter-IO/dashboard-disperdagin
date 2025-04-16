import { AppSidebar } from "@/components/app-sidebar"
// import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router";

const DashboardLayoutContainer = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center border-b px-4 justify-between w-full">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>

                    {/* <div className="flex items-center gap-6"> */}
                    {/* <ModeToggle /> */}
                    {/* </div> */}
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayoutContainer;