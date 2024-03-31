import ApiService from './ApiService'

export async function apiSignIn(data) {

    return ApiService.fetchData({
        url: '/admin/auth/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}
export async function apiVerifyOtp(data) {
    return ApiService.fetchData({
        url: '/admin/auth/verify-otp-token',
        method: 'post',
        data,
    })
}
export async function apiResendOtp(data) {
    return ApiService.fetchData({
        url: '/admin/auth/resend-otp-token',
        method: 'post',
        data,
    })
}


export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/admin/auth/authenticate-user-on-forgot-credential',
        method: 'post',
        data,
    })
}



export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}



export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/admin/auth/reset-password',
        method: 'post',
        data,
    })
}
