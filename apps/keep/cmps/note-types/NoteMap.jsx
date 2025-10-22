const { useEffect, useRef, useState } = React

export function NoteMap({ onAddNote, color }) {
    const mapRef = useRef(null)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (mapRef.current) return

        const map = window.L.map('note-map', {
            center: [32.0853, 34.7818],
            zoom: 12,
        })

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map)

        map.on('click', async (e) => {
            const { lat, lng } = e.latlng
            window.L.marker([lat, lng]).addTo(map)

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                )
                const data = await res.json()

                const addr = data.address || {}
                const street = addr.road || addr.suburb || 'Unknown Street'
                const houseNumber = addr.house_number || ''
                const city = addr.city || addr.town || addr.village || 'Unknown City'
                const postcode = addr.postcode || 'No Zipcode'
                const country = addr.country || 'Unknown Country'

                const locationInfo = `📍 ${street} ${houseNumber} / ${city}, ${postcode} / ${country}`

                onAddNote({
                    txt: locationInfo,
                    type: 'NoteMap',
                    color,
                })
            } catch (err) {
                console.error('Error fetching location name:', err)
                onAddNote({
                    txt: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
                    type: 'NoteMap',
                    color,
                })
            }
        })



        mapRef.current = map
    }, [])

    async function handleSearch(ev) {
        ev.preventDefault()
        if (!searchText) return

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                searchText
            )}&format=json&limit=1`
        )
        const data = await res.json()
        if (data.length > 0) {
            const { lat, lon } = data[0]
            mapRef.current.setView([lat, lon], 13)
            window.L.marker([lat, lon]).addTo(mapRef.current)
        }
    }

    return (
        <div className="note-type note-map flex column align-center">
            <form className="flex row align-center" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a place..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit">Go</button>
            </form>

            <div id="note-map"></div>
        </div>
    )
}