// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
//Initializar Apollo
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/.............../version/latest",
});


export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </ApolloProvider>
  )
}