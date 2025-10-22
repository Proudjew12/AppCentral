export function CustomAudioPlayer({ src }) {
    const audioRef = React.useRef(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [duration, setDuration] = React.useState(0)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [volume, setVolume] = React.useState(1)

    function togglePlay(e) {
        e.stopPropagation()
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play()
            setIsPlaying(true)
        } else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    function handleTimeUpdate() {
        const audio = audioRef.current
        if (!audio) return
        setProgress((audio.currentTime / audio.duration) * 100)
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration)
    }

    function handleSeek(e) {
        e.stopPropagation()
        const audio = audioRef.current
        const newTime = (e.target.value / 100) * audio.duration
        audio.currentTime = newTime
    }

    function handleVolumeChange(e) {
        e.stopPropagation()
        const audio = audioRef.current
        const newVolume = e.target.value
        setVolume(newVolume)
        if (audio) audio.volume = newVolume
    }

    function formatTime(seconds) {
        if (!seconds) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div
            className="custom-audio-player flex column align-center"
            onClick={(e) => e.stopPropagation()}
        >
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <button onClick={togglePlay} className="play-btn">
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <input
                type="range"
                value={progress}
                onChange={handleSeek}
                className="audio-slider"
            />
            <div className="volume-control flex column align-center">
                <label htmlFor="volume" className="volume-label">🔊 Volume</label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
        </div>
    )
}
