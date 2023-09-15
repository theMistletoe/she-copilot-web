"use client";
import React from 'react'

const TextArea = (props) => {
  return (
    <>
      <div className={`text-area-container`}>
        <textarea
          value={props.value}
          placeholder={props.textarea_placeholder}
          className="text-area-textarea textarea"
        ></textarea>
      </div>
      <style jsx>
        {`
          .text-area-container {
            display: flex;
            padding-right: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-unit);
          }
          .text-area-textarea {
            font-family: Noto Sans;
            border-width: 0px;
            width: 100%;
          }
          .text-area-root-class-name {
            margin-top: var(--dl-space-space-halfunit);
          }
          @media (max-width: 479px) {
            .text-area-root-class-name {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

export default TextArea
