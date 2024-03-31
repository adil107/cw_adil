import ApiService from "./ApiService";

export async function apiGetAllTransactions(pageNumber) {
  return ApiService.fetchData({
    url: `/admin/nft/all-platform-nft-transactions?pageNumber=${pageNumber}`,
    method: "get",

  });
}

export async function apiLazyMinting(data) {
  return ApiService.fetchData({
    url: "/admin/nft/create-nft-request-with-auth",
    method: "post",
    data,
  });
}


export async function apiGetALLNftDetails(requestId,data) {
  return ApiService.fetchData({
    url: `/admin/nft/nft-request-detail-with-auth?requestId=${requestId}`,
    method: "get",
    data,
  });
}

export async function apiRetryNft(data) {
  return ApiService.fetchData({
    url: "/admin/nft/update-mint-nft",
    method: "post",
    data,
  });
}

export async function apiBatchUpdate(data) {
  return ApiService.fetchData({
    url: "/admin/nft/update-batch-limit",
    method: "post",
    data,
  });
}