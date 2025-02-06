import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { client, ORDERS_QUERY } from "@/lib/sanity";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

async function getRecentSales() {
  return client.fetch(ORDERS_QUERY);
}

export async function RecentSales() {
  const sales = await getRecentSales();

  return (
    <div className="space-y-8">
      {sales
        .slice(0, 5)
        .map(
          (sale: {
            _id: Key | null | undefined;
            customer: {
              name:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<unknown>>
                | Iterable<ReactNode>
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<
                        unknown,
                        string | JSXElementConstructor<unknown>
                      >
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              email:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<unknown>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<
                        unknown,
                        string | JSXElementConstructor<unknown>
                      >
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | Iterable<ReactNode>
                | null
                | undefined;
            };
            totalAmount: string | number | bigint;
          }) => (
            <div key={sale._id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder-user.jpg"
                  alt={String(sale.customer.name)}
                />
                <AvatarFallback>
                  {typeof sale.customer.name === "string"
                    ? sale.customer.name.slice(0, 2).toUpperCase()
                    : "NA"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {typeof sale.customer.name === "string" ? sale.customer.name : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {typeof sale.customer.email === "string" ? sale.customer.email : ""}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(sale.totalAmount))}
              </div>
            </div>
          )
        )}
    </div>
  );
}