// Sanity schema for the dashboard data
export default {
    name: "dashboard",
    type: "document",
    title: "Dashboard Data",
    fields: [
      {
        name: "totalRevenue",
        type: "number",
        title: "Total Revenue",
      },
      {
        name: "subscriptions",
        type: "object",
        title: "Subscriptions",
        fields: [
          { name: "total", type: "number", title: "Total Subscriptions" },
          { name: "percentage", type: "number", title: "Subscription Growth Percentage" },
          {
            name: "data",
            type: "array",
            title: "Subscription Data",
            of: [
              {
                type: "object",
                fields: [
                  { name: "name", type: "string", title: "Month" },
                  { name: "total", type: "number", title: "Total" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "cookieConsent",
        type: "object",
        title: "Cookie Consent",
        fields: [
          { name: "necessary", type: "number", title: "Necessary" },
          { name: "functional", type: "number", title: "Functional" },
          { name: "analytics", type: "number", title: "Analytics" },
        ],
      },
      {
        name: "analytics",
        type: "object",
        title: "Analytics",
        fields: [
          {
            name: "daily",
            type: "array",
            title: "Daily Analytics",
            of: [
              {
                type: "object",
                fields: [
                  { name: "date", type: "string", title: "Date" },
                  { name: "sales", type: "number", title: "Sales" },
                  { name: "visitors", type: "number", title: "Visitors" },
                ],
              },
            ],
          },
          {
            name: "weekly",
            type: "array",
            title: "Weekly Analytics",
            of: [
              {
                type: "object",
                fields: [
                  { name: "date", type: "string", title: "Week" },
                  { name: "sales", type: "number", title: "Sales" },
                  { name: "visitors", type: "number", title: "Visitors" },
                ],
              },
            ],
          },
          {
            name: "monthly",
            type: "array",
            title: "Monthly Analytics",
            of: [
              {
                type: "object",
                fields: [
                  { name: "date", type: "string", title: "Month" },
                  { name: "sales", type: "number", title: "Sales" },
                  { name: "visitors", type: "number", title: "Visitors" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  