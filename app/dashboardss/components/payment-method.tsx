"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, ShoppingCartIcon as Paypal } from "lucide-react";

export function PaymentMethod() {
  const [paymentType, setPaymentType] = React.useState("card");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={paymentType === "card" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setPaymentType("card")}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Card
        </Button>
        <Button
          variant={paymentType === "paypal" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setPaymentType("paypal")}
        >
          <Paypal className="mr-2 h-4 w-4" />
          PayPal
        </Button>
      </div>

      {paymentType === "card" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name On Card</Label>
            <Input id="name" placeholder="First Last" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="number">Card Number</Label>
            <Input id="number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Expiry Month</Label>
              <Select>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, "0");
                    return (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Expiry Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString();
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" maxLength={4} />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">PayPal Email</Label>
            <Input id="email" placeholder="m@example.com" type="email" />
          </div>
        </div>
      )}

      <Button className="w-full">Save Payment Method</Button>
    </div>
  );
}