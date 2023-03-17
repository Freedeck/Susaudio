import Susaudio from "../index"
import * as _sa_ from "../globalFunctions"

export default async function (audioSource: string, audioName: string) {
    if (Susaudio._player.default.timeSinceLastRequest < 2) return
    const audio = new Audio(audioSource)
    audio.preservesPitch = Susaudio._player.default.preservesPitch
    audio.playbackRate = Susaudio._player.default.pitch
    audio.isSusaudio = true
    audio.saName = audioName
    await audio.setSinkId(Susaudio._player.default.sinkId)
    audio.play()
    audio.onended = () => {
        Susaudio._player.default.queue = _sa_.default.removeFromArray(Susaudio._player.default.queue, audio)
    }
    Susaudio._player.default.queue.push(audio)
    Susaudio._player.default.timeSinceLastRequest = 0
}