## Getting Started

1. npm install to install all the packages of the package.json

2. Add a .env with your data:

   ALCHEMY_ID =
   PRIVATE_KEY =
   REACT_PINATA_KEY =

3. You need to change in the folder /scripts few things to make it work for your project:

=> Go to each script and change <YOUR ADDRESS Tradify_Platform> with your address

=>Go to each script and change <YOUR ADDRESS Tradify_NFT> with your address

4. You need to change in the file providers.tsx:

=> `uri: "https://api.studio.thegraph.com/query/45112/...../version/latest",` with yours

5. run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
