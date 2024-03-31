import ApiService from './ApiService'

export async function apiGetCrmDashboardData() {
    return ApiService.fetchData<T>({
        url: '/crm/dashboard',
        method: 'get',
    })
}

export async function apiGetCrmCalendar() {
    return ApiService.fetchData<T>({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers(
    data
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'post',
        data,
    })
}

export async function apiGetCrmCustomersStatistic<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/customers-statistic',
        method: 'get',
    })
}

export async function apPutCrmCustomer(
    data
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetCrmCustomerDetails(params) {
    return ApiService.fetchData<T>({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteCrmCustomer(data) {
    return ApiService.fetchData<T>({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetCrmMails(
    params
) {
    return ApiService.fetchData<T>({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail(
    params
) {
    return ApiService.fetchData<T>({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
