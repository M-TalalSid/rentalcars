"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialPayments = [
  {
    id: 1,
    amount: 100,
    status: "success",
    email: "john@example.com",
    date: "2023-05-01",
  },
  {
    id: 2,
    amount: 250,
    status: "pending",
    email: "jane@example.com",
    date: "2023-05-02",
  },
  {
    id: 3,
    amount: 500,
    status: "success",
    email: "bob@example.com",
    date: "2023-05-03",
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    email: "",
    status: "pending",
  });
  
  const [filterStatus, setFilterStatus] = useState("all");

  const addPayment = () => {
    if (newPayment.amount && newPayment.email) {
      setPayments([
        ...payments,
        {
          id: payments.length + 1,
          amount: Number.parseFloat(newPayment.amount),
          status: newPayment.status,
          email: newPayment.email,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewPayment({ amount: "", email: "", status: "pending" });
    }
  };

  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter((payment) => payment.status === filterStatus);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Payments</h2>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Add New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
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
                value={newPayment.email}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, email: e.target.value })
                }
                className="col-span-3 bg-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newPayment.status}
                onValueChange={(value: unknown) =>
                  setNewPayment({ ...newPayment, status: value as string })
                }
              >
                <SelectTrigger className="col-span-3 bg-gray-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={addPayment}
              className="bg-[#3563E9] text-white hover:bg-[#2952cc]"
            >
              Add Payment
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] bg-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      payment.status === "success"
                        ? "text-green-500"
                        : payment.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }
                  >
                    {payment.status}
                  </TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};