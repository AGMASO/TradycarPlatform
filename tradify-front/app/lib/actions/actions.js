"use server";
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const { config } = require("dotenv");
const pinata = new pinataSDK({
  pinataJWTKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZjdhNWFkZi02YjBhLTQzMTEtYTZlMC0zYWI3OGVmZTA1Y2YiLCJlbWFpbCI6ImFnb3NlbGxlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2UxZDAzNmFjMDc2MGIxNTVjYTkiLCJzY29wZWRLZXlTZWNyZXQiOiJlMzMyM2IzYTM2MTA3ZTNmOWQwMGNjNTBmMTFkMjYwYjMxOWI1ZTlkYzljYzBjMTVjYWJhNTIyNjQ5ZTkwNDE3IiwiaWF0IjoxNzA2ODA3ODQ1fQ.4jTV0FIdzDNHq7ROVbVSYcATMBoAio6W64pn3KU63zk",
});

let json = null;

export default async function submitAction(prevState, data) {
  console.log(data);
  console.log("prevState:", prevState);

  const nameValue = data.get("name");
  const descriptionValue = data.get("description");
  const vimValue = data.get("vim");
  const modelValue = data.get("model");
  const zylinderValue = data.get("zylinder");
  const psValue = data.get("ps");
  const speedValue = data.get("speed");
  const vmaxValue = data.get("vmax");
  const colorValue = data.get("color");
  const productionDateValue = data.get("productionDate");

  const jsonUriMetadata = {
    name: nameValue,
    description: descriptionValue,
    image:
      "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmPXC8TpB9Pbzv5ZiYwjUhxWoaiJwe2m2yChFVdreJ1GXe",

    attributes: [
      {
        trait_type: "VIN",
        value: vimValue,
      },
      {
        trait_type: "Model",
        value: modelValue,
      },
      {
        trait_type: "Zylinder",
        value: zylinderValue,
      },
      {
        trait_type: "PS/KW",
        value: psValue,
      },
      {
        trait_type: "0-100 km/h (s)",
        value: speedValue,
      },
      {
        trait_type: "Vmax",
        value: vmaxValue,
      },
      {
        trait_type: "Verbrauch (l)",
        value: "4,5 - 4,9",
      },
      {
        trait_type: "Color",
        value: colorValue,
      },
      {
        trait_type: "Date of Production",
        value: productionDateValue,
      },
    ],
  };
  json = jsonUriMetadata;

  console.log("conseguido parte 1");

  const uris = await uploadUri();

  return {
    message: "Car's NFT created successfully",
    uris,
  };
}

async function uploadUri() {
  pinata
    .testAuthentication()
    .then((result) => {
      //handle successful authentication here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });

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

  console.log(typeof json);
  const resUriMetadata = await pinata.pinJSONToIPFS(json);
  console.log(resUriMetadata);

  const uriMeta = await resUriMetadata.IpfsHash;

  console.log(uriMeta);

  const resOdometer = await pinata.pinJSONToIPFS(jsonOdometer);
  console.log(resOdometer);
  const OdoMeta = await resOdometer.IpfsHash;

  const resRepairLog = await pinata.pinJSONToIPFS(jsonRepairLog);
  console.log(resRepairLog);
  const RepairMeta = await resRepairLog.IpfsHash;

  const resAccidents = await pinata.pinJSONToIPFS(jsonAccidentsTracking);
  console.log(resAccidents);
  const AcciMeta = await resAccidents.IpfsHash;

  const url = "https://ivory-economic-dolphin-325.mypinata.cloud/ipfs/";

  const Uris = [];

  Uris.push(url + uriMeta, url + OdoMeta, url + RepairMeta, url + AcciMeta);

  console.log("esto es Uris: ", Uris);

  console.log("upload hecho");

  return Uris;
}
