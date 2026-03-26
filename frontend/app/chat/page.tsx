"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getContacts, getChatPartners } from "@/store/slices/chatSlice";

import { AppSidebar } from "@/components/chat/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChatWindow from "@/components/chat/chat-window";
import { NavUser } from "@/components/chat/nav-user";
import ChatSocket from "@/components/chat/chat-socket";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
    dispatch(getChatPartners());
  }, [dispatch]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <ChatSocket />
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center justify-between border-b p-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex-end">
            <NavUser />
          </div>
        </header>

        <ChatWindow />
      </SidebarInset>
    </SidebarProvider>
  );
}
