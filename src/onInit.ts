import sink from "./player/sink"
import * as _sa_ from "./globalFunctions";
import Susaudio from "./index";

export default async function () {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(device => {
        if (device.kind === 'audiooutput') {
            if (device.label === 'CABLE Input (VB-Audio Virtual Cable)') {
                sink(device.deviceId)
            }
        }
    })
    Audio.prototype.stop = function () {
        if (!this.isSusaudio) { this.stop(); return }
        this.pause()
        this.currentTime = 0
        Susaudio._player.default.queue = _sa_.default.removeFromArray(Susaudio._player.queue, this)
    }
    setInterval(() => {
        Susaudio._player.default.timeSinceLastRequest++
    }, 1)   
}