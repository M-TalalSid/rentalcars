"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Address, Rate, trackingObjType } from "@/type";
import { cartProductsWhichCanBeShipped } from "@/data";
import Link from "next/link";
import Head from "next/head";

const ShippingRatesPage = () => {
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "Eduardo Gilbert",
    phone: "+971-5842-2967-1",
    addressLine1: "19444 Aspen Rdg Ct",
    addressLine2: "", // Optional
    cityLocality: "Oregon City",
    stateProvince: "OR",
    postalCode: "97045",
    countryCode: "US",
    addressResidentialIndicator: "no", // 'no' means a commercial address
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setrateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with localStorage and system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Function to handle form submission of shipping rates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipeToAddress,
        // map the cart products which can be shipped and use only weight and dimensions
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      // see the response in browser
      console.log(response.data);
      // Update the state with the fetched rates
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  // Function to create label from selected rate
  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
    }

    setLoading(true);
    setErrors([]);

    try {
      // get rateId which user selected
      const response = await axios.post("/api/shipengine/label", {
        rateId: rateId,
      });
      const labelData = response.data;
      // see the response of label in browser
      console.log(labelData);
      // set pdf url
      setLabelPdf(labelData.labelDownload.href);
      // set tracking obj
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Shipping Rates - Your Company Name</title>
        <meta
          name="description"
          content="Calculate and compare shipping rates for your packages."
        />
        <meta
          name="keywords"
          content="shipping rates, shipping labels, tracking"
        />
        <meta name="author" content="Your Company Name" />
        <link rel="canonical" href="https://yourwebsite.com/shipping-rates" />
      </Head>
      <div
        className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors focus:outline-none"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <div
          className={`max-w-4xl mx-auto rounded-lg shadow-lg p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">Shipping Rates</h1>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* To Address Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ship To Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={shipeToAddress.name}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      name: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={shipeToAddress.phone}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      phone: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={shipeToAddress.addressLine1}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      addressLine1: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={shipeToAddress.addressLine2}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      addressLine2: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shipeToAddress.cityLocality}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      cityLocality: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="State/Province"
                  value={shipeToAddress.stateProvince}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      stateProvince: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={shipeToAddress.postalCode}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                <input
                  type="text"
                  placeholder="Country Code (e.g., PK)"
                  value={shipeToAddress.countryCode}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      countryCode: e.target.value,
                    })
                  }
                  className={`p-2 border rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } disabled:bg-gray-400`}
            >
              {loading ? "Calculating..." : "Get Shipping Rates"}
            </button>
          </form>

          {/* Display Available Rates */}
          {rates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Available Shipping Rates
              </h2>
              <div className="gap-4 flex items-center flex-wrap">
                {rates.map((rate) => (
                  <div
                    key={rate.rateId}
                    className={`p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
                      rateId === rate.rateId
                        ? darkMode
                          ? "border-blue-600 bg-blue-900"
                          : "border-blue-600 bg-blue-100"
                        : darkMode
                          ? "border-gray-700 bg-gray-700"
                          : "border-gray-200 bg-gray-50"
                    }`}
                    onClick={() => setrateId(rate.rateId)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shippingRate"
                        checked={rateId === rate.rateId}
                        onChange={() => setrateId(rate.rateId)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <div>
                        <p className="text-lg font-medium">
                          <strong>Carrier:</strong> {rate.carrierFriendlyName}
                        </p>
                        <p>
                          <strong>Service:</strong> {rate.serviceType}
                        </p>
                        <p className="font-semibold">
                          <strong>Cost:</strong> {rate.shippingAmount.amount}{" "}
                          {rate.shippingAmount.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Label Button */}
          {rateId && (
            <div className="mt-8">
              <button
                onClick={handleCreateLabel}
                disabled={loading}
                className={`w-full px-4 py-2 rounded-md transition-colors duration-300 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } disabled:bg-gray-400`}
              >
                {loading ? "Creating Label..." : "Create Label"}
              </button>
            </div>
          )}
          {labelPdf && (
            <Link target="_blank" href={labelPdf}>
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Download Label
              </button>
            </Link>
          )}
          {trackingObj && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                For Tracking (We Are Using ShipEngine Test API Key So Order Will
                Not Trace)
              </h2>
              <p>Tracking Number: {trackingObj.trackingNumber}</p>
              <p>LabelId: {trackingObj.labelId}</p>
              <p>CarrierCode: {trackingObj.carrierCode}</p>
              <Link href={`/tracking/?labelId=${trackingObj.labelId}`}>
                <button
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Track Order
                </button>
              </Link>
            </div>
          )}
          {errors.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Errors</h2>
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShippingRatesPage;