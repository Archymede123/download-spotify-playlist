export function fetchPlaylistInfos(accessToken) {
    let dataPromise = fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
        .then(response => response.json())
    return dataPromise
}

export function fetchPlaylistData(accessToken) {

    let dataPromise = fetch(`https://api.spotify.com/v1/me/playlists?limit=49`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
        .then(playlistData => {
            let playlists = playlistData.items
            let trackDataPromises = playlists.map(playlist => {
                let responsePromise = [];
                [0].forEach(page => {
                    let responsePromiseDetails = fetch(`${playlist.tracks.href}?offset=${page}00`, {
                        headers: { 'Authorization': 'Bearer ' + accessToken }
                    }).then(response => response.json())
                    responsePromise.push(responsePromiseDetails)
                })
                let trackDataPromise = Promise.all(responsePromise)
                return trackDataPromise
            })
            let allTracksDataPromises =
                Promise.all(trackDataPromises)
            let playlistsPromise = allTracksDataPromises.then(trackDatasArrays => {
                trackDatasArrays.map((trackDatas, index) => {
                    let trackDatasPushed = [];
                    trackDatas.map(track => {
                        return trackDatasPushed.push(track.items)
                    })
                    let flatten = array => Array.isArray(array)
                        ? [].concat(...array.map(flatten))
                        : array
                    let trackDatasFlatten = flatten(trackDatasPushed)
                    let playlistTrackData = []
                    trackDatasFlatten.forEach((trackData, i) => {
                        let playlistSong = {
                            name: trackData.track.name,
                            duration: trackData.track.duration_ms / 1000,
                            artistUri: trackData.track.artists[0].uri,
                            uri: trackData.track.uri
                        }
                        playlistTrackData.push(playlistSong)
                    })
                    return playlists[index].trackDatas = playlistTrackData
                })
                return playlists
            })
            return playlistsPromise
        })
    return dataPromise
}