"use server";

require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const { config } = require("dotenv");
const pinata = new pinataSDK({
  pinataJWTKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZjdhNWFkZi02YjBhLTQzMTEtYTZlMC0zYWI3OGVmZTA1Y2YiLCJlbWFpbCI6ImFnb3NlbGxlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2UxZDAzNmFjMDc2MGIxNTVjYTkiLCJzY29wZWRLZXlTZWNyZXQiOiJlMzMyM2IzYTM2MTA3ZTNmOWQwMGNjNTBmMTFkMjYwYjMxOWI1ZTlkYzljYzBjMTVjYWJhNTIyNjQ5ZTkwNDE3IiwiaWF0IjoxNzA2ODA3ODQ1fQ.4jTV0FIdzDNHq7ROVbVSYcATMBoAio6W64pn3KU63zk",
});

let json = null;

export default async function actionUpdateOdo(prevState, data) {
  console.log(data);
  console.log("prevState:", prevState);

  const odometerValue = data.get("odoValue");
  const odoObservations = data.get("observations");

  console.log(odometerValue, odoObservations);

  const jsonOdometer = {
    odometer: odometerValue,
    observations: odoObservations,
  };

  json = jsonOdometer;

  console.log("conseguido parte 1");

  const odoUri = await uploadUri();

  return {
    message: "Updated Odometer Information done",
    odoUri,
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
  const resOdoMetadata = await pinata.pinJSONToIPFS(json);
  console.log(resOdoMetadata);

  const odoMeta = await resOdoMetadata.IpfsHash;

  console.log(odoMeta);

  const url = "https://ivory-economic-dolphin-325.mypinata.cloud/ipfs/";

  const odoURI = url + odoMeta;

  console.log("esto es odoURI: ", odoURI);

  console.log("upload hecho");

  return odoURI;
}
