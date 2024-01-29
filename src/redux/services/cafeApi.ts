import { Cafe } from "@/interface/cafe";
import { NEXT_PUBLIC_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cafeApi = createApi({
    reducerPath: "CafeApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `${NEXT_PUBLIC_URL}/api/cafe`,
    }),
    endpoints: (builder) => ({
        getMenus: builder.query<{ statusCode: Number, data: Cafe[] }, null>({
            query: () => "menu-list",
        }),
        getCafe: builder.query<{ data: Cafe[] }, { localId: string, subId: string }>({
            query: ({ localId, subId }) => `?subId=${subId ?? ''}&localId=${localId ?? ''}`,
        }),
    }),
});

export const { useGetCafeQuery } = cafeApi;