"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialTeam = [
  {
    id: 1,
    name: "Talal Shoaib",
    role: "Frontend Developer",
    email: "talalshoaib1991@gmail.com",
    status: "Active",
    profilePictureUrl:
      "https://media-hosting.imagekit.io//2670a810a7a74c8e/_B7A1902.JPG?Expires=1832234540&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=FY~c4ZCnyNEOXc6GPlg~G7VCwaI~9k0kpcPKj5~CEt4hHUM9LIzeTwlr9GjB5U~ybyxQwRc~-i90OiIj9aLHAkC5Ak0mjh1bRNi~bojbwPesJmuTed3vwXhArtP8QqeiL9Sa35f1pt5~98rXELm2pbHSkDiNxG-pLVEw2nYltxUXujO2ZY60xxLYOqP3cHXndDrKtl-JLqCRxOWWwg7tJ-SjiOf3CYlAZr3UJfz7C6d2DbvT09YhS3TpeQHi9WMxYexQh4cb4wUnFO5pPNcUoKX9OfaFPIOMkplyNCg5tx0RM-07tlKHPjUkPUird4YF3PFXmvQXdE2Dke8iPjKQvQ__", // Replace with the actual URL
  },
  {
    id: 2,
    name: "Adul Ahad",
    role: "Backend Developer",
    email: "hafizabdulahadkhanafridi@gmail.com",
    status: "Active",
    profilePictureUrl:
      "https://media-hosting.imagekit.io//a87894a7863c46a3/WhatsApp%20Image%202025-01-23%20at%203.10.40%20PM.jpeg?Expires=1832235107&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VBfuTfnklN2HcuZbDrTr5PJ1wPxxo5laamElzj3Z5D8CfMaQ36Gb59SQMpPvKnL2RjhGwiEeXUiwRZcgktUB8zfPvv8r5TIKg74O7eQORVFMqCPK0ywUom4B98yU0WbLlSEFBKgRWDiwXA195zQNafVUR4pESxtkTFKUyl8TQj7~8MNdogvODPwZacaNfbjZjB8jV0kKZbDUeHuWC~O7HoXrT5E2zw6fWhmNhvI73TJmiaS6V4d7OBv9S8n4mycFTChrLcfaQdJiISo-IgP79e5lY0JdVkJNNeqdAf1~std-9X7UdZI-Jqk-4h-r2Xyne2C9LNUzyZg8HOCSeFTXXQ__", // Replace with the actual URL
  },
  {
    id: 3,
    name: "Abdul Wahid",
    role: "Designer",
    email: "awc4532350@gmail.com",
    status: "Active",
    profilePictureUrl:
      "https://media-hosting.imagekit.io//bc955d522dab468d/WhatsApp%20Image%202025-01-23%20at%203.05.47%20PM.jpeg?Expires=1832234806&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=dJVoFKHjCcXcbuxh4nAanqNjFeZf~d2T~v8Y~I3aR4WwittDHOmc6USpdXvA8XO5cOkknyGeHECp8KhcUm~i7D4m4b8yQ2TJdpLgLGTX0dhGzuBRbDLhIgNA8KJJjB6JILEVkIksiZl8Ffxd0VixWKA-UPubSFsjVMmWZY1Ph3fjuquy2x6HOQQSi4OLxtQzKOMBLp08cCaqRawnVOJ-6AW8~qXP4ax~JLO8lCeob0vbYRYEKtoYwOIk7IkFBtnwcWCQy~LTC7-kB5Ala7ato-UCDME1JhwFld~TMgscUdTKvI~gSb3hiRF6vrG1aoRFu09FJvnxG2i96kSIRpEPpg__", // Replace with the actual URL
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState(initialTeam);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    status: "Active",
    profilePictureUrl: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const addTeamMember = () => {
    if (
      newMember.name &&
      newMember.role &&
      newMember.email &&
      newMember.status &&
      newMember.profilePictureUrl
    ) {
      setTeam([...team, { ...newMember, id: team.length + 1 }]);
      setNewMember({
        name: "",
        role: "",
        email: "",
        status: "Active",
        profilePictureUrl: "",
      });
    }
  };

  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Team Members</h2>
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs bg-gray-800 text-white"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <Card key={member.id} className="bg-gray-800 text-white">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Avatar>
                <AvatarImage src={member.profilePictureUrl} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{member.email}</p>
              <p
                className={`text-sm mt-2 ${member.status === "Active" ? "text-green-500" : "text-yellow-500"}`}
              >
                {member.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#3563E9] text-white hover:bg-[#2952cc]">
            Add Team Member
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to your team here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newMember.status}
                onValueChange={(value: unknown) =>
                  setNewMember({ ...newMember, status: value as string })
                }
              >
                <SelectTrigger className="col-span-3 bg-gray-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={addTeamMember}
              className="bg-[#3563E9] text-white hover:bg-[#2952cc]"
            >
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}