"use client";
import React from 'react'

const PrimaryButton = (props) => {
  return (
    <>
      <div className={`primary-button-container`}>
        <button type="button" className="primary-button-button button" onClick={props.onClick}>
          {props.button}
        </button>
      </div>
      <style jsx>
        {`
          .primary-button-container {
            display: flex;
            position: relative;
            margin-top: var(--dl-space-space-halfunit);
          }
          .primary-button-button {
            color: var(--dl-color-gray-white);
            font-size: 32px;
            font-family: Noto Sans;
            padding-top: 0.5rem;
            border-width: 0px;
            background-color: rgb(251, 177, 36);
          }
          .primary-button-root-class-name {
            margin-top: var(--dl-space-space-halfunit);
          }
          .primary-button-root-class-name1 {
            margin-top: var(--dl-space-space-halfunit);
          }
        `}
      </style>
    </>
  )
}

export default PrimaryButton
