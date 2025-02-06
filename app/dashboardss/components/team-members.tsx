"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

const teamMembers = [
  {
    name: "Talal Shoaib",
    email: "talalshoaib1991@gmail.com",
    role: "Owner",
  },
  {
    name: "Abdul Wahid",
    email: "awc4532350@gmail.com",
    role: "Co-Owner",
  },
  {
    name: "Abdul Ahad",
    email: "hafizabdulahadkhanafridi@gmail.com",
    role: "Co-Owner",
  },
];

export function TeamMembers() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Invite Your Team Members To Collaborate.
      </div>
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.email} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/profilepic.jpg" />
                <AvatarImage src="/profilepic2.jpg" />
                <AvatarImage src="/profilepic3.jpg" />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {member.name}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {member.role} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Copy Email</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Remove Member
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
      <Button className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Member
      </Button>
    </div>
  );
}