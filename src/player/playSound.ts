import Susaudio from "../index"

export default function (audioSource, audioName) {
    if (Susaudio._player.default.timeSinceLastRequest < 2) return
    const audio = new Audio(audioSource)
    audio.preservesPitch = Susaudio._player.preservesPitch
    audio.playbackRate = Susaudio._player.pitch
    audio.isSusaudio = true
    audio.saName = audioName
    await audio.setSinkId(Susaudio._player.sinkId)
    audio.play()
    audio.onended = () => {
        Susaudio._player.queue = _sa_removeFromArray(Susaudio._player.queue, audio)
    }
    Susaudio._player.queue.push(audio)
    Susaudio._player.timeSinceLastRequest = 0
}