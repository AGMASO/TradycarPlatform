"use server";

export default async function submitAction(prevState, data) {
  console.log(data);
  console.log("prevState:", prevState);

  const address1 = data.get("address1");
  const address2 = data.get("address2");
  const address3 = data.get("address3");
  const address4 = data.get("address4");

  const arrayOfAddresses = [];

  arrayOfAddresses.push(address1, address2, address3, address4);
  console.log("etos es array: ", arrayOfAddresses);

  return {
    message: "Repair Shops added correctly",
    arrayOfAddresses,
  };
}
