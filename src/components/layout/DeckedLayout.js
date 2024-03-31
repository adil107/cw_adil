import React, { useEffect } from 'react'
import Header from 'components/template/Header'
import SidePanel from 'components/template/SidePanel'
import UserDropdown from 'components/template/UserDropdown'
import HeaderLogo from 'components/template/HeaderLogo'
// import LanguageSelector from 'components/template/LanguageSelector'
// import Notification from 'components/template/Notification'
import SecondaryHeader from 'components/template/SecondaryHeader'
import MobileNav from 'components/template/MobileNav'
import View from 'views'
import ModeSwitcher from 'components/template/ThemeConfigurator/ModeSwitcher'
import useResponsive from 'utils/hooks/useResponsive'
import { useDispatch } from 'react-redux'
import { setSideNavCollapse } from 'store/theme/themeSlice'

const HeaderActionsStart = () => {
    const { smaller } = useResponsive()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        if(smaller.xl){
            dispatch(setSideNavCollapse(false)) 
        }
    },[smaller.xl])

    return (
        <>
            <HeaderLogo />
            {smaller.xl && <MobileNav />}
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            {/* <LanguageSelector /> */}
            {/* <Notification /> */}
            <ModeSwitcher />
            <SidePanel />
            <UserDropdown hoverable={false} />
        </>
    )
}

const DeckedLayout = () => {
    return (
        <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <SecondaryHeader contained />
                    <View pageContainerType="contained" />
                </div>
            </div>
        </div>
    )
}

export default DeckedLayout
