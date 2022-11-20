/* STARTING LOCALHOST WEB SERVER */
let https;
try {
  https = await import('node:https');
} catch (err) {
  console.log('https support is disabled!');
}

// const MICROBIT_VENDOR_ID = 0x0d28
// const MICROBIT_PRODUCT_ID = 0x0204
// const MICROBIT_DAP_INTERFACE = 4

// navigator.usb.requestDevice({ filters: [{ vendorId: 0x0d28 }] })
// .then(device => {
//   console.log(device.productName);      
//   console.log(device.manufacturerName); 
// })
// .catch(error => { console.error(error); });




