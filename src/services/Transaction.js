import ApiService from "./ApiService";



export async function apiGetAllUserTransactions(pageNumber) {
    return ApiService.fetchData({
        url: `/admin/transaction/all-platform-transactions?pageNumber=${pageNumber}`,
        method: "get",

    });
}
export async function apiSearchTransactions(values, pageNumber) {

    let data = { searchTerm: values }
    return ApiService.fetchData({
        url: `/admin/transaction/search-transactions?pageNumber=${pageNumber}`,
        method: "post",
        data

    });
}