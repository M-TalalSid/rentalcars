export default {
    name: "rental",
    title: "Rental Orders",
    type: "document",
    fields: [
      {
        name: "orderNumber",
        title: "Order Number",
        type: "string",
        readOnly: true,
      },
      {
        name: "name",
        title: "Customer Name",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "phone",
        title: "Phone Number",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "email",
        title: "Email",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "address",
        title: "Address",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "city",
        title: "City",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "pickupDate",
        title: "Pickup Date",
        type: "datetime",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "dropoffDate",
        title: "Dropoff Date",
        type: "datetime",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "car",
        title: "Car",
        type: "reference",
        to: [{ type: "car" }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "paymentType",
        title: "Payment Method",
        type: "string",
        options: {
          list: ["credit-card", "paypal"],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "totalAmount",
        title: "Total Amount",
        type: "number",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "paypalTransactionId",
        title: "PayPal Transaction ID",
        type: "string",
      },
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Confirmed", value: "confirmed" },
            { title: "Completed", value: "completed" },
            { title: "Cancelled", value: "cancelled" },
          ],
          default: "pending",
        },
      },
      {
        name: "orderDate",
        title: "Order Date",
        type: "datetime",
        readOnly: true,
      },
      {
        name: "marketingConsent",
        title: "Marketing Consent",
        type: "boolean",
        description: "Customer has agreed to receive marketing emails",
      },
      {
        name: "termsAccepted",
        title: "Terms Accepted",
        type: "boolean",
        validation: (Rule: any) => Rule.required(),
      },
    ],
  }
  
  