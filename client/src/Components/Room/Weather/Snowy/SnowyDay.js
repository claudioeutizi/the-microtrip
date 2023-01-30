import Snowfall from "react-snowfall"
import React from 'react'

const SnowyDay = () => {
  const snowflake1 = document.createElement('img')
  snowflake1.src = '/images/snowflake1.png'
  const snowflake2 = document.createElement('img')
  snowflake2.src = '/images/snowflake2.png'
  const snowflake3 = document.createElement('img')
  snowflake3.src = '/images/snowflake3.png'
  const snowflake4 = document.createElement('img')
  snowflake4.src = '/images/snowflake4.png'

  const images = [snowflake1, snowflake2, snowflake3, snowflake4]
  return (
    <Snowfall
      id="Snow"
      // Applied to the canvas element
      style={{
        background: 'linear-gradient(to bottom, rgb(58, 104, 132),  rgb(160, 176, 176),  rgb(244, 255, 255)) ',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '-3'
      }}
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={200}
      // Pass in the images to be used
      images={images}

    />
  )
}
export default SnowyDay;