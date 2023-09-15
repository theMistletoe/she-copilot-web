"use client";
import React from 'react'

import PropTypes from 'prop-types'

const Text = (props) => {
  return (
    <>
      <div className={`text-container ${props.rootClassName} `}>
        <span className="text-text">{props.text}</span>
      </div>
      <style jsx>
        {`
          .text-container {
            display: flex;
            position: relative;
            padding-right: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-unit);
          }
          .text-text {
            font-size: 24px;
            font-family: Noto Sans;
          }

          @media (max-width: 479px) {
            .text-container {
              flex-wrap: wrap;
            }
            .text-root-class-name2 {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

Text.defaultProps = {
  text: 'Text',
  rootClassName: '',
}

Text.propTypes = {
  text: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Text
