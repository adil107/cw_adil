import React from "react";
import authRoute from "./authRoute";


export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "merchant",
    path: "/merchant",
     component: React.lazy(() => import("views/Merchants/Merchant")),
   // component: React.lazy(() => import("views/crm/Customers/Customers")),
    authority: [],
  },
  {
    key: "NFT Minting",
    path: "/nft-transactions",
    component: React.lazy(() => import("views/NftMinting/NftMinting")),
    authority: [],
  },
  {
    key: "merchant-details",
    path: "/merchant-details",
    // component: React.lazy(() => import("views/Merchants/Merchantdetails")),
    component: React.lazy(() => import("views/Merchants/MerchantDetail")),
    authority: [],
  },
  {
    key: "nft-details",
    path: "/nft-details",
    // component: React.lazy(() => import("views/Merchants/Merchantdetails")),
    component: React.lazy(() => import("views/NftMinting/NFTDetails")),
    authority: [],
  },
  {
    key: "All Transaction",
    path: "/all-transaction",
    // component: React.lazy(() => import("views/Merchants/Merchantdetails")),
    component: React.lazy(() => import("views/AllTransaction/AllTransaction")),
    authority: [],
  },
  // {
  //   key: "test",
  //   path: "/test",
  //   component: React.lazy(() => import("views/auth/SignIn/index")),
  //   authority: [],
  // },
  // /** Example purpose only, please remove */
  // {
  //   key: "singleMenuItem",
  //   path: "/single-menu-view",
  //   component: React.lazy(() => import("views/demo/SingleMenuView")),
  //   authority: [],
  // },
  // {
  //   key: "collapseMenu.item1",
  //   path: "/collapse-menu-item-view-1",
  //   component: React.lazy(() => import("views/demo/CollapseMenuItemView1")),
  //   authority: [],
  // },
  // {
  //   key: "collapseMenu.item2",
  //   path: "/collapse-menu-item-view-2",
  //   component: React.lazy(() => import("views/demo/CollapseMenuItemView2")),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.single",
  //   path: "/group-single-menu-item-view",
  //   component: React.lazy(() => import("views/demo/GroupSingleMenuItemView")),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.collapse.item1",
  //   path: "/group-collapse-menu-item-view-1",
  //   component: React.lazy(() =>
  //     import("views/demo/GroupCollapseMenuItemView1")
  //   ),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.collapse.item2",
  //   path: "/group-collapse-menu-item-view-2",
  //   component: React.lazy(() =>
  //     import("views/demo/GroupCollapseMenuItemView2")
  //   ),
  //   authority: [],
  // },
];
