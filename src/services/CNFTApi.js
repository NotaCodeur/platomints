import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const heliumHeaders = {
    
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'access-control-request-headers': 'content-type',
    // 'access-control-allow-headers': ['Origin','Content-Type','Accept'],
    // 'access-control-request-method': 'GET',
    // 'access-control-allow-origin': '*',
    // 'sec-fetch-mode': 'no-cors',
    // 'host': 'https://api.helium.io',
    // 'authority': 'ugxlyxnlrg9udfdyzwnrvghlu2vydmvycg.blockjoy.com'
    // 'origin': 'http://localhost:3000',
    // "Content-Type": "application/json",
    


}

const createRequest = (url) => ({ url, headers: heliumHeaders })
// https://api.allorigins.win/raw?url=
// https://thingproxy.freeboard.io/fetch/https://api.helium.io
// ? 404 : 'https://api.allorigins.win/raw?url=https://api.helium.io'
// ../netlify/functions
const baseUrl = '/.netlify/functions';

export const CNFTApi = createApi({
    reducerPath: 'heliumApi',
    baseQuery: fetchBaseQuery({baseUrl}),

    endpoints: (builder) => ({
        // helium data
        getCNFTAsset: builder.query({
            query: (policyAndName) => createRequest(`/CNFT?search=/1/asset/${policyAndName}`),
        }),

        // account data
        getHeliumAccountStats: builder.query({
            query: (AccountAddress) => createRequest(`/hotspots?search=/v1/accounts/${AccountAddress}/stats`)
        }),
        
    })
})

export const { 
    useGetCNFTAssetQuery,
    useGetHeliumAccountStatsQuery, 
    
   
} = CNFTApi;