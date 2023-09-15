"use client";
import React from 'react'

const Header = () => {
  return (
    <>
      <div className={`header-container`}>
        <h1 className="header-text">ゴムのアヒルちゃん</h1>
      </div>
      <style jsx>
        {`
          .header-container {
            display: flex;
            background-color: white;
            z-index: 1;
            width: 100%;
            justify-content: center;
          }
          .header-text {
            font-size: 2rem;
            font-family: Noto Sans;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-halfunit);
            padding-right: var(--dl-space-space-halfunit);
            padding-bottom: var(--dl-space-space-unit);
          }
          .header-root-class-name {
            margin-top: var(--dl-space-space-unit);
          }
        `}
      </style>
    </>
  )
}

export default Header
