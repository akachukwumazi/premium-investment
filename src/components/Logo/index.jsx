import React from 'react'

const Logo = ({classname}) => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 64 64" fill="none" >
        <path d="M32 4 L56 14 V32 C56 48 44 58 32 60 C20 58 8 48 8 32 V14 L32 4Z" 
              stroke="url(#grad)" stroke-width="3" fill="none"/>
        <rect x="20" y="32" width="6" height="12" fill="url(#grad)" rx="1"/>
        <rect x="29" y="24" width="6" height="20" fill="url(#grad)" rx="1"/>
        <rect x="38" y="18" width="6" height="26" fill="url(#grad)" rx="1"/>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD700"/>
            <stop offset="1" stop-color="#0F172A"/> 
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Logo
