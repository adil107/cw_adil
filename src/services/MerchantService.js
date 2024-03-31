import ApiService from "./ApiService";


export async function apiGetMerchantDashboardStatics() {
  return ApiService.fetchData({
    url: `admin/merchant/get-merchants-stats`,
    method: "get",
  });
}
export async function apiGetMerchant(pageNumber) {

  return ApiService.fetchData({
    url: `/admin/merchant/get-all-merchants?pageNumber=${pageNumber}`,
    method: "get",
  });

}


export async function apiSearchMerchant(values, pageNumber) {
  let data = { searchTerm: values }

  return ApiService.fetchData({
    url: `/admin/merchant/search-merchant?pageNumber=${pageNumber}`,
    method: "post",
    data,
  });
}


export async function apiAddNewMerchant(data) {
  return ApiService.fetchData({
    url: "/admin/merchant/add-merchant",
    method: "post",
    data,
  });
}

export async function apiUpdateMerchantStatus(userID, status) {

  return ApiService.fetchData({
    url: `/admin/merchant/swtich-status?userID=${userID}&status=${status}`,
    method: "POST",
  });
}


export async function apiGetMerchantDetailByID(userId) {
  return ApiService.fetchData({
    url: `/admin//merchant/merchant-detail?userID=${userId}`,
    method: "get",
  });
}

export async function apiGetMerchantWallets(userId) {
  return ApiService.fetchData({
    url: `/admin/merchant/get-merchant-wallet?userID=${userId}`,
    method: "get",
  });
}




export async function apiGetMerchantTransacrions(userId, pageNumber) {
  return ApiService.fetchData({
    url: `admin/merchant/merchant-transactions-detail?userID=${userId}&&pageNumber=${pageNumber}`,

    method: "get",
  });
}






// export async function apiSearchMerchant(userId) {


//   return ApiService.fetchData({
//     url: `/admin/users/user-search-transactions?search=${userId}`,
//     method: "get",
//     // data,
//   });
// }





