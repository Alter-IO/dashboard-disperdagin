import * as React from "react"
import {
  IconChartCandle,
  IconDashboard,
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
  IconMapPin,
  IconChevronRight
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Komoditas",
      icon: IconChartCandle,
      items: [
        {
          title: "Tipe Komoditas",
          url: "/commodity-type",
          icon: IconChevronRight,
        },
        {
          title: "Daftar Komoditas",
          url: "/commodity",
          icon: IconChevronRight,
        },
      ]
    },
    {
      title: "Wilayah",
      icon: IconMapPin,
      items: [
        {
          title: "Kecamatan",
          icon: IconChevronRight,
          url: "/kecamatan",
        },
        {
          title: "Kelurahan", 
          icon: IconChevronRight,
          url: "/kelurahan",
        },
      ],
    },
    {
      title: "Pegawai",
      url: "/employee",
      icon: IconUsers,
    },
    {
      title: "Pengguna",
      url: "/user-management",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mt-6 mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconLayoutDashboard className="!size-5" />
                <span className="text-base font-semibold">DISPERDAGIN</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
