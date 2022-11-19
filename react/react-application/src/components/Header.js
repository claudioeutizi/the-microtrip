import PropTypes from 'prop-types'

const Header = ({title}) => {
  return (
    <div className = "container">
      <h1>{title}</h1>
    </div>
  )
}

Header.propTypes = {
    title: PropTypes.string,
}
Header.defaultProps = {
  title: 'ACTAM Synth',
}

export default Header
