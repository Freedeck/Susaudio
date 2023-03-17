/* eslint-disable camelcase */
const Susaudio = {
    _player: {
        pitch: 1.0,
        preservesPitch: true,
        autotuned: false,
        sinkId: null,
        timeSinceLastRequest: 0,
        queue: []
    },
    init: async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        devices.forEach(device => {
            if (device.kind === 'audiooutput') {
                if (device.label === 'CABLE Input (VB-Audio Virtual Cable)') {
                    const audio = new Audio()
                    audio.setSinkId(device.deviceId)
                    Susaudio._player.sinkId = device.deviceId
                }
            }
        })
    },
    playSound: async (audioSource, audioName) => {
        if (Susaudio._player.timeSinceLastRequest < 2) return
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
    },
    stopAll: () => {
        Susaudio._player.queue.forEach(audio => {
            audio.stop()
        })
    },
    stopRecent: () => {
        Susaudio._player.queue[0].stop()
        Susaudio._player.queue = _sa_removeFromArray(Susaudio._player.queue, Susaudio._player.queue[0])
    }
}

Audio.prototype.stop = function () {
    if (!this.isSusaudio) { this.stop(); return }
    this.pause()
    this.currentTime = 0
    Susaudio._player.queue = _sa_removeFromArray(Susaudio._player.queue, this)
}
// other functions


setInterval(() => {
    Susaudio._player.timeSinceLastRequest++
}, 1)
