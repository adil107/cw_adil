import ApiService from "./ApiService";

export async function apiAddNewMerchant(data) {
  return ApiService.fetchData({
    url: "/admin/auth/register",
    method: "post",
    data,
  });
}
export async function apiGetMerchant(pageNumber ) {
  
  return ApiService.fetchData({
    url: `/admin/users/get-all-users?pageNumber=${pageNumber}`,
    method: "get",
  });
}
export async function apiGetMerchantWallets(userId) {
  return ApiService.fetchData({
    url: `/admin/users/get-wallet?userId=${userId}`,
    method: "get",
  });
}
export async function apiGetMerchantSingle(userId) {
  return ApiService.fetchData({
    url: `/admin/users/get-user?userId=${userId}`,
    method: "get",
  });
}
export async function apiMerchantStatus(userId, status) {
  return ApiService.fetchData({
    url: `/admin/users/user-status?userId=${userId}&status=${status}`,
    method: "POST",
  });
}
export async function apiMerchantTransacrions(userId) {
  return ApiService.fetchData({
    url: `admin/users/user-transactions?userId=${userId}`,
    method: "get",
  });
}
