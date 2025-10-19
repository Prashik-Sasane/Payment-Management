function sendSMS(phone, message) {
  console.log(`Sending SMS to ${phone}: ${message}`);
  // TODO: integrate real SMS API here
}

module.exports = { sendSMS };