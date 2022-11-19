import PropTypes from 'prop-types';

const WhiteKey = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="white-key-group-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#000"></stop>
                    <stop offset="0.148" stopColor="fff"></stop>
                    <stop offset="0.0395" stopColor="#d3d3d3"></stop>
                    <stop offset="0.936" stopColor="#a5a5a5"></stop>
                    <stop offset="0.946" stopColor="#d1d1d1"></stop>
                    <stop offset="0.955" stopColor="#bababa"></stop>
                    <stop offset="0.964" stopColor="#e0e0e0"></stop>
                    <stop offset="0.988" stopColor="#a0a0a0"></stop>
                    <stop stopColor="#000" offset="1"></stop>
                </linearGradient>
            
                <linearGradient id="white-key-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0" stopColor="#b5b5b5"></stop>
                    <stop offset="0.015" stopColor="#fff"></stop>
                    <stop offset="0.892" stopColor="#fff"></stop>
                    <stop offset="0.913" stopColor="#f4f4f4"></stop>
                    <stop offset="0.922" stopColor="#e0e0e0"></stop>
                    <stop offset="0.965" stopColor="#faf8f8"></stop>
                    <stop offset="0.974" stopColor="#fff"></stop>
                    <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
                </linearGradient>

                <linearGradient id="white-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#b5b5b5"></stop>
                    <stop offset="0.015" stopColor="#fff"></stop>
                    <stop offset="0.892" stopColor="#dbdbdb"></stop>
                    <stop offset="0.913" stopColor="#f4f4f4"></stop>
                    <stop offset="0.922" stopColor="#e0e0e0"></stop>
                    <stop offset="0.965" stopColor="#faf8f8"></stop>
                    <stop offset="0.974" stopColor="#ffffff"></stop>
                    <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
                </linearGradient>
                
                <linearGradient id="white-key-gradient-active" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0" stopColor="rgb(145, 145, 145)"></stop>
                    <stop offset="0.892" stopColor="#bfbfbf"></stop>
                    <stop offset="0.913" stopColor="#cccccc"></stop>
                    <stop offset="0.922" stopColor="#d9d9d9"></stop>
                    <stop offset="0.965" stopColor="#e6e6e6"></stop>
                    <stop offset="0.974" stopColor="#f2f2f2"></stop>
                    <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
                </linearGradient>                       
            </defs>
            <g className = "white-key-group" width = {props.whiteKeyWidth} height = {props.whiteKeyHeight}>
                <rect className = {"key white-key"} width = {props.whiteKeyWidth} height = {props.whiteKeyHeight}
                    x = {props.whiteKeyXPosition} rx = {8} ry = {8} fill = {"url(#white-key-gradient)"}>
                </rect>
                <text className = {"white-key-text"} textAnchor={"middle"} y = {380} x = {props.whiteKeyXPosition + props.whiteKeyWidth/2}>{props.noteName}</text>
            </g>
        </svg>
  )
}

WhiteKey.propTypes = {
    noteName: PropTypes.string.isRequired,
    whiteKeyWidth: PropTypes.number,
    whiteKeyHeight: PropTypes.number,
    whiteKeyXPosition: PropTypes.number,
    textXPosition: PropTypes.number,
}

WhiteKey.defaultProps = {
    whiteKeyWidth: 80,
    whiteKeyHeight: 400,
    whiteKeyXPosition: 0,
    textXPosition: 0,
}


export default WhiteKey
