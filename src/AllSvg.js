import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export function BackArrow (props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={8} height={14} {...props}>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 13L1 7l6-6"
      />
    </Svg>
  )
}

export function ExpandUp (props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.75 21c3.605 0 5.433-.026 6.578-1.172C20.5 18.657 20.5 16.771 20.5 13V6.998C20.355 7 20.15 7 20 7H4c-.15 0-.355 0-.5-.002V13c0 3.771 0 5.657 1.172 6.828C5.817 20.974 7.645 21 11.25 21v-7.046l-1.693 1.881a.75.75 0 01-1.114-1.003l3-3.334a.75.75 0 011.114 0l3 3.334a.75.75 0 01-1.114 1.003l-1.693-1.88V21z"
        fill={props.fill || "#1C274C"}
      />
      <Path
        d="M2 5c0-.943 0-1.414.293-1.707C2.586 3 3.057 3 4 3h16c.943 0 1.414 0 1.707.293C22 3.586 22 4.057 22 5c0 .943 0 1.414-.293 1.707C21.414 7 20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293C2 6.414 2 5.943 2 5z"
        fill={props.fill || "#1C274C"}
        opacity={0.5}
      />
    </Svg>
  )
}

export function ExpandDown(props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M8 4a1 1 0 011 1v6.586l1.293-1.293a1 1 0 111.414 1.414L8 15.414l-3.707-3.707a1 1 0 111.414-1.414L7 11.586V5a1 1 0 011-1zm4-3a1 1 0 110 2H4a1 1 0 010-2h8z" />
    </Svg>
  )
}

export function DeleteIcon(props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="-3 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M268 220a1 1 0 012 0v12a1 1 0 11-2 0v-12zm5 0a1 1 0 012 0v12a1 1 0 11-2 0v-12zm5 0a1 1 0 012 0v12a1 1 0 11-2 0v-12zm-15 13a4 4 0 004 4h14a4 4 0 004-4v-16h-22v16zm14-24h-6v-1a1 1 0 011-1h4a1 1 0 011 1v1zm8 0h-6v-2a2 2 0 00-2-2h-6a2 2 0 00-2 2v2h-6a2 2 0 00-2 2v2a2 2 0 001.999 2h22.003a2 2 0 001.998-2v-2a2 2 0 00-2-2z"
        transform="translate(-261 -205)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  )
}

export function ConfCheck(props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17 9l-7 7-3-3"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function ShareIcon (props) {
  return(
    <Svg
      width="800px"
      height="800px"
      viewBox="-1 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M333 744c-1.77 0-3.315.925-4.204 2.312l-5.355-3.06c.346-.68.559-1.438.559-2.252 0-.503-.097-.979-.235-1.437l5.571-3.183A4.97 4.97 0 00333 738a5 5 0 005-5 5 5 0 00-5-5 5 5 0 00-5 5c0 .503.097.979.235 1.438l-5.571 3.182A4.973 4.973 0 00319 736a5 5 0 00-5 5 5 5 0 005 5c1.14 0 2.179-.396 3.02-1.038l6.035 3.498c-.02.18-.055.354-.055.54a5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5"
        transform="translate(-314 -728)"
        fill={props.fill || "#1C274C"}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  )
}
