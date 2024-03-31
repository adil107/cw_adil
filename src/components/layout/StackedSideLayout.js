import React, { useEffect } from 'react'
import Header from 'components/template/Header'
import SidePanel from 'components/template/SidePanel'
import UserDropdown from 'components/template/UserDropdown'
import MobileNav from 'components/template/MobileNav'
import LanguageSelector from 'components/template/LanguageSelector'
// import Notification from 'components/template/Notification'
import StackedSideNav from 'components/template/StackedSideNav'
import ModeSwitcher from 'components/template/ThemeConfigurator/ModeSwitcher'
import View from 'views'
import useResponsive from 'utils/hooks/useResponsive'
import { useDispatch } from 'react-redux'
import { setSideNavCollapse } from 'store/theme/themeSlice'

const HeaderActionsStart = () => {
    const { smaller } = useResponsive()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        if(smaller.md){
            dispatch(setSideNavCollapse(false)) 
        }
    },[smaller.md])

    return <>{smaller.md && <MobileNav />}</>
}

const HeaderActionsEnd = () => {
    return (
        <>
            {/* <LanguageSelector /> */}
            {/* <Notification /> */}
            {/* <SidePanel /> */}
            <ModeSwitcher />
            <SidePanel />
            <UserDropdown hoverable={false} />
        </>
    )
}

const StackedSideLayout = () => {
    return (
        <div className="app-layout-stacked-side flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <StackedSideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <div className="h-full flex flex-auto flex-col">
                        <View />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackedSideLayout
