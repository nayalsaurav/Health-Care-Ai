import { SidebarProvider } from "@/components/ui/sidebar"
import SideBar from './SideBar'
import { Home, MessageSquare, Calendar, Settings, User2, LogOut, Menu , MapPin , Pill , AlertTriangle , Activity } from "lucide-react"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  
} from "@/components/ui/sidebar"

// Menu items with routes
const menuItems = [
  {
    icon: Home,
    title: "Home",
    path: "/"
  },
  {
    icon: MessageSquare,
    title: "Chat",
    path: "/dashboard/chatbot"
  },
  {
    icon: Calendar,
    title: "Schedule",
    path: "/dashboard/schedule"
  },
  {
    icon: MapPin,
    title: "Find",
    path: "/dashboard/findHosp"
  },
  {
    icon: Pill,
    title: "Medicines",
    path: "/dashboard/medicine"
  },
  {
    icon: AlertTriangle,
    title: "Emergency SOS",
    path: "/dashboard/emergency" 
  },
  {
    icon: Activity,
    title: "Health Tracker",
    path: "/dashboard/tracker"
  },

]

export default function SideBar2() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const isMobile = window.innerWidth <= 768

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarProvider>
      <div className={`border-r border-border bg-background flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="p-2 md:p-4 border-b border-border flex justify-between items-center">
          {!isCollapsed && (
            <span className="font-semibold text-sm md:text-base">Healthcare AI</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 md:p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Menu className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-1 md:p-2">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-md hover:bg-accent transition-colors mb-1 ${
                  isCollapsed ? 'justify-center' : 'justify-start'
                }`}
              >
                <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                {!isCollapsed && (
                  <span className="text-sm md:text-base">{item.title}</span>
                )}
              </button>
            ))}
          </div>

          {/* Chat History */}
          <div className="flex-1">
            <SideBar isCollapsed={isCollapsed} />
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-border p-2 md:p-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer ${
                isCollapsed ? 'justify-center' : 'justify-start'
              }`}>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User2 className="h-3 w-3 md:h-4 md:w-4" />
                </div>
                {!isCollapsed && (
                  <span className="font-medium text-sm md:text-base">Profile</span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 md:w-56">
              <DropdownMenuItem>
                <User2 className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </SidebarProvider>
  )
}