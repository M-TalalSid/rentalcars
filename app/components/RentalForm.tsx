"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CreditCard, Check } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Image from "next/image";
import { createRentalOrder } from "@/app/actions/rental-actions";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    pickupDate: z.date({
      required_error: "Pickup date is required",
    }),
    dropoffDate: z.date({
      required_error: "Drop-off date is required",
    }),
    paymentType: z.enum(["credit-card", "paypal"]),
    cardNumber: z.string().optional(),
    cardHolder: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    marketingConsent: z.boolean().default(false),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine(
    (data) => {
      if (data.paymentType === "credit-card") {
        return (
          data.cardNumber?.length === 16 &&
          (data.cardHolder?.length ?? 0) >= 2 &&
          /^\d{2}\/\d{2}$/.test(data.expiryDate || "") &&
          data.cvc?.length === 3
        );
      }
      return true;
    },
    {
      message: "Please fill in all credit card details correctly",
      path: ["paymentType"],
    }
  );

interface RentalFormProps {
  id: string;
  car: {
    name: string;
    pricePerDay: number;
    imageUrl: string;
  };
}

export default function RentalForm({ id, car }: RentalFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: "credit-card",
      marketingConsent: false,
      termsAccepted: false,
    },
  });

  const { watch } = form;
  const paymentType = watch("paymentType");
  const pickupDate = watch("pickupDate");
  const dropoffDate = watch("dropoffDate");

  const rentalDays =
    pickupDate && dropoffDate
      ? Math.ceil(
          Math.abs(
            new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()
          ) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  const totalAmount = car.pricePerDay * rentalDays;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (data.paymentType === "credit-card") {
        // Here you would typically process the credit card payment
        // Add your payment processing logic here
      }

      const result = await createRentalOrder({
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        pickupDate: data.pickupDate,
        dropoffDate: data.dropoffDate,
        carId: id,
        paymentType: data.paymentType,
        totalAmount,
        marketingConsent: data.marketingConsent,
        termsAccepted: data.termsAccepted,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create rental order");
      }

      router.push("/payment/success");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process rental";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 000-0000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rental Dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pickupDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Pickup Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() ||
                                    (dropoffDate ? date > dropoffDate : false)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dropoffDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Drop-off Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() ||
                                    (pickupDate ? date < pickupDate : false)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit-card">
                                  <span className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Credit Card
                                  </span>
                                </SelectItem>
                                <SelectItem value="paypal">
                                  <span className="flex items-center">
                                    <Image
                                      src="/paypal.svg"
                                      alt="PayPal"
                                      width={16}
                                      height={16}
                                      className="mr-2 h-4 w-4"
                                    />
                                    PayPal
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentType === "credit-card" && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="4111 1111 1111 1111"
                                  {...field}
                                  maxLength={16}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid sm:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="cardHolder"
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel>Card Holder</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MM/YY"
                                    {...field}
                                    maxLength={5}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123"
                                  {...field}
                                  maxLength={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {paymentType === "paypal" && (
                      <div className="mt-4">
                        <PayPalButtons
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: "USD",
                                    value: totalAmount.toString(),
                                  },
                                },
                              ],
                              intent: "CAPTURE",
                            });
                          }}
                          onApprove={async (data, actions) => {
                            if (!actions.order) {
                              throw new Error("Order actions are undefined");
                            }
                            const details = await actions.order.capture();
                            const result = await createRentalOrder({
                              name: form.getValues("name"),
                              phone: form.getValues("phone"),
                              email: form.getValues("email"),
                              address: form.getValues("address"),
                              city: form.getValues("city"),
                              pickupDate: form.getValues("pickupDate"),
                              dropoffDate: form.getValues("dropoffDate"),
                              carId: id,
                              paymentType: "paypal",
                              totalAmount,
                              paypalTransactionId: details.id,
                              marketingConsent:
                                form.getValues("marketingConsent"),
                              termsAccepted: form.getValues("termsAccepted"),
                            });

                            if (result.success) {
                              router.push("/payment/success");
                            } else {
                              setSubmitError(
                                "Failed to process PayPal payment"
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="marketingConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Marketing Communications</FormLabel>
                            <FormDescription>
                              Receive updates about special offers and new
                              vehicles
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Terms and Conditions</FormLabel>
                            <FormDescription>
                              I agree to the terms of service and privacy policy
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {submitError && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}

                {paymentType === "credit-card" && (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Complete Rental
                      </>
                    )}
                  </Button>
                )}
              </form>
            </Form>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Rental Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span className="font-medium">{car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium">{rentalDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Rate</span>
                  <span className="font-medium">${car.pricePerDay}/day</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}