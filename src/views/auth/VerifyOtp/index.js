import React from 'react'
import VerifyOtp from './VerifyOtp'

const VerifyOtps = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome back!</h3>
                <p>Please enter your credentials to sign in!</p>
            </div>
            <VerifyOtp disableSubmit={false} />
        </>
    )
}

export default VerifyOtps