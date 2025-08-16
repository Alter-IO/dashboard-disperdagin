import { type Icon } from "@tabler/icons-react"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router"
import { ChevronDown } from "lucide-react"

interface SubNavItem {
  title: string
  url: string
  icon?: Icon
}

interface NavItem {
  title: string
  url?: string
  icon?: Icon
  items?: SubNavItem[]
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemTitle: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemTitle)) {
      newOpenItems.delete(itemTitle);
    } else {
      newOpenItems.add(itemTitle);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            // Jika item memiliki submenu
            if (item.items && item.items.length > 0) {
              const isOpen = openItems.has(item.title);
              
              return (
                <Collapsible 
                  key={item.title} 
                  asChild 
                  open={isOpen}
                  onOpenChange={() => toggleItem(item.title)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronDown 
                          className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`} 
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild
                              onClick={() => navigate(subItem.url)}
                            >
                              <a href="#" onClick={(e) => {
                                e.preventDefault();
                                navigate(subItem.url);
                              }}>
                                {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            }

            // Jika item tidak memiliki submenu (menu biasa)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  onClick={() => item.url && navigate(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}