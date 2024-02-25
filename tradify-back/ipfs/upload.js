require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const { config } = require("dotenv");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

async function uploadURI() {
  // we added three attributes, add as many as you want!
  const jsonUriMetadata = {
    name: "Bmw 3er 2024 Sportback ",
    description:
      "The NFT holds the immutable history data of the car since production. It gives ownership of the car to the owner of the NFT",
    image:
      "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmZDDEbE2MGrvnb7n15ZpjAGVLGC5B5NJoxX5w4D2adMwR",

    attributes: [
      {
        trait_type: "VIN",
        value: "12345678901234567",
      },
      {
        trait_type: "Model",
        value: "318d",
      },
      {
        trait_type: "Zylinder",
        value: "4",
      },
      {
        trait_type: "PS/KW",
        value: "150/110",
      },
      {
        trait_type: "0-100 km/h (s)",
        value: "8,9",
      },
      {
        trait_type: "Vmax",
        value: "220 km/h",
      },
      {
        trait_type: "Verbrauch (l)",
        value: "4,5 - 4,9",
      },
      {
        trait_type: "Color",
        value: "Black",
      },
      {
        trait_type: "Date of Production",
        value: "2024-01-01",
      },
    ],
  };

  const jsonOdometer = {
    odometer: "0",
    observations: "",
  };
  const jsonRepairLog = {
    reparations: [
      {
        kindOfReparation: "none",
        observations: "none",
      },
    ],
  };
  const jsonAccidentsTracking = {
    accidents: [
      {
        explanation: "",
      },
    ],
  };

  console.log(typeof jsonUriMetadata);
  const resUriMetadata = await pinata.pinJSONToIPFS(jsonUriMetadata);
  console.log(resUriMetadata);

  const uriMeta = await resUriMetadata.IpfsHash;

  console.log(uriMeta);

  const resOdometer = await pinata.pinJSONToIPFS(jsonOdometer);
  console.log(resOdometer);

  const resRepairLog = await pinata.pinJSONToIPFS(jsonRepairLog);
  console.log(resRepairLog);

  const resAccidents = await pinata.pinJSONToIPFS(jsonAccidentsTracking);
  console.log(resAccidents);

  process.exit(0);
}

uploadURI();
