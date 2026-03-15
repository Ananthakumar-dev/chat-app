"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveUser, getMessages } from "@/store/slices/chatSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const dispatch = useAppDispatch();

  const { contacts, chatPartners } = useAppSelector((state) => state.chat);

  const openChat = (user: any) => {
    dispatch(setActiveUser(user));
    dispatch(getMessages(user.id));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">Inbox</div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <Tabs defaultValue="chat_partners" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="chat_partners">Chat Partners</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>
              <TabsContent value="chat_partners">
                <SidebarGroupContent>
                  {chatPartners.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => openChat(user)}
                      className="hover:bg-sidebar-accent flex w-full flex-col items-start gap-2 border-b p-4 text-sm"
                    >
                      {user.name}
                    </button>
                  ))}
                </SidebarGroupContent>
              </TabsContent>
              <TabsContent value="contacts">
                <SidebarGroupContent>
                  {contacts.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => openChat(user)}
                      className="hover:bg-sidebar-accent flex w-full flex-col items-start gap-2 border-b p-4 text-sm"
                    >
                      {user.name}
                    </button>
                  ))}
                </SidebarGroupContent>
              </TabsContent>
            </Tabs>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
