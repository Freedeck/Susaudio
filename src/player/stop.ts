import Susaudio from "../index";
import * as _sa_ from "../globalFunctions";
import StopTypes from "../StopTypes";

export default function(typeOfStop: StopTypes) {
    if(typeOfStop == StopTypes.ALL) {
        Susaudio._player.default.queue.forEach(audio => {
            audio.stop()
        })
    } else if(typeOfStop == StopTypes.RECENT) {
        Susaudio._player.default.queue[0].stop()
        Susaudio._player.default.queue = _sa_.default.removeFromArray(Susaudio._player.default.queue, Susaudio._player.default.queue[0])
    }
}