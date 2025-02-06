import { Address, Package } from "./type";
import { NextRequest } from "next/server";
import ShipEngine from "shipengine";

export async function POST(req: NextRequest) {
  const {
    shipeToAddress,
    parcels,
  }: { shipeToAddress: Address; parcels: Package[] } = await req.json();
  const shipengine = new ShipEngine({
    apiKey: "TEST_MUm2tgkqsO5fGDBYPAgQH4w+t/m4Mu9XHFzNp18axyE",
  });

  try {
    // if (!shipeToAddress || !packages) {
    //   return new Response(
    //     JSON.stringify({ error: "Missing required fields" }),
    //     { status: 400 }
    //   );
    // }
    const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: {
          name: "Recipient Name", // Replace with the recipient's name
          phone: "+92 301 0219324", // Replace with the recipient's phone number
          addressLine1: "Aiwan-e-Sadar", // Shortened to fit within 35 characters
          addressLine2: "Civil Lines", // Additional details moved to Address Line 2
          cityLocality: "Karachi",
          stateProvince: "Sindh",
          postalCode: "74600",
          countryCode: "PK",
          addressResidentialIndicator: "yes",
        },
        packages: parcels,
      },
      rateOptions: {
        carrierIds: ["se-1779373", "se-1779374", "se-1779375", "se-1779506"],
        // serviceCodes: ["ups_ground"],
      },
    });
    console.log(shipeToAddress, parcels, shipmentDetails);
    return new Response(JSON.stringify({ shipeToAddress, parcels , shipmentDetails}), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}