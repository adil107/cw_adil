import React, { useCallback } from 'react'
import useDarkMode from 'utils/hooks/useDarkMode'
import { Switcher } from 'components/ui'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark]
    )
    const withIcon = (component) => {
        return <div className="text-lg">{component}</div>
    }
    return (
        <div>
            <Switcher
                unCheckedContent={withIcon(<RiMoonClearLine />)}
                checkedContent={withIcon(<RiSunLine />)}
                defaultChecked={isDark}
                onChange={(checked) => onSwitchChange(checked)}
            />
        </div>
    )
}

export default ModeSwitcher
