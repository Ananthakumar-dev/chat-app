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
  const dispatch = useAppDispatch();

  const { contacts, chatPartners, activeUser, onlineUserIds } = useAppSelector(
    (state) => state.chat,
  );

  const openChat = (user: any) => {
    dispatch(setActiveUser(user));
    dispatch(getMessages(user.id));
  };

  const renderUserRow = (user: any) => {
    const isOnline = onlineUserIds.includes(user.id);
    const isActive = activeUser?.id === user.id;

    return (
      <a
        href="#"
        key={user.id}
        onClick={(event) => {
          event.preventDefault();
          openChat(user);
        }}
        className={`flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
        }`}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isOnline ? "bg-green-500" : "bg-slate-300"
              }`}
            />
            <span className="font-medium">{user.name}</span>
          </div>
          <span className="text-xs">
            {user.last_message
              ? new Date(user.last_message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {user.last_message ? user.last_message.message : "No messages yet"}
          </p>
          <span className="text-[11px] text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </a>
    );
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
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <Tabs defaultValue="chat_partners">
              <TabsList className="w-full">
                <TabsTrigger value="chat_partners">Chat Partners</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>
              <TabsContent value="chat_partners">
                <SidebarGroupContent>
                  {chatPartners.map((user) => renderUserRow(user))}
                </SidebarGroupContent>
              </TabsContent>
              <TabsContent value="contacts">
                <SidebarGroupContent>
                  {contacts.map((user) => renderUserRow(user))}
                </SidebarGroupContent>
              </TabsContent>
            </Tabs>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
