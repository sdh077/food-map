import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Menu = {
    menuId: number;
    menuNm: string;
    email: number;
};

export const menuApi = createApi({
    reducerPath: "MenuApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://stgmanage.dtverse.net/api/common",
    }),
    endpoints: (builder) => ({
        getMenus: builder.query<{ statusCode: Number, data: Menu[] }, null>({
            query: () => "menu-list",
        }),
        getMenuById: builder.query<Menu, { id: string }>({
            query: ({ id }) => `Menus/${id}`,
        }),
    }),
});

export const { useGetMenusQuery, useGetMenuByIdQuery } = menuApi;