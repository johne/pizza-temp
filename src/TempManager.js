const LedManager = require("./LedManager");
const spi = require("spi-device");
const spiBus = 0; // SPI bus 0

class TempManager {
  constructor() {
    this.temp0 = 0;
    this.temp1 = 0;
    this.temp2 = 0;
    this.ledManager = new LedManager();
    setInterval(this._checkTemp.bind(this), 15000);
    this._checkTemp();
  }

  _checkDeviceTemp(spiDevice) {
    const max6675 = spi.openSync(spiBus, spiDevice);
    const receiveBuffer = Buffer.alloc(2);
    max6675.transferSync([
      {
        byteLength: 2, // MAX6675 sends 2 bytes
        receiveBuffer,
        speedHz: 500000
      }
    ]);

    // Check for errors (e.g., open circuit)
    if (receiveBuffer[1] & 0x04) {
      // D2 bit indicates open circuit
      console.log(`${spiDevice}: Thermocouple open circuit!`);
      return 0;
    }

    // Extract temperature data (first 12 bits) and convert
    const tempBits = ((receiveBuffer[0] << 8) | receiveBuffer[1]) >> 3;
    const temperatureC = tempBits * 0.25;

    console.log(`${spiDevice}: Temperature: ${temperatureC.toFixed(2)} °C`);

    return temperatureC;
  }

  async _checkTemp() {
    this.temp0 = this._checkDeviceTemp(0);
    await new Promise(resolve => setTimeout(() => resolve(), 500));
    this.temp1 = this._checkDeviceTemp(1);
    this.temp2 = this.ledManager.getLastTemp();
    this.temp3 = this.ledManager.getTargetTemp();
    this.ledManager.tempUpdated(this.getTemps());
  }

  getTemps() {
    return {
      temp0: (this.temp0 * 9) / 5 + 32,
      temp1: (this.temp1 * 9) / 5 + 32,
      temp2: this.temp2,
      temp3: this.temp3
    };
  }
}

module.exports = TempManager;
