const noSample = './Samples/Null.wav';

const instruments = [
  {
    id: 0,
    name: 'mellotron',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require('./Samples/Mellotron/MellotronA3.wav'),
      C4: require('./Samples/Mellotron/MellotronC4.wav'),
      Ds4: require('./Samples/Mellotron/MellotronDs4.wav'),
      Fs4: require('./Samples/Mellotron/MellotronFs4.wav'),
      A4: require('./Samples/Mellotron/MellotronA4.wav'),
      C5: require('./Samples/Mellotron/MellotronC5.wav'),
      Ds5: require('./Samples/Mellotron/MellotronDs5.wav'),
      Fs5: require('./Samples/Mellotron/MellotronFs5.wav'),
      A5: require('./Samples/Mellotron/MellotronA5.wav'),
      C6: require('./Samples/Mellotron/MellotronC6.wav'),
      Ds6: require('./Samples/Mellotron/MellotronDs6.wav'),
      Fs6: require('' + noSample),
      A6: require('' + noSample),
      C7: require('' + noSample),
      Ds7: require('' + noSample),
      Fs7: require('' + noSample),
      A7: require( '' + noSample),
      C8: require('' + noSample),
    }
  },

  {
    id: 1,
    name: 'sitar',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require('' + noSample),
      C4: require('' + noSample),
      Ds4: require('' + noSample),
      Fs4: require('' + noSample),
      A4: require('' + noSample),
      C5: require('./Samples/Sitar/SitarC5.wav'),
      Ds5: require('./Samples/Sitar/SitarDs5.wav'),
      Fs5: require('./Samples/Sitar/SitarFs5.wav'),
      A5: require('./Samples/Sitar/SitarA5.wav'),
      C6: require('./Samples/Sitar/SitarC6.wav'),
      Ds6: require('./Samples/Sitar/SitarDs6.wav'),
      Fs6: require('./Samples/Sitar/SitarFs6.wav'),
      A6: require('./Samples/Sitar/SitarA6.wav'),
      C7: require('' + noSample),
      Ds7: require('' + noSample),
      Fs7: require('' + noSample),
      A7: require( '' + noSample),
      C8: require('' + noSample),
    }
  },

  {
    id: 2,
    name: 'guitar',
    samples: {
      A2: require('' + noSample),
      C3: require('./Samples/Guitar/GuitarC3.wav'),
      Ds3: require('./Samples/Guitar/GuitarDs3.wav'),
      Fs3: require('./Samples/Guitar/GuitarFs3.wav'),
      A3: require('./Samples/Guitar/GuitarA3.wav'),
      C4: require('./Samples/Guitar/GuitarC4.wav'),
      Ds4: require('./Samples/Guitar/GuitarDs4.wav'),
      Fs4: require('./Samples/Guitar/GuitarFs4.wav'),
      A4: require('./Samples/Guitar/GuitarA4.wav'),
      C5: require('./Samples/Guitar/GuitarC5.wav'),
      Ds5: require('./Samples/Guitar/GuitarDs5.wav'),
      Fs5: require('./Samples/Guitar/GuitarFs5.wav'),
      A5: require('./Samples/Guitar/GuitarA5.wav'),
      C6: require('./Samples/Guitar/GuitarC6.wav'),
      Ds6: require('./Samples/Guitar/GuitarDs6.wav'),
      Fs6: require('./Samples/Guitar/GuitarFs6.wav'),
      A6: require('' + noSample),
      C7: require('' + noSample),
      Ds7: require('' + noSample),
      Fs7: require('' + noSample),
      A7: require( '' + noSample),
      C8: require('' + noSample),
    }
  },

  {
    id: 3,
    name: 'marimba',
    samples: {
      A2: require('' + noSample),
      C3: require('./Samples/Marimba/MarimbaC3.wav'),
      Ds3: require('./Samples/Marimba/MarimbaDs3.wav'),
      Fs3: require('./Samples/Marimba/MarimbaFs3.wav'),
      A3: require('./Samples/Marimba/MarimbaA3.wav'),
      C4: require('./Samples/Marimba/MarimbaC4.wav'),
      Ds4: require('./Samples/Marimba/MarimbaDs4.wav'),
      Fs4: require('./Samples/Marimba/MarimbaFs4.wav'),
      A4: require('./Samples/Marimba/MarimbaA4.wav'),
      C5: require( './Samples/Marimba/MarimbaC5.wav'),
      Ds5: require('./Samples/Marimba/MarimbaDs5.wav'),
      Fs5: require('./Samples/Marimba/MarimbaFs5.wav'),
      A5: require( './Samples/Marimba/MarimbaA5.wav'),
      C6: require( './Samples/Marimba/MarimbaC6.wav'),
      Ds6: require('./Samples/Marimba/MarimbaDs6.wav'),
      Fs6: require('./Samples/Marimba/MarimbaFs6.wav'),
      A6: require('./Samples/Marimba/MarimbaA6.wav'),
      C7: require('./Samples/Marimba/MarimbaC7.wav'),
      Ds7: require('' + noSample),
      Fs7: require('' + noSample),
      A7: require( '' + noSample),
      C8: require('' + noSample),
    }
  },

  {
    id: 4,
    name: 'violin',
    samples: {
      A2: require('' + noSample),
      C3: require( '' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require( '' + noSample),
      C4: require('' + noSample),
      Ds4: require('' + noSample),
      Fs4: require('' + noSample),
      A4: require( './Samples/Violin/ViolinA4.wav'),
      C5: require( './Samples/Violin/ViolinC5.wav'),
      Ds5: require('./Samples/Violin/ViolinDs5.wav'),
      Fs5: require('./Samples/Violin/ViolinFs5.wav'),
      A5: require( './Samples/Violin/ViolinA5.wav'),
      C6: require( './Samples/Violin/ViolinC6.wav'),
      Ds6: require('./Samples/Violin/ViolinDs6.wav'),
      Fs6: require('./Samples/Violin/ViolinFs6.wav'),
      A6: require( './Samples/Violin/ViolinA6.wav'),
      C7: require( './Samples/Violin/ViolinC7.wav'),
      Ds7: require( './Samples/Violin/ViolinDs7.wav'),
      Fs7: require( './Samples/Violin/ViolinFs7.wav'),
      A7: require( './Samples/Violin/ViolinA7.wav'),
      C8: require( './Samples/Violin/ViolinC8.wav'),
    }
  },

]



export default instruments;