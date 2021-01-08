const project = reaper.GetCurrentProjectInLoadSave()
const numTracks = reaper.CountTracks(project)

const tracks = [] as MediaTrack[]

for (let idx = 0; idx < numTracks; idx++)
  tracks.push(reaper.GetTrack(project, idx))

for (const track of tracks) {
  const [retval, trackname] = reaper.GetTrackName(track)
  reaper.ShowConsoleMsg(`Trackname: ${trackname}\n`)
  reaper.ShowConsoleMsg(`NEW LINE, HOT RELOAD\n`)
}

function main() {
  const char = gfx.getchar(0)
  if (char != 27 && char != -1) reaper.defer(main)
  gfx.update()
}

gfx.init("My Window", 640, 480, 0, 200)
main()
