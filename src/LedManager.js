const fetch = require("node-fetch");

class LedManager {
  constructor() {
    this.ledHost = "http://wled-pizza.local/json/si";
  }

  async tempUpdated(temps) {
    const state = await this._getState();

    const name = state?.seg
      ?.map(seg => seg.n)
      .find(n => n?.startsWith("heat-up"));

    if (name) {
      const [_, probe, target] = name.split(" ");

      this.targetTemp = Number(target);

      const temp = temps["temp" + probe];
      const bright = Math.floor(Math.min((255 * temp) / target, 255));
      const color = bright === 255 ? [255, 255, 255] : [255, 255 - bright, 0];

      console.log({ temps, bright, color });

      await this._sendState(this._formatState(state, 255, color));
    } else {
      this.targetTemp = 0;
    }
  }

  _formatState(oldState, bright, color) {
    return {
      ...oldState,
      bri: bright,
      seg: oldState.seg.map(seg => ({ ...seg, bri: bright, col: [color] }))
    };
  }

  getLastTemp() {
    return this.lastTemp;
  }

  getTargetTemp() {
    return this.targetTemp;
  }

  async _getState() {
    return await fetch(this.ledHost)
      .then(response => response.json())
      .then(res => {
        this.lastTemp = res?.info?.sensor?.temperature[0];
        return res?.state;
      });
  }

  _sendState(newState) {
    fetch(this.ledHost, {
      method: "POST",
      body: JSON.stringify(newState)
    })
      .then(() => console.log("sent"))
      .catch(err => console.log("some led fetch error", err));
  }
}

module.exports = LedManager;
