"use server";

require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const { config } = require("dotenv");
const pinata = new pinataSDK({
  pinataJWTKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZjdhNWFkZi02YjBhLTQzMTEtYTZlMC0zYWI3OGVmZTA1Y2YiLCJlbWFpbCI6ImFnb3NlbGxlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2UxZDAzNmFjMDc2MGIxNTVjYTkiLCJzY29wZWRLZXlTZWNyZXQiOiJlMzMyM2IzYTM2MTA3ZTNmOWQwMGNjNTBmMTFkMjYwYjMxOWI1ZTlkYzljYzBjMTVjYWJhNTIyNjQ5ZTkwNDE3IiwiaWF0IjoxNzA2ODA3ODQ1fQ.4jTV0FIdzDNHq7ROVbVSYcATMBoAio6W64pn3KU63zk",
});

let json = null;

export default async function actionUpdateReapirLog(prevState, data) {
  console.log(data);
  console.log("prevState:", prevState);

  const repairKind = data.get("repairKind");
  const repairObservations = data.get("repairObservations");
  const repairDate = data.get("repairDate");

  console.log(repairKind, repairObservations, repairDate);

  const jsonRepairLog = {
    reparations: [
      {
        kindOfReparation: repairKind,
        observations: repairObservations,
        repairDate: repairDate,
      },
    ],
  };

  json = jsonRepairLog;

  console.log("conseguido parte 1");

  const repairUri = await uploadUri();

  return {
    message: "Updated Repair Log done",
    repairUri,
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

  console.log(typeof json);
  const resRepairMetadata = await pinata.pinJSONToIPFS(json);
  console.log(resRepairMetadata);

  const repairMeta = await resRepairMetadata.IpfsHash;

  console.log(repairMeta);

  const url = "https://ivory-economic-dolphin-325.mypinata.cloud/ipfs/";

  const repairURI = url + repairMeta;

  console.log("esto es repairURI: ", repairURI);

  console.log("upload hecho");

  return repairURI;
}
