import React from 'react'
import PropTypes from 'prop-types'
const BlackKey = (props) => {
  
  return (
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="black-key-gradient-active" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="rgb(70, 70, 70)"></stop>
              <stop offset="100%" stopColor="hsl(227, 0%, 22%)"></stop>
          </linearGradient>

          <linearGradient id="black-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#383838"></stop>
              <stop offset="0.025"></stop>
              <stop offset="0.039" stopColor="#121212"></stop>
              <stop offset="0.133" stopColor="#272727"></stop>
              <stop offset="0.852" stopColor="#343434"></stop>
              <stop offset="0.877" stopColor="#141414"></stop>
              <stop offset="0.887" stopColor="#343434"></stop>
              <stop offset="0.916" stopColor="#2b2b2b"></stop>
              <stop offset="100%" stopColor="hsl(227, 0%, 22%)"></stop>
          </linearGradient>

          <linearGradient id="black-key-group-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#656565"></stop>
              <stop offset="0.0138" stopColor="#000"></stop>
              <stop offset="0.9301" stopColor="#1c1c1c"></stop>
              <stop offset="0.9487" stopColor="#5a5a5a"></stop>
              <stop offset="0.9644" stopColor="#343434"></stop>
              <stop offset="0.9979" stopColor="#2b2b2b"></stop>
              <stop stopColor="#000" offset="100%"></stop>
          </linearGradient>
          
          <linearGradient id="black-key-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#383838"></stop>
              <stop offset="0.025"></stop>
              <stop offset="0.039" stopColor="#121212"></stop>
              <stop offset="0.094" stopColor="#272727"></stop>
              <stop offset="0.852" stopColor="#585858"></stop>
              <stop offset="0.877" stopColor="#141414"></stop>
              <stop offset="0.887" stopColor="#343434"></stop>
              <stop offset="0.921" stopColor="#2b2b2b"></stop>
              <stop offset="1"></stop>
          </linearGradient>
        </defs>
        <g className = "black-key-group" width = {props.blackKeyWidth} height = {props.blackKeyHeight}>
            <rect className = "key black-key" x = {props.blackKeyXPosition} width = {props.blackKeyWidth} height = {props.blackKeyHeight} 
            rx = "3" ry = "3" fill = "url(#black-key-gradient)"></rect>
            <text className = "black-key-text" textAnchor="middle" y = "215" x = {props.blackKeyXPosition + props.blackKeyWidth/2}>{props.sharpText}</text>
            <text className = "black-key-text" textAnchor="middle" y = "235" x = {props.blackKeyXPosition + props.blackKeyWidth/2}>{props.flatText}</text>
        </g>
    </svg>
  )
}

BlackKey.propTypes = {
  sharpName: PropTypes.string.isRequired,
  flatName: PropTypes.string.isRequired,
  blackKeyWidth: PropTypes.number,
  blackKeyHeight: PropTypes.number,
  blackKeyXPosition: PropTypes.number,
  sharpText: PropTypes.string,
  flatText: PropTypes.string,
}

BlackKey.defaultProps = {
  blackKeyWidth: 40,
  blackKeyHeight: 400/1.6,
  blackKeyXPosition: 60,
}
export default BlackKey