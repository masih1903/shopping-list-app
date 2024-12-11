import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 17a2 2 0 100 4 2 2 0 000-4zm0 0H9.294c-.461 0-.692 0-.882-.082a1.002 1.002 0 01-.418-.337c-.12-.167-.167-.39-.261-.83L5.27 4.264c-.096-.451-.145-.677-.265-.845a1.003 1.003 0 00-.419-.338C4.397 3 4.167 3 3.707 3H3m3 3h12.873c.722 0 1.082 0 1.325.15a1 1 0 01.435.579c.077.274-.022.621-.222 1.314l-1.385 4.8c-.12.415-.18.622-.3.776a1.004 1.004 0 01-.409.307c-.18.074-.396.074-.825.074H7.73M8 21a2 2 0 110-4 2 2 0 010 4z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent
