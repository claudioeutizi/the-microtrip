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
      C4: require('./Samples/Sitar/SitarC4.wav'),
      Ds4: require('./Samples/Sitar/SitarDs4.wav'),
      Fs4: require('./Samples/Sitar/SitarFs4.wav'),
      A4: require('./Samples/Sitar/SitarA4.wav'),
      C5: require('./Samples/Sitar/SitarC5.wav'),
      Ds5: require('./Samples/Sitar/SitarDs5.wav'),
      Fs5: require('./Samples/Sitar/SitarFs5.wav'),
      A5: require('./Samples/Sitar/SitarA5.wav'),
      C6: require('./Samples/Sitar/SitarC6.wav'),
      Ds6: require('./Samples/Sitar/SitarDs6.wav'),
      Fs6: require('./Samples/Sitar/SitarFs6.wav'),
      A6: require('./Samples/Sitar/SitarA6.wav'),
      C7: require('./Samples/Sitar/SitarC7.wav'),
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

  {
    id: 5,
    name: 'Harp',
    samples: {
      A2: require('' + noSample),
      C3: require( './Samples/Harp/HarpC3.wav'),
      Ds3: require('./Samples/Harp/HarpDs3.wav'),
      Fs3: require('./Samples/Harp/HarpFs3.wav'),
      A3: require('./Samples/Harp/HarpA3.wav'),
      C4: require('./Samples/Harp/HarpC4.wav'),
      Ds4: require('./Samples/Harp/HarpDs4.wav'),
      Fs4: require('./Samples/Harp/HarpFs4.wav'),
      A4: require( './Samples/Harp/HarpA4.wav'),
      C5: require( './Samples/Harp/HarpC5.wav'),
      Ds5: require('./Samples/Harp/HarpDs5.wav'),
      Fs5: require('./Samples/Harp/HarpFs5.wav'),
      A5: require( './Samples/Harp/HarpA5.wav'),
      C6: require( './Samples/Harp/HarpC6.wav'),
      Ds6: require('./Samples/Harp/HarpDs6.wav'),
      Fs6: require('./Samples/Harp/HarpFs6.wav'),
      A6: require( '' + noSample),
      C7: require( '' + noSample),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 6,
    name: 'Kalimba',
    samples: {
      A2: require('' + noSample),
      C3: require( './Samples/Kalimba/KalimbaC3.wav'),
      Ds3: require('./Samples/Kalimba/KalimbaDs3.wav'),
      Fs3: require('./Samples/Kalimba/KalimbaFs3.wav'),
      A3: require('./Samples/Kalimba/KalimbaA3.wav'),
      C4: require('./Samples/Kalimba/KalimbaC4.wav'),
      Ds4: require('./Samples/Kalimba/KalimbaDs4.wav'),
      Fs4: require('./Samples/Kalimba/KalimbaFs4.wav'),
      A4: require( './Samples/Kalimba/KalimbaA4.wav'),
      C5: require( './Samples/Kalimba/KalimbaC5.wav'),
      Ds5: require('./Samples/Kalimba/KalimbaDs5.wav'),
      Fs5: require('./Samples/Kalimba/KalimbaFs5.wav'),
      A5: require( './Samples/Kalimba/KalimbaA5.wav'),
      C6: require( './Samples/Kalimba/KalimbaC6.wav'),
      Ds6: require('' + noSample),
      Fs6: require('' + noSample),
      A6: require( '' + noSample),
      C7: require( '' + noSample),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 7,
    name: 'Oud',
    samples: {
      A2: require('' + noSample),
      C3: require( './Samples/Oud/OudC3.wav'),
      Ds3: require('./Samples/Oud/OudDs3.wav'),
      Fs3: require('./Samples/Oud/OudFs3.wav'),
      A3: require('./Samples/Oud/OudA3.wav'),
      C4: require('./Samples/Oud/OudC4.wav'),
      Ds4: require('./Samples/Oud/OudDs4.wav'),
      Fs4: require('./Samples/Oud/OudFs4.wav'),
      A4: require( './Samples/Oud/OudA4.wav'),
      C5: require( './Samples/Oud/OudC5.wav'),
      Ds5: require('./Samples/Oud/OudDs5.wav'),
      Fs5: require('./Samples/Oud/OudFs5.wav'),
      A5: require( './Samples/Oud/OudA5.wav'),
      C6: require( './Samples/Oud/OudC6.wav'),
      Ds6: require('' + noSample),
      Fs6: require('' + noSample),
      A6: require( '' + noSample),
      C7: require( '' + noSample),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 8,
    name: 'Yangqin',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require('' + noSample),
      C4: require( './Samples/Yangqin/YangqinC4.wav'),
      Ds4: require('./Samples/Yangqin/YangqinDs4.wav'),
      Fs4: require('./Samples/Yangqin/YangqinFs4.wav'),
      A4: require( './Samples/Yangqin/YangqinA4.wav'),
      C5: require( './Samples/Yangqin/YangqinC5.wav'),
      Ds5: require('./Samples/Yangqin/YangqinDs5.wav'),
      Fs5: require('./Samples/Yangqin/YangqinFs5.wav'),
      A5: require( './Samples/Yangqin/YangqinA5.wav'),
      C6: require( './Samples/Yangqin/YangqinC6.wav'),
      Ds6: require('./Samples/Yangqin/YangqinDs6.wav'),
      Fs6: require('./Samples/Yangqin/YangqinFs6.wav'),
      A6: require('./Samples/Yangqin/YangqinA6.wav'),
      C7: require( './Samples/Yangqin/YangqinC7.wav'),
      Ds7: require( './Samples/Yangqin/YangqinDs7.wav'),
      Fs7: require( './Samples/Yangqin/YangqinFs7.wav'),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 9,
    name: 'Trumpet',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require('' + noSample),
      C4: require( '' + noSample),
      Ds4: require('' + noSample),
      Fs4: require('./Samples/Trumpet/TrumpetFs4.wav'),
      A4: require( './Samples/Trumpet/TrumpetA4.wav'),
      C5: require( './Samples/Trumpet/TrumpetC5.wav'),
      Ds5: require('./Samples/Trumpet/TrumpetDs5.wav'),
      Fs5: require('./Samples/Trumpet/TrumpetFs5.wav'),
      A5: require( './Samples/Trumpet/TrumpetA5.wav'),
      C6: require( './Samples/Trumpet/TrumpetC6.wav'),
      Ds6: require('./Samples/Trumpet/TrumpetDs6.wav'),
      Fs6: require('./Samples/Trumpet/TrumpetFs6.wav'),
      A6: require( './Samples/Trumpet/TrumpetA6.wav'),
      C7: require( './Samples/Trumpet/TrumpetC7.wav'),
      Ds7: require('' + noSample),
      Fs7: require('' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 10,
    name: 'koto',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require('' + noSample),
      C4: require( './Samples/Koto/KotoC4.wav'),
      Ds4: require('./Samples/Koto/KotoDs4.wav'),
      Fs4: require('./Samples/Koto/KotoFs4.wav'),
      A4: require( './Samples/Koto/KotoA4.wav'),
      C5: require( './Samples/Koto/KotoC5.wav'),
      Ds5: require('./Samples/Koto/KotoDs5.wav'),
      Fs5: require('./Samples/Koto/KotoFs5.wav'),
      A5: require( './Samples/Koto/KotoA5.wav'),
      C6: require( './Samples/Koto/KotoC6.wav'),
      Ds6: require('./Samples/Koto/KotoDs6.wav'),
      Fs6: require('./Samples/Koto/KotoFs6.wav'),
      A6: require( './Samples/Koto/KotoA6.wav'),
      C7: require( './Samples/Koto/KotoC7.wav'),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 11,
    name: 'Bouzouki',
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
      C5: require('' + noSample),
      Ds5: require('./Samples/Bouzouki/BouzoukiDs5.wav'),
      Fs5: require('./Samples/Bouzouki/BouzoukiFs5.wav'),
      A5: require( './Samples/Bouzouki/BouzoukiA5.wav'),
      C6: require( './Samples/Bouzouki/BouzoukiC6.wav'),
      Ds6: require( './Samples/Bouzouki/BouzoukiDs6.wav'),
      Fs6: require( './Samples/Bouzouki/BouzoukiFs6.wav'),
      A6: require( './Samples/Bouzouki/BouzoukiA6.wav'),
      C7: require( './Samples/Bouzouki/BouzoukiC7.wav'),
      Ds7: require( './Samples/Bouzouki/BouzoukiDs7.wav'),
      Fs7: require( './Samples/Bouzouki/BouzoukiFs7.wav'),
      A7: require( './Samples/Bouzouki/BouzoukiA7.wav'),
      C8: require( '' + noSample),
    }
  },

  {
    id: 12,
    name: 'Bagpipe',
    samples: {
      A2: require('' + noSample),
      C3: require('' + noSample),
      Ds3: require('' + noSample),
      Fs3: require('' + noSample),
      A3: require( './Samples/Bagpipe/BagpipeA3.wav'),
      C4: require( './Samples/Bagpipe/BagpipeC4.wav'),
      Ds4: require('./Samples/Bagpipe/BagpipeDs4.wav'),
      Fs4: require('./Samples/Bagpipe/BagpipeFs4.wav'),
      A4: require( './Samples/Bagpipe/BagpipeA4.wav'),
      C5: require( './Samples/Bagpipe/BagpipeC5.wav'),
      Ds5: require('./Samples/Bagpipe/BagpipeDs5.wav'),
      Fs5: require('./Samples/Bagpipe/BagpipeFs5.wav'),
      A5: require( './Samples/Bagpipe/BagpipeA5.wav'),
      C6: require( './Samples/Bagpipe/BagpipeC6.wav'),
      Ds6: require('./Samples/Bagpipe/BagpipeDs6.wav'),
      Fs6: require( '' + noSample),
      A6: require( '' + noSample),
      C7: require( '' + noSample),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 13,
    name: 'Accordion',
    samples: {
      A2: require( './Samples/Accordion/AccordionA2.wav'),
      C3: require( './Samples/Accordion/AccordionC3.wav'),
      Ds3: require( './Samples/Accordion/AccordionDs3.wav'),
      Fs3: require( './Samples/Accordion/AccordionFs3.wav'),
      A3: require( './Samples/Accordion/AccordionA3.wav'),
      C4: require( './Samples/Accordion/AccordionC4.wav'),
      Ds4: require('./Samples/Accordion/AccordionDs4.wav'),
      Fs4: require('./Samples/Accordion/AccordionFs4.wav'),
      A4: require( './Samples/Accordion/AccordionA4.wav'),
      C5: require( './Samples/Accordion/AccordionC5.wav'),
      Ds5: require('./Samples/Accordion/AccordionDs5.wav'),
      Fs5: require('./Samples/Accordion/AccordionFs5.wav'),
      A5: require( './Samples/Accordion/AccordionA5.wav'),
      C6: require( './Samples/Accordion/AccordionC6.wav'),
      Ds6: require('./Samples/Accordion/AccordionDs6.wav'),
      Fs6: require('./Samples/Accordion/AccordionFs6.wav'),
      A6: require('./Samples/Accordion/AccordionA6.wav'),
      C7: require('./Samples/Accordion/AccordionC7.wav'),
      Ds7: require('./Samples/Accordion/AccordionDs7.wav'),
      Fs7: require('./Samples/Accordion/AccordionFs7.wav'),
      A7: require('./Samples/Accordion/AccordionA7.wav'),
      C8: require( '' + noSample),
    }
  },

  {
    id: 14,
    name: 'Kora',
    samples: {
      A2: require( '' + noSample),
      C3: require( './Samples/Kora/KoraC3.wav'),
      Ds3: require('./Samples/Kora/KoraDs3.wav'),
      Fs3: require('./Samples/Kora/KoraFs3.wav'),
      A3: require( './Samples/Kora/KoraA3.wav'),
      C4: require( './Samples/Kora/KoraC4.wav'),
      Ds4: require('./Samples/Kora/KoraDs4.wav'),
      Fs4: require('./Samples/Kora/KoraFs4.wav'),
      A4: require( './Samples/Kora/KoraA4.wav'),
      C5: require( './Samples/Kora/KoraC5.wav'),
      Ds5: require('./Samples/Kora/KoraDs5.wav'),
      Fs5: require('./Samples/Kora/KoraFs5.wav'),
      A5: require( './Samples/Kora/KoraA5.wav'),
      C6: require( './Samples/Kora/KoraC6.wav'),
      Ds6: require('./Samples/Kora/KoraDs6.wav'),
      Fs6: require('./Samples/Kora/KoraFs6.wav'),
      A6: require( './Samples/Kora/KoraA6.wav'),
      C7: require( './Samples/Kora/KoraC7.wav'),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 15,
    name: 'Balalaika',
    samples: {
      A2: require( '' + noSample),
      C3: require( '' + noSample),
      Ds3: require( '' + noSample),
      Fs3: require( '' + noSample),
      A3: require( '' + noSample),
      C4: require( './Samples/Balalaika/BalalaikaC4.wav'),
      Ds4: require('./Samples/Balalaika/BalalaikaDs4.wav'),
      Fs4: require('./Samples/Balalaika/BalalaikaFs4.wav'),
      A4: require( './Samples/Balalaika/BalalaikaA4.wav'),
      C5: require( './Samples/Balalaika/BalalaikaC5.wav'),
      Ds5: require('./Samples/Balalaika/BalalaikaDs5.wav'),
      Fs5: require('./Samples/Balalaika/BalalaikaFs5.wav'),
      A5: require( './Samples/Balalaika/BalalaikaA5.wav'),
      C6: require( './Samples/Balalaika/BalalaikaC6.wav'),
      Ds6: require('./Samples/Balalaika/BalalaikaDs6.wav'),
      Fs6: require('./Samples/Balalaika/BalalaikaFs6.wav'),
      A6: require( './Samples/Balalaika/BalalaikaA6.wav'),
      C7: require( './Samples/Balalaika/BalalaikaC7.wav'),
      Ds7: require( './Samples/Balalaika/BalalaikaDs7.wav'),
      Fs7: require( './Samples/Balalaika/BalalaikaFs7.wav'),
      A7: require( '' + noSample),
      C8: require( '' + noSample),
    }
  },

  {
    id: 16,
    name: 'Dist Guitar',
    samples: {
      A2: require( '' + noSample),
      C3: require( '' + noSample),
      Ds3: require( '' + noSample),
      Fs3: require( '' + noSample),
      A3: require( '' + noSample),
      C4: require( './Samples/Dist/DistC4.wav'),
      Ds4: require('./Samples/Dist/DistDs4.wav'),
      Fs4: require('./Samples/Dist/DistFs4.wav'),
      A4: require( './Samples/Dist/DistA4.wav'),
      C5: require( './Samples/Dist/DistC5.wav'),
      Ds5: require('./Samples/Dist/DistDs5.wav'),
      Fs5: require('./Samples/Dist/DistFs5.wav'),
      A5: require( './Samples/Dist/DistA5.wav'),
      C6: require( './Samples/Dist/DistC6.wav'),
      Ds6: require('./Samples/Dist/DistDs6.wav'),
      Fs6: require('./Samples/Dist/DistFs6.wav'),
      A6: require( './Samples/Dist/DistA6.wav'),
      C7: require( './Samples/Dist/DistC7.wav'),
      Ds7: require('./Samples/Dist/DistDs7.wav'),
      Fs7: require('./Samples/Dist/DistFs7.wav'),
      A7: require('./Samples/Dist/DistA7.wav'),
      C8: require('./Samples/Dist/DistC8.wav')
    }
  },

  {
    id: 17,
    name: 'Didgeridoo',
    samples: {
      A2: require( './Samples/Didgeridoo/DidgeridooA2.wav'),
      C3: require( './Samples/Didgeridoo/DidgeridooC3.wav'),
      Ds3: require('./Samples/Didgeridoo/DidgeridooDs3.wav'),
      Fs3: require('./Samples/Didgeridoo/DidgeridooFs3.wav'),
      A3: require( './Samples/Didgeridoo/DidgeridooA3.wav'),
      C4: require( './Samples/Didgeridoo/DidgeridooC4.wav'),
      Ds4: require('./Samples/Didgeridoo/DidgeridooDs4.wav'),
      Fs4: require('./Samples/Didgeridoo/DidgeridooFs4.wav'),
      A4: require( './Samples/Didgeridoo/DidgeridooA4.wav'),
      C5: require( './Samples/Didgeridoo/DidgeridooC5.wav'),
      Ds5: require('./Samples/Didgeridoo/DidgeridooDs5.wav'),
      Fs5: require('./Samples/Didgeridoo/DidgeridooFs5.wav'),
      A5: require( './Samples/Didgeridoo/DidgeridooA5.wav'),
      C6: require( '' + noSample),
      Ds6: require( '' + noSample),
      Fs6: require( '' + noSample),
      A6: require( '' + noSample),
      C7: require( '' + noSample),
      Ds7: require( '' + noSample),
      Fs7: require( '' + noSample),
      A7: require( '' + noSample),
      C8: require( '' + noSample)
    }
  },
]



export default instruments;