import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props) => {
    const { type, mode, gutter, className, imgClass, style, logoWidth } = props

    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: 130, padding: 15 },
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${mode}-${type}.svg`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
