import Susaudio from "../index"

export default function (sinkId: string) {
    const audio = new HTMLMediaElement()
    audio.setSinkId(sinkId)
    Susaudio._player.default.sinkId = sinkId
}

