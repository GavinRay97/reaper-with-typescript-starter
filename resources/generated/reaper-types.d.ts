type REAPER<T extends string> = {
      type: T
      value: string
    }
    
  type MediaTrack = REAPER<'MediaTrack'>
type ReaProject = REAPER<'ReaProject'>
type MediaItem = REAPER<'MediaItem'>
type AudioAccessor = REAPER<'AudioAccessor'>
type TrackEnvelope = REAPER<'TrackEnvelope'>
type MediaItem_Take = REAPER<'MediaItem_Take'>
type IReaperControlSurface = REAPER<'IReaperControlSurface'>
type HWND = REAPER<'HWND'>
type array = REAPER<'array'>
type PCM_source = REAPER<'PCM_source'>
type joystick_device = REAPER<'joystick_device'>
type identifier = REAPER<'identifier'>
type KbdSectionInfo = REAPER<'KbdSectionInfo'>
type BR_Envelope = REAPER<'BR_Envelope'>
type WDL_FastString = REAPER<'WDL_FastString'>
type RprMidiTake = REAPER<'RprMidiTake'>
type RprMidiNote = REAPER<'RprMidiNote'>
type unsupported = REAPER<'unsupported'>
type AudioWriter = REAPER<'AudioWriter'>
type FxChain = REAPER<'FxChain'>
type _function = REAPER<'_function'>
type PackageEntry = REAPER<'PackageEntry'>

    /** @noSelf **/
    declare namespace reaper {

    
      /** Creates a new media item. It will be empty and therefore not be shown in the arrange-view, until you associate a mediafile(audio, picture, video, etc) or a length and position to it using [SetMediaItemInfo\_Value](#SetMediaItemInfo_Value) */
      function AddMediaItemToTrack(tr: MediaTrack): MediaItem

      
      /** Creates a new Projectmarker/Region.
	*
	* Returns the index of the created marker/region, or -1 on failure. Supply wantidx&gt;=0 if you want a particular index number, but you'll get a different index number a region and wantidx is already in use. */
      function AddProjectMarker(proj: ReaProject, isrgn: boolean, pos: number, rgnend: number, name: string, wantidx: number): number

      
      /** Returns the index of the created marker/region, or -1 on failure. Supply wantidx&gt;=0 if you want a particular index number, but you'll get a different index number a region and wantidx is already in use. color should be 0 (default color), or [ColorToNative(r,g,b)|0x1000000](#ColorToNative) */
      function AddProjectMarker2(proj: ReaProject, isrgn: boolean, pos: number, rgnend: number, name: string, wantidx: number, color: number): number

      
      /** Adds a ReaScript (returns the new command ID, or 0 if failed) or removes a ReaScript
	*
	* Returns &gt;0 on success. 
	*
	* Use commit==true when adding/removing a single script. 
	*
	* When bulk adding/removing multiple scripts, you can optimize the n-1 first calls with commit==false and commit==true for the last call.            
	*
	* The commandID returned, might change, when addng this script into an other Reaper-installation. 
	*
	* To be sure to use the right command-id, use [ReverseNamedCommandLookup()](#ReverseNamedCommandLookup) to get the ActionCommandID, which will never change, until you remove the script.
	*
	* 
	*
	* If you want to add a script to several sections, you need to add them individually, by calling the function again with the changed section-number. */
      function AddRemoveReaScript(add: boolean, sectionID: number, scriptfn: string, commit: boolean): number

      
      /** creates a new take in an item */
      function AddTakeToMediaItem(item: MediaItem): MediaItem_Take

      
      /** Deprecated. Use [SetTempoTimeSigMarker](#SetTempoTimeSigMarker) with ptidx=-1. */
      function AddTempoTimeSigMarker(proj: ReaProject, timepos: number, bpm: number, timesig_num: number, timesig_denom: number, lineartempochange: boolean): boolean

      
      /** Sets horizontal zoom in track view. */
      function adjustZoom(amt: number, forceset: number, doupd: boolean, centermode: number): void

      
      /** returns, whether any of the tracks is solo in Project proj */
      function AnyTrackSolo(proj: ReaProject): boolean

      
      /** Returns true if function_name exists in the REAPER API */
      function APIExists(function_name: string): boolean

      
      /** Displays a message window with "Hello World", if the API was successfully called. */
      function APITest(): void

      
      /** Nudges elements like items, cursor, contents, etc to or by a value you want. Nudges only selected mediaitems. */
      function ApplyNudge(project: ReaProject, nudgeflag: number, nudgewhat: number, nudgeunits: number, value: number, reverse: boolean, copies: number): boolean

      
      /** open all audio and MIDI devices, if not open */
      function Audio_Init(): void

      
      /** is in pre-buffer? threadsafe */
      function Audio_IsPreBuffer(): number

      
      /** is audio running at all? threadsafe */
      function Audio_IsRunning(): number

      
      /** close all audio and MIDI devices, if open */
      function Audio_Quit(): void

      
      /** Returns true if the underlying samples (track or media item take) have changed, but does not update the audio accessor, so the user can selectively call [AudioAccessorValidateState](#AudioAccessorValidateState) only when needed. 
	*
	* 
	*
	* See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function AudioAccessorStateChanged(reaper: boolean, accessor: AudioAccessor): void

      
      /** Force the accessor to reload its state from the underlying track or media item take. 
	*
	* 
	*
	* See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function AudioAccessorUpdate(accessor: AudioAccessor): void

      
      /** Validates the current state of the audio accessor -- must ONLY call this from the main thread. Returns true if the state changed. */
      function AudioAccessorValidateState(accessor: AudioAccessor): boolean

      
      /** Does bypassing of the fx of all tracks. */
      function BypassFxAllTracks(bypass: number): void

      
      /** Clears all armed states of all tracks. */
      function ClearAllRecArmed(): void

      
      /** Clear the ReaScript console. See [ShowConsoleMsg](#ShowConsoleMsg) */
      function ClearConsole(): void

      
      /** resets the global peak caches */
      function ClearPeakCache(): void

      
      /** Extract RGB values from an OS dependent color. See [ColorToNative](#ColorToNative).
	*
	* 
	*
	* As Reaper treats colors differently on Mac and Windows, you should always use [ColorFromNative](#ColorFromNative) and [ColorToNative](#ColorToNative). */
      function ColorFromNative(col: number): MultiReturn<[r: number, g: number, b: number]>

      
      /** Make an OS dependent color from RGB values (e.g. RGB() macro on Windows). r,g and b are in [0..255]. See [ColorFromNative](#ColorFromNative)
	*
	* As Reaper treats colors differently on Mac and Windows, you should always use [ColorFromNative](#ColorFromNative) and [ColorToNative](ColorToNative).
	*
	* 
	*
	* When using the returned colorvalue, you need to add |0x1000000 at the end of it, like ColorToNative(20,30,40)|0x1000000. */
      function ColorToNative(r: number, g: number, b: number): number

      
      /** Returns the number of automation items on this envelope. See [GetSetAutomationItemInfo](#GetSetAutomationItemInfo). */
      function CountAutomationItems(env: TrackEnvelope): number

      
      /** Returns the number of points in the envelope. See [#CountEnvelopePointsEx](#CountEnvelopePointsEx) */
      function CountEnvelopePoints(envelope: TrackEnvelope): number

      
      /** Returns the number of points in the envelope.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* 
	*
	* See [GetEnvelopePointEx](#GetEnvelopePointEx), [SetEnvelopePointEx](#SetEnvelopePointEx), [InsertEnvelopePointEx](#InsertEnvelopePointEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function CountEnvelopePointsEx(envelope: TrackEnvelope, autoitem_idx: number): number

      
      /** count the number of items in the project (proj=0 for active project) */
      function CountMediaItems(proj: ReaProject): number

      
      /** returns the number of all markers and regions, as well as all markers and all regions in a project.
	*
	* num_markersOut and num_regionsOut may be NULL. */
      function CountProjectMarkers(proj: ReaProject): MultiReturn<[retval: number, num_markers: number, num_regions: number]>

      
      /** count the number of selected items in the project (proj=0 for active project) */
      function CountSelectedMediaItems(proj: ReaProject): number

      
      /** Count the number of selected tracks in the project. 
	*
	* This function ignores the master track, see [CountSelectedTracks2](#CountSelectedTracks2) */
      function CountSelectedTracks(proj: ReaProject): number

      
      /** Count the number of selected tracks in the project.
	*
	* if you set wantmaster to true, it will include the master track as well. */
      function CountSelectedTracks2(proj: ReaProject, wantmaster: boolean): number

      
      /** See [GetTakeEnvelope](#GetTakeEnvelope) */
      function CountTakeEnvelopes(take: MediaItem_Take): number

      
      /** count the number of takes in the item */
      function CountTakes(item: MediaItem): number

      
      /** Count the number of FX parameter knobs displayed on the track control panel. */
      function CountTCPFXParms(project: ReaProject, track: MediaTrack): number

      
      /** Count the number of tempo/time signature markers in the project. See [GetTempoTimeSigMarker](#GetTempoTimeSigMarker), [SetTempoTimeSigMarker](#SetTempoTimeSigMarker), [AddTempoTimeSigMarker](#AddTempoTimeSigMarker), [DeleteTempoTimeSigMarker](#DeleteTempoTimeSigMarker). */
      function CountTempoTimeSigMarkers(proj: ReaProject): number

      
      /** Counts the number of track-envelopes of a certain track.
	*
	* see [GetTrackEnvelope](#GetTrackEnvelope) */
      function CountTrackEnvelopes(track: MediaTrack): number

      
      /** count the number of items in the track */
      function CountTrackMediaItems(track: MediaTrack): number

      
      /** count the number of tracks in the project (proj=0 for active project) */
      function CountTracks(proj: ReaProject): number

      
      /** Create a new MIDI media item, containing no MIDI events. Time is in seconds unless qn is set. */
      function CreateNewMIDIItemInProj(track: MediaTrack, starttime: number, endtime: number, boolean: any | 'optional'): MediaItem

      
      /** Create an audio accessor object for this take. Must only call from the main thread. 
	*
	* 
	*
	* See [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function CreateTakeAudioAccessor(take: MediaItem_Take): AudioAccessor

      
      /** Create an audio accessor object for this track. Must only call from the main thread. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function CreateTrackAudioAccessor(track: MediaTrack): AudioAccessor

      
      /** Create a send/receive (desttrInOptional!=NULL), or a hardware output (desttrInOptional==NULL) with default properties, return &gt;=0 on success (== new send/receive index). See [RemoveTrackSend](#RemoveTrackSend), [GetSetTrackSendInfo](#GetSetTrackSendInfo), [GetTrackSendInfo\_Value](#GetTrackSendInfo_Value), [SetTrackSendInfo\_Value](#SetTrackSendInfo_Value).
	*
	* 
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc). */
      function CreateTrackSend(tr: MediaTrack, desttrIn: MediaTrack): number

      
      /** call this to force flushing of the undo states after using CSurf_On*Change() */
      function CSurf_FlushUndo(force: boolean): void

      
      /**  */
      function CSurf_GetTouchState(trackid: MediaTrack, isPan: number): boolean

      
      /** Moves the cursor to the end of the last item in the project. */
      function CSurf_GoEnd(): void

      
      /** Moves the cursor to the start of the project. */
      function CSurf_GoStart(): void

      
      /** counts the number of tracks, or the number of visible tracks, when mcpView is set to true. */
      function CSurf_NumTracks(mcpView: boolean): number

      
      /** Zoom or scroll the Arrangeview vertically. 
	*
	* The stepsize with scrolling is track by track. */
      function CSurf_OnArrow(whichdir: number, wantzoom: boolean): void

      
      /** Moves editcursor forward, and optionally with seekplay. */
      function CSurf_OnFwd(seekplay: number): void

      
      /** Sets/toggles activation of FX-Chain. */
      function CSurf_OnFXChange(trackid: MediaTrack, en: number): boolean

      
      /** sets rec-monitoring of a specific track. */
      function CSurf_OnInputMonitorChange(trackid: MediaTrack, monitor: number): number

      
      /** Sets monitor-input-state. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnInputMonitorChangeEx(trackid: MediaTrack, monitor: number, allowgang: boolean): number

      
      /** Sets mute state of a MediaTrack. */
      function CSurf_OnMuteChange(trackid: MediaTrack, mute: number): boolean

      
      /** Sets/toggles mute-state for a MediaTrack. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnMuteChangeEx(trackid: MediaTrack, mute: number, allowgang: boolean): boolean

      
      /** Changes the pan-value of a track. */
      function CSurf_OnPanChange(trackid: MediaTrack, pan: number, relative: boolean): number

      
      /** Changes the pan-value of a track. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnPanChangeEx(trackid: MediaTrack, pan: number, relative: boolean, allowGang: boolean): number

      
      /** Toggles between pause and play or when recording has started between pause and rec. Unlike [CSurf\_OnPlay()](#CSurf_OnPlay) it toggles pause first, then plays. */
      function CSurf_OnPause(): void

      
      /** Toggles between play and pause or, when recording, rec and pause. Unlike [CSurf\_OnPause()](#CSurf_OnPause) it toggles play first, then pauses. */
      function CSurf_OnPlay(): void

      
      /** Sets the playbackrate of the current project. Can be between 0.25x to 4x. */
      function CSurf_OnPlayRateChange(playrate: number): void

      
      /** Sets a MediaTrack's armed state. */
      function CSurf_OnRecArmChange(trackid: MediaTrack, recarm: number): boolean

      
      /** Sets a MediaTrack's armed state. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnRecArmChangeEx(trackid: MediaTrack, recarm: number, allowgang: boolean): boolean

      
      /** Toggles recording on and off. Starts recording from edit-cursor-position. */
      function CSurf_OnRecord(): void

      
      /** Sets/alters a pan-value for a received-track. Will also change pan in the accompanying send-track! */
      function CSurf_OnRecvPanChange(trackid: MediaTrack, recv_index: number, pan: number, relative: boolean): number

      
      /** Sets/alters the volume-value of a received track. Will also change volume in the accompanying send-track!
	*
	* 
	*
	* Note: You can't(!) use SLIDER2DB or DB2SLIDER for getting the volume-values, you want to set here! Use [mkvolstr](#mkvolstr) instead. */
      function CSurf_OnRecvVolumeChange(trackid: MediaTrack, recv_index: number, volume: number, relative: boolean): number

      
      /** Moves editcursor backward, and optionally with seekplay. */
      function CSurf_OnRew(seekplay: number): void

      
      /** Will move editcursor for or backward, depending on parameter dir.
	*
	* During play and whith seekplay set, the movement of the editcursor depends on the playcursor-position at the time of calling CSurf_OnRewFwd. */
      function CSurf_OnRewFwd(seekplay: number, dir: number): void

      
      /** Scroll arrangeview relative to it's current view-settings. */
      function CSurf_OnScroll(xdir: number, ydir: number): void

      
      /** Sets a track selected or not. */
      function CSurf_OnSelectedChange(trackid: MediaTrack, selected: number): boolean

      
      /** Sets/alters the pan-volume of a send-track. Will also change the volume of the accompanying receive-track! */
      function CSurf_OnSendPanChange(trackid: MediaTrack, send_index: number, pan: number, relative: boolean): number

      
      /** Sets/alters the volume-value of a send-track. Will also alter the volume of the accompanying receive-track.
	*
	* 
	*
	* Note: You can't(!) use SLIDER2DB or DB2SLIDER for getting the volume-values, you want to set here! */
      function CSurf_OnSendVolumeChange(trackid: MediaTrack, send_index: number, volume: number, relative: boolean): number

      
      /** Sets/toggles solo state of a track. */
      function CSurf_OnSoloChange(trackid: MediaTrack, solo: number): boolean

      
      /** Sets/toggles solo state of a track. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnSoloChangeEx(trackid: MediaTrack, solo: number, allowgang: boolean): boolean

      
      /** Stops playing/recording in current project. */
      function CSurf_OnStop(): void

      
      /** Sets the tempo of the project in beats per minute. */
      function CSurf_OnTempoChange(bpm: number): void

      
      /**  */
      function CSurf_OnTrackSelection(trackid: MediaTrack): void

      
      /** Sets or alters volume of a track to a new value.
	*
	* 
	*
	* Use [DB2SLIDER](#DB2SLIDER) to convert dB-value to fitting numbers of the volume-parameter. */
      function CSurf_OnVolumeChange(trackid: MediaTrack, volume: number, relative: boolean): number

      
      /** Sets or alters volume of a track to a new value. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well.
	*
	* 
	*
	* Use [DB2SLIDER](#DB2SLIDER) to convert dB-value to fitting numbers of the volume-parameter. */
      function CSurf_OnVolumeChangeEx(trackid: MediaTrack, volume: number, relative: boolean, allowGang: boolean): number

      
      /** Sets/alters the width-value of a track. */
      function CSurf_OnWidthChange(trackid: MediaTrack, width: number, relative: boolean): number

      
      /** Sets/alters the width-value of a track. If MediaTrack is selected, among others, and allowgang is set to true, the new state will be set to them as well. */
      function CSurf_OnWidthChangeEx(trackid: MediaTrack, width: number, relative: boolean, allowGang: boolean): number

      
      /** Changes horizontal/vertical zoom. */
      function CSurf_OnZoom(xdir: number, ydir: number): void

      
      /** Resets all cached vol-pan-states. */
      function CSurf_ResetAllCachedVolPanStates(): void

      
      /** Changes position of the editcursor by amt-value in seconds. When playing, the playposition changes to the editcursor-position.
	*
	* During recording, it changes only the position of the editcursor. */
      function CSurf_ScrubAmt(amt: number): void

      
      /**  */
      function CSurf_SetAutoMode(mode: number, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetPlayState(play: boolean, pause: boolean, rec: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetRepeatState(rep: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfaceMute(trackid: MediaTrack, mute: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfacePan(trackid: MediaTrack, pan: number, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfaceRecArm(trackid: MediaTrack, recarm: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfaceSelected(trackid: MediaTrack, selected: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfaceSolo(trackid: MediaTrack, solo: boolean, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetSurfaceVolume(trackid: MediaTrack, volume: number, ignoresurf: IReaperControlSurface): void

      
      /**  */
      function CSurf_SetTrackListChange(): void

      
      /** Gets a MediaTrack-object by it's number. */
      function CSurf_TrackFromID(idx: number, mcpView: boolean): MediaTrack

      
      /** Get the tracknumber of a MediaTrack-object. */
      function CSurf_TrackToID(track: MediaTrack, mcpView: boolean): number

      
      /** Converts dB-value into a slider-value. Good for converting envelope-point-values. */
      function DB2SLIDER(x: number): number

      
      /** Delete an envelope point. If setting multiple points at once, set noSort=true, and call Envelope_SortPoints when done.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* 
	*
	* See [CountEnvelopePointsEx](#CountEnvelopePointsEx), [GetEnvelopePointEx](#GetEnvelopePointEx), [SetEnvelopePointEx](#SetEnvelopePointEx), [InsertEnvelopePointEx](#InsertEnvelopePointEx). */
      function DeleteEnvelopePointEx(reaper: boolean, envelope: TrackEnvelope, autoitem_idx: number, ptidx: number): void

      
      /** Delete a range of envelope points. 
	*
	* 
	*
	* See [DeleteEnvelopePointRangeEx](#DeleteEnvelopePointRangeEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function DeleteEnvelopePointRange(envelope: TrackEnvelope, time_start: number, time_end: number): boolean

      
      /** Delete a range of envelope points. autoitem_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc. */
      function DeleteEnvelopePointRangeEx(envelope: TrackEnvelope, autoitem_idx: number, time_start: number, time_end: number): boolean

      
      /** Delete the extended state value for a specific section and key. persist=true means the value should remain deleted the next time REAPER is opened. If persistent, the value will be deleted from the file reaper-extstate.ini in the ressources-folder.
	*
	* See [SetExtState](#SetExtState), [GetExtState](#GetExtState), [HasExtState](#HasExtState). */
      function DeleteExtState(section: string, key: string, persist: boolean): void

      
      /** Deletes a marker or a region. proj==NULL for the active project.
	*
	* 
	*
	* Does not delete tempo/timesignature markers! */
      function DeleteProjectMarker(proj: ReaProject, markrgnindexnumber: number, isrgn: boolean): boolean

      
      /** Differs from DeleteProjectMarker only in that markrgnidx is 0 for the first marker/region in the project, 1 for the next, etc, rather than representing the displayed marker/region ID number.
	*
	* See [EnumProjectMarkers3](#EnumProjectMarkers3)) and [SetProjectMarker4](#SetProjectMarker4). */
      function DeleteProjectMarkerByIndex(proj: ReaProject, markrgnidx: number): boolean

      
      /** Delete a take marker. Note that idx will change for all following take markers. 
	*
	* See [GetNumTakeMarkers](#GetNumTakeMarkers)), [GetTakeMarker](#GetTakeMarker) and [SetTakeMarker](#SetTakeMarker). */
      function DeleteTakeMarker(take: MediaItem_Take, idx: number): boolean

      
      /** Deletes one or more stretch markers. Returns number of stretch markers deleted. */
      function DeleteTakeStretchMarkers(take: MediaItem_Take, idx: number, number: any | 'optional'): number

      
      /** Delete a tempo/time signature marker. 
	*
	* 
	*
	* See [CountTempoTimeSigMarkers](#CountTempoTimeSigMarkers), [GetTempoTimeSigMarker](#GetTempoTimeSigMarker), [SetTempoTimeSigMarker](#SetTempoTimeSigMarker), [AddTempoTimeSigMarker](#AddTempoTimeSigMarker). */
      function DeleteTempoTimeSigMarker(project: ReaProject, markerindex: number): boolean

      
      /** deletes a track */
      function DeleteTrack(tr: MediaTrack): void

      
      /** Deletes a MediaItem. */
      function DeleteTrackMediaItem(tr: MediaTrack, it: MediaItem): boolean

      
      /** Destroy an audio accessor. Must only call from the main thread. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples).  */
      function DestroyAudioAccessor(accessor: AudioAccessor): void

      
      /** updates preference for docker window ident_str to be in dock whichDock on next open */
      function Dock_UpdateDockID(ident_str: string, whichDock: number): void

      
      /** returns the position of docker whichDock */
      function DockGetPosition(reaper: number, whichDock: number): void

      
      /** returns dock index that contains hwnd, or -1 */
      function DockIsChildOfDock(hwnd: HWND): MultiReturn<[retval: number, isFloatingDocker: boolean]>

      
      /**  */
      function DockWindowActivate(hwnd: HWND): void

      
      /**  */
      function DockWindowAdd(hwnd: HWND, name: string, pos: number, allowShow: boolean): void

      
      /**  */
      function DockWindowAddEx(hwnd: HWND, name: string, identstr: string, allowShow: boolean): void

      
      /** Refreshes docked windows. */
      function DockWindowRefresh(): void

      
      /**  */
      function DockWindowRefreshForHWND(hwnd: HWND): void

      
      /**  */
      function DockWindowRemove(hwnd: HWND): void

      
      /** Open the tempo/time signature marker editor dialog. */
      function EditTempoTimeSigMarker(project: ReaProject, markerindex: number): boolean

      
      /** List the files in the "path" directory. Returns NULL (or empty string, in Lua) when all files have been listed. See [EnumerateSubdirectories](#EnumerateSubdirectories) */
      function EnumerateFiles(path: string, fileindex: number): string

      
      /** List the subdirectories in the "path" directory. Returns NULL (or empty string, in Lua) when all subdirectories have been listed. See [EnumerateFiles](#EnumerateFiles) */
      function EnumerateSubdirectories(path: string, subdirindex: number): string

      
      /** Start querying modes at 0, returns FALSE when no more modes possible, sets strOut to NULL if a mode is currently unsupported */
      function EnumPitchShiftModes(mode: number): MultiReturn<[retval: boolean, str: string]>

      
      /** Returns submode name, or NULL */
      function EnumPitchShiftSubModes(mode: number, submode: number): string

      
      /** Returns the values of a given marker or region idx. */
      function EnumProjectMarkers(idx: number): MultiReturn<[retval: number, isrgn: boolean, pos: number, rgnend: number, name: string, markrgnindexnumber: number]>

      
      /** Returns the values of a given marker or region idx from a given project proj. */
      function EnumProjectMarkers2(proj: ReaProject, idx: number): MultiReturn<[retval: number, isrgn: boolean, pos: number, rgnend: number, name: string, markrgnindexnumber: number]>

      
      /** Returns the values of a given marker or region idx from a given project proj. */
      function EnumProjectMarkers3(proj: ReaProject, idx: number): MultiReturn<[retval: number, isrgn: boolean, pos: number, rgnend: number, name: string, markrgnindexnumber: number, color: number]>

      
      /** Get ReaProject-object and filename of a project.
	*
	* idx=-1 for current project,projfn can be NULL if not interested in filename. use idx 0x40000000 for currently rendering project, if any.
	*
	* 
	*
	* If you need the path to the recording-folder, use [GetProjectPath](#GetProjectPath) instead. */
      function EnumProjects(idx: number): MultiReturn<[retval: ReaProject, string: any | 'optional']>

      
      /** Enumerate the data stored with the project for a specific extname. Returns false when there is no more data. See [SetProjExtState](#SetProjExtState), [GetProjExtState](#GetProjExtState). */
      function EnumProjExtState(proj: ReaProject, extname: string, idx: number): MultiReturn<[retval: boolean, string: any | 'optional', string: any | 'optional']>

      
      /** Enumerate which tracks will be rendered within this region when using the region render matrix. When called with rendertrack==0, the function returns the first track that will be rendered (which may be the master track); rendertrack==1 will return the next track rendered, and so on. The function returns NULL when there are no more tracks that will be rendered within this region. */
      function EnumRegionRenderMatrix(proj: ReaProject, regionindex: number, rendertrack: number): MediaTrack

      
      /** returns false if there are no plugins on the track that support MIDI programs,or if all programs have been enumerated */
      function EnumTrackMIDIProgramNames(track: number, programNumber: number, programName: string): MultiReturn<[retval: boolean, programName: string]>

      
      /** returns false if there are no plugins on the track that support MIDI programs,or if all programs have been enumerated */
      function EnumTrackMIDIProgramNamesEx(proj: ReaProject, track: MediaTrack, programNumber: number, programName: string): MultiReturn<[retval: boolean, programName: string]>

      
      /** Get the effective envelope value at a given time position. 
	*
	* 
	*
	* samplesRequested is how long the caller expects until the next call to Envelope_Evaluate (often, the buffer block size). 
	*
	* 
	*
	* The return value is how many samples beyond that time position that the returned values are valid. 
	*
	* 
	*
	* dVdS is the change in value per sample (first derivative), ddVdS is the second derivative, dddVdS is the third derivative. 
	*
	* 
	*
	* See [GetEnvelopeScalingMode](#GetEnvelopeScalingMode). */
      function Envelope_Evaluate(envelope: TrackEnvelope, time: number, samplerate: number, samplesRequested: number): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional']>

      
      /** Formats the value of an envelope to a user-readable form */
      function Envelope_FormatValue(env: TrackEnvelope, value: number): string

      
      /** If take envelope, gets the take from the envelope. If FX, indexOutOptional set to FX index, index2OutOptional set to parameter index, otherwise -1. */
      function Envelope_GetParentTake(env: TrackEnvelope): MultiReturn<[retval: MediaItem_Take, number: any | 'optional', number: any | 'optional']>

      
      /** If track envelope, gets the track from the envelope. If FX, indexOutOptional set to FX index, index2OutOptional set to parameter index, otherwise -1. */
      function Envelope_GetParentTrack(env: TrackEnvelope): MultiReturn<[retval: MediaTrack, number: any | 'optional', number: any | 'optional']>

      
      /** Sort envelope points by time. See [SetEnvelopePoint](#SetEnvelopePoint), [InsertEnvelopePoint](#InsertEnvelopePoint). */
      function Envelope_SortPoints(envelope: TrackEnvelope): boolean

      
      /** Sort envelope points by time. autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc. See [SetEnvelopePoint](#SetEnvelopePoint), [InsertEnvelopePoint](#InsertEnvelopePoint). */
      function Envelope_SortPointsEx(envelope: TrackEnvelope, autoitem_idx: number): boolean

      
      /** Executes command line, returns NULL on total failure, otherwise the return value, a newline, and then the output of the command.             
	*
	*         
	*
	* Commands executed with ExecProcess() don't benefit from PATH-system-variables. That said, you must give the full path to a command, even if you can usually just type the command into a shell. You also may need to set a codepage manually to get the correct character-encoding. So in some cases, writing a batch-script and executing it with ExecProcess() might be a good idea.
	*
	* 
	*
	* The base-directory is Reaper's appdirectory.
	*
	* 
	*
	* On Windows, you can not use command-line-internal commands, like dir or cd, directly. To use them, you need to use cmd.exe. 
	*
	* You can do it like:
	*
	* 
	*
	* -    "$Path_to_Command_Exe\\cmd.exe /Q /C command"
	*
	* 
	*
	* where "/Q" executes cmd.exe silently(otherwise a command-line-window pops up; but output of commands will show anyway) and "/C command" executes command.
	*
	* 
	*
	* To get a full directory-listing of c:\\ in a file c:\\directorylisting.txt, you can use:
	*
	* -   "c:\\windows\\system32\\cmd.exe /Q /C dir c:\\ >c:\\directorylisting.txt" */
      function ExecProcess(cmdline: string, timeoutmsec: number): string

      
      /** Checks, if a specified file exists and is readable.
	*
	* 
	*
	* returns true if path points to a valid, readable file */
      function file_exists(path: string): boolean

      
      /** Find the tempo/time signature marker that falls at or before this time position (the marker that is in effect as of this time position). */
      function FindTempoTimeSigMarker(project: ReaProject, time: number): number

      
      /** Creates a timestring and formats it as hh:mm:ss.sss. See [format\_timestr_pos](#format_timestr_pos), [format\_timestr_len](#format_timestr_len). */
      function format_timestr(tpos: number, buf: string): string

      
      /** time formatting mode overrides: -1=proj default.
	*
	* 0=time
	*
	* 1=measures.beats + time
	*
	* 2=measures.beats
	*
	* 3=seconds
	*
	* 4=samples
	*
	* 5=h:m:s:f
	*
	* offset is start of where the length will be calculated from */
      function format_timestr_len(tpos: number, buf: string, offset: number, modeoverride: number): string

      
      /** time formatting mode overrides: -1=proj default.
	*
	*     0=time
	*
	*     1=measures.beats + time
	*
	*     2=measures.beats
	*
	*     3=seconds
	*
	*     4=samples
	*
	*     5=h:m:s:f */
      function format_timestr_pos(tpos: number, buf: string, modeoverride: number): string

      
      /** Generates a GUID. */
      function genGuid(gGUID: string): string

      
      /** gets ini configuration variable value as string
	*
	* 
	*
	* see the [configuration-variable documentation](Reaper_Config_Variables.html) for more details */
      function get_config_var_string(name: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get reaper.ini full filename+path. */
      function get_ini_file(): string

      
      /** get the active take in this item */
      function GetActiveTake(item: MediaItem): MediaItem_Take

      
      /** returns the bitwise OR of all project play states, eg. and project is playing/pausing/recording (1=playing, 2=pause, 4=recording) */
      function GetAllProjectPlayStates(ignoreProject: ReaProject): number

      
      /** Returns the current version of Reaper, e.g "5.62/x64"(windows x64) or "6.16/macOS-arm64"(for arm macs) */
      function GetAppVersion(): string

      
      /** Get the end time of the audio that can be returned from this accessor. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function GetAudioAccessorEndTime(accessor: AudioAccessor): number

      
      /** Get a short hash string (128 chars or less) that will change only if the underlying samples change. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples).
	*
	* 
	*
	* Deprecated. See [AudioAccessorStateChanged](#AudioAccessorStateChanged) instead. */
      function GetAudioAccessorHash(accessor: AudioAccessor, hashNeed128: string): string

      
      /** Get a block of samples from the audio accessor. Samples are extracted immediately pre-FX, and returned interleaved (first sample of first channel, first sample of second channel...). Returns 0 if no audio, 1 if audio, -1 on error. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorStartTime](#GetAudioAccessorStartTime), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime).
	*
	* 
	*
	* This function has special handling in Python, and only returns two objects, the API function return value, and the sample buffer. Example usage:
	*
	*             
	*
	*             tr = RPR\_GetTrack(0, 0)
	*
	*             aa = RPR\_CreateTrackAudioAccessor(tr)
	*
	*             buf = list([0]\*2\*1024) \# 2 channels, 1024 samples each, initialized to zero
	*
	*             pos = 0.0
	*
	*             (ret, buf) = GetAudioAccessorSamples(aa, 44100, 2, pos, 1024, buf)
	*
	*             \# buf now holds the first 2\*1024 audio samples from the track.
	*
	*             \# typically GetAudioAccessorSamples() would be called within a loop, increasing pos each time. */
      function GetAudioAccessorSamples(accessor: AudioAccessor, samplerate: number, numchannels: number, starttime_sec: number, numsamplesperchannel: number, samplebuffer: array): number

      
      /** Get the start time of the audio that can be returned from this accessor. See [CreateTakeAudioAccessor](#CreateTakeAudioAccessor), [CreateTrackAudioAccessor](#CreateTrackAudioAccessor), [DestroyAudioAccessor](#DestroyAudioAccessor), [AudioAccessorStateChanged](#AudioAccessorStateChanged), [GetAudioAccessorEndTime](#GetAudioAccessorEndTime), [GetAudioAccessorSamples](#GetAudioAccessorSamples). */
      function GetAudioAccessorStartTime(accessor: AudioAccessor): number

      
      /** get information about the currently open audio device. 
	*
	* Attribute can be MODE, IDENT\_IN, IDENT\_OUT, BSIZE, SRATE, BPS. 
	*
	* 
	*
	* returns false if unknown attribute or device not open. */
      function GetAudioDeviceInfo(attribute: string, desc: string): MultiReturn<[retval: boolean, desc: string]>

      
      /** gets the dock ID desired by ident_str, if any */
      function GetConfigWantsDock(ident_str: string): number

      
      /** returns current project if in load/save (usually only used from project_config_extension_t) */
      function GetCurrentProjectInLoadSave(): ReaProject

      
      /** return the current cursor context. */
      function GetCursorContext(): number

      
      /** 0 if track panels, 1 if items, 2 if envelopes, otherwise unknown (unlikely when want_last_valid is true) */
      function GetCursorContext2(want_last_valid: boolean): number

      
      /** edit cursor position */
      function GetCursorPosition(): number

      
      /** Get the edit cursor position in a given project */
      function GetCursorPositionEx(proj: ReaProject): number

      
      /** see [GetDisplayedMediaItemColor2](#GetDisplayedMediaItemColor2). */
      function GetDisplayedMediaItemColor(item: MediaItem): number

      
      /** Returns the custom take, item, or track color that is used (according to the user preference) to color the media item. The returned color is OS dependent|0x01000000 (i.e. ColorToNative(r,g,b)|0x01000000), so a return of zero means "no color", not black. */
      function GetDisplayedMediaItemColor2(item: MediaItem, take: MediaItem_Take): number

      
      /** Gets an envelope numerical-value attribute:
	*
	*     I_TCPY : int *, Y offset of envelope relative to parent track (may be separate lane or overlap with track contents)
	*
	*     I_TCPH : int *, visible height of envelope
	*
	*     I_TCPY_USED : int *, Y offset of envelope relative to parent track, exclusive of padding
	*
	*     I_TCPH_USED : int *, visible height of envelope, exclusive of padding
	*
	*     P_TRACK : MediaTrack *, parent track pointer (if any)
	*
	*     P_ITEM : MediaItem *, parent item pointer (if any)
	*
	*     P_TAKE : MediaItem_Take *, parent take pointer (if any) */
      function GetEnvelopeInfo_Value(tr: TrackEnvelope, parmname: string): number

      
      /**  */
      function GetEnvelopeName(env: TrackEnvelope, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get the attributes of an envelope point. See [GetEnvelopePointEx](#GetEnvelopePointEx) */
      function GetEnvelopePoint(envelope: TrackEnvelope, ptidx: number): MultiReturn<[retval: boolean, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional']>

      
      /** Returns the envelope point at or immediately prior to the given time position. 
	*
	* 
	*
	* See [GetEnvelopePointByTimeEx](#GetEnvelopePointByTimeEx) */
      function GetEnvelopePointByTime(envelope: TrackEnvelope, time: number): number

      
      /** Returns the envelope point at or immediately prior to the given time position.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* 
	*
	* See [GetEnvelopePointEx](#GetEnvelopePointEx), [SetEnvelopePointEx](#SetEnvelopePointEx), [InsertEnvelopePointEx](#InsertEnvelopePointEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function GetEnvelopePointByTimeEx(envelope: TrackEnvelope, autoitem_idx: number, time: number): number

      
      /** Get the attributes of an envelope point.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* 
	*
	* See [CountEnvelopePointsEx](#CountEnvelopePointsEx), [SetEnvelopePointEx](#SetEnvelopePointEx), [InsertEnvelopePointEx](#InsertEnvelopePointEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function GetEnvelopePointEx(envelope: TrackEnvelope, autoitem_idx: number, ptidx: number): MultiReturn<[retval: boolean, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional']>

      
      /** Returns the envelope scaling mode: 0=no scaling, 1=fader scaling. All API functions deal with raw envelope point values, to convert raw from/to scaled values see [ScaleFromEnvelopeMode](#ScaleFromEnvelopeMode), [ScaleToEnvelopeMode](#ScaleToEnvelopeMode). */
      function GetEnvelopeScalingMode(env: TrackEnvelope): number

      
      /** Gets the RPPXML state of an envelope. */
      function GetEnvelopeStateChunk(env: TrackEnvelope, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /** returns path of REAPER.exe (not including EXE), i.e. C:\Program Files\REAPER */
      function GetExePath(): string

      
      /** Get the extended state value for a specific section and key. See [SetExtState](#SetExtState), [DeleteExtState](#DeleteExtState), [HasExtState](#HasExtState). */
      function GetExtState(section: string, key: string): string

      
      /** Get focused FX. 
	*
	* 
	*
	* !!Deprecated, use [GetFocusedFX2](#GetFocusedFX) instead
	*
	* 
	*
	* See [GetLastTouchedFX](#GetLastTouchedFX). */
      function GetFocusedFX(): MultiReturn<[retval: number, tracknumber: number, itemnumber: number, fxnumber: number]>

      
      /** Return value has 1 set if track FX, 2 if take/item FX, 4 set if FX is no longer focused but still open. 
	*
	* 
	*
	* tracknumber==0 means the master track, 1 means track 1, etc. itemnumber is zero-based (or -1 if not an item). 
	*
	* 
	*
	* For interpretation of fxnumber, see [GetLastTouchedFX](#GetLastTouchedFX). */
      function GetFocusedFX2(): MultiReturn<[retval: number, tracknumber: number, itemnumber: number, fxnumber: number]>

      
      /** returns free disk space in megabytes, pathIdx 0 for normal, 1 for alternate. */
      function GetFreeDiskSpaceForRecordPath(proj: ReaProject, pathidx: number): number

      
      /** Returns the FX parameter envelope. If the envelope does not exist and create=true, the envelope will be created. */
      function GetFXEnvelope(track: MediaTrack, fxindex: number, parameterindex: number, create: boolean): TrackEnvelope

      
      /** return -1=no override, 0=trim/read, 1=read, 2=touch, 3=write, 4=latch, 5=bypass */
      function GetGlobalAutomationOverride(): number

      
      /** returns pixels/second */
      function GetHZoomLevel(): number

      
      /** Returns the name of a input-channel. */
      function GetInputChannelName(channelIndex: number): string

      
      /** Gets the audio device input/output latency in samples */
      function GetInputOutputLatency(): MultiReturn<[inputlatency: number, outputLatency: number]>

      
      /** returns time of relevant edit, set which_item to the pcm_source (if applicable), flags (if specified) will be set to 1 for edge resizing, 2 for fade change, 4 for item move, 8 for item slip edit (edit cursor time or start of item) */
      function GetItemEditingTime2(): MultiReturn<[position: number, which_item: PCM_source, flags: number]>

      
      /** Returns the first item at the screen coordinates specified. If allow_locked is false, locked items are ignored. If takeOutOptional specified, returns the take hit(in Lua, this function simply returns the take as additional return-value).
	*
	* 
	*
	* Note: You can not get the item at screen-coordinates, where it is hidden by other windows. */
      function GetItemFromPoint(screen_x: number, screen_y: number, allow_locked: boolean, MediaItem_Take: any | 'optional'): MediaItem_Take

      
      /** Returns the project, in which a MediaItem is located. */
      function GetItemProjectContext(item: MediaItem): ReaProject

      
      /** Gets the RPPXML state of an item, returns true if successful. Undo flag is a performance/caching hint. */
      function GetItemStateChunk(item: MediaItem, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /** Get the last used color-theme-file. */
      function GetLastColorThemeFile(): string

      
      /** Get the last project marker before time, and/or the project region that includes time. 
	*
	* markeridx and regionidx are returned not necessarily as the displayed marker/region index, but as the index that can be passed to EnumProjectMarkers. Either or both of markeridx and regionidx may be NULL. See [EnumProjectMarkers](#EnumProjectMarkers). */
      function GetLastMarkerAndCurRegion(proj: ReaProject, time: number): MultiReturn<[markeridx: number, regionidx: number]>

      
      /** Returns the last touched track, it's last touched parameter and tracknumber.
	*
	* 
	*
	* The low word of tracknumber is the 1-based track index -- 0 means the master track, 1 means track 1, etc. 
	*
	* 
	*
	* See [GetFocusedFX2](#GetFocusedFX2). */
      function GetLastTouchedFX(): MultiReturn<[retval: boolean, tracknumber: number, fxnumber: number, paramnumber: number]>

      
      /** Gets the MediaTrack, that has been last touched. */
      function GetLastTouchedTrack(): MediaTrack

      
      /** Get the Reaper-window as an HWND-object */
      function GetMainHwnd(): HWND

      
      /** Deprecated: Get the mute/solo-state of the master-track. This is deprecated as you can just query the master track as well. */
      function GetMasterMuteSoloFlags(): number

      
      /** Get a MediaTrack-object of the MasterTrack. */
      function GetMasterTrack(proj: ReaProject): MediaTrack

      
      /** Get the visibility of the master-track in mixer and track-control-panel. See [SetMasterTrackVisibility](#SetMasterTrackVisibility). */
      function GetMasterTrackVisibility(): number

      
      /** returns max dev for midi inputs */
      function GetMaxMidiInputs(): number

      
      /** returns max dev for midi outputs */
      function GetMaxMidiOutputs(): number

      
      /** get an item from a project by item count (zero-based) */
      function GetMediaItem(proj: ReaProject, itemidx: number): MediaItem

      
      /** Get parent track of media item */
      function GetMediaItem_Track(item: MediaItem): MediaTrack

      
      /** gets the currently armed command and section name (returns 0 if nothing armed). section name is empty-string for main section. */
      function GetArmedCommand(): MultiReturn<[retval: number, sec: string]>

      
      /** arms a command (or disarms if 0 passed) in section sectionname (empty string for main) */
      function ArmCommand(cmd: number, sectionname: string): void

      
      /** Get media item numerical-value attributes. */
      function GetMediaItemInfo_Value(item: MediaItem, parmname: string): number

      
      /** Get the number of takes in a MediaItem-object. */
      function GetMediaItemNumTakes(item: MediaItem): number

      
      /** Get a take from a MediaItem as a MediaItem_Take-object. */
      function GetMediaItemTake(item: MediaItem, tk: number): MediaItem_Take

      
      /** Get parent item of media item take. */
      function GetMediaItemTake_Item(take: MediaItem_Take): MediaItem

      
      /** Gets block of peak samples to buf. Note that the peak samples are interleaved, but in two or three blocks (maximums, then minimums, then extra). Return value has 20 bits of returned sample count, then 4 bits of output_mode (0xf00000), then a bit to signify whether extra_type was available (0x1000000). extra_type can be 115 ('s') for spectral information, which will return peak samples as integers with the low 15 bits frequency, next 14 bits tonality. */
      function GetMediaItemTake_Peaks(take: MediaItem_Take, peakrate: number, starttime: number, numchannels: number, numsamplesperchannel: number, want_extra_type: number, buf: array): number

      
      /** Get media source of media item take */
      function GetMediaItemTake_Source(take: MediaItem_Take): PCM_source

      
      /** Get parent track of media item take */
      function GetMediaItemTake_Track(take: MediaItem_Take): MediaTrack

      
      /**  */
      function GetMediaItemTakeByGUID(project: ReaProject, guidGUID: string): MediaItem_Take

      
      /** Get media item take numerical-value attributes.
	*
	* D_STARTOFFS : double * : start offset in source media, in seconds
	*
	* D_VOL : double * : take volume, 0=-inf, 0.5=-6dB, 1=+0dB, 2=+6dB, etc, negative if take polarity is flipped
	*
	* D_PAN : double * : take pan, -1..1
	*
	* D_PANLAW : double * : take pan law, -1=default, 0.5=-6dB, 1.0=+0dB, etc
	*
	* D_PLAYRATE : double * : take playback rate, 0.5=half speed, 1=normal, 2=double speed, etc
	*
	* D_PITCH : double * : take pitch adjustment in semitones, -12=one octave down, 0=normal, +12=one octave up, etc
	*
	* B_PPITCH : bool * : preserve pitch when changing playback rate
	*
	* I_CHANMODE : int * : channel mode, 0=normal, 1=reverse stereo, 2=downmix, 3=left, 4=right
	*
	* I_PITCHMODE : int * : pitch shifter mode, -1=projext default, otherwise high 2 bytes=shifter, low 2 bytes=parameter
	*
	* I_CUSTOMCOLOR : int * : custom color, OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). If you do not |0x100000, then it will not be used, but will store the color.
	*
	* IP_TAKENUMBER : int : take number (read-only, returns the take number directly)
	*
	* P_TRACK : pointer to MediaTrack (read-only)
	*
	* P_ITEM : pointer to MediaItem (read-only)
	*
	* P_SOURCE : PCM_source *. Note that if setting this, you should first retrieve the old source, set the new, THEN delete the old. */
      function GetMediaItemTakeInfo_Value(take: MediaItem_Take, parmname: string): number

      
      /** Get the associated MediaTrack of a MediaItem. */
      function GetMediaItemTrack(item: MediaItem): MediaTrack

      
      /** Copies the media source filename to typebuf. Note that in-project MIDI media sources have no associated filename. See [GetMediaSourceParent](#GetMediaSourceParent). */
      function GetMediaSourceFileName(source: PCM_source, filenamebuf: string): string

      
      /** Returns the length of the source media. If the media source is beat-based, the length will be in quarter notes, otherwise it will be in seconds. */
      function GetMediaSourceLength(source: PCM_source): MultiReturn<[retval: number, lengthIsQN: boolean]>

      
      /** Returns the number of channels in the source media. */
      function GetMediaSourceNumChannels(source: PCM_source): number

      
      /** Returns the parent source, or NULL if src is the root source. This can be used to retrieve the parent properties of sections or reversed sources for example. */
      function GetMediaSourceParent(src: PCM_source): PCM_source

      
      /** Returns the sample rate. MIDI source media will return zero. */
      function GetMediaSourceSampleRate(source: PCM_source): number

      
      /** copies the media source type ("WAV", "MIDI", etc) to typebuf */
      function GetMediaSourceType(source: PCM_source, typebuf: string): string

      
      /** Get track numerical-value attributes.
	*
	* B_MUTE : bool * : muted
	*
	* B_PHASE : bool * : track phase inverted
	*
	* IP_TRACKNUMBER : int : track number 1-based, 0=not found, -1=master track (read-only, returns the int directly)
	*
	* I_SOLO : int * : soloed, 0=not soloed, 1=soloed, 2=soloed in place, 5=safe soloed, 6=safe soloed in place
	*
	* I_FXEN : int * : fx enabled, 0=bypassed, !0=fx active
	*
	* I_RECARM : int * : record armed, 0=not record armed, 1=record armed
	*
	* I_RECINPUT : int * : record input, &lt;0=no input. if 4096 set, input is MIDI and low 5 bits represent channel (0=all, 1-16=only chan), next 6 bits represent physical input (63=all, 62=VKB). If 4096 is not set, low 10 bits (0..1023) are input start channel (ReaRoute/Loopback start at 512). If 2048 is set, input is multichannel input (using track channel count), or if 1024 is set, input is stereo input, otherwise input is mono.
	*
	* I_RECMODE : int * : record mode, 0=input, 1=stereo out, 2=none, 3=stereo out w/latency compensation, 4=midi output, 5=mono out, 6=mono out w/ latency compensation, 7=midi overdub, 8=midi replace
	*
	* I_RECMON : int * : record monitoring, 0=off, 1=normal, 2=not when playing (tape style)
	*
	* I_RECMONITEMS : int * : monitor items while recording, 0=off, 1=on
	*
	* I_AUTOMODE : int * : track automation mode, 0=trim/off, 1=read, 2=touch, 3=write, 4=latch
	*
	* I_NCHAN : int * : number of track channels, 2-64, even numbers only
	*
	* I_SELECTED : int * : track selected, 0=unselected, 1=selected
	*
	* I_WNDH : int * : current TCP window height in pixels including envelopes (read-only)
	*
	* I_TCPH : int * : current TCP window height in pixels not including envelopes (read-only)
	*
	* I_TCPY : int * : current TCP window Y-position in pixels relative to top of arrange view (read-only)
	*
	* I_MCPX : int * : current MCP X-position in pixels relative to mixer container
	*
	* I_MCPY : int * : current MCP Y-position in pixels relative to mixer container
	*
	* I_MCPW : int * : current MCP width in pixels
	*
	* I_MCPH : int * : current MCP height in pixels
	*
	* I_FOLDERDEPTH : int * : folder depth change, 0=normal, 1=track is a folder parent, -1=track is the last in the innermost folder, -2=track is the last in the innermost and next-innermost folders, etc
	*
	* I_FOLDERCOMPACT : int * : folder compacted state (only valid on folders), 0=normal, 1=small, 2=tiny children
	*
	* I_MIDIHWOUT : int * : track midi hardware output index, &lt;0=disabled, low 5 bits are which channels (0=all, 1-16), next 5 bits are output device index (0-31)
	*
	* I_PERFFLAGS : int * : track performance flags, &1=no media buffering, &2=no anticipative FX
	*
	* I_CUSTOMCOLOR : int * : custom color, OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). If you do not |0x100000, then it will not be used, but will store the color.
	*
	* I_HEIGHTOVERRIDE : int * : custom height override for TCP window, 0 for none, otherwise size in pixels
	*
	* B_HEIGHTLOCK : bool * : track height lock (must set I_HEIGHTOVERRIDE before locking)
	*
	* D_VOL : double * : trim volume of track, 0=-inf, 0.5=-6dB, 1=+0dB, 2=+6dB, etc
	*
	* D_PAN : double * : trim pan of track, -1..1
	*
	* D_WIDTH : double * : width of track, -1..1
	*
	* D_DUALPANL : double * : dualpan position 1, -1..1, only if I_PANMODE==6
	*
	* D_DUALPANR : double * : dualpan position 2, -1..1, only if I_PANMODE==6
	*
	* I_PANMODE : int * : pan mode, 0=classic 3.x, 3=new balance, 5=stereo pan, 6=dual pan
	*
	* D_PANLAW : double * : pan law of track, &lt;0=project default, 1=+0dB, etc
	*
	* P_ENV:&lt;envchunkname : TrackEnvelope*, read only. Call with :&lt;VOLENV, :&lt;PANENV, etc appended.
	*
	* B_SHOWINMIXER : bool * : track control panel visible in mixer (do not use on master track)
	*
	* B_SHOWINTCP : bool * : track control panel visible in arrange view (do not use on master track)
	*
	* B_MAINSEND : bool * : track sends audio to parent
	*
	* C_MAINSEND_OFFS : char * : channel offset of track send to parent
	*
	* B_FREEMODE : bool * : track free item positioning enabled (call UpdateTimeline() after changing)
	*
	* C_BEATATTACHMODE : char * : track timebase, -1=project default, 0=time, 1=beats (position, length, rate), 2=beats (position only)
	*
	* F_MCP_FXSEND_SCALE : float * : scale of fx+send area in MCP (0=minimum allowed, 1=maximum allowed)
	*
	* F_MCP_FXPARM_SCALE : float * : scale of fx parameter area in MCP (0=minimum allowed, 1=maximum allowed)
	*
	* F_MCP_SENDRGN_SCALE : float * : scale of send area as proportion of the fx+send total area (0=minimum allowed, 1=maximum allowed)
	*
	* F_TCP_FXPARM_SCALE : float * : scale of TCP parameter area when TCP FX are embedded (0=min allowed, default, 1=max allowed)
	*
	* I_PLAY_OFFSET_FLAG : int * : track playback offset state, &1=bypassed, &2=offset value is measured in samples (otherwise measured in seconds)
	*
	* D_PLAY_OFFSET : double * : track playback offset, units depend on I_PLAY_OFFSET_FLAG
	*
	* P_PARTRACK : MediaTrack * : parent track (read-only)
	*
	* P_PROJECT : ReaProject * : parent project (read-only) */
      function GetMediaTrackInfo_Value(tr: MediaTrack, parmname: string): number

      
      /** returns true if device present */
      function GetMIDIInputName(dev: number, nameout: string): MultiReturn<[retval: boolean, nameout: string]>

      
      /** returns true if device present */
      function GetMIDIOutputName(dev: number, nameout: string): MultiReturn<[retval: boolean, nameout: string]>

      
      /** Get the leftmost track visible in the mixer */
      function GetMixerScroll(): MediaTrack

      
      /** Get the current mouse modifier assignment for a specific modifier key assignment, in a specific context.
	*
	* action will be filled in with the command ID number for a built-in mouse modifier
	*
	* or built-in REAPER command ID, or the custom action ID string.
	*
	* See [SetMouseModifier](#SetMouseModifier) for more information. */
      function GetMouseModifier(context: string, modifier_flag: number, action: string): string

      
      /** get mouse position in screen coordinates */
      function GetMousePosition(): MultiReturn<[x: number, y: number]>

      
      /** Return number of normal audio hardware inputs available */
      function GetNumAudioInputs(): number

      
      /** Return number of normal audio hardware outputs available */
      function GetNumAudioOutputs(): number

      
      /** returns max number of real midi hardware inputs */
      function GetNumMIDIInputs(): number

      
      /** returns max number of real midi hardware outputs */
      function GetNumMIDIOutputs(): number

      
      /** Returns number of take markers.
	*
	* See [DeleteTakeMarker](#DeleteTakeMarker)), [GetTakeMarker](#GetTakeMarker) and [SetTakeMarker](#SetTakeMarker). */
      function GetNumTakeMarkers(take: MediaItem_Take): number

      
      /** Get the number of tracks. Excluding the master-track. */
      function GetNumTracks(): number

      
      /** Returns the current operating-system. Good for determining, e.g. the correct filesystem-separators. */
      function GetOS(): string

      
      /** Get the name of a specific output-channel. */
      function GetOutputChannelName(channelIndex: number): string

      
      /** returns output latency in seconds */
      function GetOutputLatency(): number

      
      /** Get the parent MediaTrack, if a MediaTrack is a track of a foldered track. */
      function GetParentTrack(track: MediaTrack): MediaTrack

      
      /** get the peak file name for a given file (can be either filename.reapeaks,or a hashed filename in another path) */
      function GetPeakFileName(fn: string, buf: string): string

      
      /** get the peak file name for a given file (can be either filename.reapeaks,or a hashed filename in another path) */
      function GetPeakFileNameEx(fn: string, buf: string, forWrite: boolean): string

      
      /** Like GetPeakFileNameEx, but you can specify peaksfileextension such as ".reapeaks" */
      function GetPeakFileNameEx2(fn: string, buf: string, forWrite: boolean, peaksfileextension: string): string

      
      /** returns latency-compensated actual-what-you-hear position */
      function GetPlayPosition(): number

      
      /** returns position of next audio block being processed */
      function GetPlayPosition2(): number

      
      /** returns position of next audio block being processed from a specific project */
      function GetPlayPosition2Ex(proj: ReaProject): number

      
      /** returns latency-compensated actual-what-you-hear position from a specific project */
      function GetPlayPositionEx(proj: ReaProject): number

      
      /** returns, in which play-state the current project is */
      function GetPlayState(): number

      
      /** returns, in which play-state a certain project is */
      function GetPlayStateEx(proj: ReaProject): number

      
      /** returns length of project (maximum of end of media item, markers, end of regions, tempo map) */
      function GetProjectLength(proj: ReaProject): number

      
      /** Get the name of the projectfile. */
      function GetProjectName(proj: ReaProject, buf: string): string

      
      /** Get the path of the project. Will return the defaults project-path's recording-folder, when the project hasn't been saved yet; when the project has been saved, it will return the path to the recording-folder.
	*
	* 
	*
	* If you need the filename of the path+projectfile itself, use [EnumProjects](#EnumProjects) instead.             */
      function GetProjectPath(buf: string): string

      
      /** Get the path of a specific project, usually the recordings-folder. */
      function GetProjectPathEx(proj: ReaProject, buf: string): string

      
      /** returns an integer that changes when the project state changes, e.g. undoable-actions have been made. */
      function GetProjectStateChangeCount(proj: ReaProject): number

      
      /** Gets project time offset in seconds (project settings -> project start time).  */
      function GetProjectTimeOffset(proj: ReaProject, rndframe: boolean): number

      
      /** deprecated */
      function GetProjectTimeSignature(): MultiReturn<[bpm: number, bpi: number]>

      
      /** Gets basic time signature (beats per minute, numerator of time signature in bpi)
	*
	* this does not reflect tempo envelopes but is purely what is set in the project settings. */
      function GetProjectTimeSignature2(proj: ReaProject): MultiReturn<[bpm: number, bpi: number]>

      
      /** Get the value previously associated with this extname and key, the last time the project was saved or the value was changed. See [SetProjExtState](#SetProjExtState), [EnumProjExtState](#EnumProjExtState). */
      function GetProjExtState(proj: ReaProject, extname: string, key: string): MultiReturn<[retval: number, val: string]>

      
      /** returns path where ini files are stored, other things are in subdirectories. */
      function GetResourcePath(): string

      
      /** get the currently selected envelope, returns NULL/nil if no envelope is selected */
      function GetSelectedEnvelope(proj: ReaProject): TrackEnvelope

      
      /** get a selected item by selected item count (zero-based)
	*
	* See [CountSelectedMediaItems](#CountSelectedMediaItems). */
      function GetSelectedMediaItem(proj: ReaProject, selitem: number): MediaItem

      
      /** Get a selected track from a project by selected track count (zero-based). 
	*
	* This function ignores the master track, see [GetSelectedTrack2](#GetSelectedTrack2) and [CountSelectedTracks](#CountSelectedTracks). */
      function GetSelectedTrack(proj: ReaProject, seltrackidx: number): MediaTrack

      
      /** Get a selected track from a project (proj=0 for active project) by selected track count (zero-based). */
      function GetSelectedTrack2(proj: ReaProject, seltrackidx: number, wantmaster: boolean): MediaTrack

      
      /** get the currently selected track envelope, returns NULL/nil if no envelope is selected */
      function GetSelectedTrackEnvelope(proj: ReaProject): TrackEnvelope

      
      /** Gets or sets the arrange view start/end time for screen coordinates. use screen_x_start=screen_x_end=0 to use the full arrange view's start/end time
	*
	* 
	*
	* If you want to get the arrangeviewposition by pixels, set isSet=false and pass the pixel-position of the start and endposition to screen_x_start and screen_x_end.
	*
	* 
	*
	* screen_x_start and screen_x_end will be ignored, when isSet=true */
      function GetSet_ArrangeView2(proj: ReaProject, isSet: boolean, screen_x_start: number, screen_x_end: number, start_time: number, end_time: number): MultiReturn<[start_time: number, end_time: number]>

      
      /**  */
      function GetSet_LoopTimeRange(isSet: boolean, isLoop: boolean, start: number, end: number, allowautoseek: boolean): MultiReturn<[start: number, end: number]>

      
      /**  */
      function GetSet_LoopTimeRange2(proj: ReaProject, isSet: boolean, isLoop: boolean, start: number, end: number, allowautoseek: boolean): MultiReturn<[start: number, end: number]>

      
      /** Get or set automation item information. autoitem_idx=0 for the first automation item on an envelope, 1 for the second item, etc. desc can be any of the following:
	*
	* D_POOL_ID : double * : automation item pool ID (as an integer); edits are propagated to all other automation items that share a pool ID
	*
	* D_POSITION : double * : automation item timeline position in seconds
	*
	* D_LENGTH : double * : automation item length in seconds
	*
	* D_STARTOFFS : double * : automation item start offset in seconds
	*
	* D_PLAYRATE : double * : automation item playback rate
	*
	* D_BASELINE : double * : automation item baseline value in the range [0,1]
	*
	* D_AMPLITUDE : double * : automation item amplitude in the range [-1,1]
	*
	* D_LOOPSRC : double * : nonzero if the automation item contents are looped
	*
	* D_UISEL : double * : nonzero if the automation item is selected in the arrange view
	*
	* D_POOL_QNLEN : double * : automation item pooled source length in quarter notes (setting will affect all pooled instances) */
      function GetSetAutomationItemInfo(env: TrackEnvelope, autoitem_idx: number, desc: string, value: number, is_set: boolean): number

      
      /** Get or set automation item information. autoitem_idx=0 for the first automation item on an envelope, 1 for the second item, etc. returns true on success. desc can be any of the following:
	*
	* 
	*
	* P_POOL_NAME : char *, name of the underlying automation item pool
	*
	* P_POOL_EXT:xyz : char *, extension-specific persistent data */
      function GetSetAutomationItemInfo_String(env: TrackEnvelope, autoitem_idx: number, desc: string, valuestrNeedBig: string, is_set: boolean): MultiReturn<[retval: boolean, valuestrNeedBig: string]>

      
      /** Gets/sets an attribute string:
	*
	* P_EXT:xyz : char * : extension-specific persistent data */
      function GetSetEnvelopeInfo_String(env: TrackEnvelope, parmname: string, stringNeedBig: string, setNewValue: boolean): MultiReturn<[retval: boolean, stringNeedBig: string]>

      
      /** deprecated -- see [SetEnvelopeStateChunk](#SetEnvelopeStateChunk), [GetEnvelopeStateChunk](#GetEnvelopeStateChunk) */
      function GetSetEnvelopeState(env: TrackEnvelope, str: string): MultiReturn<[retval: boolean, str: string]>

      
      /** deprecated -- see [SetEnvelopeStateChunk](#SetEnvelopeStateChunk), [GetEnvelopeStateChunk](#GetEnvelopeStateChunk) */
      function GetSetEnvelopeState2(env: TrackEnvelope, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /** deprecated -- see [SetItemStateChunk](#SetItemStateChunk), [GetItemStateChunk](#GetItemStateChunk) */
      function GetSetItemState(item: MediaItem, str: string): MultiReturn<[retval: boolean, str: string]>

      
      /** deprecated -- see [SetItemStateChunk](#SetItemStateChunk), [GetItemStateChunk](#GetItemStateChunk) */
      function GetSetItemState2(item: MediaItem, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /** Gets/sets an item attribute string:
	*
	*     P_NOTES : char * : item note text (do not write to returned pointer, use setNewValue to update)
	*
	*     P_EXT:xyz : char * : extension-specific persistent data
	*
	*     GUID : GUID * : 16-byte GUID, can query or update. If using a _String() function, GUID is a string {xyz-...}. */
      function GetSetMediaItemInfo_String(item: MediaItem, parmname: string, stringNeedBig: string, setNewValue: boolean): MultiReturn<[retval: boolean, stringNeedBig: string]>

      
      /** Gets/sets a take attribute string:
	*
	*     P_NAME : char * : take name
	*
	*     P_EXT:xyz : char * : extension-specific persistent data
	*
	*     GUID : GUID * : 16-byte GUID, can query or update. If using a _String() function, GUID is a string {xyz-...}. */
      function GetSetMediaItemTakeInfo_String(tk: MediaItem_Take, parmname: string, stringNeedBig: string, setnewvalue: boolean): MultiReturn<[retval: boolean, stringNeedBig: string]>

      
      /** Get or set track string attributes.
	*
	* P_NAME : char * : track name (on master returns NULL)
	*
	* P_ICON : const char * : track icon (full filename, or relative to resource_path/data/track_icons)
	*
	* P_MCP_LAYOUT : const char * : layout name
	*
	* P_TCP_LAYOUT : const char * : layout name
	*
	* P_EXT:xyz : char * : extension-specific persistent data
	*
	* GUID : GUID * : 16-byte GUID, can query or update. If using a _String() function, GUID is a string {xyz-...}. */
      function GetSetMediaTrackInfo_String(tr: MediaTrack, parmname: string, stringNeedBig: string, setnewvalue: boolean): MultiReturn<[retval: boolean, stringNeedBig: string]>

      
      /** gets or sets project author, author_sz is ignored when setting */
      function GetSetProjectAuthor(proj: ReaProject, set: boolean, author: string): string

      
      /** Get or set the arrange view grid division. 0.25=quarter note, 1.0/3.0=half note triplet, etc. swingmode can be 1 for swing enabled, swingamt is -1..1. swingmode can be 3 for measure-grid. Returns grid configuration flags */
      function GetSetProjectGrid(project: ReaProject, set: boolean): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional', number: any | 'optional']>

      
      /** Get or set project information.
	*
	*  
	*
	* RENDER_SETTINGS : &amp;(1|2)=0:master mix, &amp;1=stems+master mix, &amp;2=stems only, &amp;4=multichannel tracks to multichannel files, &amp;8=use render matrix, &amp;16=tracks with only mono media to mono files, &amp;32=selected media items, &amp;64=selected media items via master, &amp; 128=Selected tracks via master, &amp;256=Stretch markers/transient guide-checkbox(Only with WAV/AIFF and Source=Selected media items/Selected media items via master), &amp;512=Embed Metadata, if format supports is, &amp;1024=Take markers-checkbox(Only with WAV and Source=Selected media items/Selected media items via master)
	*
	* OGG, OPUS and FLAC support embedding of tempoinformation via metadata, settable using [GetSetProjectInfo\_String](#GetSetProjectInfo_String).
	*
	* RENDER_BOUNDSFLAG : 0=custom time bounds, 1=entire project, 2=time selection, 3=all project regions, 4=selected media items, 5=selected project regions
	*
	* RENDER_CHANNELS : number of channels in rendered file
	*
	* RENDER_SRATE : sample rate of rendered file (or 0 for project sample rate)
	*
	* RENDER_STARTPOS : render start time when RENDER_BOUNDSFLAG=0
	*
	* RENDER_ENDPOS : render end time when RENDER_BOUNDSFLAG=0
	*
	* RENDER_TAILFLAG : apply render tail setting when rendering: &amp;1=custom time bounds, &amp;2=entire project, &amp;4=time selection, &amp;8=all project regions, &amp;16=selected media items, &amp;32=selected project regions
	*
	* RENDER_TAILMS : tail length in ms to render (only used if RENDER_BOUNDSFLAG and RENDER_TAILFLAG are set)
	*
	* RENDER_ADDTOPROJ : &amp;1=add rendered files to project, &amp;2=Do not render files that are likely silent
	*
	* RENDER_DITHER : &amp;1=dither, &amp;2=noise shaping, &amp;4=dither stems, &amp;8=noise shaping on stems
	*
	* PROJECT_SRATE : samplerate (ignored unless PROJECT_SRATE_USE set)
	*
	* PROJECT_SRATE_USE : set to 1 if project samplerate is used */
      function GetSetProjectInfo(project: ReaProject, desc: string, value: number, is_set: boolean): number

      
      /** Get or set project information.
	*
	* 
	*
	* MARKER\_GUID:X : get the GUID (unique ID) of the marker or region with index X, where X is the index passed to EnumProjectMarkers, not necessarily the displayed number
	*
	* RECORD\_PATH: recording directory -- may be blank or a relative path, to get the effective path see [GetProjectPathEx](#GetProjectPathEx)
	*
	* RENDER\_FILE: render directory
	*
	* RENDER\_PATTERN: render file name (may contain wildcards)
	*
	* 			RENDER\_TARGETS: semicolon separated list of files that would be written if the project is rendered using the most recent render settings
	*
	* RENDER\_FORMAT: base64-encoded sink configuration (see project files, etc). Callers can also pass a simple 4-byte string (non-base64-encoded), to use default settings for that sink type.
	*
	* RENDER\_FORMAT2: base64-encoded secondary sink configuration. Callers can also pass a simple 4-byte string (non-base64-encoded), e.g. "evaw" or "l3pm", to use default settings for that sink type, or "" to disable secondary render.
	*
	* see [render-code-documentation](render-codes-decoded-base64-strings.txt) for how the unencoded RENDER\_FORMAT-string is structured.
	*
	* 
	*
	* To just use the 4-byte-string, you can use: 
	*
	* "evaw" for wave, "ffia" for aiff, " osi" for audio-cd, " pdd" for ddp, "calf" for flac, "l3pm" for mp3, "vggo" for ogg, "SggO" for Opus, "PMFF" for FFMpeg-video, "FVAX" for MP4Video/Audio on Mac, " FIG" for Gif, " FCL" for LCF, "kpvw" for wavepack            
	*
	* 
	*
	* RENDER\_METADATA: get or set the metadata saved with the project (not metadata embedded in project media). Example, ID3 album name metadata: Uses common ID3-tagcodes like TALB(album), TPE1(Artist), etc. 
	*
	* 			To get album tag, use "ID3:TALB", to set album tag, use "ID3:TALB|my album name".
	*
	* 
	*
	* Examples in Lua:
	*
	* getting the album name from the metadata of the current project:
	*
	* 
	*
	*      retval, albumname    = reaper.GetSetProjectInfo\_String(0, "RENDER\_METADATA", "ID3:TALB", false)
	*
	*     
	*
	* setting the album name in the metadata of the current project:
	*
	* 
	*
	*      retval, albumame\_new = reaper.GetSetProjectInfo\_String(0, "RENDER\_METADATA", "ID3:TALB|New album name", true)
	*
	* 
	*
	* 			Supported tags-codes are: TIT2(Title), TPE1(Artist), TPE2(Albumartist), TALB(Album), TRCK(Track), TCON(Genre), TYER(Year), TDRC(Recording time: YYYY-MM-DD), TKEY(Key), TBPM(Tempo), TSRC(International Standard Recording Code), COMM(Comment), COMM\_LANG(Comment language), APIC\_TYPE(Image type), APIC\_DESC(Image description), APIC\_FILE(Image file)
	*
	* 			APIC\_TYPE can have be of the following:
	*
	* 0: Other
	*
	* 1: 32x32 pixel file icon (PNG only)
	*
	* 2: Other file icon
	*
	* 3: Cover (front)
	*
	* 4: Cover (back)
	*
	* 5: Leaflet page
	*
	* 6: Media
	*
	* 7: Lead artist/Lead Performer/Solo
	*
	* 8: Artist/Performer
	*
	* 9: Conductor
	*
	* 10: Band/Orchestra
	*
	* 11: Composer
	*
	* 12: Lyricist/Text writer
	*
	* 13: Recording location
	*
	* 14: During recording
	*
	* 15: During performance
	*
	* 16: Movie/video screen capture
	*
	* 17: A bright colored fish
	*
	* 18: Illustration
	*
	* 19: Band/Artist logotype
	*
	* 20: Publisher/Studiotype */
      function GetSetProjectInfo_String(project: ReaProject, desc: string, valuestrNeedBig: string, is_set: boolean): MultiReturn<[retval: boolean, valuestrNeedBig: string]>

      
      /** gets or sets project notes, notesNeedBig_sz is ignored when setting */
      function GetSetProjectNotes(proj: ReaProject, set: boolean, notes: string): string

      
      /** Sets or gets repeat-state of the current project. */
      function GetSetRepeat(val: number): number

      
      /** Sets or gets repeat-state in a specific project. */
      function GetSetRepeatEx(proj: ReaProject, val: number): number

      
      /** Gets or modifies the group membership for a track. Returns group state prior to call (each bit represents one of the 32 group numbers). if setmask has bits set, those bits in setvalue will be applied to group. Group can be one of:
	*
	* VOLUME_LEAD
	*
	* VOLUME_FOLLOW
	*
	* VOLUME_VCA_LEAD
	*
	* VOLUME_VCA_FOLLOW
	*
	* PAN_LEAD
	*
	* PAN_FOLLOW
	*
	* WIDTH_LEAD
	*
	* WIDTH_FOLLOW
	*
	* MUTE_LEAD
	*
	* MUTE_FOLLOW
	*
	* SOLO_LEAD
	*
	* SOLO_FOLLOW
	*
	* RECARM_LEAD
	*
	* RECARM_FOLLOW
	*
	* POLARITY_LEAD
	*
	* POLARITY_FOLLOW
	*
	* AUTOMODE_LEAD
	*
	* AUTOMODE_FOLLOW
	*
	* VOLUME_REVERSE
	*
	* PAN_REVERSE
	*
	* WIDTH_REVERSE
	*
	* NO_LEAD_WHEN_FOLLOW
	*
	* VOLUME_VCA_FOLLOW_ISPREFX
	*
	* 
	*
	* Note: REAPER v6.11 and earlier used _MASTER and _SLAVE rather than _LEAD and _FOLLOW, which is deprecated but still supported (scripts that must support v6.11 and earlier can use the deprecated strings). */
      function GetSetTrackGroupMembership(tr: MediaTrack, groupname: string, setmask: number, setvalue: number): number

      
      /** deprecated -- see [SetTrackStateChunk](#SetTrackStateChunk), [GetTrackStateChunk](#GetTrackStateChunk) */
      function GetSetTrackState(track: MediaTrack, str: string): MultiReturn<[retval: boolean, str: string]>

      
      /** deprecated -- see [SetTrackStateChunk](#SetTrackStateChunk), [GetTrackStateChunk](#GetTrackStateChunk) */
      function GetSetTrackState2(track: MediaTrack, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /**  */
      function GetSubProjectFromSource(src: PCM_source): ReaProject

      
      /** get a take from an item by take count (zero-based) */
      function GetTake(item: MediaItem, takeidx: number): MediaItem_Take

      
      /**  */
      function GetTakeEnvelope(take: MediaItem_Take, envidx: number): TrackEnvelope

      
      /**  */
      function GetTakeEnvelopeByName(take: MediaItem_Take, envname: string): TrackEnvelope

      
      /** Get information about a take marker. Returns the position in media item source time, or -1 if the take marker does not exist.
	*
	* 			
	*
	* See [GetNumTakeMarkers](#GetNumTakeMarkers)), [DeleteTakeMarker](#DeleteTakeMarker) and [SetTakeMarker](#SetTakeMarker). */
      function GetTakeMarker(take: MediaItem_Take, idx: number): MultiReturn<[position: number, name: string, number: any | 'optional']>

      
      /** Retruns the filename of the mediafile in a take. returns NULL if the take is not valid */
      function GetTakeName(take: MediaItem_Take): string

      
      /** Returns number of stretch markers in take */
      function GetTakeNumStretchMarkers(take: MediaItem_Take): number

      
      /** Gets information on a stretch marker, idx is 0..n. Returns false if stretch marker not valid. 
	*
	* posOut will be set to position in item, srcposOutOptional will be set to source media position. 
	*
	* Returns index. if input index is -1, next marker is found using position (or source position if position is -1). 
	*
	* If position/source position are used to find marker position, their values are not updated. */
      function GetTakeStretchMarker(take: MediaItem_Take, idx: number): MultiReturn<[retval: number, pos: number, number: any | 'optional']>

      
      /** See [SetTakeStretchMarkerSlope](#SetTakeStretchMarkerSlope) */
      function GetTakeStretchMarkerSlope(take: MediaItem_Take, idx: number): number

      
      /** Get information about a specific FX parameter knob (see [CountTCPFXParms](#CountTCPFXParms)). */
      function GetTCPFXParm(project: ReaProject, track: MediaTrack, index: number): MultiReturn<[retval: boolean, fxindex: number, parmidx: number]>

      
      /** finds the playrate and target length to insert this item stretched to a round power-of-2 number of bars, between 1/8 and 256 */
      function GetTempoMatchPlayRate(source: PCM_source, srcscale: number, position: number, mult: number): MultiReturn<[retval: boolean, rate: number, targetlen: number]>

      
      /** Get information about a tempo/time signature marker. See [CountTempoTimeSigMarkers](#CountTempoTimeSigMarkers), [SetTempoTimeSigMarker](#SetTempoTimeSigMarker), [AddTempoTimeSigMarker](#AddTempoTimeSigMarker), [DeleteTempoTimeSigMarker](#DeleteTempoTimeSigMarker). */
      function GetTempoTimeSigMarker(proj: ReaProject, ptidx: number): MultiReturn<[retval: boolean, timepos: number, measurepos: number, beatpos: number, bpm: number, timesig_num: number, timesig_denom: number, lineartempo: boolean]>

      
      /** Returns the theme color specified, or -1 on failure. If the low bit of flags is set, the color as originally specified by the theme (before any transformations) is returned, otherwise the current (possibly transformed and modified) color is returned. See [SetThemeColor](#SetThemeColor) for a list of valid ini_key. */
      function GetThemeColor(ini_key: string, flags: number): number

      
      /** Return toggle-state of an action. See [GetToggleCommandStateEx](#GetToggleCommandStateEx).
	*
	* See [NamedCommandLookup](#NamedCommandLookup)() for the correct command_id. */
      function GetToggleCommandState(command_id: number): number

      
      /** Return toggle-state of an action.
	*
	* For the main action context, the MIDI editor, or the media explorer, returns the toggle state of the action. For the MIDI editor, the action state for the most recently focused window will be returned.
	*
	* See [NamedCommandLookup](#NamedCommandLookup)() for the correct command_id. */
      function GetToggleCommandStateEx(section_id: number, command_id: number): number

      
      /** gets a tooltip window,in case you want to ask it for font information. Can return NULL. */
      function GetTooltipWindow(): HWND

      
      /** get a track from a project by track count (zero-based) (proj=0 for active project) */
      function GetTrack(proj: ReaProject, trackidx: number): MediaTrack

      
      /** return the track mode, regardless of global override */
      function GetTrackAutomationMode(tr: MediaTrack): number

      
      /** Returns the track custom color as OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). Black is returned as 0x01000000, no color setting is returned as 0. */
      function GetTrackColor(track: MediaTrack): number

      
      /** Get the depth of a track within a folder structure */
      function GetTrackDepth(track: MediaTrack): number

      
      /**  */
      function GetTrackEnvelope(track: MediaTrack, envidx: number): TrackEnvelope

      
      /** Gets a built-in track envelope by configuration chunk name, e.g. "&lt;VOLENV". */
      function GetTrackEnvelopeByChunkName(tr: MediaTrack, cfgchunkname: string): TrackEnvelope

      
      /**  */
      function GetTrackEnvelopeByName(track: MediaTrack, envname: string): TrackEnvelope

      
      /** Returns the track from the screen coordinates specified. If the screen coordinates refer to a window associated to the track (such as FX), the track will be returned. infoOutOptional will be set to 1 if it is likely an envelope, 2 if it is likely a track FX.
	*
	* 
	*
	* Note: You can not get the track at screen-coordinates, where it is hidden by other windows. */
      function GetTrackFromPoint(screen_x: number, screen_y: number): MultiReturn<[retval: MediaTrack, number: any | 'optional']>

      
      /**  */
      function GetTrackGUID(tr: MediaTrack): string

      
      /**  */
      function GetTrackMediaItem(tr: MediaTrack, itemidx: number): MediaItem

      
      /** Get all MIDI lyrics on the track. Lyrics will be returned as one string with tabs between each word. flag&amp;1: double tabs at the end of each measure and triple tabs when skipping measures, flag&amp;2: each lyric is preceded by its beat position in the project (example with flag=2: "1.1.2\tLyric for measure 1 beat 2\t.1.1\tLyric for measure 2 beat 1   "). See [SetTrackMIDILyrics](#SetTrackMIDILyrics) */
      function GetTrackMIDILyrics(track: MediaTrack, flag: number, bufWant: string): MultiReturn<[retval: boolean, bufWant: string]>

      
      /** see [GetTrackMIDINoteNameEx](#GetTrackMIDINoteNameEx) */
      function GetTrackMIDINoteName(track: number, pitch: number, chan: number): string

      
      /** Get note/CC name. pitch 128 for CC0 name, 129 for CC1 name, etc. See [SetTrackMIDINoteNameEx](#SetTrackMIDINoteNameEx) */
      function GetTrackMIDINoteNameEx(proj: ReaProject, track: MediaTrack, pitch: number, chan: number): string

      
      /**  */
      function GetTrackMIDINoteRange(proj: ReaProject, track: MediaTrack): MultiReturn<[note_lo: number, note_hi: number]>

      
      /** Returns "MASTER" for master track, "Track N" if track has no name. */
      function GetTrackName(track: MediaTrack): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get the number of MediaItems of a MediaTrack */
      function GetTrackNumMediaItems(tr: MediaTrack): number

      
      /** returns number of sends/receives/hardware outputs
	*
	* 
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc). */
      function GetTrackNumSends(tr: MediaTrack, category: number): number

      
      /** See [GetTrackSendName](#GetTrackSendName). */
      function GetTrackReceiveName(track: MediaTrack, recv_index: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** See [GetTrackSendUIMute](#GetTrackSendUIMute). */
      function GetTrackReceiveUIMute(track: MediaTrack, recv_index: number): MultiReturn<[retval: boolean, mute: boolean]>

      
      /** See [GetTrackSendUIVolPan](#GetTrackSendUIVolPan). */
      function GetTrackReceiveUIVolPan(track: MediaTrack, recv_index: number): MultiReturn<[retval: boolean, volume: number, pan: number]>

      
      /** Get send/receive/hardware output numerical-value attributes.
	*
	* category is &lt;0 for receives, 0=sends, &gt;0 for hardware outputs
	*
	* parameter names:
	*
	* 
	*
	*     B\_MUTE : bool \*
	*
	*     B\_PHASE : bool \*, true to flip phase
	*
	*     B\_MONO : bool \*
	*
	*     D\_VOL : double \*, 1.0 = +0dB etc
	*
	*     D\_PAN : double \*, -1..+1
	*
	*     D\_PANLAW : double \*,1.0=+0.0db, 0.5=-6dB, -1.0 = projdef etc
	*
	*     I\_SENDMODE : int \*, 0=post-fader, 1=pre-fx, 2=post-fx (deprecated), 3=post-fx
	*
	*     I\_AUTOMODE : int \* : automation mode (-1=use track automode, 0=trim/off, 1=read, 2=touch, 3=write, 4=latch)
	*
	*     I\_SRCCHAN : int \*, index,&amp;1024=mono, -1 for none
	*
	*     I\_DSTCHAN : int \*, index, &amp;1024=mono, otherwise stereo pair, hwout:&amp;512=rearoute
	*
	*     I\_MIDIFLAGS : int \*, low 5 bits=source channel 0=all, 1-16, next 5 bits=dest channel, 0=orig, 1-16=chanP_DESTTRACK : read only, returns MediaTrack *, destination track, only applies for sends/recvs
	*
	*     P\_SRCTRACK : read only, returns MediaTrack *, source track, only applies for sends/recvs
	*
	*     P\_ENV:&lt;envchunkname : read only, returns TrackEnvelope *. To get a specific TrackEnvelope, call with :&lt;VOLENV, :&lt;PANENV, etc appended.
	*
	*         
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc).
	*
	*         
	*
	* See [CreateTrackSend](#CreateTrackSend), [RemoveTrackSend](#RemoveTrackSend), [GetTrackNumSends](#GetTrackNumSends). */
      function GetTrackSendInfo_Value(tr: MediaTrack, category: number, sendidx: number, parmname: string): number

      
      /** send\_idx&gt;=0 for hw outputs, &gt;=nb\_of\_hw\_outputs for sends. See [GetTrackReceiveName](#GetTrackReceiveName). */
      function GetTrackSendName(track: MediaTrack, send_index: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** send\_idx&gt;=0 for hw outputs, &gt;=nb\_of\_hw\_outputs for sends. See [GetTrackReceiveUIMute](#GetTrackReceiveUIMute). */
      function GetTrackSendUIMute(track: MediaTrack, send_index: number): MultiReturn<[retval: boolean, mute: boolean]>

      
      /** send\_idx&gt;=0 for hw outputs, &gt;=nb\_of\_hw\_outputs for sends. See [GetTrackReceiveUIVolPan](#GetTrackReceiveUIVolPan). */
      function GetTrackSendUIVolPan(track: MediaTrack, send_index: number): MultiReturn<[retval: boolean, volume: number, pan: number]>

      
      /** Gets track state, returns track name.
	*
	* flags will be set to:
	*
	* &amp;1=folder
	*
	* &amp;2=selected
	*
	* &amp;4=has fx enabled
	*
	* &amp;8=muted
	*
	* &amp;16=soloed
	*
	* &amp;32=SIP'd (with &amp;16)
	*
	* &amp;64=rec armed
	*
	* &amp;128=rec monitoring on
	*
	* &amp;256=rec monitoring auto
	*
	* &amp;512=hide from TCP
	*
	* &amp;1024=hide from MCP */
      function GetTrackState(track: MediaTrack): MultiReturn<[retval: string, flags: number]>

      
      /** Gets the RPPXML state of a track, returns true if successful. Undo flag is a performance/caching hint. */
      function GetTrackStateChunk(track: MediaTrack, str: string, isundo: boolean): MultiReturn<[retval: boolean, str: string]>

      
      /**  */
      function GetTrackUIMute(track: MediaTrack): MultiReturn<[retval: boolean, mute: boolean]>

      
      /**  */
      function GetTrackUIPan(track: MediaTrack): MultiReturn<[retval: boolean, pan1: number, pan2: number, panmode: number]>

      
      /**  */
      function GetTrackUIVolPan(track: MediaTrack): MultiReturn<[retval: boolean, volume: number, pan: number]>

      
      /** retrieves the last timestamps of audio xrun (yellow-flash, if available), media xrun (red-flash), and the current time stamp (all milliseconds) */
      function GetUnderrunTime(): MultiReturn<[number: any | 'optional', retval: audio_xrun, number: any | 'optional', number: any | 'optional']>

      
      /** Opens a filerequester, where a user can select a file.
	*
	* The requester only returns the file, but doesn't open or write to it. That said, this function can be used for both use-cases, BUT: keep in mind, that it shows an "open"-button, even if you want to use it in code for saving a file. You also can't use it for "create new file"-usecases, as you can't choose nonexisting files. */
      function GetUserFileNameForRead(filenameNeed4096: string, title: string, defext: string): MultiReturn<[retval: boolean, filenameNeed4096: string]>

      
      /** Opens a window with input-fields to get values from the user.
	*
	* If a caption begins with \*, for example "\*password", the edit field will not display the input text.
	*
	* Maximum fields is 16. Values are returned as a comma/custom separator-separated string. 
	*
	* Returns false if the user canceled the dialog. 
	*
	* 
	*
	* You can supply special extra information via additional caption fields: extrawidth=XXX to increase text field width, separator=X to use a different separator for returned fields(separator=\n is recommended).
	*
	* 
	*
	* Example:
	*
	* 
	*
	* retval, retvals_csv = reaper.GetUserInputs("Title", 2, "Hello,World, separator=\n", "defaultvalue1\ndefaultvalue2")
	*
	* 
	*
	* will return the values input by the user, separated by a newline.
	*
	* 
	*
	* \n is recommended, as this allows the user entering everything, a one-lined-inputbox can handle.
	*
	* 
	*
	* Important: the separator-field in the captions has no effect on how captions in parameter captions\_csv are separated from each other. They still need to be separated by commas!
	*
	* 
	*
	* Note: the parameter retvals\_csv follows undisclosed csv rules. This is important when you want to set the default-captions for multiple input-field.
	*
	* For instance every entry for each input-field: 
	*
	* 
	*
	* - must contain an even number of quotes/single quotes
	*
	* - every ( or must be closed by with )
	*
	* 
	*
	* otherwise the separator will be ignored and the default-retvals will show in the wrong fields.
	*
	* 
	*
	* Example:
	*
	* 
	*
	* a retval_csv of _I'm enlightened,I am too_
	*
	* 
	*
	* with one singlequote in it (the one in I'm) will NOT be shown in two fields
	*
	* 
	*
	* _I'm enlightened_
	*
	* _I am too_
	*
	* 
	*
	* but rather in one field as 
	*
	* 
	*
	* _I'm enlightened,I am too_
	*
	* 
	*
	* These can't be escaped due Reaper's API-limitation. Keep this in mind! */
      function GetUserInputs(title: string, num_inputs: number, captions_csv: string, retvals_csv: string): MultiReturn<[retval: boolean, retvals_csv: string]>

      
      /** Go to marker. 
	*
	* Move Editcursor to a given marker. When playing, the playcursor moves to the marker as well.
	*
	* 
	*
	* For Regions, use [GoToRegion](#GoToRegion). */
      function GoToMarker(proj: ReaProject, marker_index: number, use_timeline_order: boolean): void

      
      /** Go to beginning of a region.
	*
	* Seek to region after current region finishes playing (smooth seek).  */
      function GoToRegion(proj: ReaProject, region_index: number, use_timeline_order: boolean): void

      
      /** Runs the system color chooser dialog. Returns 0 if the user cancels the dialog. */
      function GR_SelectColor(hwnd: HWND): MultiReturn<[retval: number, color: number]>

      
      /** this is just like win32 GetSysColor() but can have overrides. */
      function GSC_mainwnd(t: number): number

      
      /** dest should be at least 64 chars long to be safe */
      function guidToString(gGUID: string, destNeed64: string): string

      
      /** Returns true if there exists an extended state value for a specific section and key. See [SetExtState](#SetExtState), [GetExtState](#GetExtState), [DeleteExtState](#DeleteExtState). */
      function HasExtState(section: string, key: string): boolean

      
      /** returns name of track plugin that is supplying MIDI programs,or NULL if there is none */
      function HasTrackMIDIPrograms(track: number): string

      
      /** returns name of track plugin that is supplying MIDI programs,or NULL if there is none */
      function HasTrackMIDIProgramsEx(proj: ReaProject, track: MediaTrack): string

      
      /** Displays an information in the help and information-display, underneath the TCP(might be missing, in certain themes). */
      function Help_Set(helpstring: string, is_temporary_help: boolean): void

      
      /**  */
      function image_resolve_fn(_in: string, out: string): string

      
      /** Insert a new automation item. pool\_id &lt; 0 collects existing envelope points into the automation item; if pool\_id is &gt;= 0 the automation item will be a new instance of that pool (which will be created as an empty instance if it does not exist). Returns the index of the item, suitable for passing to other automation item API functions. See [GetSetAutomationItemInfo](#GetSetAutomationItemInfo). */
      function InsertAutomationItem(env: TrackEnvelope, pool_id: number, position: number, length: number): number

      
      /** Insert an envelope point. If setting multiple points at once, set noSort=true, and call Envelope_SortPoints when done. See [InsertEnvelopePointEx](#InsertEnvelopePointEx). */
      function InsertEnvelopePoint(envelope: TrackEnvelope, time: number, value: number, shape: number, tension: number, selected: boolean, boolean: any | 'optional'): boolean

      
      /** Insert an envelope point. If setting multiple points at once, set noSort=true, and call Envelope_SortPoints when done.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* 
	*
	* See [CountEnvelopePointsEx](#CountEnvelopePointsEx), [GetEnvelopePointEx](#GetEnvelopePointEx), [SetEnvelopePointEx](#SetEnvelopePointEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function InsertEnvelopePointEx(envelope: TrackEnvelope, autoitem_idx: number, time: number, value: number, shape: number, tension: number, selected: boolean, boolean: any | 'optional'): boolean

      
      /** mode: 
	*
	* 0=add to current track
	*
	* 1=add new track
	*
	* 3=add to selected items as takes
	*
	* &amp;4=stretch/loop to fit time sel
	*
	* &amp;8=try to match tempo 1x
	*
	* &amp;16=try to match tempo 0.5x
	*
	* &amp;32=try to match tempo 2x
	*
	* &amp;64=don't preserve pitch when matching tempo
	*
	* &amp;128=no loop/section if startpct/endpct set
	*
	* &amp;256=force loop regardless of global preference for looping imported items
	*
	* &amp;512=use high word as absolute track index if mode&amp;3==0
	*
	* &amp;1024=insert into reasamplomatic on a new track
	*
	* &amp;2048=insert into open reasamplomatic instance
	*
	* &amp;4096=move to BWF source preferred position */
      function InsertMedia(file: string, mode: number): number

      
      /** see [InsertMedia](#InsertMedia) */
      function InsertMediaSection(file: string, mode: number, startpct: number, endpct: number, pitchshift: number): number

      
      /** inserts a track at idx,of course this will be clamped to 0..[GetNumTracks](#GetNumTracks)(). */
      function InsertTrackAtIndex(idx: number, wantDefaults: boolean): void

      
      /** Tests a file extension (i.e. "wav" or "mid") to see if it's a media extension.
	*
	* If wantOthers is set, then "RPP", "TXT" and other project-type formats will also pass. */
      function IsMediaExtension(ext: string, wantOthers: boolean): boolean

      
      /** Get, if a MediaItem is selected or not. */
      function IsMediaItemSelected(item: MediaItem): boolean

      
      /** Is the project dirty (needing save)? Always returns 0 if 'undo/prompt to save' is disabled in preferences.
	*
	* 
	*
	* A project becomes dirty, as soon as it was changed since creation/last saving. */
      function IsProjectDirty(proj: ReaProject): number

      
      /** Get, if a MediaTrack is selected or not. */
      function IsTrackSelected(track: MediaTrack): boolean

      
      /** Gets visibility-state of a MediaTrack. */
      function IsTrackVisible(track: MediaTrack, mixer: boolean): boolean

      
      /** creates a joystick device */
      function joystick_create(guidGUID: string): joystick_device

      
      /** destroys a joystick device */
      function joystick_destroy(device: joystick_device): void

      
      /** enumerates installed devices, returns GUID as a string */
      function joystick_enum(index: number): MultiReturn<[retval: string, string: any | 'optional']>

      
      /** returns axis value (-1..1) */
      function joystick_getaxis(dev: joystick_device, axis: number): number

      
      /** returns button pressed mask, 1=first button, 2=second... */
      function joystick_getbuttonmask(dev: joystick_device): number

      
      /** returns button count */
      function joystick_getinfo(dev: joystick_device): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional']>

      
      /** returns POV value (usually 0..655.35, or 655.35 on error) */
      function joystick_getpov(dev: joystick_device, pov: number): number

      
      /** Updates joystick state from hardware, returns true if successful (joystick_get* will not be valid until joystick_update() is called successfully) */
      function joystick_update(dev: joystick_device): boolean

      
      /** Returns false if the line is entirely offscreen. */
      function LICE_ClipLine(pX1: number, pY1: number, pX2: number, pY2: number, xLo: number, yLo: number, xHi: number, yHi: number): MultiReturn<[retval: boolean, pX1: number, pY1: number, pX2: number, pY2: number]>

      
      /** Returns a localized version of src_string, in section section. flags can have 1 set to only localize if sprintf-style formatting matches the original. */
      function LocalizeString(src_string: string, section: string, flags: number): string

      
      /** Move the loop selection left or right in steps according to snap-settings(when snap is enabled). */
      function Loop_OnArrow(project: ReaProject, direction: number): boolean

      
      /** Performs an action belonging to the main action section. To perform non-native actions (ReaScripts, custom or extension plugins' actions) safely, see [NamedCommandLookup](#NamedCommandLookup)().
	*
	* See [Main\_OnCommandEx](#Main_OnCommandEx). */
      function Main_OnCommand(command: number, flag: number): void

      
      /** Performs an action belonging to the main action section. To perform non-native actions (ReaScripts, custom or extension plugins' actions) safely, see [NamedCommandLookup](#NamedCommandLookup)(). */
      function Main_OnCommandEx(command: number, flag: number, proj: ReaProject): void

      
      /** opens a project. 
	*
	* 
	*
	* will prompt the user to save unless name is prefixed with 'noprompt:'. 
	*
	*     example: "noprompt:projectfile.rpp"
	*
	*      
	*
	* If name is prefixed with 'template:', project file will be loaded as a template.
	*
	*     example: "template:projectfile.rpp"
	*
	* 
	*
	* You can combine both: "template:noprompt:projectfile.rpp"
	*
	* 
	*
	* If passed a .RTrackTemplate file, adds the template to the existing project. */
      function Main_openProject(name: string): void

      
      /** Save the project.
	*
	* Optional with a save-dialog. */
      function Main_SaveProject(proj: ReaProject, forceSaveAsIn: boolean): void

      
      /**  */
      function Main_UpdateLoopInfo(ignoremask: number): void

      
      /** Marks project as dirty (needing save) if 'undo/prompt to save' is enabled in preferences. */
      function MarkProjectDirty(proj: ReaProject): void

      
      /** If track is supplied, item is ignored */
      function MarkTrackItemsDirty(track: MediaTrack, item: MediaItem): void

      
      /** Get the playrate of the project. */
      function Master_GetPlayRate(project: ReaProject): number

      
      /**  */
      function Master_GetPlayRateAtTime(time_s: number, proj: ReaProject): number

      
      /**  */
      function Master_GetTempo(): number

      
      /** Convert play rate to/from a value between 0 and 1, representing the position on the project playrate slider. */
      function Master_NormalizePlayRate(playrate: number, isnormalized: boolean): number

      
      /** Convert the tempo to/from a value between 0 and 1, representing bpm in the range of 40-296 bpm. */
      function Master_NormalizeTempo(bpm: number, isnormalized: boolean): number

      
      /** Shows Messagebox with user-clickable buttons.            */
      function MB(msg: string, title: string, type: number): number

      
      /** Returns 1 if the track holds the item, 2 if the track is a folder containing the track that holds the item, etc. */
      function MediaItemDescendsFromTrack(item: MediaItem, track: MediaTrack): number

      
      /** Count the number of notes, CC events, and text/sysex events in a given MIDI item. */
      function MIDI_CountEvts(take: MediaItem_Take): MultiReturn<[retval: number, notecnt: number, ccevtcnt: number, textsyxevtcnt: number]>

      
      /** Delete a MIDI CC event. */
      function MIDI_DeleteCC(take: MediaItem_Take, ccidx: number): boolean

      
      /** Delete a MIDI event. */
      function MIDI_DeleteEvt(take: MediaItem_Take, evtidx: number): boolean

      
      /** Delete a MIDI note. */
      function MIDI_DeleteNote(take: MediaItem_Take, noteidx: number): boolean

      
      /** Delete a MIDI text or sysex event. */
      function MIDI_DeleteTextSysexEvt(take: MediaItem_Take, textsyxevtidx: number): boolean

      
      /** Disable sorting for all MIDI insert, delete, get and set functions, until MIDI_Sort is called. */
      function MIDI_DisableSort(take: MediaItem_Take): void

      
      /** Returns the index of the next selected MIDI CC event after ccidx (-1 if there are no more selected events). */
      function MIDI_EnumSelCC(take: MediaItem_Take, ccidx: number): number

      
      /** Returns the index of the next selected MIDI event after evtidx (-1 if there are no more selected events). */
      function MIDI_EnumSelEvts(take: MediaItem_Take, evtidx: number): number

      
      /** Returns the index of the next selected MIDI note after noteidx (-1 if there are no more selected events). */
      function MIDI_EnumSelNotes(take: MediaItem_Take, noteidx: number): number

      
      /** Returns the index of the next selected MIDI text/sysex event after textsyxidx (-1 if there are no more selected events). */
      function MIDI_EnumSelTextSysexEvts(take: MediaItem_Take, textsyxidx: number): number

      
      /** Get all MIDI data. MIDI buffer is returned as a list of { int offset, char flag, int msglen, unsigned char msg[] }.
	*
	* 
	*
	*     offset: MIDI ticks from previous event
	*
	*     flag: &1=selected &2=muted
	*
	*     flag high 4 bits for CC shape: &16=linear, &32=slow start/end, &16|32=fast start, &64=fast end, &64|16=bezier
	*
	*     msg: the MIDI message.
	*
	* 
	*
	* A meta-event of type 0xF followed by 'CCBZ ' and 5 more bytes represents bezier curve data for the previous MIDI event: 1 byte for the bezier type (usually 0) and 4 bytes for the bezier tension as a float.
	*
	* For tick intervals longer than a 32 bit word can represent, zero-length meta events may be placed between valid events.
	*
	* 
	*
	* See [MIDI\_SetAllEvts](#MIDI_SetAllEvts). */
      function MIDI_GetAllEvts(take: MediaItem_Take, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get MIDI CC event properties. */
      function MIDI_GetCC(take: MediaItem_Take, ccidx: number): MultiReturn<[retval: boolean, selected: boolean, muted: boolean, ppqpos: number, chanmsg: number, chan: number, msg2: number, msg3: number]>

      
      /** Get CC shape and bezier tension. See [MIDI\_GetCC](#MIDI_GetCC), [MIDI\_SetCCShape](#MIDI_SetCCShape) */
      function MIDI_GetCCShape(take: MediaItem_Take, ccidx: number): MultiReturn<[retval: boolean, shape: number, beztension: number]>

      
      /** Get MIDI event properties. */
      function MIDI_GetEvt(take: MediaItem_Take, evtidx: number, selected: boolean, muted: boolean, ppqpos: number, msg: string): MultiReturn<[retval: boolean, selected: boolean, muted: boolean, ppqpos: number, msg: string]>

      
      /** Returns the most recent MIDI editor grid size for this MIDI take, in QN. Swing is between 0 and 1. Note length is 0 if it follows the grid size. */
      function MIDI_GetGrid(take: MediaItem_Take): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional']>

      
      /** Get a string that only changes when the MIDI data changes. If notesonly==true, then the string changes only when the MIDI notes change. See [MIDI\_GetTrackHash](#MIDI_GetTrackHash) */
      function MIDI_GetHash(take: MediaItem_Take, notesonly: boolean, hash: string): MultiReturn<[retval: boolean, hash: string]>

      
      /** Get MIDI note properties. */
      function MIDI_GetNote(take: MediaItem_Take, noteidx: number): MultiReturn<[retval: boolean, selected: boolean, muted: boolean, startppqpos: number, endppqpos: number, chan: number, pitch: number, vel: number]>

      
      /** Returns the MIDI tick (ppq) position corresponding to the end of the measure. */
      function MIDI_GetPPQPos_EndOfMeasure(take: MediaItem_Take, ppqpos: number): number

      
      /** Returns the MIDI tick (ppq) position corresponding to the start of the measure. */
      function MIDI_GetPPQPos_StartOfMeasure(take: MediaItem_Take, ppqpos: number): number

      
      /** Returns the MIDI tick (ppq) position corresponding to a specific project time in quarter notes. */
      function MIDI_GetPPQPosFromProjQN(take: MediaItem_Take, projqn: number): number

      
      /** Returns the MIDI tick (ppq) position corresponding to a specific project time in seconds. */
      function MIDI_GetPPQPosFromProjTime(take: MediaItem_Take, projtime: number): number

      
      /** Returns the project time in quarter notes corresponding to a specific MIDI tick (ppq) position. */
      function MIDI_GetProjQNFromPPQPos(take: MediaItem_Take, ppqpos: number): number

      
      /** Returns the project time in seconds corresponding to a specific MIDI tick (ppq) position. */
      function MIDI_GetProjTimeFromPPQPos(take: MediaItem_Take, ppqpos: number): number

      
      /** Get the active scale in the media source, if any. root 0=C, 1=C#, etc. scale &amp;0x1=root, &amp;0x2=minor 2nd, &amp;0x4=major 2nd, &amp;0x8=minor 3rd, &amp;0xF=fourth, etc. */
      function MIDI_GetScale(take: MediaItem_Take, root: number, scale: number, name: string): MultiReturn<[retval: boolean, root: number, scale: number, name: string]>

      
      /** Get MIDI meta-event properties. Allowable types are -1:sysex (msg should not include bounding F0..F7), 1-14:MIDI text event types, 15=REAPER notation event. For all other meta-messages, type is returned as -2 and msg returned as all zeroes. 
	*
	* 
	*
	* See [MIDI\_GetEvt](#MIDI_GetEvt). */
      function MIDI_GetTextSysexEvt(take: MediaItem_Take, textsyxevtidx: number, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', number: any | 'optional', string: any | 'optional'): MultiReturn<[retval: boolean, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', number: any | 'optional', string: any | 'optional']>

      
      /** Get a string that only changes when the MIDI data changes. If notesonly==true, then the string changes only when the MIDI notes change. See [MIDI\_GetHash](#MIDI_GetHash) */
      function MIDI_GetTrackHash(track: MediaTrack, notesonly: boolean, hash: string): MultiReturn<[retval: boolean, hash: string]>

      
      /** Insert a new MIDI CC event. */
      function MIDI_InsertCC(take: MediaItem_Take, selected: boolean, muted: boolean, ppqpos: number, chanmsg: number, chan: number, msg2: number, msg3: number): boolean

      
      /** Insert a new MIDI event. */
      function MIDI_InsertEvt(take: MediaItem_Take, selected: boolean, muted: boolean, ppqpos: number, bytestr: string): boolean

      
      /** Insert a new MIDI note. Set noSort if inserting multiple events, then call MIDI_Sort when done. */
      function MIDI_InsertNote(take: MediaItem_Take, selected: boolean, muted: boolean, startppqpos: number, endppqpos: number, chan: number, pitch: number, vel: number, boolean: any | 'optional'): boolean

      
      /** Insert a new MIDI text or sysex event. Allowable types are -1:sysex (msg should not include bounding F0..F7), 1-14:MIDI text event types, 15=REAPER notation event. */
      function MIDI_InsertTextSysexEvt(take: MediaItem_Take, selected: boolean, muted: boolean, ppqpos: number, type: number, bytestr: string): boolean

      
      /** Reset all MIDI devices */
      function midi_reinit(): void

      
      /** Select or deselect all MIDI content. */
      function MIDI_SelectAll(take: MediaItem_Take, select: boolean): void

      
      /** Set all MIDI data. MIDI buffer is passed in as a list of { int offset, char flag, int msglen, unsigned char msg[] }.
	*
	* 
	*
	*     offset: MIDI ticks from previous event
	*
	*     flag: &1=selected &2=muted
	*
	*     flag high 4 bits for CC shape: &16=linear, &32=slow start/end, &16|32=fast start, &64=fast end, &64|16=bezier
	*
	*     msg: the MIDI message.
	*
	*     
	*
	* A meta-event of type 0xF followed by 'CCBZ ' and 5 more bytes represents bezier curve data for the previous MIDI event: 1 byte for the bezier type (usually 0) and 4 bytes for the bezier tension as a float.
	*
	* For tick intervals longer than a 32 bit word can represent, zero-length meta events may be placed between valid events.
	*
	* 
	*
	* See [MIDI\_GetAllEvts](#MIDI_GetAllEvts). */
      function MIDI_SetAllEvts(take: MediaItem_Take, buf: string): boolean

      
      /** Set MIDI CC event properties. Properties passed as NULL will not be set. set noSort if setting multiple events, then call MIDI_Sort when done. */
      function MIDI_SetCC(take: MediaItem_Take, ccidx: number, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Set CC shape and bezier tension. set noSort if setting multiple events, then call MIDI_Sort when done. See [MIDI\_SetCC](#MIDI_SetCC), [MIDI\_GetCCShape](#MIDI_GetCCShape) */
      function MIDI_SetCCShape(reaper: boolean, take: MediaItem_Take, ccidx: number, shape: number, beztension: number, boolean: any | 'optional'): void

      
      /** Set MIDI event properties. Properties passed as NULL will not be set. set noSort if setting multiple events, then call MIDI_Sort when done. */
      function MIDI_SetEvt(take: MediaItem_Take, evtidx: number, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', string: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Set the start/end positions of a media item that contains a MIDI take. */
      function MIDI_SetItemExtents(item: MediaItem, startQN: number, endQN: number): boolean

      
      /** Set MIDI note properties. Properties passed as NULL (or negative values) will not be set. Set noSort if setting multiple events, then call MIDI_Sort when done. Setting multiple note start positions at once is done more safely by deleting and re-inserting the notes. */
      function MIDI_SetNote(take: MediaItem_Take, noteidx: number, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Set MIDI text or sysex event properties. Properties passed as NULL will not be set. Allowable types are -1:sysex (msg should not include bounding F0..F7), 1-14:MIDI text event types, 15=REAPER notation event. set noSort if setting multiple events, then call MIDI_Sort when done. */
      function MIDI_SetTextSysexEvt(take: MediaItem_Take, textsyxevtidx: number, boolean: any | 'optional', boolean: any | 'optional', number: any | 'optional', number: any | 'optional', string: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Sort MIDI events after multiple calls to MIDI_SetNote, MIDI_SetCC, etc. */
      function MIDI_Sort(take: MediaItem_Take): void

      
      /** get a pointer to the focused MIDI editor window
	*
	* see [MIDIEditor\_GetMode](#MIDIEditor_GetMode), [MIDIEditor\_OnCommand](#MIDIEditor_OnCommand) */
      function MIDIEditor_GetActive(): HWND

      
      /** get the mode of a MIDI editor (0=piano roll, 1=event list, -1=invalid editor)
	*
	* see [MIDIEditor\_GetActive](#MIDIEditor_GetActive), [MIDIEditor\_OnCommand](#MIDIEditor_OnCommand) */
      function MIDIEditor_GetMode(midieditor: HWND): number

      
      /** Get settings from a MIDI editor. setting_desc can be:
	*
	*     snap\_enabled: returns 0 or 1
	*
	*     active\_note\_row: returns 0-127
	*
	*     last\_clicked\_cc\_lane: 
	*
	*         returns 0-127=CC, 
	*
	*                 0x100|(0-31)=14-bit CC, 
	*
	*                 0x200=velocity, 
	*
	*                 0x201=pitch, 
	*
	*                 0x202=program, 
	*
	*                 0x203=channel pressure, 
	*
	*                 0x204=bank/program select, 
	*
	*                 0x205=text, 
	*
	*                 0x206=sysex, 
	*
	*                 0x207=off velocity, 
	*
	*                 0x208=notation events, 
	*
	*                 0x210=media item lane
	*
	*     default\_note\_vel: returns 0-127
	*
	*     default\_note\_chan: returns 0-15
	*
	*     default\_note\_len: returns default length in MIDI ticks
	*
	*     scale\_enabled: returns 0-1
	*
	*     scale\_root: returns 0-12 (0=C)
	*
	*     if setting\_desc is unsupported, the function returns -1.
	*
	*     See [MIDIEditor\_SetSetting\_int](#MIDIEditor_SetSetting_int), [MIDIEditor\_GetActive](#MIDIEditor_GetActive), [MIDIEditor\_GetSetting\_str](#MIDIEditor_GetSetting_str) */
      function MIDIEditor_GetSetting_int(midieditor: HWND, setting_desc: string): number

      
      /** Get settings from a MIDI editor. setting\_desc can be:
	*
	* last\_clicked\_cc\_lane: returns text description ("velocity", "pitch", etc)
	*
	* scale: returns the scale record, for example "102034050607" for a major scale
	*
	* if setting\_desc is unsupported, the function returns false.
	*
	*         
	*
	* See [MIDIEditor\_GetActive](#MIDIEditor_GetActive), [MIDIEditor\_GetSetting_int](#MIDIEditor_GetSetting_int) */
      function MIDIEditor_GetSetting_str(midieditor: HWND, setting_desc: string, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** get the take that is currently being edited in this MIDI editor */
      function MIDIEditor_GetTake(midieditor: HWND): MediaItem_Take

      
      /** Send an action command to the last focused MIDI editor. Returns false if there is no MIDI editor open, or if the view mode (piano roll or event list) does not match the input.
	*
	* see [MIDIEditor\_OnCommand](#MIDIEditor_OnCommand) */
      function MIDIEditor_LastFocused_OnCommand(command_id: number, islistviewcommand: boolean): boolean

      
      /** Send an action command to a MIDI editor. Returns false if the supplied MIDI editor pointer is not valid (not an open MIDI editor).
	*
	* see [MIDIEditor\_GetActive](#MIDIEditor_GetActive), [MIDIEditor\_LastFocused\_OnCommand](#MIDIEditor_LastFocused_OnCommand) */
      function MIDIEditor_OnCommand(midieditor: HWND, command_id: number): boolean

      
      /** Set settings for a MIDI editor. setting\_desc can be:
	*
	* active\_note\_row: 0-127
	*
	* See [MIDIEditor\_GetSetting_int](#MIDIEditor_GetSetting_int) */
      function MIDIEditor_SetSetting_int(midieditor: HWND, setting_desc: string, setting: number): boolean

      
      /** Converts a double-number to its panstr-equivalent.
	*
	*         
	*
	* See [parsepanstr](#parsepanstr) for its counterpart.  */
      function mkpanstr(strNeed64: string, pan: number): string

      
      /** creates a vol-pan-string, which holds a readable representation of the vol and pan-values.
	*
	* 
	*
	* The format is like "+6.02db center" or "+inf +80R", etc
	*
	* 
	*
	* see [mkpanstr](#mkpanstr) and [mkvolstr](#mkvolstr) for the individual pan/vol-string functions. */
      function mkvolpanstr(strNeed64: string, vol: number, pan: number): string

      
      /** Converts a volume-value into a string-representation of it as dB.
	*
	* 
	*
	* Note: Unlike panstr, there is no parsevolstr-string-function available! */
      function mkvolstr(strNeed64: string, vol: number): string

      
      /** Moves the Edit Cursor. */
      function MoveEditCursor(adjamt: number, dosel: boolean): void

      
      /** Moves a MediaItem-object to a specific MediaTrack.
	*
	* 
	*
	* Call [UpdateArrange](#UpdateArrange) to update the arrangeview after that. */
      function MoveMediaItemToTrack(item: MediaItem, desttr: MediaTrack): boolean

      
      /** Mutes all tracks */
      function MuteAllTracks(mute: boolean): void

      
      /** With r.??? and sr.??? parameters, you can define coordinates of a rectangle. 
	*
	* The function will return the left/top/right/bottom coordinates of the viewport that that rectangle is on/closest to.             */
      function my_getViewport(r: number, r: number, r: number, r: number, sr: number, sr: number, sr: number, sr: number, wantWorkArea: boolean): MultiReturn<[left: number, top: number, right: number, bottom: number]>

      
      /** Get the command ID number for named command that was registered by an extension such as "\_SWS\_ABOUT" or "\_113088d11ae641c193a2b7ede3041ad5" for a ReaScript or a custom action.
	*
	* 
	*
	* see [Main\_OnCommand](#Main_OnCommand) for executing actions with command-ID-numbers. */
      function NamedCommandLookup(command_name: string): number

      
      /** Toggles pause/play during play or pause/rec during recording in the current project.
	*
	* When stopped, it will start paused play. */
      function OnPauseButton(): void

      
      /** Toggles pause/play during play or pause/rec during recording in a specific project.
	*
	* When stopped, it will start paused play. */
      function OnPauseButtonEx(proj: ReaProject): void

      
      /** Starts playing at edit-cursor. Will stop recording, when executed during recording. */
      function OnPlayButton(): void

      
      /** Starts playing at edit-cursor. Will stop recording, when executed during recording. */
      function OnPlayButtonEx(proj: ReaProject): void

      
      /** Stops playing/recording. */
      function OnStopButton(): void

      
      /** Stops playing/recording. */
      function OnStopButtonEx(proj: ReaProject): void

      
      /** Open a different installed theme. */
      function OpenColorThemeFile(fn: string): boolean

      
      /** Opens mediafn in the Media Explorer.
	*
	* 
	*
	* If you just want to change folder in MediaExplorer, give it a path instead of a file and set play to false. */
      function OpenMediaExplorer(mediafn: string, play: boolean): HWND

      
      /** Send an OSC message directly to REAPER. The value argument may be NULL. The message will be matched against the default OSC patterns. Only supported if control surface support was enabled when installing REAPER.
	*
	* 
	*
	* This is not broadcast outside of Reaper, so you can't control devices, plugins, etc with it!
	*
	* 
	*
	* Messages sent via this function can be used for parameter-learn/modulation and as shortcuts for scripts.
	*
	* The parameter valueIn can be retrieved with the returnvalue val of the function reaper.get_action_context, so sending values to a script is possible that way. */
      function OscLocalMessageToHost(message: string, number: any | 'optional'): void

      
      /** Parse hh:mm:ss.sss time string, return time in seconds (or 0.0 on error). See [parse\_timestr_pos](#parse_timestr_pos), [parse\_timestr_len](#parse_timestr_len). */
      function parse_timestr(buf: string): number

      
      /** Converts a time-string in its time-in-seconds-representation
	*
	*         
	*
	* time formatting mode overrides: -1=proj default.
	*
	* 0, time
	*
	* 1, measures.beats + time
	*
	* 2, measures.beats
	*
	* 3, seconds
	*
	* 4, samples
	*
	* 5, h:m:s:f */
      function parse_timestr_len(buf: string, offset: number, modeoverride: number): number

      
      /** Parse time string and convert it into seconds. */
      function parse_timestr_pos(buf: string, modeoverride: number): number

      
      /** Converts a string created by [mkpanstr](#mkpanstr) back to it's double-number. */
      function parsepanstr(str: string): number

      
      /** enumerates the available PCM-sink-formats, which means, the output-formats available in Reaper */
      function PCM_Sink_Enum(idx: number): MultiReturn<[retval: number, descstr: string]>

      
      /** allows you to retrieve the file-extension of a certain PCM-sink/fileformat available.
	*
	* 
	*
	* See [PCM\_Sink\_Enum](#PCM_Sink_Enum) to enumerate available PCM-sink/fileformats. */
      function PCM_Sink_GetExtension(data: string): string

      
      /**  */
      function PCM_Sink_ShowConfig(cfg: string, hwndParent: HWND): HWND

      
      /** See [PCM\_Source\_CreateFromFileEx](#PCM_Source_CreateFromFileEx). */
      function PCM_Source_CreateFromFile(filename: string): PCM_source

      
      /** Create a PCM_source from filename, and override pref of MIDI files being imported as in-project MIDI events. */
      function PCM_Source_CreateFromFileEx(filename: string, forcenoMidiImp: boolean): PCM_source

      
      /** Create a PCM_source from a "type" (use this if you're going to load its state via LoadState/ProjectStateContext).
	*
	* Valid types include "WAVE", "MIDI", or whatever plug-ins define as well. */
      function PCM_Source_CreateFromType(sourcetype: string): PCM_source

      
      /** Deletes a PCM_source -- be sure that you remove any project reference before deleting a source */
      function PCM_Source_Destroy(src: PCM_source): void

      
      /** Gets block of peak samples to buf. Note that the peak samples are interleaved, but in two or three blocks (maximums, then minimums, then extra). 
	*
	* Return value has 20 bits of returned sample count, then 4 bits of output_mode (0xf00000), then a bit to signify whether extra_type was available (0x1000000). 
	*
	* extra_type can be 115 ('s') for spectral information, which will return peak samples as integers with the low 15 bits frequency, next 14 bits tonality. */
      function PCM_Source_GetPeaks(src: PCM_source, peakrate: number, starttime: number, numchannels: number, numsamplesperchannel: number, want_extra_type: number, buf: array): number

      
      /** If a section/reverse block, retrieves offset/len/reverse. return true if success */
      function PCM_Source_GetSectionInfo(src: PCM_source): MultiReturn<[retval: boolean, offs: number, len: number, rev: boolean]>

      
      /**  */
      function PluginWantsAlwaysRunFx(amt: number): void

      
      /** adds prevent_count to the UI refresh prevention state; always add then remove the same amount, or major disfunction will occur */
      function PreventUIRefresh(prevent_count: number): void

      
      /** Opens the actionlist and allows you to get, which action the user selected.
	*
	* 
	*
	* So the user can select numerous actions, and when they hit the select or select/close-button, you can get the actions selected.
	*
	* 
	*
	* To start a new session, pass 1 as parameter session_mode.
	*
	* 
	*
	* After that, repeatedly call the function with session_mode=0, which will return the selected actions.
	*
	*         - -1, the actionlist is closed
	*
	*         - 0, no action has been selected
	*
	*         - any other number, this action has been selected.
	*
	* In the latter case, call the function until it returns 0 again to get all selected actions.
	*
	* 
	*
	* If you're finished, call the function with session_mode=-1
	*
	* 
	*
	* 
	*
	* When finished, call with session_mode=-1. */
      function PromptForAction(session_mode: number, init_id: number, section_id: number): number

      
      /** Causes REAPER to display the error message after the current ReaScript finishes. When Reaper's IDE is open, it will display it at the bottom of the IDE. */
      function ReaScriptError(errmsg: string): void

      
      /** Creates a new directory. 
	*
	* 
	*
	* You can recursivly create directories, means: if the higher directories don't exist, the will also be automatically created.
	*
	* 
	*
	* returns positive value on success, 0 on failure. */
      function RecursiveCreateDirectory(path: string, ignored: number): number

      
      /** garbage-collects extra open files and closes them. if flags has 1 set, this is done incrementally (call this from a regular timer, if desired). if flags has 2 set, files are aggressively closed (they may need to be re-opened very soon). 
	*
	* 
	*
	* returns number of files closed by this call. */
      function reduce_open_files(reaper: number, flags: number): void

      
      /** Refreshes the toolbar-buttons, associated with a specific command_id/action
	*
	* See [RefreshToolbar2](#RefreshToolbar2). */
      function RefreshToolbar(command_id: number): void

      
      /** Refreshes the toolbar-buttons, associated with a specific command_id/action within a certain section */
      function RefreshToolbar2(section_id: number, command_id: number): void

      
      /** Makes a filename "in" relative to the current project, if any. */
      function relative_fn(_in: string, out: string): string

      
      /** Remove a send/receive/hardware output. See [CreateTrackSend](#CreateTrackSend), [GetSetTrackSendInfo](#GetSetTrackSendInfo), [GetTrackSendInfo\_Value](#GetTrackSendInfo_Value), [SetTrackSendInfo\_Value](#SetTrackSendInfo_Value), [GetTrackNumSends](#GetTrackNumSends).
	*
	* 
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc). */
      function RemoveTrackSend(tr: MediaTrack, category: number, sendidx: number): boolean

      
      /** Not available while playing back. */
      function RenderFileSection(source_filename: string, target_filename: string, start_percent: number, end_percent: number, playrate: number): boolean

      
      /** Moves all selected tracks to immediately above track specified by index beforeTrackIdx, returns false if no tracks were selected. 
	*
	* makePrevFolder=0 for normal, 
	*
	*    1 = as child of track preceding track specified by beforeTrackIdx, 
	*
	*    2 = if track preceding track specified by beforeTrackIdx is last track in folder, extend folder */
      function ReorderSelectedTracks(beforeTrackIdx: number, makePrevFolder: number): boolean

      
      /**  */
      function Resample_EnumModes(mode: number): string

      
      /** See [resolve\_fn2](#resolve_fn2). */
      function resolve_fn(_in: string, out: string): string

      
      /** Resolves a filename "in" by using project settings etc. If no file found, out will be a copy of in. */
      function resolve_fn2(_in: string, out: string, string: any | 'optional'): string

      
      /** Get the named command for the given command ID. The returned string will not start with '_' (e.g. it will return "SWS_ABOUT"), it will be NULL if command_id is a native action. */
      function ReverseNamedCommandLookup(command_id: number): string

      
      /** See [GetEnvelopeScalingMode](#GetEnvelopeScalingMode). */
      function ScaleFromEnvelopeMode(scaling_mode: number, val: number): number

      
      /** See [GetEnvelopeScalingMode](#GetEnvelopeScalingMode). */
      function ScaleToEnvelopeMode(scaling_mode: number, val: number): number

      
      /** Selects or deselects all MediaItems in a project. */
      function SelectAllMediaItems(proj: ReaProject, selected: boolean): void

      
      /** Switch to another opened project/projecttab. */
      function SelectProjectInstance(proj: ReaProject): void

      
      /** set this take active in this media item */
      function SetActiveTake(take: MediaItem_Take): void

      
      /** Sets all or selected tracks to mode.
	*
	* 
	*
	* Includes the master-track. */
      function SetAutomationMode(mode: number, onlySel: boolean): void

      
      /** set current BPM in project, set wantUndo=true to add undo point */
      function SetCurrentBPM(proj: ReaProject, bpm: number, wantUndo: boolean): void

      
      /** Change the focus for the cursor.
	*
	* You must use this to change the focus for the cursor programmatically. 
	*
	* 
	*
	* mode=0 to focus track panels, 1 to focus the arrange window, 2 to focus the arrange window and select env (or envIn==NULL to clear the current track/take envelope selection) */
      function SetCursorContext(mode: number, envIn: TrackEnvelope): void

      
      /** Change the position of the edit-cursor in the current project. */
      function SetEditCurPos(time: number, moveview: boolean, seekplay: boolean): void

      
      /** Change the position of the edit-cursor in a specific project.        */
      function SetEditCurPos2(proj: ReaProject, time: number, moveview: boolean, seekplay: boolean): void

      
      /** Set attributes of an envelope point. Values that are not supplied will be ignored. If setting multiple points at once, set noSort=true, and call Envelope_SortPoints when done. See [SetEnvelopePointEx](#SetEnvelopePointEx). */
      function SetEnvelopePoint(envelope: TrackEnvelope, ptidx: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Set attributes of an envelope point. Values that are not supplied will be ignored. If setting multiple points at once, set noSort=true, and call Envelope_SortPoints when done.
	*
	* autoitem\_idx=-1 for the underlying envelope, 0 for the first automation item on the envelope, etc.
	*
	* For automation items, pass autoitem\_idx|0x10000000 to base ptidx on the number of points in one full loop iteration,
	*
	* even if the automation item is trimmed so that not all points are visible.
	*
	* Otherwise, ptidx will be based on the number of visible points in the automation item, including all loop iterations.
	*
	* See [CountEnvelopePointsEx](#CountEnvelopePointsEx), [GetEnvelopePointEx](#GetEnvelopePointEx), [InsertEnvelopePointEx](#InsertEnvelopePointEx), [DeleteEnvelopePointEx](#DeleteEnvelopePointEx). */
      function SetEnvelopePointEx(envelope: TrackEnvelope, autoitem_idx: number, ptidx: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', boolean: any | 'optional', boolean: any | 'optional'): boolean

      
      /** Sets the RPPXML state of an envelope, returns true if successful.  */
      function SetEnvelopeStateChunk(env: TrackEnvelope, str: string, isundo: boolean): boolean

      
      /** Set the extended state value for a specific section and key. 
	*
	* 
	*
	* Persistant states are stored into the reaper-extstate.ini in the resources-folder.
	*
	* 
	*
	* See [GetExtState](#GetExtState), [DeleteExtState](#DeleteExtState), [HasExtState](#HasExtState). */
      function SetExtState(section: string, key: string, value: string, persist: boolean): void

      
      /** mode: see [GetGlobalAutomationOverride](GetGlobalAutomationOverride) */
      function SetGlobalAutomationOverride(mode: number): void

      
      /** Sets the RPPXML state of an item, returns true if successful. Undo flag is a performance/caching hint. */
      function SetItemStateChunk(item: MediaItem, str: string, isundo: boolean): boolean

      
      /** set &amp;1 to show the master track in the TCP, &amp;2 to show in the mixer. Returns the previous visibility state. See [GetMasterTrackVisibility](#GetMasterTrackVisibility). */
      function SetMasterTrackVisibility(flag: number): number

      
      /** Set media item numerical-value attributes.
	*
	* B_MUTE : bool * : muted
	*
	* B_MUTE_ACTUAL : bool * : muted (ignores solo). setting this value will not affect C_MUTE_SOLO.
	*
	* C_MUTE_SOLO : char * : solo override (-1=soloed, 0=no override, 1=unsoloed). note that this API does not automatically unsolo other items when soloing (nor clear the unsolos when clearing the last soloed item), it must be done by the caller via action or via this API.
	*
	* B_LOOPSRC : bool * : loop source
	*
	* B_ALLTAKESPLAY : bool * : all takes play
	*
	* B_UISEL : bool * : selected in arrange view
	*
	* C_BEATATTACHMODE : char * : item timebase, -1=track or project default, 1=beats (position, length, rate), 2=beats (position only). for auto-stretch timebase: C_BEATATTACHMODE=1, C_AUTOSTRETCH=1
	*
	* C_AUTOSTRETCH: : char * : auto-stretch at project tempo changes, 1=enabled, requires C_BEATATTACHMODE=1
	*
	* C_LOCK : char * : locked, &1=locked
	*
	* D_VOL : double * : item volume, 0=-inf, 0.5=-6dB, 1=+0dB, 2=+6dB, etc
	*
	* D_POSITION : double * : item position in seconds
	*
	* D_LENGTH : double * : item length in seconds
	*
	* D_SNAPOFFSET : double * : item snap offset in seconds
	*
	* D_FADEINLEN : double * : item manual fadein length in seconds
	*
	* D_FADEOUTLEN : double * : item manual fadeout length in seconds
	*
	* D_FADEINDIR : double * : item fadein curvature, -1..1
	*
	* D_FADEOUTDIR : double * : item fadeout curvature, -1..1
	*
	* D_FADEINLEN_AUTO : double * : item auto-fadein length in seconds, -1=no auto-fadein
	*
	* D_FADEOUTLEN_AUTO : double * : item auto-fadeout length in seconds, -1=no auto-fadeout
	*
	* C_FADEINSHAPE : int * : fadein shape, 0..6, 0=linear
	*
	* C_FADEOUTSHAPE : int * : fadeout shape, 0..6, 0=linear
	*
	* I_GROUPID : int * : group ID, 0=no group
	*
	* I_LASTY : int * : Y-position of track in pixels (read-only)
	*
	* I_LASTH : int * : height in track in pixels (read-only)
	*
	* I_CUSTOMCOLOR : int * : custom color, OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). If you do not |0x100000, then it will not be used, but will store the color.
	*
	* I_CURTAKE : int * : active take number
	*
	* IP_ITEMNUMBER : int, item number on this track (read-only, returns the item number directly)
	*
	* F_FREEMODE_Y : float * : free item positioning Y-position, 0=top of track, 1=bottom of track (will never be 1)
	*
	* F_FREEMODE_H : float * : free item positioning height, 0=no height, 1=full height of track (will never be 0) */
      function SetMediaItemInfo_Value(item: MediaItem, parmname: string, newvalue: number): boolean

      
      /** Redraws the screen only if refreshUI == true.
	*
	* See [UpdateArrange](#UpdateArrange)(). */
      function SetMediaItemLength(item: MediaItem, length: number, refreshUI: boolean): boolean

      
      /** Redraws the screen only if refreshUI == true.
	*
	* See [UpdateArrange](#UpdateArrange)(). */
      function SetMediaItemPosition(item: MediaItem, position: number, refreshUI: boolean): boolean

      
      /**  */
      function SetMediaItemSelected(item: MediaItem, selected: boolean): void

      
      /** Set media source of media item take. The old source will not be destroyed, it is the caller's responsibility to retrieve it and destroy it after. If source already exists in any project, it will be duplicated before being set. C/C++ code should not use this and instead use GetSetMediaItemTakeInfo() with P_SOURCE to manage ownership directly. */
      function SetMediaItemTake_Source(take: MediaItem_Take, source: PCM_source): boolean

      
      /** Set media item take numerical-value attributes.
	*
	* D_STARTOFFS : double * : start offset in source media, in seconds
	*
	* D_VOL : double * : take volume, 0=-inf, 0.5=-6dB, 1=+0dB, 2=+6dB, etc, negative if take polarity is flipped
	*
	* D_PAN : double * : take pan, -1..1
	*
	* D_PANLAW : double * : take pan law, -1=default, 0.5=-6dB, 1.0=+0dB, etc
	*
	* D_PLAYRATE : double * : take playback rate, 0.5=half speed, 1=normal, 2=double speed, etc
	*
	* D_PITCH : double * : take pitch adjustment in semitones, -12=one octave down, 0=normal, +12=one octave up, etc
	*
	* B_PPITCH : bool * : preserve pitch when changing playback rate
	*
	* I_CHANMODE : int * : channel mode, 0=normal, 1=reverse stereo, 2=downmix, 3=left, 4=right
	*
	* I_PITCHMODE : int * : pitch shifter mode, -1=projext default, otherwise high 2 bytes=shifter, low 2 bytes=parameter
	*
	* I_CUSTOMCOLOR : int * : custom color, OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). If you do not |0x100000, then it will not be used, but will store the color.
	*
	* IP_TAKENUMBER : int : take number (read-only, returns the take number directly) */
      function SetMediaItemTakeInfo_Value(take: MediaItem_Take, parmname: string, newvalue: number): boolean

      
      /** Set track numerical-value attributes.
	*
	* B_MUTE : bool * : muted
	*
	* B_PHASE : bool * : track phase inverted
	*
	* IP_TRACKNUMBER : int : track number 1-based, 0=not found, -1=master track (read-only, returns the int directly)
	*
	* I_SOLO : int * : soloed, 0=not soloed, 1=soloed, 2=soloed in place, 5=safe soloed, 6=safe soloed in place
	*
	* I_FXEN : int * : fx enabled, 0=bypassed, !0=fx active
	*
	* I_RECARM : int * : record armed, 0=not record armed, 1=record armed
	*
	* I_RECINPUT : int * : record input, &lt;0=no input. if 4096 set, input is MIDI and low 5 bits represent channel (0=all, 1-16=only chan), next 6 bits represent physical input (63=all, 62=VKB). If 4096 is not set, low 10 bits (0..1023) are input start channel (ReaRoute/Loopback start at 512). If 2048 is set, input is multichannel input (using track channel count), or if 1024 is set, input is stereo input, otherwise input is mono.
	*
	* I_RECMODE : int * : record mode, 0=input, 1=stereo out, 2=none, 3=stereo out w/latency compensation, 4=midi output, 5=mono out, 6=mono out w/ latency compensation, 7=midi overdub, 8=midi replace
	*
	* I_RECMON : int * : record monitoring, 0=off, 1=normal, 2=not when playing (tape style)
	*
	* I_RECMONITEMS : int * : monitor items while recording, 0=off, 1=on
	*
	* I_AUTOMODE : int * : track automation mode, 0=trim/off, 1=read, 2=touch, 3=write, 4=latch
	*
	* I_NCHAN : int * : number of track channels, 2-64, even numbers only
	*
	* I_SELECTED : int * : track selected, 0=unselected, 1=selected
	*
	* I_WNDH : int * : current TCP window height in pixels including envelopes (read-only)
	*
	* I_TCPH : int * : current TCP window height in pixels not including envelopes (read-only)
	*
	* I_TCPY : int * : current TCP window Y-position in pixels relative to top of arrange view (read-only)
	*
	* I_MCPX : int * : current MCP X-position in pixels relative to mixer container
	*
	* I_MCPY : int * : current MCP Y-position in pixels relative to mixer container
	*
	* I_MCPW : int * : current MCP width in pixels
	*
	* I_MCPH : int * : current MCP height in pixels
	*
	* I_FOLDERDEPTH : int * : folder depth change, 0=normal, 1=track is a folder parent, -1=track is the last in the innermost folder, -2=track is the last in the innermost and next-innermost folders, etc
	*
	* I_FOLDERCOMPACT : int * : folder compacted state (only valid on folders), 0=normal, 1=small, 2=tiny children
	*
	* I_MIDIHWOUT : int * : track midi hardware output index, &lt;0=disabled, low 5 bits are which channels (0=all, 1-16), next 5 bits are output device index (0-31)
	*
	* I_PERFFLAGS : int * : track performance flags, &1=no media buffering, &2=no anticipative FX
	*
	* I_CUSTOMCOLOR : int * : custom color, OS dependent color|0x100000 (i.e. ColorToNative(r,g,b)|0x100000). If you do not |0x100000, then it will not be used, but will store the color
	*
	* I_HEIGHTOVERRIDE : int * : custom height override for TCP window, 0 for none, otherwise size in pixels
	*
	* B_HEIGHTLOCK : bool * : track height lock (must set I_HEIGHTOVERRIDE before locking)
	*
	* D_VOL : double * : trim volume of track, 0=-inf, 0.5=-6dB, 1=+0dB, 2=+6dB, etc
	*
	* D_PAN : double * : trim pan of track, -1..1
	*
	* D_WIDTH : double * : width of track, -1..1
	*
	* D_DUALPANL : double * : dualpan position 1, -1..1, only if I_PANMODE==6
	*
	* D_DUALPANR : double * : dualpan position 2, -1..1, only if I_PANMODE==6
	*
	* I_PANMODE : int * : pan mode, 0=classic 3.x, 3=new balance, 5=stereo pan, 6=dual pan
	*
	* D_PANLAW : double * : pan law of track, &lt;0=project default, 1=+0dB, etc
	*
	* P_ENV:&lt;envchunkname : TrackEnvelope*, read only. Call with :&lt;VOLENV, :&lt;PANENV, etc appended.
	*
	* B_SHOWINMIXER : bool * : track control panel visible in mixer (do not use on master track)
	*
	* B_SHOWINTCP : bool * : track control panel visible in arrange view (do not use on master track)
	*
	* B_MAINSEND : bool * : track sends audio to parent
	*
	* C_MAINSEND_OFFS : char * : channel offset of track send to parent
	*
	* B_FREEMODE : bool * : track free item positioning enabled (call UpdateTimeline() after changing)
	*
	* C_BEATATTACHMODE : char * : track timebase, -1=project default, 0=time, 1=beats (position, length, rate), 2=beats (position only)
	*
	* F_MCP_FXSEND_SCALE : float * : scale of fx+send area in MCP (0=minimum allowed, 1=maximum allowed)
	*
	* F_MCP_FXPARM_SCALE : float * : scale of fx parameter area in MCP (0=minimum allowed, 1=maximum allowed)
	*
	* F_MCP_SENDRGN_SCALE : float * : scale of send area as proportion of the fx+send total area (0=minimum allowed, 1=maximum allowed)
	*
	* F_TCP_FXPARM_SCALE : float * : scale of TCP parameter area when TCP FX are embedded (0=min allowed, default, 1=max allowed)
	*
	* I_PLAY_OFFSET_FLAG : int * : track playback offset state, &1=bypassed, &2=offset value is measured in samples (otherwise measured in seconds)
	*
	* D_PLAY_OFFSET : double * : track playback offset, units depend on I_PLAY_OFFSET_FLAG */
      function SetMediaTrackInfo_Value(tr: MediaTrack, parmname: string, newvalue: number): boolean

      
      /** Set the MIDI editor grid division. 0.25=quarter note, 1.0/3.0=half note tripet, etc. */
      function SetMIDIEditorGrid(project: ReaProject, division: number): void

      
      /** Scroll the mixer so that leftmosttrack is the leftmost visible track. Returns the leftmost track after scrolling, which may be different from the passed-in track if there are not enough tracks to its right. */
      function SetMixerScroll(leftmosttrack: MediaTrack): MediaTrack

      
      /** Set the mouse modifier assignment for a specific modifier key assignment, in a specific context.
	*
	* Context is a string like "MM_CTX_ITEM". Find these strings by modifying an assignment in 
	*
	* Preferences/Editing/Mouse Modifiers, then looking in reaper-mouse.ini.
	*
	* Modifier flag is a number from 0 to 15: add 1 for shift, 2 for control, 4 for alt, 8 for win.
	*
	* (macOS: add 1 for shift, 2 for command, 4 for opt, 8 for control.)
	*
	* For left-click and double-click contexts, the action can be any built-in command ID number
	*
	* or any custom action ID string. Find built-in command IDs in the REAPER actions window
	*
	* (enable "show action IDs" in the context menu), and find custom action ID strings in reaper-kb.ini.
	*
	* For built-in mouse modifier behaviors, find action IDs (which will be low numbers)
	*
	* by modifying an assignment in Preferences/Editing/Mouse Modifiers, then looking in reaper-mouse.ini.
	*
	* Assigning an action of -1 will reset that mouse modifier behavior to factory default.
	*
	* See [GetMouseModifier](#GetMouseModifier). */
      function SetMouseModifier(context: string, modifier_flag: number, action: string): void

      
      /** Set exactly one track selected, deselect all others.
	*
	* 			
	*
	* 			This sets the track as Last-Touched-Track as well. */
      function SetOnlyTrackSelected(track: MediaTrack): void

      
      /** Set the arrange view grid division. 0.25=quarter note, 1.0/3.0=half note triplet, etc. */
      function SetProjectGrid(project: ReaProject, division: number): void

      
      /** Sets/alters an existing project-marker */
      function SetProjectMarker(markrgnindexnumber: number, isrgn: boolean, pos: number, rgnend: number, name: string): boolean

      
      /** Sets/alters an existing project-marker in a given project. */
      function SetProjectMarker2(proj: ReaProject, markrgnindexnumber: number, isrgn: boolean, pos: number, rgnend: number, name: string): boolean

      
      /** Sets/alters an existing project-marker in a given project. Differs from SetProjectMarker2 and SetProjectMarker, that you can set color as well.
	*
	* Color should be 0 to not change, or ColorToNative(r,g,b)|0x1000000 */
      function SetProjectMarker3(proj: ReaProject, markrgnindexnumber: number, isrgn: boolean, pos: number, rgnend: number, name: string, color: number): boolean

      
      /** Sets/alters an existing project-marker in a given project.
	*
	* color should be 0 to not change, or ColorToNative(r,g,b)|0x1000000, flags&amp;1 to clear name */
      function SetProjectMarker4(proj: ReaProject, markrgnindexnumber: number, isrgn: boolean, pos: number, rgnend: number, name: string, color: number, flags: number): boolean

      
      /** See [SetProjectMarkerByIndex2](#SetProjectMarkerByIndex2). */
      function SetProjectMarkerByIndex(proj: ReaProject, markrgnidx: number, isrgn: boolean, pos: number, rgnend: number, IDnumber: number, name: string, color: number): boolean

      
      /** Differs from SetProjectMarker4 in that markrgnidx is 0 for the first marker/region, 1 for the next, etc (see [EnumProjectMarkers3](#EnumProjectMarkers3)), rather than representing the displayed marker/region ID number (see [SetProjectMarker3](#SetProjectMarker3)). Function will fail if attempting to set a duplicate ID number for a region (duplicate ID numbers for markers are OK). , flags&amp;1 to clear name. */
      function SetProjectMarkerByIndex2(proj: ReaProject, markrgnidx: number, isrgn: boolean, pos: number, rgnend: number, IDnumber: number, name: string, color: number, flags: number): boolean

      
      /** Save a key/value pair for a specific extension, to be restored the next time this specific project is loaded. Typically extname will be the name of a reascript or extension section. If key is NULL or "", all extended data for that extname will be deleted. If val is NULL or "", the data previously associated with that key will be deleted. Returns the size of the state for this extname. See [GetProjExtState](#GetProjExtState), [EnumProjExtState](#EnumProjExtState). */
      function SetProjExtState(proj: ReaProject, extname: string, key: string, value: string): number

      
      /** Add (addorremove &gt; 0) or remove (addorremove &gt; 0) a track from this region when using the region render matrix. */
      function SetRegionRenderMatrix(proj: ReaProject, regionindex: number, track: MediaTrack, addorremove: number): void

      
      /** Inserts or updates a take marker. If idx&lt;0, a take marker will be added, otherwise an existing take marker will be updated. Returns the index of the new or updated take marker (which may change if srcPos is updated).
	*
	* 			
	*
	* 			When inserting a new takemarker, parameter srcposIn must be given!
	*
	* 			
	*
	* See [GetNumTakeMarkers](#GetNumTakeMarkers)), [GetTakeMarker](#GetTakeMarker) and [DeleteTakeMarker](#DeleteTakeMarker). */
      function SetTakeMarker(take: MediaItem_Take, idx: number, nameIn: string, number: any | 'optional', number: any | 'optional'): number

      
      /** Adds or updates a stretch marker. If idx&gt;0, stretch marker will be added. If idx&gt;=0, stretch marker will be updated. When adding, if srcposInOptional is omitted, source position will be auto-calculated. When updating a stretch marker, if srcposInOptional is omitted, srcpos will not be modified. Position/srcposition values will be constrained to nearby stretch markers. Returns index of stretch marker, or -1 if did not insert (or marker already existed at time). */
      function SetTakeStretchMarker(take: MediaItem_Take, idx: number, pos: number, number: any | 'optional'): number

      
      /** See [GetTakeStretchMarkerSlope](#GetTakeStretchMarkerSlope) */
      function SetTakeStretchMarkerSlope(take: MediaItem_Take, idx: number, slope: number): boolean

      
      /** Set parameters of a tempo/time signature marker. Provide either timepos (with measurepos=-1, beatpos=-1), or measurepos and beatpos (with timepos=-1). If timesig\_num and timesig\_denom are zero, the previous time signature will be used. ptidx=-1 will insert a new tempo/time signature marker. See [CountTempoTimeSigMarkers](#CountTempoTimeSigMarkers), [GetTempoTimeSigMarker](#GetTempoTimeSigMarker), [AddTempoTimeSigMarker](#AddTempoTimeSigMarker), [DeleteTempoTimeSigMarker](#DeleteTempoTimeSigMarker). */
      function SetTempoTimeSigMarker(proj: ReaProject, ptidx: number, timepos: number, measurepos: number, beatpos: number, bpm: number, timesig_num: number, timesig_denom: number, lineartempo: boolean): boolean

      
      /** Temporarily updates the theme color to the color specified (or the theme default color if -1 is specified). Returns -1 on failure, otherwise returns the color (or transformed-color). Note that the UI is not updated by this, the caller should call [UpdateArrange()](#UpdateArrange) etc as necessary. If the low bit of flags is set, any color transformations are bypassed. To read a value see [GetThemeColor](#GetThemeColor).
	*
	* 
	*
	*  * col_main_bg2 : Main window/transport background 
	*
	*  * col_main_text2 : Main window/transport text 
	*
	*  * col_main_textshadow : Main window text shadow (ignored if too close to text color) 
	*
	*  * col_main_3dhl : Main window 3D highlight 
	*
	*  * col_main_3dsh : Main window 3D shadow 
	*
	*  * col_main_resize2 : Main window pane resize mouseover 
	*
	*  * col_main_text : Window text 
	*
	*  * col_main_bg : Window background 
	*
	*  * col_main_editbk : Window edit background 
	*
	*  * col_transport_editbk : Transport edit background 
	*
	*  * col_toolbar_text : Toolbar button text 
	*
	*  * col_toolbar_text_on : Toolbar button enabled text 
	*
	*  * col_toolbar_frame : Toolbar frame when floating or docked 
	*
	*  * toolbararmed_color : Toolbar button armed color 
	*
	*  * toolbararmed_drawmode : Toolbar button armed fill mode 
	*
	*  * io_text : I/O window text 
	*
	*  * io_3dhl : I/O window 3D highlight 
	*
	*  * io_3dsh : I/O window 3D shadow 
	*
	*  * genlist_bg : Window list background 
	*
	*  * genlist_fg : Window list text 
	*
	*  * genlist_grid : Window list grid lines 
	*
	*  * genlist_selbg : Window list selected row 
	*
	*  * genlist_selfg : Window list selected text 
	*
	*  * genlist_seliabg : Window list selected row (inactive) 
	*
	*  * genlist_seliafg : Window list selected text (inactive) 
	*
	*  * genlist_hilite : Window list highlighted text
	*
	*  * genlist_hilite_sel : Window list highlighted selected text
	*
	*  * col_buttonbg : Button background 
	*
	*  * col_tcp_text : Track panel text 
	*
	*  * col_tcp_textsel : Track panel (selected) text 
	*
	*  * col_seltrack : Selected track control panel background 
	*
	*  * col_seltrack2 : Unselected track control panel background (enabled with a checkbox above) 
	*
	*  * tcplocked_color : Locked track control panel overlay color 
	*
	*  * tcplocked_drawmode : Locked track control panel fill mode 
	*
	*  * col_tracklistbg : Empty track list area 
	*
	*  * col_mixerbg : Empty mixer list area 
	*
	*  * col_arrangebg : Empty arrange view area 
	*
	*  * arrange_vgrid : Empty arrange view area vertical grid shading 
	*
	*  * col_fadearm : Fader background when automation recording 
	*
	*  * col_fadearm2 : Fader background when automation playing 
	*
	*  * col_fadearm3 : Fader background when in inactive touch/latch 
	*
	*  * col_tl_fg : Timeline foreground 
	*
	*  * col_tl_fg2 : Timeline foreground (secondary markings) 
	*
	*  * col_tl_bg : Timeline background 
	*
	*  * col_tl_bgsel : Time selection color 
	*
	*  * timesel_drawmode : Time selection fill mode 
	*
	*  * col_tl_bgsel2 : Timeline background (in loop points) 
	*
	*  * col_trans_bg : Transport status background 
	*
	*  * col_trans_fg : Transport status text 
	*
	*  * playrate_edited : Project play rate control when not 1.0 
	*
	*  * col_mi_label : Media item label 
	*
	*  * col_mi_label_sel : Media item label (selected) 
	*
	*  * col_mi_label_float : Floating media item label 
	*
	*  * col_mi_label_float_sel : Floating media item label (selected) 
	*
	*  * col_mi_bg : Media item background (odd tracks) 
	*
	*  * col_mi_bg2 : Media item background (even tracks) 
	*
	*  * col_tr1_itembgsel : Media item background selected (odd tracks) 
	*
	*  * col_tr2_itembgsel : Media item background selected (even tracks) 
	*
	*  * itembg_drawmode : Media item background fill mode 
	*
	*  * col_tr1_peaks : Media item peaks (odd tracks) 
	*
	*  * col_tr2_peaks : Media item peaks (even tracks) 
	*
	*  * col_tr1_ps2 : Media item peaks when selected (odd tracks) 
	*
	*  * col_tr2_ps2 : Media item peaks when selected (even tracks) 
	*
	*  * col_peaksedge : Media item peaks edge highlight (odd tracks) 
	*
	*  * col_peaksedge2 : Media item peaks edge highlight (even tracks) 
	*
	*  * col_peaksedgesel : Media item peaks edge highlight when selected (odd tracks) 
	*
	*  * col_peaksedgesel2 : Media item peaks edge highlight when selected (even tracks) 
	*
	*  * cc_chase_drawmode : Media item MIDI CC peaks fill mode 
	*
	*  * col_peaksfade : Media item peaks when active in crossfade editor (fade-out) 
	*
	*  * col_peaksfade2 : Media item peaks when active in crossfade editor (fade-in) 
	*
	*  * col_mi_fades : Media item fade/volume controls 
	*
	*  * fadezone_color : Media item fade quiet zone fill color 
	*
	*  * fadezone_drawmode : Media item fade quiet zone fill mode 
	*
	*  * fadearea_color : Media item fade full area fill color 
	*
	*  * fadearea_drawmode : Media item fade full area fill mode 
	*
	*  * col_mi_fade2 : Media item edges of controls 
	*
	*  * col_mi_fade2_drawmode : Media item edges of controls blend mode 
	*
	*  * item_grouphl : Media item edge when selected via grouping 
	*
	*  * col_offlinetext : Media item "offline" text 
	*
	*  * col_stretchmarker : Media item stretch marker line 
	*
	*  * col_stretchmarker_h0 : Media item stretch marker handle (1x) 
	*
	*  * col_stretchmarker_h1 : Media item stretch marker handle (&gt;1x) 
	*
	*  * col_stretchmarker_h2 : Media item stretch marker handle (&lt;1x) 
	*
	*  * col_stretchmarker_b : Media item stretch marker handle edge 
	*
	*  * col_stretchmarkerm : Media item stretch marker blend mode 
	*
	*  * col_stretchmarker_text : Media item stretch marker text 
	*
	*  * col_stretchmarker_tm : Media item transient guide handle 
	*
	*  * take_marker : Media item take marker 
	*
	*  * selitem_tag : Selected media item bar color 
	*
	*  * activetake_tag : Active media item take bar color 
	*
	*  * col_tr1_bg : Track background (odd tracks) 
	*
	*  * col_tr2_bg : Track background (even tracks) 
	*
	*  * col_tr1_divline : Track divider line (odd tracks) 
	*
	*  * col_tr2_divline : Track divider line (even tracks) 
	*
	*  * col_envlane1_divline : Envelope lane divider line (odd tracks) 
	*
	*  * col_envlane2_divline : Envelope lane divider line (even tracks) 
	*
	*  * marquee_fill : Marquee fill 
	*
	*  * marquee_drawmode : Marquee fill mode 
	*
	*  * marquee_outline : Marquee outline 
	*
	*  * marqueezoom_fill : Marquee zoom fill 
	*
	*  * marqueezoom_drawmode : Marquee zoom fill mode 
	*
	*  * marqueezoom_outline : Marquee zoom outline 
	*
	*  * col_cursor : Edit cursor 
	*
	*  * col_cursor2 : Edit cursor (alternate) 
	*
	*  * playcursor_color : Play cursor 
	*
	*  * playcursor_drawmode : Play cursor fill mode 
	*
	*  * col_gridlines2 : Grid lines (start of measure) 
	*
	*  * col_gridlines2dm : Grid lines (start of measure) 
	*
	*  * col_gridlines3 : Grid lines (start of beats) 
	*
	*  * col_gridlines3dm : Grid lines (start of beats) 
	*
	*  * col_gridlines : Grid lines (in between beats) 
	*
	*  * col_gridlines1dm : Grid lines (in between beats) 
	*
	*  * guideline_color : Editing guide line color 
	*
	*  * guideline_drawmode : Editing guide fill mode 
	*
	*  * region : Regions 
	*
	*  * region_lane_bg : Region lane background 
	*
	*  * region_lane_text : Region lane text 
	*
	*  * marker : Markers 
	*
	*  * marker_lane_bg : Marker lane background 
	*
	*  * marker_lane_text : Marker lane text 
	*
	*  * col_tsigmark : Time signature change marker 
	*
	*  * ts_lane_bg : Time signature lane background 
	*
	*  * ts_lane_text : Time signature lane text 
	*
	*  * timesig_sel_bg : Time signature marker selected background 
	*
	*  * col_routinghl1 : Routing matrix row highlight 
	*
	*  * col_routinghl2 : Routing matrix column highlight 
	*
	*  * col_vudoint : Theme has interlaced VU meters
	*
	*  * col_vuclip : VU meter clip indicator 
	*
	*  * col_vutop : VU meter top 
	*
	*  * col_vumid : VU meter middle 
	*
	*  * col_vubot : VU meter bottom 
	*
	*  * col_vuintcol : VU meter interlace/edge color 
	*
	*  * col_vumidi : VU meter midi activity 
	*
	*  * col_vuind1 : VU (indicator) - no signal 
	*
	*  * col_vuind2 : VU (indicator) - low signal 
	*
	*  * col_vuind3 : VU (indicator) - med signal 
	*
	*  * col_vuind4 : VU (indicator) - hot signal 
	*
	*  * mcp_sends_normal : Sends text: normal 
	*
	*  * mcp_sends_muted : Sends text: muted 
	*
	*  * mcp_send_midihw : Sends text: MIDI hardware 
	*
	*  * mcp_sends_levels : Sends level 
	*
	*  * mcp_fx_normal : FX insert text: normal 
	*
	*  * mcp_fx_bypassed : FX insert text: bypassed 
	*
	*  * mcp_fx_offlined : FX insert text: offline 
	*
	*  * mcp_fxparm_normal : FX parameter text: normal 
	*
	*  * mcp_fxparm_bypassed : FX parameter text: bypassed 
	*
	*  * mcp_fxparm_offlined : FX parameter text: offline 
	*
	*  * tcp_list_scrollbar : List scrollbar (track panel) 
	*
	*  * tcp_list_scrollbar_mode : List scrollbar (track panel) 
	*
	*  * tcp_list_scrollbar_mouseover : List scrollbar mouseover (track panel) 
	*
	*  * tcp_list_scrollbar_mouseover_mode : List scrollbar mouseover (track panel) 
	*
	*  * mcp_list_scrollbar : List scrollbar (mixer panel) 
	*
	*  * mcp_list_scrollbar_mode : List scrollbar (mixer panel) 
	*
	*  * mcp_list_scrollbar_mouseover : List scrollbar mouseover (mixer panel) 
	*
	*  * mcp_list_scrollbar_mouseover_mode : List scrollbar mouseover (mixer panel)  
	*
	*  * midi_rulerbg : MIDI editor ruler background 
	*
	*  * midi_rulerfg : MIDI editor ruler text 
	*
	*  * midi_grid2 : MIDI editor grid line (start of measure) 
	*
	*  * midi_griddm2 : MIDI editor grid line (start of measure) 
	*
	*  * midi_grid3 : MIDI editor grid line (start of beats) 
	*
	*  * midi_griddm3 : MIDI editor grid line (start of beats) 
	*
	*  * midi_grid1 : MIDI editor grid line (between beats) 
	*
	*  * midi_griddm1 : MIDI editor grid line (between beats) 
	*
	*  * midi_trackbg1 : MIDI editor background color (naturals) 
	*
	*  * midi_trackbg2 : MIDI editor background color (sharps/flats) 
	*
	*  * midi_trackbg_outer1 : MIDI editor background color, out of bounds (naturals) 
	*
	*  * midi_trackbg_outer2 : MIDI editor background color, out of bounds (sharps/flats) 
	*
	*  * midi_selpitch1 : MIDI editor background color, selected pitch (naturals) 
	*
	*  * midi_selpitch2 : MIDI editor background color, selected pitch (sharps/flats) 
	*
	*  * midi_selbg : MIDI editor time selection color 
	*
	*  * midi_selbg_drawmode : MIDI editor time selection fill mode 
	*
	*  * midi_gridhc : MIDI editor CC horizontal center line 
	*
	*  * midi_gridhcdm : MIDI editor CC horizontal center line 
	*
	*  * midi_gridh : MIDI editor CC horizontal line 
	*
	*  * midi_gridhdm : MIDI editor CC horizontal line 
	*
	*  * midi_ccbut : MIDI editor CC lane add/remove buttons 
	*
	*  * midi_ccbut_text : MIDI editor CC lane button text 
	*
	*  * midi_ccbut_arrow : MIDI editor CC lane button arrow 
	*
	*  * midioct : MIDI editor octave line color 
	*
	*  * midi_inline_trackbg1 : MIDI inline background color (naturals) 
	*
	*  * midi_inline_trackbg2 : MIDI inline background color (sharps/flats) 
	*
	*  * midioct_inline : MIDI inline octave line color 
	*
	*  * midi_endpt : MIDI editor end marker 
	*
	*  * midi_notebg : MIDI editor note, unselected (midi_note_colormap overrides) 
	*
	*  * midi_notefg : MIDI editor note, selected (midi_note_colormap overrides) 
	*
	*  * midi_notemute : MIDI editor note, muted, unselected (midi_note_colormap overrides) 
	*
	*  * midi_notemute_sel : MIDI editor note, muted, selected (midi_note_colormap overrides) 
	*
	*  * midi_itemctl : MIDI editor note controls 
	*
	*  * midi_ofsn : MIDI editor note (offscreen) 
	*
	*  * midi_ofsnsel : MIDI editor note (offscreen, selected) 
	*
	*  * midi_editcurs : MIDI editor cursor 
	*
	*  * midi_pkey1 : MIDI piano key color (naturals background, sharps/flats text) 
	*
	*  * midi_pkey2 : MIDI piano key color (sharps/flats background, naturals text) 
	*
	*  * midi_pkey3 : MIDI piano key color (selected) 
	*
	*  * midi_noteon_flash : MIDI piano key note-on flash 
	*
	*  * midi_leftbg : MIDI piano pane background 
	*
	*  * midifont_col_light_unsel : MIDI editor note text and control color, unselected (light) 
	*
	*  * midifont_col_dark_unsel : MIDI editor note text and control color, unselected (dark) 
	*
	*  * midifont_mode_unsel : MIDI editor note text and control mode, unselected
	*
	*  * midifont_col_light : MIDI editor note text and control color (light) 
	*
	*  * midifont_col_dark : MIDI editor note text and control color (dark) 
	*
	*  * midifont_mode : MIDI editor note text and control mode 
	*
	*  * score_bg : MIDI notation editor background 
	*
	*  * score_fg : MIDI notation editor staff/notation/text 
	*
	*  * score_sel : MIDI notation editor selected staff/notation/text 
	*
	*  * score_timesel : MIDI notation editor time selection 
	*
	*  * score_loop : MIDI notation editor loop points, selected pitch 
	*
	*  * midieditorlist_bg : MIDI list editor background 
	*
	*  * midieditorlist_fg : MIDI list editor text 
	*
	*  * midieditorlist_grid : MIDI list editor grid lines 
	*
	*  * midieditorlist_selbg : MIDI list editor selected row 
	*
	*  * midieditorlist_selfg : MIDI list editor selected text 
	*
	*  * midieditorlist_seliabg : MIDI list editor selected row (inactive) 
	*
	*  * midieditorlist_seliafg : MIDI list editor selected text (inactive) 
	*
	*  * midieditorlist_bg2 : MIDI list editor background (secondary) 
	*
	*  * midieditorlist_fg2 : MIDI list editor text (secondary) 
	*
	*  * midieditorlist_selbg2 : MIDI list editor selected row (secondary) 
	*
	*  * midieditorlist_selfg2 : MIDI list editor selected text (secondary) 
	*
	*  * col_explorer_sel : Media explorer selection 
	*
	*  * col_explorer_seldm : Media explorer selection mode 
	*
	*  * col_explorer_seledge : Media explorer selection edge 
	*
	*  * docker_shadow : Tab control shadow 
	*
	*  * docker_selface : Tab control selected tab 
	*
	*  * docker_unselface : Tab control unselected tab 
	*
	*  * docker_text : Tab control text 
	*
	*  * docker_text_sel : Tab control text selected tab 
	*
	*  * docker_bg : Tab control background 
	*
	*  * windowtab_bg : Tab control background in windows 
	*
	*  * auto_item_unsel : Envelope: Unselected automation item 
	*
	*  * col_env1 : Envelope: Volume (pre-FX) 
	*
	*  * col_env2 : Envelope: Volume 
	*
	*  * env_trim_vol : Envelope: Trim Volume 
	*
	*  * col_env3 : Envelope: Pan (pre-FX) 
	*
	*  * col_env4 : Envelope: Pan 
	*
	*  * env_track_mute : Envelope: Mute 
	*
	*  * col_env5 : Envelope: Master playrate 
	*
	*  * col_env6 : Envelope: Master tempo 
	*
	*  * col_env7 : Envelope: Send volume 
	*
	*  * col_env8 : Envelope: Send pan 
	*
	*  * col_env9 : Envelope: Send volume 2 
	*
	*  * col_env10 : Envelope: Send pan 2 
	*
	*  * env_sends_mute : Envelope: Send mute 
	*
	*  * col_env11 : Envelope: Audio hardware output volume 
	*
	*  * col_env12 : Envelope: Audio hardware output pan 
	*
	*  * col_env13 : Envelope: FX parameter 1 
	*
	*  * col_env14 : Envelope: FX parameter 2 
	*
	*  * col_env15 : Envelope: FX parameter 3 
	*
	*  * col_env16 : Envelope: FX parameter 4 
	*
	*  * env_item_vol : Envelope: Item take volume 
	*
	*  * env_item_pan : Envelope: Item take pan 
	*
	*  * env_item_mute : Envelope: Item take mute 
	*
	*  * env_item_pitch : Envelope: Item take pitch 
	*
	*  * wiring_grid2 : Wiring: Background 
	*
	*  * wiring_grid : Wiring: Background grid lines 
	*
	*  * wiring_border : Wiring: Box border 
	*
	*  * wiring_tbg : Wiring: Box background 
	*
	*  * wiring_ticon : Wiring: Box foreground 
	*
	*  * wiring_recbg : Wiring: Record section background 
	*
	*  * wiring_recitem : Wiring: Record section foreground 
	*
	*  * wiring_media : Wiring: Media 
	*
	*  * wiring_recv : Wiring: Receives 
	*
	*  * wiring_send : Wiring: Sends 
	*
	*  * wiring_fader : Wiring: Fader 
	*
	*  * wiring_parent : Wiring: Master/Parent 
	*
	*  * wiring_parentwire_border : Wiring: Master/Parent wire border 
	*
	*  * wiring_parentwire_master : Wiring: Master/Parent to master wire 
	*
	*  * wiring_parentwire_folder : Wiring: Master/Parent to parent folder wire 
	*
	*  * wiring_pin_normal : Wiring: Pins normal 
	*
	*  * wiring_pin_connected : Wiring: Pins connected 
	*
	*  * wiring_pin_disconnected : Wiring: Pins disconnected 
	*
	*  * wiring_horz_col : Wiring: Horizontal pin connections 
	*
	*  * wiring_sendwire : Wiring: Send hanging wire 
	*
	*  * wiring_hwoutwire : Wiring: Hardware output wire 
	*
	*  * wiring_recinputwire : Wiring: Record input wire 
	*
	*  * wiring_hwout : Wiring: System hardware outputs 
	*
	*  * wiring_recinput : Wiring: System record inputs 
	*
	*  * group_0 : Group #1 
	*
	*  * group_1 : Group #2 
	*
	*  * group_2 : Group #3 
	*
	*  * group_3 : Group #4 
	*
	*  * group_4 : Group #5 
	*
	*  * group_5 : Group #6 
	*
	*  * group_6 : Group #7 
	*
	*  * group_7 : Group #8 
	*
	*  * group_8 : Group #9 
	*
	*  * group_9 : Group #10 
	*
	*  * group_10 : Group #11 
	*
	*  * group_11 : Group #12 
	*
	*  * group_12 : Group #13 
	*
	*  * group_13 : Group #14 
	*
	*  * group_14 : Group #15 
	*
	*  * group_15 : Group #16 
	*
	*  * group_16 : Group #17 
	*
	*  * group_17 : Group #18 
	*
	*  * group_18 : Group #19 
	*
	*  * group_19 : Group #20 
	*
	*  * group_20 : Group #21 
	*
	*  * group_21 : Group #22 
	*
	*  * group_22 : Group #23 
	*
	*  * group_23 : Group #24 
	*
	*  * group_24 : Group #25 
	*
	*  * group_25 : Group #26 
	*
	*  * group_26 : Group #27 
	*
	*  * group_27 : Group #28 
	*
	*  * group_28 : Group #29 
	*
	*  * group_29 : Group #30 
	*
	*  * group_30 : Group #31 
	*
	*  * group_31 : Group #32 
	*
	*  * group_32 : Group #33 
	*
	*  * group_33 : Group #34 
	*
	*  * group_34 : Group #35 
	*
	*  * group_35 : Group #36 
	*
	*  * group_36 : Group #37 
	*
	*  * group_37 : Group #38 
	*
	*  * group_38 : Group #39 
	*
	*  * group_39 : Group #40 
	*
	*  * group_40 : Group #41 
	*
	*  * group_41 : Group #42 
	*
	*  * group_42 : Group #43 
	*
	*  * group_43 : Group #44 
	*
	*  * group_44 : Group #45 
	*
	*  * group_45 : Group #46 
	*
	*  * group_46 : Group #47 
	*
	*  * group_47 : Group #48 
	*
	*  * group_48 : Group #49 
	*
	*  * group_49 : Group #50 
	*
	*  * group_50 : Group #51 
	*
	*  * group_51 : Group #52 
	*
	*  * group_52 : Group #53 
	*
	*  * group_53 : Group #54 
	*
	*  * group_54 : Group #55 
	*
	*  * group_55 : Group #56 
	*
	*  * group_56 : Group #57 
	*
	*  * group_57 : Group #58 
	*
	*  * group_58 : Group #59 
	*
	*  * group_59 : Group #60 
	*
	*  * group_60 : Group #61 
	*
	*  * group_61 : Group #62 
	*
	*  * group_62 : Group #63 
	*
	*  * group_63 : Group #64  */
      function SetThemeColor(ini_key: string, color: number, flags: number): number

      
      /** Updates the toggle state of an action, returns true if succeeded. Only ReaScripts can have their toggle states changed programmatically. See [RefreshToolbar2](#RefreshToolbar2). */
      function SetToggleCommandState(section_id: number, command_id: number, state: number): boolean

      
      /** Set automation-mode for a specific MediaTrack. */
      function SetTrackAutomationMode(tr: MediaTrack, mode: number): void

      
      /** Set the custom track color, color is OS dependent (i.e. [ColorToNative(r,g,b)](#ColorToNative). */
      function SetTrackColor(track: MediaTrack, color: number): void

      
      /** Set all MIDI lyrics on the track. Lyrics will be stuffed into any MIDI items found in range. Flag is unused at present. str is passed in as beat position, tab, text, tab (example with flag=2: "1.1.2\tLyric for measure 1 beat 2\t.1.1\tLyric for measure 2 beat 1    "). See [GetTrackMIDILyrics](#GetTrackMIDILyrics) */
      function SetTrackMIDILyrics(track: MediaTrack, flag: number, str: string): boolean

      
      /** channel &gt; 0 assigns these note names to all channels. */
      function SetTrackMIDINoteName(track: number, pitch: number, chan: number, name: string): boolean

      
      /** channel &gt; 0 assigns note name to all channels. pitch 128 assigns name for CC0, pitch 129 for CC1, etc. */
      function SetTrackMIDINoteNameEx(proj: ReaProject, track: MediaTrack, pitch: number, chan: number, name: string): boolean

      
      /** Set a MediaTrack selected/deselected. Will retain already existing selection, so you can set multiple tracks selected that way.
	*
	* 			
	*
	* 			Will not affect Last-Touched-Track. */
      function SetTrackSelected(track: MediaTrack, selected: boolean): void

      
      /** Set send/receive/hardware output numerical-value attributes, return true on success.
	*
	* category is &lt;0 for receives, 0=sends, &gt;0 for hardware outputs
	*
	* parameter names:
	*
	* 
	*
	*     B\_MUTE : bool \*
	*
	*     B\_PHASE : bool \*, true to flip phase
	*
	*     B\_MONO : bool \*
	*
	*     D\_VOL : double \*, 1.0 = +0dB etc
	*
	*     D\_PAN : double \*, -1..+1
	*
	*     D\_PANLAW : double \*,1.0=+0.0db, 0.5=-6dB, -1.0 = projdef etc
	*
	*     I\_SENDMODE : int \*, 0=post-fader, 1=pre-fx, 2=post-fx (deprecated), 3=post-fx
	*
	*     I\_AUTOMODE : int \* : automation mode (-1=use track automode, 0=trim/off, 1=read, 2=touch, 3=write, 4=latch)
	*
	*     I\_SRCCHAN : int \*, index,&amp;1024=mono, -1 for none
	*
	*     I\_DSTCHAN : int \*, index, &amp;1024=mono, otherwise stereo pair, hwout:&amp;512=rearoute
	*
	*     I\_MIDIFLAGS : int \*, low 5 bits=source channel 0=all, 1-16, next 5 bits=dest channel, 0=orig, 1-16=chanSee [CreateTrackSend](#CreateTrackSend), [RemoveTrackSend](#RemoveTrackSend), [GetTrackNumSends](#GetTrackNumSends).
	*
	* 
	*
	* 
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc).
	*
	* 
	*
	* See [CreateTrackSend](#CreateTrackSend), [RemoveTrackSend](#RemoveTrackSend), [GetTrackNumSends](#GetTrackNumSends). */
      function SetTrackSendInfo_Value(tr: MediaTrack, category: number, sendidx: number, parmname: string, newvalue: number): boolean

      
      /** send_idx&lt;0 for receives, &gt;=0 for hw ouputs, &gt;=nb_of_hw_ouputs for sends. isend=1 for end of edit, -1 for an instant edit (such as reset), 0 for normal tweak. */
      function SetTrackSendUIPan(track: MediaTrack, send_idx: number, pan: number, isend: number): boolean

      
      /** send_idx&lt;0 for receives, &gt;=0 for hw ouputs, &gt;=nb_of_hw_ouputs for sends. isend=1 for end of edit, -1 for an instant edit (such as reset), 0 for normal tweak. */
      function SetTrackSendUIVol(track: MediaTrack, send_idx: number, vol: number, isend: number): boolean

      
      /** Sets the RPPXML state of a track, returns true if successful. Undo flag is a performance/caching hint. */
      function SetTrackStateChunk(track: MediaTrack, str: string, isundo: boolean): boolean

      
      /** shows a Reaper-context menu.
	*
	* You can decide, which menu to show and to which track/item/envelope/envelope-point/automation-item you want this context-menu to be applied to.
	*
	* e.g. you can decide, whether settings in the context-menu "track_panel" shall be applied to track 1, track 2, etc
	*
	* 
	*
	* You can also apply this to the selected track/mediaitem/envelope.
	*
	* The parameters name and ctx influence each other, means: name="item" and ctx=reaper.GetMediaItem(0,1) apply the mediaitem-contextmenu to the Mediaitem-object, given to parameter ctx.
	*
	* The choice of the parameter name also influences, whether ctxOptional and ctx2Optional can be set or not and what they mean.
	*
	* 
	*
	* Blocks further execution of a script, until the context-menu is closed. */
      function ShowPopupMenu(name: string, x: number, y: number, HWND: any | 'optional', ctx: identifier, ctx2: number, ctx3: number): void

      
      /**  */
      function ShowActionList(caller: KbdSectionInfo, HWND: any | 'optional'): void

      
      /** Show a message to the user (also useful for debugging). Send "\n" for newline, "" to clear the console. See [ClearConsole](#ClearConsole) */
      function ShowConsoleMsg(msg: string): void

      
      /** Shows Messagebox with user-clickable buttons.            */
      function ShowMessageBox(msg: string, title: string, type: number): number

      
      /** Convert slider-value to it's dB-value-equivalent. */
      function SLIDER2DB(y: number): number

      
      /**  */
      function SnapToGrid(project: ReaProject, time_pos: number): number

      
      /** Set solo-state for all tracks. */
      function SoloAllTracks(solo: number): void

      
      /** gets the splash window, in case you want to display a message over it. Returns NULL when the sphah window is not displayed. */
      function Splash_GetWnd(): HWND

      
      /** The original item becomes the left-hand split, the function returns the right-hand split (or NULL if the split failed) */
      function SplitMediaItem(item: MediaItem, position: number): MediaItem

      
      /**  */
      function stringToGuid(str: string, gGUID: string): string

      
      /** Stuffs a 3 byte MIDI message into either the Virtual MIDI Keyboard queue, or the MIDI-as-control input queue, or sends to a MIDI hardware output. mode=0 for VKB, 1 for control (actions map etc), 2 for VKB-on-current-channel; 16 for external MIDI device 0, 17 for external MIDI device 1, etc; see [GetNumMIDIOutputs](#GetNumMIDIOutputs), [GetMIDIOutputName](#GetMIDIOutputName).
	*
	* 
	*
	* if mode is set to 1, you can send messages as control-message for Parameter LEarn/Modulation and as shortcut for scripts.
	*
	* The parameter msg3 can be retrieved with the returnvalue val of the function reaper.get\_action\_context, so sending values to a script is possible that way.
	*
	* 
	*
	* For more detailed information about the possible midi-messages you can send via StuffMIDIMessage, see: [StuffMIDIMessage-docs](../misc/misc_docs/Reaper-StuffMidiMessage-docs.txt) */
      function StuffMIDIMessage(mode: number, msg1: number, msg2: number, msg3: number): void

      
      /** Adds or queries the position of a named FX in a take. See [TrackFX\_AddByName()](#TrackFX_AddByName) for information on fxname and instantiate.  */
      function TakeFX_AddByName(take: MediaItem_Take, fxname: string, instantiate: number): number

      
      /**  */
      function TakeFX_EndParamEdit(take: MediaItem_Take, fx: number, param: number): boolean

      
      /** Note: only works with FX that support Cockos VST extensions. */
      function TakeFX_FormatParamValue(take: MediaItem_Take, fx: number, param: number, val: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Note: only works with FX that support Cockos VST extensions. */
      function TakeFX_FormatParamValueNormalized(take: MediaItem_Take, fx: number, param: number, value: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** returns index of effect visible in chain, or -1 for chain hidden, or -2 for chain visible but no effect selected */
      function TakeFX_GetChainVisible(take: MediaItem_Take): number

      
      /**  */
      function TakeFX_GetCount(take: MediaItem_Take): number

      
      /** See [TakeFX\_SetEnabled](#TakeFX_SetEnabled) */
      function TakeFX_GetEnabled(take: MediaItem_Take, fx: number): boolean

      
      /** Returns the FX parameter envelope. If the envelope does not exist and create=true, the envelope will be created. */
      function TakeFX_GetEnvelope(take: MediaItem_Take, fxindex: number, parameterindex: number, create: boolean): TrackEnvelope

      
      /** returns HWND of floating window for effect index, if any */
      function TakeFX_GetFloatingWindow(take: MediaItem_Take, index: number): HWND

      
      /**  */
      function TakeFX_GetFormattedParamValue(take: MediaItem_Take, fx: number, param: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TakeFX_GetFXGUID(take: MediaItem_Take, fx: number): string

      
      /**  */
      function TakeFX_GetFXName(take: MediaItem_Take, fx: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** sets the number of input/output pins for FX if available, returns plug-in type or -1 on error */
      function TakeFX_GetIOSize(take: MediaItem_Take, fx: number): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional']>

      
      /** gets plug-in specific named configuration value (returns true on success) */
      function TakeFX_GetNamedConfigParm(take: MediaItem_Take, fx: number, parmname: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TakeFX_GetNumParams(take: MediaItem_Take, fx: number): number

      
      /** Returns true if this FX UI is open in the FX chain window or a floating window. See [TakeFX\_SetOpen](#TakeFX_SetOpen) */
      function TakeFX_GetOpen(take: MediaItem_Take, fx: number): boolean

      
      /**  */
      function TakeFX_GetParam(take: MediaItem_Take, fx: number, param: number): MultiReturn<[retval: number, minval: number, maxval: number]>

      
      /**  */
      function TakeFX_GetParameterStepSizes(take: MediaItem_Take, fx: number, param: number): MultiReturn<[retval: boolean, step: number, smallstep: number, largestep: number, istoggle: boolean]>

      
      /**  */
      function TakeFX_GetParamEx(take: MediaItem_Take, fx: number, param: number): MultiReturn<[retval: number, minval: number, maxval: number, midval: number]>

      
      /**  */
      function TakeFX_GetParamName(take: MediaItem_Take, fx: number, param: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TakeFX_GetParamNormalized(take: MediaItem_Take, fx: number, param: number): number

      
      /** gets the effective channel mapping bitmask for a particular pin. high32OutOptional will be set to the high 32 bits */
      function TakeFX_GetPinMappings(tr: MediaItem_Take, fx: number, is: number, pin: number): MultiReturn<[retval: number, number: any | 'optional']>

      
      /** Get the name of the preset currently showing in the REAPER dropdown, or the full path to a factory preset file for VST3 plug-ins (.vstpreset). Returns false if the current FX parameters do not exactly match the preset (in other words, if the user loaded the preset but moved the knobs afterward). See [TakeFX\_SetPreset](#TakeFX_SetPreset). */
      function TakeFX_GetPreset(take: MediaItem_Take, fx: number, presetname: string): MultiReturn<[retval: boolean, presetname: string]>

      
      /** Returns current preset index, or -1 if error. numberOfPresetsOut will be set to total number of presets available. See [TakeFX\_SetPresetByIndex](#TakeFX_SetPresetByIndex) */
      function TakeFX_GetPresetIndex(take: MediaItem_Take, fx: number): MultiReturn<[retval: number, numberOfPresets: number]>

      
      /**  */
      function TakeFX_GetUserPresetFilename(take: MediaItem_Take, fx: number, fn: string): string

      
      /** presetmove==1 activates the next preset, presetmove==-1 activates the previous preset, etc. */
      function TakeFX_NavigatePresets(take: MediaItem_Take, fx: number, presetmove: number): boolean

      
      /** See [TakeFX\_GetEnabled](#TakeFX_GetEnabled) */
      function TakeFX_SetEnabled(take: MediaItem_Take, fx: number, enabled: boolean): void

      
      /** gets plug-in specific named configuration value (returns true on success) */
      function TakeFX_SetNamedConfigParm(take: MediaItem_Take, fx: number, parmname: string, value: string): boolean

      
      /** Open this FX UI. See [TakeFX\_GetOpen](#TakeFX_GetOpen) */
      function TakeFX_SetOpen(take: MediaItem_Take, fx: number, open: boolean): void

      
      /**  */
      function TakeFX_SetParam(take: MediaItem_Take, fx: number, param: number, val: number): boolean

      
      /**  */
      function TakeFX_SetParamNormalized(take: MediaItem_Take, fx: number, param: number, value: number): boolean

      
      /** sets the channel mapping bitmask for a particular pin. returns false if unsupported (not all types of plug-ins support this capability) */
      function TakeFX_SetPinMappings(tr: MediaItem_Take, fx: number, is: number, pin: number, low32bits: number, hi32bits: number): boolean

      
      /** Activate a preset with the name shown in the REAPER dropdown. Full paths to .vstpreset files are also supported for VST3 plug-ins. See [TakeFX\_GetPreset](#TakeFX_GetPreset). */
      function TakeFX_SetPreset(take: MediaItem_Take, fx: number, presetname: string): boolean

      
      /** Sets the preset idx, or the factory preset (idx==-2), or the default user preset (idx==-1). Returns true on success. See [TakeFX\_GetPresetIndex](#TakeFX_GetPresetIndex). */
      function TakeFX_SetPresetByIndex(take: MediaItem_Take, fx: number, idx: number): boolean

      
      /** showflag=0 for hidechain, =1 for show chain(index valid), =2 for hide floating window(index valid), =3 for show floating window (index valid) */
      function TakeFX_Show(take: MediaItem_Take, index: number, showFlag: number): void

      
      /** Returns true if the active take contains MIDI. */
      function TakeIsMIDI(take: MediaItem_Take): boolean

      
      /** Gets theme layout information. 
	*
	* 
	*
	*     section can be 'global' for global layout override, 'seclist' to enumerate a list of layout sections, otherwise a layout section such as 'mcp', 'tcp', 'trans', etc. 
	*
	*     idx can be 
	*
	*         -1 to query the current value, 
	*
	*         -2 to get the description of the section (if not global), 
	*
	*         -3 will return the current context DPI-scaling (256=normal, 512=retina, etc), or 0..x. 
	*
	*         
	*
	*  returns false if failed. */
      function ThemeLayout_GetLayout(section: string, idx: number): MultiReturn<[retval: boolean, name: string]>

      
      /** returns theme layout parameter. return value is cfg-name, or nil/empty if out of range. */
      function ThemeLayout_GetParameter(wp: number): MultiReturn<[retval: string, string: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional']>

      
      /** Refreshes all layouts */
      function ThemeLayout_RefreshAll(): void

      
      /** Sets theme layout override for a particular section 
	*
	* 
	*
	* section can be 'global' or 'mcp' etc. 
	*
	* 
	*
	* If setting global layout, prefix a ! to the layout string to clear any per-layout overrides. 
	*
	* 
	*
	* Returns false if failed. */
      function ThemeLayout_SetLayout(section: string, layout: string): boolean

      
      /** sets theme layout parameter to value. persist=true in order to have change loaded on next theme load. 
	*
	* 
	*
	* note that the caller should update layouts via ??? to make changes visible. */
      function ThemeLayout_SetParameter(wp: number, value: number, persist: boolean): boolean

      
      /** Gets a precise system timestamp in seconds.
	*
	* 
	*
	* For EEL-programming, see [eel\_time\_precise](#eel_time_precise). */
      function time_precise(): number

      
      /** convert a beat position (or optionally a beats+measures if measures is non-NULL) to time. */
      function TimeMap2_beatsToTime(proj: ReaProject, tpos: number, number: any | 'optional'): number

      
      /** get the effective BPM at the time (seconds) position (i.e. 2x in /8 signatures) */
      function TimeMap2_GetDividedBpmAtTime(proj: ReaProject, time: number): number

      
      /** when does the next time map (tempo or time sig) change occur */
      function TimeMap2_GetNextChangeTime(proj: ReaProject, time: number): number

      
      /** converts project QN position to time. */
      function TimeMap2_QNToTime(proj: ReaProject, qn: number): number

      
      /** convert a time into beats.
	*
	* if measures is non-NULL, measures will be set to the measure count, return value will be beats since measure.
	*
	* if cml is non-NULL, will be set to current measure length in beats (i.e. time signature numerator)
	*
	* if fullbeats is non-NULL, and measures is non-NULL, fullbeats will get the full beat count (same value returned if measures is NULL).
	*
	* if cdenom is non-NULL, will be set to the current time signature denominator. */
      function TimeMap2_timeToBeats(proj: ReaProject, tpos: number): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional']>

      
      /** converts project time position to QN position. */
      function TimeMap2_timeToQN(proj: ReaProject, tpos: number): number

      
      /** Gets project framerate, and optionally whether it is drop-frame timecode */
      function TimeMap_curFrameRate(proj: ReaProject): MultiReturn<[retval: number, boolean: any | 'optional']>

      
      /** get the effective BPM at the time (seconds) position (i.e. 2x in /8 signatures) */
      function TimeMap_GetDividedBpmAtTime(time: number): number

      
      /** Get the QN position and time signature information for the start of a measure. Return the time in seconds of the measure start. */
      function TimeMap_GetMeasureInfo(proj: ReaProject, measure: number): MultiReturn<[retval: number, qn_start: number, qn_end: number, timesig_num: number, timesig_denom: number, tempo: number]>

      
      /** Fills in a string representing the active metronome pattern. For example, in a 7/8 measure divided 3+4, the pattern might be "1221222". The length of the string is the time signature numerator, and the function returns the time signature denominator. */
      function TimeMap_GetMetronomePattern(proj: ReaProject, time: number, pattern: string): MultiReturn<[retval: number, pattern: string]>

      
      /** get the effective time signature and tempo */
      function TimeMap_GetTimeSigAtTime(proj: ReaProject, time: number): MultiReturn<[timesig_num: number, timesig_denom: number, tempo: number]>

      
      /** Find which measure the given QN position falls in. */
      function TimeMap_QNToMeasures(proj: ReaProject, qn: number): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional']>

      
      /** converts project QN position to time. */
      function TimeMap_QNToTime(qn: number): number

      
      /** Converts project quarter note count (QN) to time. QN is counted from the start of the project, regardless of any partial measures. See [TimeMap2\_QNToTime](#TimeMap2_QNToTime) */
      function TimeMap_QNToTime_abs(proj: ReaProject, qn: number): number

      
      /** converts project QN position to time. */
      function TimeMap_timeToQN(tpos: number): number

      
      /** Converts project time position to quarter note count (QN). QN is counted from the start of the project, regardless of any partial measures. See [TimeMap2\_timeToQN](#TimeMap2_timeToQN) */
      function TimeMap_timeToQN_abs(proj: ReaProject, tpos: number): number

      
      /** send_idx&lt;0 for receives, &gt;=0 for hw ouputs, &gt;=nb_of_hw_ouputs for sends. */
      function ToggleTrackSendUIMute(track: MediaTrack, send_idx: number): boolean

      
      /**  */
      function Track_GetPeakHoldDB(track: MediaTrack, channel: number, clear: boolean): number

      
      /**  */
      function Track_GetPeakInfo(track: MediaTrack, channel: number): number

      
      /** Displays tooltip at location, or removes if empty string.
	*
	* 
	*
	* Only one tooltip can be shown, means, a new tooltip removes the previous one. */
      function TrackCtl_SetToolTip(fmt: string, xpos: number, ypos: number, topmost: boolean): void

      
      /** Adds or queries the position of a named FX from the track FX chain (recFX=false) or record input FX/monitoring FX (recFX=true, monitoring FX are on master track). 
	*
	* 
	*
	* Specify a negative value for instantiate to always create a new effect, 
	*
	* 0 to only query the first instance of an effect, or a positive value to add an instance if one is not found.             
	*
	* 
	*
	* Returns -1 on failure or the new position in chain on success. */
      function TrackFX_AddByName(track: MediaTrack, fxname: string, recFX: boolean, instantiate: number): number

      
      /** Copies (or moves) FX from src_track to dest_track. Can be used with src_track=dest_track to reorder, FX indices have 0x1000000 set to reference input FX.  */
      function TrackFX_CopyToTrack(src_track: MediaTrack, src_fx: number, dest_track: MediaTrack, dest_fx: number, is_move: boolean): void

      
      /** Copies (or moves) FX from src_track to dest_take. src_fx can have 0x1000000 set to reference input FX.  */
      function TrackFX_CopyToTake(src_track: MediaTrack, src_fx: number, dest_take: MediaItem_Take, dest_fx: number, is_move: boolean): void

      
      /**  */
      function TrackFX_EndParamEdit(track: MediaTrack, fx: number, param: number): boolean

      
      /** returns a formatted version of the currently set parameter-value.
	*
	* 
	*
	* Note: only works with FX that support Cockos VST extensions.
	*
	* 
	*
	* returns false in case of an error */
      function TrackFX_FormatParamValue(track: MediaTrack, fx: number, param: number, val: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** returns a formatted version of the currently set parameter-value and normalizes it.
	*
	*         
	*
	* Note: only works with FX that support Cockos VST extensions.
	*
	* 
	*
	* returns false in case of an error */
      function TrackFX_FormatParamValueNormalized(track: MediaTrack, fx: number, param: number, value: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get the index of the first track FX insert that matches fxname. If the FX is not in the chain and instantiate is true, it will be inserted. See [TrackFX\_GetInstrument](#TrackFX_GetInstrument), [TrackFX\_GetEQ](#TrackFX_GetEQ). Deprecated in favor of TrackFX_AddByName.
	*
	* 
	*
	* returns -1 in case of an error */
      function TrackFX_GetByName(track: MediaTrack, fxname: string, instantiate: boolean): number

      
      /** returns index of effect visible in chain, or -1 for chain hidden, or -2 for chain visible but no effect selected */
      function TrackFX_GetChainVisible(track: MediaTrack): number

      
      /** returns the number of trackfx in the FXChain of track */
      function TrackFX_GetCount(track: MediaTrack): number

      
      /** returns, if a certain FX in track is enabled
	*
	* 
	*
	* See [TrackFX\_SetEnabled](#TrackFX_SetEnabled)
	*
	* 
	*
	* returns false in case of an error */
      function TrackFX_GetEnabled(track: MediaTrack, fx: number): boolean

      
      /** Get the index of ReaEQ in the track FX chain. If ReaEQ is not in the chain and instantiate is true, it will be inserted. See [TrackFX\_GetInstrument](#TrackFX_GetInstrument), [TrackFX\_GetByName](#TrackFX_GetByName).
	*
	* 
	*
	* returns -1 if no ReaEQ is available. */
      function TrackFX_GetEQ(track: MediaTrack, instantiate: boolean): number

      
      /** Returns true if the EQ band is enabled.
	*
	* Returns false if the band is disabled, or if track/fxidx is not ReaEQ.
	*
	* Bandtype: 0=lhipass, 1=loshelf, 2=band, 3=notch, 4=hishelf, 5=lopass.
	*
	* Bandidx: 0=first band matching bandtype, 1=2nd band matching bandtype, etc.
	*
	* 
	*
	* See [TrackFX\_GetEQ](#TrackFX_GetEQ), [TrackFX\_GetEQParam](#TrackFX_GetEQParam), [TrackFX\_SetEQParam](#TrackFX_SetEQParam), [TrackFX\_SetEQBandEnabled](#TrackFX_SetEQBandEnabled). */
      function TrackFX_GetEQBandEnabled(track: MediaTrack, fxidx: number, bandtype: number, bandidx: number): boolean

      
      /** Returns false if track/fxidx is not ReaEQ.
	*
	* Bandtype: -1=master gain, 0=lhipass, 1=loshelf, 2=band, 3=notch, 4=hishelf, 5=lopass.
	*
	* Bandidx (ignored for master gain): 0=first band matching bandtype, 1=2nd band matching bandtype, etc.
	*
	* Paramtype (ignored for master gain): 0=freq, 1=gain, 2=Q.
	*
	* See [TrackFX\_GetEQ](#TrackFX_GetEQ), [TrackFX\_SetEQParam](#TrackFX_SetEQParam), [TrackFX\_GetEQBandEnabled](#TrackFX_GetEQBandEnabled), [TrackFX\_SetEQBandEnabled](#TrackFX_SetEQBandEnabled). */
      function TrackFX_GetEQParam(track: MediaTrack, fxidx: number, paramidx: number): MultiReturn<[retval: boolean, bandtype: number, bandidx: number, paramtype: number, normval: number]>

      
      /** returns HWND of floating window for effect index, if any */
      function TrackFX_GetFloatingWindow(track: MediaTrack, index: number): HWND

      
      /**  */
      function TrackFX_GetFormattedParamValue(track: MediaTrack, fx: number, param: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TrackFX_GetFXGUID(track: MediaTrack, fx: number): string

      
      /**  */
      function TrackFX_GetFXName(track: MediaTrack, fx: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Get the index of the first track FX insert that is a virtual instrument, or -1 if none. See [TrackFX\_GetEQ](#TrackFX_GetEQ), [TrackFX\_GetByName](#TrackFX_GetByName). */
      function TrackFX_GetInstrument(track: MediaTrack): number

      
      /** sets the number of input/output pins for FX if available, returns plug-in type or -1 on error */
      function TrackFX_GetIOSize(track: MediaTrack, fx: number): MultiReturn<[retval: number, number: any | 'optional', number: any | 'optional']>

      
      /** gets plug-in specific named configuration value (returns true on success). Special values: 'pdc' returns PDC latency. 'in_pin_0' returns name of first input pin (if available), 'out_pin_0' returns name of first output pin (if available), etc. */
      function TrackFX_GetNamedConfigParm(track: MediaTrack, fx: number, parmname: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TrackFX_GetNumParams(track: MediaTrack, fx: number): number

      
      /** Returns true if this FX UI is open in the FX chain window or a floating window. See [TrackFX\_SetOpen](#TrackFX_SetOpen) */
      function TrackFX_GetOpen(track: MediaTrack, fx: number): boolean

      
      /**  */
      function TrackFX_GetParam(track: MediaTrack, fx: number, param: number): MultiReturn<[retval: number, minval: number, maxval: number]>

      
      /**  */
      function TrackFX_GetParameterStepSizes(track: MediaTrack, fx: number, param: number): MultiReturn<[retval: boolean, step: number, smallstep: number, largestep: number, istoggle: boolean]>

      
      /**  */
      function TrackFX_GetParamEx(track: MediaTrack, fx: number, param: number): MultiReturn<[retval: number, minval: number, maxval: number, midval: number]>

      
      /**  */
      function TrackFX_GetParamName(track: MediaTrack, fx: number, param: number, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /**  */
      function TrackFX_GetParamNormalized(track: MediaTrack, fx: number, param: number): number

      
      /** gets the effective channel mapping bitmask for a particular pin. high32OutOptional will be set to the high 32 bits */
      function TrackFX_GetPinMappings(tr: MediaTrack, fx: number, is: number, pin: number): MultiReturn<[retval: number, number: any | 'optional']>

      
      /** Get the name of the preset currently showing in the REAPER dropdown, or the full path to a factory preset file for VST3 plug-ins (.vstpreset). Returns false if the current FX parameters do not exactly match the preset (in other words, if the user loaded the preset but moved the knobs afterward). See [TrackFX\_SetPreset](#TrackFX_SetPreset). */
      function TrackFX_GetPreset(track: MediaTrack, fx: number, presetname: string): MultiReturn<[retval: boolean, presetname: string]>

      
      /** Returns current preset index, or -1 if error. numberOfPresetsOut will be set to total number of presets available. See [TrackFX\_SetPresetByIndex](#TrackFX_SetPresetByIndex) */
      function TrackFX_GetPresetIndex(track: MediaTrack, fx: number): MultiReturn<[retval: number, numberOfPresets: number]>

      
      /** returns index of effect visible in record input chain, or -1 for chain hidden, or -2 for chain visible but no effect selected */
      function TrackFX_GetRecChainVisible(track: MediaTrack): number

      
      /** returns count of record input FX. To access record input FX, use a FX indices [0x1000000..0x1000000+n). On the master track, this accesses monitoring FX rather than record input FX. */
      function TrackFX_GetRecCount(track: MediaTrack): number

      
      /**  */
      function TrackFX_GetUserPresetFilename(track: MediaTrack, fx: number, fn: string): string

      
      /** presetmove==1 activates the next preset, presetmove==-1 activates the previous preset, etc. */
      function TrackFX_NavigatePresets(track: MediaTrack, fx: number, presetmove: number): boolean

      
      /** See [TrackFX\_GetEnabled](#TrackFX_GetEnabled) */
      function TrackFX_SetEnabled(track: MediaTrack, fx: number, enabled: boolean): void

      
      /** Enable or disable a ReaEQ band.
	*
	* Returns false if track/fxidx is not ReaEQ.
	*
	* Bandtype: 0=lhipass, 1=loshelf, 2=band, 3=notch, 4=hishelf, 5=lopass.
	*
	* Bandidx: 0=first band matching bandtype, 1=2nd band matching bandtype, etc.
	*
	* See [TrackFX\_GetEQ](#TrackFX_GetEQ), [TrackFX\_GetEQParam](#TrackFX_GetEQParam), [TrackFX\_SetEQParam](#TrackFX_SetEQParam), [TrackFX\_GetEQBandEnabled](#TrackFX_GetEQBandEnabled). */
      function TrackFX_SetEQBandEnabled(track: MediaTrack, fxidx: number, bandtype: number, bandidx: number, enable: boolean): boolean

      
      /** Returns false if track/fxidx is not ReaEQ. Targets a band matching bandtype.
	*
	* Bandtype: -1=master gain, 0=lhipass, 1=loshelf, 2=band, 3=notch, 4=hishelf, 5=lopass.
	*
	* Bandidx (ignored for master gain): 0=target first band matching bandtype, 1=target 2nd band matching bandtype, etc.
	*
	* Paramtype (ignored for master gain): 0=freq, 1=gain, 2=Q.
	*
	* See [TrackFX\_GetEQ](#TrackFX_GetEQ), [TrackFX\_GetEQParam](#TrackFX_GetEQParam), [TrackFX\_GetEQBandEnabled](#TrackFX_GetEQBandEnabled), [TrackFX\_SetEQBandEnabled](#TrackFX_SetEQBandEnabled). */
      function TrackFX_SetEQParam(track: MediaTrack, fxidx: number, bandtype: number, bandidx: number, paramtype: number, val: number, isnorm: boolean): boolean

      
      /** sets plug-in specific named configuration value (returns true on success) */
      function TrackFX_SetNamedConfigParm(track: MediaTrack, fx: number, parmname: string, value: string): boolean

      
      /** See [TrackFX\_GetOffline](#TrackFX_GetOffline) */
      function TrackFX_SetOffline(track: MediaTrack, fx: number, offline: boolean): void

      
      /** See [TakeFX\_GetOffline](#TakeFX_GetOffline) */
      function TakeFX_SetOffline(take: MediaItem_Take, fx: number, offline: boolean): void

      
      /** See [TakeFX\_SetOffline](#TakeFX_SetOffline) */
      function TakeFX_GetOffline(take: MediaItem_Take, fx: number): boolean

      
      /** Remove a FX from take chain (returns true on success) */
      function TakeFX_Delete(take: MediaItem_Take, fx: number): boolean

      
      /** Copies (or moves) FX from src_take to dest_take. Can be used with src_track=dest_track to reorder.  */
      function TakeFX_CopyToTake(src_take: MediaItem_Take, src_fx: number, dest_take: MediaItem_Take, dest_fx: number, is_move: boolean): void

      
      /** Copies (or moves) FX from src_take to dest_track. dest_fx can have 0x1000000 set to reference input FX. */
      function TakeFX_CopyToTrack(src_take: MediaItem_Take, src_fx: number, dest_track: MediaTrack, dest_fx: number, is_move: boolean): void

      
      /** See [TrackFX\_SetOffline](#TrackFX_SetOffline) */
      function TrackFX_GetOffline(track: MediaTrack, fx: number): boolean

      
      /** Copies (or moves) FX from src_take to dest_take. Can be used with src_track=dest_track to reorder.  */
      function TakeFX_CopyToTake(src_take: MediaItem_Take, src_fx: number, dest_take: MediaItem_Take, dest_fx: number, is_move: boolean): void

      
      /** Copies (or moves) FX from src_take to dest_track. dest_fx can have 0x1000000 set to reference input FX.  */
      function TakeFX_CopyToTrack(src_take: MediaItem_Take, src_fx: number, dest_track: MediaTrack, dest_fx: number, is_move: boolean): void

      
      /** Remove a FX from track chain (returns true on success). */
      function TrackFX_Delete(track: MediaTrack, fx: number): boolean

      
      /** Open this FX UI. See [TrackFX\_GetOpen](#TrackFX_GetOpen) */
      function TrackFX_SetOpen(track: MediaTrack, fx: number, open: boolean): void

      
      /**  */
      function TrackFX_SetParam(track: MediaTrack, fx: number, param: number, val: number): boolean

      
      /**  */
      function TrackFX_SetParamNormalized(track: MediaTrack, fx: number, param: number, value: number): boolean

      
      /** sets the channel mapping bitmask for a particular pin. returns false if unsupported (not all types of plug-ins support this capability) */
      function TrackFX_SetPinMappings(tr: MediaTrack, fx: number, is: number, pin: number, low32bits: number, hi32bits: number): boolean

      
      /** Activate a preset with the name shown in the REAPER dropdown. Full paths to .vstpreset files are also supported for VST3 plug-ins. See [TrackFX\_GetPreset](#TrackFX_GetPreset). */
      function TrackFX_SetPreset(track: MediaTrack, fx: number, presetname: string): boolean

      
      /** Sets the preset idx, or the factory preset (idx==-2), or the default user preset (idx==-1). Returns true on success. See [TrackFX\_GetPresetIndex](#TrackFX_GetPresetIndex). */
      function TrackFX_SetPresetByIndex(track: MediaTrack, fx: number, idx: number): boolean

      
      /** Shows a track-FX-window. */
      function TrackFX_Show(track: MediaTrack, index: number, showFlag: number): void

      
      /** Updates the TCP and optionally the MCP. Helpful, when setting a new trackheight using I\_HEIGHTOVERRIDE in [SetMediaTrackInfo\_Value](#SetMediaTrackInfo_Value). */
      function TrackList_AdjustWindows(isMinor: boolean): void

      
      /**  */
      function TrackList_UpdateAllExternalSurfaces(): void

      
      /** call to start a new block */
      function Undo_BeginBlock(): void

      
      /** call to start a new undo block. Code after that and before [Undo\_EndBlock](#Undo_EndBlock) can be undone. */
      function Undo_BeginBlock2(proj: ReaProject): void

      
      /** returns string of next action,if able,NULL if not */
      function Undo_CanRedo2(proj: ReaProject): string

      
      /** returns string of last action,if able,NULL if not */
      function Undo_CanUndo2(proj: ReaProject): string

      
      /** nonzero if success */
      function Undo_DoRedo2(proj: ReaProject): number

      
      /** nonzero if success */
      function Undo_DoUndo2(proj: ReaProject): number

      
      /** call to end the block,with extra flags if any,and a description */
      function Undo_EndBlock(descchange: string, extraflags: number): void

      
      /** call to end the block,with extra flags if any,and a description */
      function Undo_EndBlock2(proj: ReaProject, descchange: string, extraflags: number): void

      
      /** limited state change to items */
      function Undo_OnStateChange(descchange: string): void

      
      /** limited state change to items */
      function Undo_OnStateChange2(proj: ReaProject, descchange: string): void

      
      /**  */
      function Undo_OnStateChange_Item(proj: ReaProject, name: string, item: MediaItem): void

      
      /** trackparm=-1 by default,or if updating one fx chain,you can specify track index */
      function Undo_OnStateChangeEx(descchange: string, whichStates: number, trackparm: number): void

      
      /** trackparm=-1 by default,or if updating one fx chain,you can specify track index */
      function Undo_OnStateChangeEx2(proj: ReaProject, descchange: string, whichStates: number, trackparm: number): void

      
      /** Redraw the arrange view */
      function UpdateArrange(): void

      
      /**  */
      function UpdateItemInProject(item: MediaItem): void

      
      /** Redraw the arrange view and ruler */
      function UpdateTimeline(): void

      
      /** Return true if the pointer is a valid object of the right type in proj (proj is ignored if pointer is itself a project). Supported types are: ReaProject\*, MediaTrack\*, MediaItem\*, MediaItem\_Take\*, TrackEnvelope\* and PCM\_source\*.
	*
	* 
	*
	* see [ValidatePtr2](#ValidatePtr2) */
      function ValidatePtr(pointer: identifier, ctypename: string): boolean

      
      /** Return true if the pointer is a valid object of the right type in proj (proj is ignored if pointer is itself a project). Supported types are: ReaProject*, MediaTrack*, MediaItem*, MediaItem_Take*, TrackEnvelope* and PCM_source*. */
      function ValidatePtr2(proj: ReaProject, pointer: identifier, ctypename: string): boolean

      
      /** Opens the prefs to a page, use pageByName if page is 0. */
      function ViewPrefs(page: number, pageByName: string): void

      
      /** Gets or modifies the group membership for a track. Returns group state prior to call (each bit represents one of the high 32 group numbers). if setmask has bits set, those bits in setvalue will be applied to group. Group can be one of:
	*
	* VOLUME_LEAD
	*
	* VOLUME_FOLLOW
	*
	* VOLUME_VCA_LEAD
	*
	* VOLUME_VCA_FOLLOW
	*
	* PAN_LEAD
	*
	* PAN_FOLLOW
	*
	* WIDTH_LEAD
	*
	* WIDTH_FOLLOW
	*
	* MUTE_LEAD
	*
	* MUTE_FOLLOW
	*
	* SOLO_LEAD
	*
	* SOLO_FOLLOW
	*
	* RECARM_LEAD
	*
	* RECARM_FOLLOW
	*
	* POLARITY_LEAD
	*
	* POLARITY_FOLLOW
	*
	* AUTOMODE_LEAD
	*
	* AUTOMODE_FOLLOW
	*
	* VOLUME_REVERSE
	*
	* PAN_REVERSE
	*
	* WIDTH_REVERSE
	*
	* NO_LEAD_WHEN_FOLLOW
	*
	* VOLUME_VCA_FOLLOW_ISPREFX
	*
	* 
	*
	* Note: REAPER v6.11 and earlier used _MASTER and _SLAVE rather than _LEAD and _FOLLOW, which is deprecated but still supported (scripts that must support v6.11 and earlier can use the deprecated strings). */
      function GetSetTrackGroupMembershipHigh(tr: MediaTrack, groupname: string, setmask: number, setvalue: number): number

      
      /** Gets/sets a send attribute string:
	*
	*     P_EXT:xyz : char * : extension-specific persistent data
	*
	*     
	*
	* For ReaRoute-users: the outputs are hardware outputs, but with 512 added to the destination channel index (512 is the first rearoute channel, 513 the second, etc). */
      function GetSetTrackSendInfo_String(tr: MediaTrack, category: number, sendidx: number, parmname: string, stringNeedBig: string, setNewValue: boolean): MultiReturn<[retval: boolean, stringNeedBig: string]>

      
      /** \[BR\] Create a BR\_Envelope-object from a track-envelope pointer or take-envelope pointer. 
	*
	* To apply changes to a BR\_Envelope-object, always call [BR\_EnvFree](#BR_EnvFree) to release the object and commit changes if needed.
	*
	* A BR_Envelope is not a TrackEnvelope-object and therefore can't be used as TrackEnvelope-object!
	*
	*             
	*
	* For manipulation see [BR\_EnvCountPoints](#BR_EnvCountPoints), [BR\_EnvDeletePoint](#BR_EnvDeletePoint), [BR\_EnvFind](#BR_EnvFind), [BR\_EnvFindNext](#BR_EnvFindNext), [BR\_EnvFindPrevious](#BR_EnvFindPrevious), [BR\_EnvGetParentTake](#BR_EnvGetParentTake), [BR\_EnvGetParentTrack](#BR_EnvGetParentTrack), [BR\_EnvGetPoint](#BR_EnvGetPoint), [BR\_EnvGetProperties](#BR_EnvGetProperties), [BR\_EnvSetPoint](#BR_EnvSetPoint), [BR\_EnvSetProperties](#BR_EnvSetProperties), [BR\_EnvValueAtPos](#BR_EnvValueAtPos). */
      function BR_EnvAlloc(envelope: TrackEnvelope, takeEnvelopesUseProjectTime: boolean): BR_Envelope

      
      /** \[BR\] Count envelope points in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). */
      function BR_EnvCountPoints(envelope: BR_Envelope): number

      
      /** \[BR\] Delete envelope point by index (zero-based) in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). */
      function BR_EnvDeletePoint(envelope: BR_Envelope, id: number): boolean

      
      /** \[BR\] Find envelope point at time position in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). Pass delta &gt; 0 to search surrounding range - in that case the closest point to position within delta will be searched for. Returns envelope point id (zero-based) on success or -1 on failure. */
      function BR_EnvFind(envelope: BR_Envelope, position: number, delta: number): number

      
      /** \[BR\] Find next envelope point after time position in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). Returns envelope point id (zero-based) on success or -1 on failure. */
      function BR_EnvFindNext(envelope: BR_Envelope, position: number): number

      
      /** \[BR\] Find previous envelope point before time position in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). Returns envelope point id (zero-based) on success or -1 on failure. */
      function BR_EnvFindPrevious(envelope: BR_Envelope, position: number): number

      
      /** \[BR\] Free envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc) and commit changes if needed. Returns true if changes were committed successfully. Note that when envelope object wasn't modified nothing will get committed even if commit = true - in that case function returns false. */
      function BR_EnvFree(envelope: BR_Envelope, commit: boolean): boolean

      
      /** \[BR\] If envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc) is take envelope, returns parent media item take, otherwise NULL. */
      function BR_EnvGetParentTake(envelope: BR_Envelope): MediaItem_Take

      
      /** \[BR\] Get parent track of envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). If take envelope, returns NULL. */
      function BR_EnvGetParentTrack(envelope: BR_Envelope): MediaItem

      
      /** \[BR\] Get envelope point by id (zero-based) from the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). Returns true on success. */
      function BR_EnvGetPoint(envelope: BR_Envelope, id: number): MultiReturn<[retval: boolean, position: number, value: number, shape: number, selected: boolean, bezier: number]>

      
      /** \[BR\] Get envelope properties for the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc).
	*
	* 
	*
	* active: true if envelope is active
	*
	* visible: true if envelope is visible
	*
	* armed: true if envelope is armed
	*
	* inLane: true if envelope has it's own envelope lane
	*
	* laneHeight: envelope lane override height. 0 for none, otherwise size in pixels
	*
	* defaultShape: default point shape: 0-&gt;Linear, 1-&gt;Square, 2-&gt;Slow start/end, 3-&gt;Fast start, 4-&gt;Fast end, 5-&gt;Bezier
	*
	* minValue: minimum envelope value
	*
	* maxValue: maximum envelope value
	*
	* type: envelope type: 0-&gt;Volume, 1-&gt;Volume (Pre-FX), 2-&gt;Pan, 3-&gt;Pan (Pre-FX), 4-&gt;Width, 5-&gt;Width (Pre-FX), 6-&gt;Mute, 7-&gt;Pitch, 8-&gt;Playrate, 9-&gt;Tempo map, 10-&gt;Parameter
	*
	* faderScaling: true if envelope uses fader scaling
	*
	* 			automationItemsOptions: -1-&gt;project default, &amp;1=0-&gt;don't attach to underl. env., &amp;1-&gt;attach to underl. env. on right side, &amp;2-&gt;attach to underl. env. on both sides, &amp;4: bypass underl. env. */
      function BR_EnvGetProperties(envelope: BR_Envelope): MultiReturn<[active: boolean, visible: boolean, armed: boolean, inLane: boolean, laneHeight: number, defaultShape: number, minValue: number, maxValue: number, centerValue: number, type: number, faderScaling: boolean, number: any | 'optional']>

      
      /** \[BR\] Set envelope point by id (zero-based) in the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). To create point instead, pass id = -1. Note that if new point is inserted or existing point's time position is changed, points won't automatically get sorted. To do that, see [BR\_EnvSortPoints](#BR_EnvSortPoints).
	*
	* Returns true on success. */
      function BR_EnvSetPoint(envelope: BR_Envelope, id: number, position: number, value: number, shape: number, selected: boolean, bezier: number): boolean

      
      /** \[BR\] Set envelope properties for the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). For parameter description see [BR\_EnvGetProperties](#BR_EnvGetProperties).
	*
	* 			Setting automationItemsOptions requires REAPER 5.979+. */
      function BR_EnvSetProperties(envelope: BR_Envelope, active: boolean, visible: boolean, armed: boolean, inLane: boolean, laneHeight: number, defaultShape: number, faderScaling: boolean, number: any | 'optional'): void

      
      /** \[BR\] Sort envelope points by position. The only reason to call this is if sorted points are explicitly needed after editing them with [BR\_EnvSetPoint](#BR_EnvSetPoint). Note that you do not have to call this before doing [BR\_EnvFree](#BR_EnvFree) since it does handle unsorted points too. */
      function BR_EnvSortPoints(envelope: BR_Envelope): void

      
      /** \[BR\] Get envelope value at time position for the envelope object allocated with [BR\_EnvAlloc](#BR_EnvAlloc). */
      function BR_EnvValueAtPos(envelope: BR_Envelope, position: number): number

      
      /** \[BR\] Deprecated, see [GetSet\_ArrangeView2](#GetSet_ArrangeView2) (REAPER v5.12pre4+) -- Get start and end time position of arrange view. To set arrange view instead, see [BR\_SetArrangeView](#BR_SetArrangeView). */
      function BR_GetArrangeView(proj: ReaProject): MultiReturn<[startTime: number, endTime: number]>

      
      /** \[BR\] Get closest grid division to position. Note that this functions is different from [SnapToGrid](#SnapToGrid) in two regards. SnapToGrid() needs snap enabled to work and this one works always. Secondly, grid divisions are different from grid lines because some grid lines may be hidden due to zoom level - this function ignores grid line visibility and always searches for the closest grid division at given position. For more grid division functions, see [BR\_GetNextGridDivision](#BR_GetNextGridDivision) and [BR\_GetPrevGridDivision](#BR_GetPrevGridDivision). */
      function BR_GetClosestGridDivision(position: number): number

      
      /** \[BR\] Get current theme information. themePathOut is set to full theme path and themeNameOut is set to theme name excluding any path info and extension */
      function BR_GetCurrentTheme(): MultiReturn<[themePath: string, themeName: string]>

      
      /** \[BR\] Get media item from GUID string. Note that the GUID must be enclosed in braces {}. To get item's GUID as a string, see [BR\_GetMediaItemGUID](#BR_GetMediaItemGUID). */
      function BR_GetMediaItemByGUID(proj: ReaProject, guidStringIn: string): MediaItem

      
      /** \[BR\] Get media item GUID as a string (guidStringOut_sz should be at least 64). To get media item back from GUID string, see [BR\_GetMediaItemByGUID](#BR_GetMediaItemByGUID). */
      function BR_GetMediaItemGUID(item: MediaItem): string

      
      /** \[BR\] Get currently loaded image resource and its flags for a given item. Returns false if there is no image resource set. To set image resource, see [BR\_SetMediaItemImageResource](#BR_SetMediaItemImageResource). */
      function BR_GetMediaItemImageResource(item: MediaItem): MultiReturn<[retval: boolean, image: string, imageFlags: number]>

      
      /** \[BR\] Get media item take GUID as a string (guidStringOut_sz should be at least 64). To get take from GUID string, see [SNM\_GetMediaItemTakeByGUID](#SNM_GetMediaItemTakeByGUID). */
      function BR_GetMediaItemTakeGUID(take: MediaItem_Take): string

      
      /** \[BR\] Get take media source properties as they appear in Item properties. Returns false if take can't have them (MIDI items etc.).
	*
	* To set source properties, see [BR\_SetMediaSourceProperties](#BR_SetMediaSourceProperties). */
      function BR_GetMediaSourceProperties(take: MediaItem_Take): MultiReturn<[retval: boolean, section: boolean, start: number, length: number, fade: number, reverse: boolean]>

      
      /** \[BR\] Get media track from GUID string. Note that the GUID must be enclosed in braces {}. To get track's GUID as a string, see [BR\_GetMediaTrackGUID](#BR_GetMediaTrackGUID). */
      function BR_GetMediaTrackByGUID(proj: ReaProject, guidStringIn: string): MediaTrack

      
      /** [BR] Get media track freeze count (if track isn't frozen at all, returns 0). */
      function BR_GetMediaTrackFreezeCount(track: MediaTrack): number

      
      /** \[BR\] Get media track GUID as a string (guidStringOut_sz should be at least 64). To get media track back from GUID string, see [BR\_GetMediaTrackByGUID](#BR_GetMediaTrackByGUID). */
      function BR_GetMediaTrackGUID(track: MediaTrack): string

      
      /** \[BR\] Deprecated, see [GetSetMediaTrackInfo](#GetSetMediaTrackInfo) (REAPER v5.02+). Get media track layouts for MCP and TCP. Empty string ("") means that layout is set to the default layout. To set media track layouts, see [BR\_SetMediaTrackLayouts](#BR_SetMediaTrackLayouts). */
      function BR_GetMediaTrackLayouts(track: MediaTrack): MultiReturn<[mcpLayoutName: string, tcpLayoutName: string]>

      
      /** \[BR\] Get track envelope for send/receive/hardware output.
	*
	* 
	*
	* category is &lt;0 for receives, 0=sends, &gt;0 for hardware outputs
	*
	* sendidx is zero-based (see [GetTrackNumSends](#GetTrackNumSends) to count track sends/receives/hardware outputs)
	*
	* envelopeType determines which envelope is returned (0=volume, 1=pan, 2=mute)
	*
	* 
	*
	* Note: To get or set other send attributes, see [BR\_GetSetTrackSendInfo](#BR_GetSetTrackSendInfo) and [BR\_GetMediaTrackSendInfo\_Track](#BR_GetMediaTrackSendInfo_Track). */
      function BR_GetMediaTrackSendInfo_Envelope(track: MediaTrack, category: number, sendidx: number, envelopeType: number): TrackEnvelope

      
      /** \[BR\] Get source or destination media track for send/receive.
	*
	* 
	*
	* category is &lt;0 for receives, 0=sends
	*
	* sendidx is zero-based (see [GetTrackNumSends](#GetTrackNumSends) to count track sends/receives)
	*
	* trackType determines which track is returned (0=source track, 1=destination track)
	*
	* 
	*
	* Note: To get or set other send attributes, see [BR\_GetSetTrackSendInfo](#BR_GetSetTrackSendInfo) and [BR\_GetMediaTrackSendInfo_Envelope](#BR_GetMediaTrackSendInfo_Envelope). */
      function BR_GetMediaTrackSendInfo_Track(track: MediaTrack, category: number, sendidx: number, trackType: number): MediaTrack

      
      /** [BR] Get MIDI take source length in PPQ. In case the take isn't MIDI, return value will be -1. */
      function BR_GetMidiSourceLenPPQ(take: MediaItem_Take): number

      
      /** [BR] Get MIDI take pool GUID as a string (guidStringOut_sz should be at least 64). Returns true if take is pooled. */
      function BR_GetMidiTakePoolGUID(take: MediaItem_Take): MultiReturn<[retval: boolean, guidString: string]>

      
      /** [BR] Get "ignore project tempo" information for MIDI take. Returns true if take can ignore project tempo (no matter if it's actually ignored), otherwise false. */
      function BR_GetMidiTakeTempoInfo(take: MediaItem_Take): MultiReturn<[retval: boolean, ignoreProjTempo: boolean, bpm: number, num: number, den: number]>

      
      /** \[BR\] Get mouse cursor context. Each parameter returns information in a form of string as specified in the table below.
	*
	* 
	*
	* To get more info on stuff that was found under mouse cursor see [BR\_GetMouseCursorContext\_Envelope](#BR_GetMouseCursorContext_Envelope), [BR\_GetMouseCursorContext\_Item](#BR_GetMouseCursorContext_Item), [BR\_GetMouseCursorContext\_MIDI](#BR_GetMouseCursorContext_MIDI), [BR\_GetMouseCursorContext\_Position](#BR_GetMouseCursorContext_Position), [BR\_GetMouseCursorContext\_Take](#BR_GetMouseCursorContext_Take), [BR\_GetMouseCursorContext\_Track](#BR_GetMouseCursorContext_Track)
	*
	* <table border='2'>
	*
	* <tr><th style='width:100px'>Window</th><th style='width:100px'>Segment</th><th style='width:300px'>Details</th></tr>
	*
	* <tr><th rowspan='1' align = 'center'>unknown</th><td>""</td><td>""</td></tr>
	*
	* <tr><th rowspan='4' align = 'center'>ruler</th><td>region\_lane </td><td>""</td></tr>
	*
	* <tr><td>marker\_lane </td><td>""</td></tr>
	*
	* <tr><td>tempo\_lane </td><td>""</td></tr>
	*
	* <tr><td>timeline</td><td>""</td></tr>
	*
	* <tr><th rowspan='1' align = 'center'>transport</th><td>""</td><td>""</td></tr>
	*
	* <tr><th rowspan='3' align = 'center'>tcp </th><td>track</td><td>""</td></tr>
	*
	* <tr><td>envelope</td><td>""</td></tr>
	*
	* <tr><td>empty</td><td>""</td></tr>
	*
	* <tr><th rowspan='2' align = 'center'>mcp </th><td>track</td><td>""</td></tr>
	*
	* <tr><td>empty</td><td>""</td></tr>
	*
	* <tr><th rowspan='3' align = 'center'>arrange</th><td>track</td><td>empty,item, item\_stretch\_marker,env\_point, env\_segment </td></tr>
	*
	* <tr><td>envelope</td><td>empty, env\_point, env\_segment</td></tr>
	*
	* <tr><td>empty</td><td>""</td></tr>
	*
	* <tr><th rowspan='5' align = 'center'>midi\_editor </th><td>unknown</td><td>""</td></tr>
	*
	* <tr><td>ruler</td><td>""</td></tr>
	*
	* <tr><td>piano</td><td>""</td></tr>
	*
	* <tr><td>notes</td><td>""</td></tr>
	*
	* <tr><td>cc\_lane</td><td>cc\_selector, cc\_lane</td></tr>
	*
	* </table> */
      function BR_GetMouseCursorContext(): MultiReturn<[window: string, segment: string, details: string]>

      
      /** \[BR\] Returns envelope that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). In case the envelope belongs to take, takeEnvelope will be true. */
      function BR_GetMouseCursorContext_Envelope(): MultiReturn<[retval: TrackEnvelope, takeEnvelope: boolean]>

      
      /** \[BR\] Returns item under mouse cursor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). Note that the function will return item even if mouse cursor is over some other track lane element like stretch marker or envelope. This enables for easier identification of items when you want to ignore elements within the item. */
      function BR_GetMouseCursorContext_Item(): MediaItem

      
      /** \[BR\] Returns midi editor under mouse cursor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext).
	*
	* 
	*
	* inlineEditor: if mouse was captured in inline MIDI editor, this will be true (consequentially, returned MIDI editor will be NULL)
	*
	* noteRow: note row or piano key under mouse cursor (0-127)
	*
	* ccLane: CC lane under mouse cursor (CC0-127=CC, 0x100|(0-31)=14-bit CC, 0x200=velocity, 0x201=pitch, 0x202=program, 0x203=channel pressure, 0x204=bank/program select, 0x205=text, 0x206=sysex, 0x207=off velocity, 0x208=notation events)
	*
	* ccLaneVal: value in CC lane under mouse cursor (0-127 or 0-16383)
	*
	* ccLaneId: lane position, counting from the top (0 based)
	*
	* 
	*
	* Note: due to API limitations, if mouse is over inline MIDI editor with some note rows hidden, noteRow will be -1 */
      function BR_GetMouseCursorContext_MIDI(): MultiReturn<[retval: identifier, inlineEditor: boolean, noteRow: number, ccLane: number, ccLaneVal: number, ccLaneId: number]>

      
      /** \[BR\] Returns project time position in arrange/ruler/midi editor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). */
      function BR_GetMouseCursorContext_Position(): number

      
      /** \[BR\] Returns id of a stretch marker under mouse cursor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). */
      function BR_GetMouseCursorContext_StretchMarker(): number

      
      /** \[BR\] Returns take under mouse cursor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). */
      function BR_GetMouseCursorContext_Take(): MediaItem_Take

      
      /** \[BR\] Returns track under mouse cursor that was captured with the last call to [BR\_GetMouseCursorContext](#BR_GetMouseCursorContext). */
      function BR_GetMouseCursorContext_Track(): MediaTrack

      
      /** \[BR\] Get next grid division after the time position. For more grid divisions function, see [BR\_GetClosestGridDivision](#BR_GetClosestGridDivision) and [BR\_GetPrevGridDivision](#BR_GetPrevGridDivision). */
      function BR_GetNextGridDivision(position: number): number

      
      /** \[BR\] Get previous grid division before the time position. For more grid division functions, see [BR\_GetClosestGridDivision](#BR_GetClosestGridDivision) and [BR\_GetNextGridDivision](#BR_GetNextGridDivision). */
      function BR_GetPrevGridDivision(position: number): number

      
      /** \[BR\] Get or set send attributes.
	*
	* 
	*
	* category is &lt;0 for receives, 0=sends, &gt;0 for hardware outputs
	*
	* sendidx is zero-based (see [GetTrackNumSends](#GetTrackNumSends) to count track sends/receives/hardware outputs)
	*
	* To set attribute, pass setNewValue as true
	*
	* 
	*
	* List of possible parameters:
	*
	* 
	*
	*     B\_MUTE : send mute state (1.0 if muted, otherwise 0.0)
	*
	*     B\_PHASE : send phase state (1.0 if phase is inverted, otherwise 0.0)
	*
	*     B\_MONO : send mono state (1.0 if send is set to mono, otherwise 0.0)
	*
	*     D\_VOL : send volume (1.0=+0dB etc...)
	*
	*     D\_PAN : send pan (-1.0=100%L, 0=center, 1.0=100%R)
	*
	*     D\_PANLAW : send pan law (1.0=+0.0db, 0.5=-6dB, -1.0=project default etc...)
	*
	*     I\_SENDMODE : send mode (0=post-fader, 1=pre-fx, 2=post-fx(deprecated), 3=post-fx)
	*
	*     I\_SRCCHAN : audio source starting channel index or -1 if audio send is disabled (&amp;1024=mono...note that in that case, when reading index, you should do (index XOR 1024) to get starting channel index)
	*
	*     I\_DSTCHAN : audio destination starting channel index (&amp;1024=mono (and in case of hardware output &amp;512=rearoute)...note that in that case, when reading index, you should do (index XOR (1024 OR 512)) to get starting channel index)
	*
	*     I\_MIDI\_SRCCHAN : source MIDI channel, -1 if MIDI send is disabled (0=all, 1-16)
	*
	*     I\_MIDI\_DSTCHAN : destination MIDI channel, -1 if MIDI send is disabled (0=original, 1-16)
	*
	*     I\_MIDI\_SRCBUS : source MIDI bus, -1 if MIDI send is disabled (0=all, otherwise bus index)
	*
	*     I\_MIDI\_DSTBUS : receive MIDI bus, -1 if MIDI send is disabled (0=all, otherwise bus index)
	*
	*     I\_MIDI\_LINK\_VOLPAN : link volume/pan controls to MIDI
	*
	* 
	*
	* Note: To get or set other send attributes, see [BR\_GetMediaTrackSendInfo\_Envelope](#BR_GetMediaTrackSendInfo_Envelope) and [BR\_GetMediaTrackSendInfo\_Track](#BR_GetMediaTrackSendInfo_Track). */
      function BR_GetSetTrackSendInfo(track: MediaTrack, category: number, sendidx: number, parmname: string, setNewValue: boolean, newValue: number): number

      
      /** [BR] Returns FX count for supplied take */
      function BR_GetTakeFXCount(take: MediaItem_Take): number

      
      /** [SWS] Check if take has MIDI inline editor open and returns true or false. */
      function BR_IsMidiOpenInInlineEditor(take: MediaItem_Take): boolean

      
      /** [BR] Check if take is MIDI take, in case MIDI take is in-project MIDI source data, inProjectMidiOut will be true, otherwise false. */
      function BR_IsTakeMidi(take: MediaItem_Take): MultiReturn<[retval: boolean, inProjectMidi: boolean]>

      
      /** [BR] Get media item under mouse cursor. Position is mouse cursor position in arrange. */
      function BR_ItemAtMouseCursor(): MultiReturn<[retval: MediaItem, position: number]>

      
      /** [BR] Remove CC lane in midi editor. Top visible CC lane is laneId 0. Returns true on success */
      function BR_MIDI_CCLaneRemove(midiEditor: identifier, laneId: number): boolean

      
      /** [BR] Replace CC lane in midi editor. Top visible CC lane is laneId 0. Returns true on success.
	*
	* Valid CC lanes: CC0-127=CC, 0x100|(0-31)=14-bit CC, 0x200=velocity, 0x201=pitch, 0x202=program, 0x203=channel pressure, 0x204=bank/program select, 0x205=text, 0x206=sysex, 0x207 */
      function BR_MIDI_CCLaneReplace(midiEditor: identifier, laneId: number, newCC: number): boolean

      
      /** [BR] Get position at mouse cursor. To check ruler along with arrange, pass checkRuler=true. Returns -1 if cursor is not over arrange/ruler. */
      function BR_PositionAtMouseCursor(checkRuler: boolean): number

      
      /** \[BR\] Deprecated, see [GetSet\_ArrangeView2](#GetSet_ArrangeView2) (REAPER v5.12pre4+) -- Set start and end time position of arrange view. To get arrange view instead, see [BR\_GetArrangeView](#BR_GetArrangeView). */
      function BR_SetArrangeView(proj: ReaProject, startTime: number, endTime: number): void

      
      /** [BR] Set item start and end edges' position - returns true in case of any changes */
      function BR_SetItemEdges(item: MediaItem, startTime: number, endTime: number): boolean

      
      /** \[BR\] Set image resource and its flags for a given item. To clear current image resource, pass imageIn as "".
	*
	* 			imageFlags: &amp;1=0: don't display image, &amp;1: center / tile, &amp;3: stretch, &amp;5: full height (REAPER 5.974+).
	*
	* 			To get image resource, see [BR\_GetMediaItemImageResource](#BR_GetMediaItemImageResource). */
      function BR_SetMediaItemImageResource(item: MediaItem, imageIn: string, imageFlags: number): void

      
      /** \[BR\] Set take media source properties. Returns false if take can't have them (MIDI items etc.). Section parameters have to be valid only when passing section=true.
	*
	* To get source properties, see [BR\_GetMediaSourceProperties](#BR_GetMediaSourceProperties). */
      function BR_SetMediaSourceProperties(take: MediaItem_Take, section: boolean, start: number, length: number, fade: number, reverse: boolean): boolean

      
      /** \[BR\] Deprecated, see [GetSetMediaTrackInfo](#GetSetMediaTrackInfo) (REAPER v5.02+). Set media track layouts for MCP and TCP. To set default layout, pass empty string ("") as layout name. In case layouts were successfully set, returns true (if layouts are already set to supplied layout names, it will return false since no changes were made).
	*
	* To get media track layouts, see [BR\_GetMediaTrackLayouts](#BR_GetMediaTrackLayouts). */
      function BR_SetMediaTrackLayouts(track: MediaTrack, mcpLayoutNameIn: string, tcpLayoutNameIn: string): boolean

      
      /** [BR] Set "ignore project tempo" information for MIDI take. Returns true in case the take was successfully updated. */
      function BR_SetMidiTakeTempoInfo(take: MediaItem_Take, ignoreProjTempo: boolean, bpm: number, num: number, den: number): boolean

      
      /** \[BR\] Set new take source from file. To import MIDI file as in-project source data pass inProjectData=true. Returns false if failed.
	*
	* Any take source properties from the previous source will be lost - to preserve them, see [BR\_SetTakeSourceFromFile2](#BR_SetTakeSourceFromFile2).
	*
	* Note: To set source from existing take, see [SNM\_GetSetSourceState2](#SNM_GetSetSourceState2). */
      function BR_SetTakeSourceFromFile(take: MediaItem_Take, filenameIn: string, inProjectData: boolean): boolean

      
      /** \[BR\] Differs from [BR\_SetTakeSourceFromFile](#BR_SetTakeSourceFromFile) only that it can also preserve existing take media source properties. */
      function BR_SetTakeSourceFromFile2(take: MediaItem_Take, filenameIn: string, inProjectData: boolean, keepSourceProperties: boolean): boolean

      
      /** [BR] Get take under mouse cursor. Position is mouse cursor position in arrange. */
      function BR_TakeAtMouseCursor(): MultiReturn<[retval: MediaItem_Take, position: number]>

      
      /** [BR] Get track under mouse cursor.
	*
	* Context signifies where the track was found: 0 = TCP, 1 = MCP, 2 = Arrange.
	*
	* Position will hold mouse cursor position in arrange if applicable. */
      function BR_TrackAtMouseCursor(): MultiReturn<[retval: MediaTrack, context: number, position: number]>

      
      /** [BR] Get the exact name (like effect.dll, effect.vst3, etc...) of an FX. */
      function BR_TrackFX_GetFXModuleName(track: MediaTrack, fx: number): MultiReturn<[retval: boolean, name: string]>

      
      /** \[BR\] Equivalent to win32 API GetPrivateProfileString(). For example, you can use this to get values from REAPER.ini
	*
	* 
	*
	* If you have multiple sections in that file with the same name, only the first one will be used, the rest will be ignored by Reaper.
	*
	* If you have multiple keys with the same name within a section, only the first one will be used, the rest will be ignored by Reaper.
	*
	* You can get the paths using [GetExePath](#GetExePath) for the Reaper-application-folder, [GetResourcePath](#GetResourcePath) for the ressources-folder or get\_ini\_file for the path+filename of the Reaper.ini-file. */
      function BR_Win32_GetPrivateProfileString(sectionName: string, keyName: string, defaultString: string, filePath: string): MultiReturn<[retval: number, string: string]>

      
      /** [BR] Equivalent to win32 API ShellExecute() with HWND set to main window */
      function BR_Win32_ShellExecute(operation: string, file: string, parameters: string, directory: string, showFlags: number): number

      
      /** \[BR\] Equivalent to win32 API WritePrivateProfileString(). For example, you can use this to write to REAPER.ini
	*
	* 
	*
	* If you have multiple sections in that file with the same name, only the first one will be used, the rest will be ignored by Reaper.
	*
	* If you have multiple keys with the same name within a section, only the first one will be used, the rest will be ignored by Reaper.
	*
	* You can get the paths using [GetExePath](#GetExePath) for the Reaper-application-folder, [GetResourcePath](#GetResourcePath) for the ressources-folder or [get\_ini\_file](#get_ini_file) for the path+filename of the Reaper.ini-file. */
      function BR_Win32_WritePrivateProfileString(sectionName: string, keyName: string, value: string, filePath: string): boolean

      
      /** Read the contents of the system clipboard. */
      function CF_GetClipboard(): string

      
      /** \[DEPRECATED: Use [CF\_GetClipboard](#CF_GetClipboard)\] Read the contents of the system clipboard. See [SNM\_CreateFastString](#SNM_CreateFastString) and [SNM\_DeleteFastString](#SNM_DeleteFastString). */
      function CF_GetClipboardBig(output: WDL_FastString): string

      
      /** Write the given string into the system clipboard. */
      function CF_SetClipboard(str: string): void

      
      /** [FNG]Add MIDI note to MIDI take */
      function FNG_AddMidiNote(midiTake: RprMidiTake): RprMidiNote

      
      /** [FNG]Allocate a RprMidiTake from a take pointer. Returns a NULL pointer if the take is not an in-project MIDI take */
      function FNG_AllocMidiTake(take: MediaItem_Take): RprMidiTake

      
      /** [FNG]Count of how many MIDI notes are in the MIDI take */
      function FNG_CountMidiNotes(midiTake: RprMidiTake): number

      
      /** [FNG]Commit changes to MIDI take and free allocated memory */
      function FNG_FreeMidiTake(midiTake: RprMidiTake): void

      
      /** [FNG]Get a MIDI note from a MIDI take at specified index */
      function FNG_GetMidiNote(midiTake: RprMidiTake, index: number): RprMidiNote

      
      /** [FNG]Get MIDI note property */
      function FNG_GetMidiNoteIntProperty(midiNote: RprMidiNote, property: string): number

      
      /** [FNG]Set MIDI note property */
      function FNG_SetMidiNoteIntProperty(midiNote: RprMidiNote, property: string, value: number): void

      
      /** Full loudness analysis. retval: returns true on successful analysis, false on MIDI take or when analysis failed for some reason. analyzeTruePeak=true: Also do true peak analysis. Returns true peak value and true peak position (relative to item position). Considerably slower than without true peak analysis (since it uses oversampling). Note: Short term uses a time window of 3 sec. for calculation. So for items shorter than this shortTermMaxOut can't be calculated correctly. Momentary uses a time window of 0.4 sec. */
      function NF_AnalyzeTakeLoudness(take: MediaItem_Take, analyzeTruePeak: boolean): MultiReturn<[retval: boolean, lufsIntegrated: number, range: number, truePeak: number, truePeakPos: number, shortTermMax: number, momentaryMax: number]>

      
      /** Same as [NF\_AnalyzeTakeLoudness](#NF_AnalyzeTakeLoudness) but additionally returns shortTermMaxPos and momentaryMaxPos (in absolute project time). Note: shortTermMaxPos and momentaryMaxPos actually indicate the beginning of time *intervalls*, (3 sec. and 0.4 sec. resp.).  */
      function NF_AnalyzeTakeLoudness2(take: MediaItem_Take, analyzeTruePeak: boolean): MultiReturn<[retval: boolean, lufsIntegrated: number, range: number, truePeak: number, truePeakPos: number, shortTermMax: number, momentaryMax: number, shortTermMaxPos: number, momentaryMaxPos: number]>

      
      /** Does LUFS integrated analysis only. Faster than full loudness analysis ([NF\_AnalyzeTakeLoudness](#NF_AnalyzeTakeLoudness)) . Use this if only LUFS integrated is required.
	*
	* Take vol. env. is taken into account. 
	*
	* 
	*
	* See: [Signal flow](http://wiki.cockos.com/wiki/index.php/Measure_and_normalize_loudness_with_SWS). */
      function NF_AnalyzeTakeLoudness_IntegratedOnly(take: MediaItem_Take): MultiReturn<[retval: boolean, lufsIntegrated: number]>

      
      /** Returns the average overall (non-windowed) RMS level of active channels of an audio item active take, post item gain, post take volume envelope, post-fade, pre fader, pre item FX. 
	*
	* Returns -150.0 if MIDI take or empty item. */
      function NF_GetMediaItemAverageRMS(item: MediaItem): number

      
      /** Returns the greatest max. peak value of all active channels of an audio item active take, post item gain, post take volume envelope, post-fade, pre fader, pre item FX. 
	*
	* Returns -150.0 if MIDI take or empty item. */
      function NF_GetMediaItemMaxPeak(item: MediaItem): number

      
      /** Returns the greatest overall (non-windowed) RMS peak level of all active channels of an audio item active take, post item gain, post take volume envelope, post-fade, pre fader, pre item FX. 
	*
	* Returns -150.0 if MIDI take or empty item. */
      function NF_GetMediaItemPeakRMS_NonWindowed(item: MediaItem): number

      
      /** Returns the average RMS peak level of all active channels of an audio item active take, post item gain, post take volume envelope, post-fade, pre fader, pre item FX. 
	*
	* Obeys 'Window size for peak RMS' setting in 'SWS: Set RMS analysis/normalize options' for calculation. Returns -150.0 if MIDI take or empty item. */
      function NF_GetMediaItemPeakRMS_Windowed(item: MediaItem): number

      
      /** \[S&amp;M\] Deprecated, see [CreateTrackSend](#CreateTrackSend) (v5.15pre1+). Adds a receive. Returns false if nothing updated.
	*
	* type -1=Default type (user preferences), 0=Post-Fader (Post-Pan), 1=Pre-FX, 2=deprecated, 3=Pre-Fader (Post-FX).
	*
	* Note: obeys default sends preferences, supports frozen tracks, etc.. */
      function SNM_AddReceive(src: MediaTrack, dest: MediaTrack, type: number): boolean

      
      /** [S&amp;M] Add an FX parameter knob in the TCP. Returns false if nothing updated (invalid parameters, knob already present, etc..) */
      function SNM_AddTCPFXParm(tr: MediaTrack, fxId: number, prmId: number): boolean

      
      /** \[S&amp;M\] Instantiates a new "fast string". You must delete this string, see [SNM\_DeleteFastString](#SNM_DeleteFastString). */
      function SNM_CreateFastString(str: string): WDL_FastString

      
      /** [S&amp;M] Deletes a "fast string" instance. */
      function SNM_DeleteFastString(str: WDL_FastString): void

      
      /** [S&amp;M] Returns a floating-point preference (look in project prefs first, then in general prefs). Returns errvalue if failed (e.g. varname not found).
	*
	* 
	*
	* The settings can be from the Preferences, Project settings and Render-dialog, as well as numerous other settings, as e.g. set in the context menu of the transport-area.
	*
	* Some variables are bitfields, where each bit represents e.g a checkbox in the preferences.             */
      function SNM_GetDoubleConfigVar(varname: string, errvalue: number): number

      
      /** [S&amp;M] Gets the "fast string" content. */
      function SNM_GetFastString(str: WDL_FastString): string

      
      /** [S&amp;M] Gets the "fast string" length. */
      function SNM_GetFastStringLength(str: WDL_FastString): number

      
      /** [S&amp;M] Returns an integer preference (look in project prefs first, then in general prefs). Returns errvalue if failed (e.g. varname not found).
	*
	* 
	*
	* The settings can be from the Preferences, Project settings and Render-dialog, as well as numerous other settings, as e.g. set in the context menu of the transport-area.
	*
	* Some variables are bitfields, where each bit represents e.g a checkbox in the preferences. */
      function SNM_GetIntConfigVar(varname: string, errvalue: number): number

      
      /** [S&amp;M] Reads a 64-bit integer preference split in two 32-bit integers (look in project prefs first, then in general prefs). Returns false if failed (e.g. varname not found). */
      function SNM_GetLongConfigVar(varname: string): MultiReturn<[retval: boolean, high: number, low: number]>

      
      /** \[S&amp;M\] Gets a take by GUID as string. The GUID must be enclosed in braces {}. To get take GUID as string, see [BR\_GetMediaItemTakeGUID](#BR_GetMediaItemTakeGUID) */
      function SNM_GetMediaItemTakeByGUID(project: ReaProject, guid: string): MediaItem_Take

      
      /** [S&amp;M] Gets a marker/region name. Returns true if marker/region found. */
      function SNM_GetProjectMarkerName(proj: ReaProject, num: number, isrgn: boolean, name: WDL_FastString): boolean

      
      /** [S&amp;M] Gets or sets the state of a track, an item or an envelope. The state chunk size is unlimited. Returns false if failed.
	*
	* When getting a track state (and when you are not interested in FX data), you can use wantminimalstate=true to radically reduce the length of the state. Do not set such minimal states back though, this is for read-only applications!
	*
	* Note: unlike the native GetSetObjectState, calling to FreeHeapPtr() is not required. */
      function SNM_GetSetObjectState(obj: identifier, state: WDL_FastString, setnewvalue: boolean, wantminimalstate: boolean): boolean

      
      /** \[S&amp;M\] Gets or sets a take source state. Returns false if failed. Use takeidx=-1 to get/alter the active take.
	*
	* Note: this function does not use a MediaItem\_Take\* param in order to manage empty takes (i.e. takes with MediaItem\_Take\*==NULL), see [SNM\_GetSetSourceState2](#SNM_GetSetSourceState2). */
      function SNM_GetSetSourceState(item: MediaItem, takeidxWDL_FastString: number, setnewvalue: boolean): boolean

      
      /** \[S&amp;M\] Gets or sets a take source state. Returns false if failed.
	*
	* Note: this function cannot deal with empty takes, see [SNM\_GetSetSourceState](#SNM_GetSetSourceState). */
      function SNM_GetSetSourceState2(takeWDL_FastString: MediaItem_Take, setnewvalue: boolean): boolean

      
      /** [S&amp;M] Deprecated, see [GetMediaSourceType](#GetMediaSourceType). Gets the source type of a take. Returns false if failed (e.g. take with empty source, etc..) */
      function SNM_GetSourceType(takeWDL_FastString: MediaItem_Take): boolean

      
      /** [S&amp;M] Deprecated, see TakeFX_/TrackFX_ CopyToTrack/Take, TrackFX/TakeFX _Delete (v5.95pre2+). Move or removes a track FX. Returns true if tr has been updated.
	*
	* fxId: fx index in chain or -1 for the selected fx. what: 0 to remove, -1 to move fx up in chain, 1 to move fx down in chain. */
      function SNM_MoveOrRemoveTrackFX(tr: MediaTrack, fxId: number, what: number): boolean

      
      /** \[S&amp;M\] Reads a media file tag. Supported tags: "artist", "album", "genre", "comment", "title", "track" (track number) or "year". Returns false if tag was not found. See [SNM\_TagMediaFile](#SNM_TagMediaFile). */
      function SNM_ReadMediaFileTag(fn: string, tag: string): MultiReturn<[retval: boolean, tagval: string]>

      
      /** \[S&amp;M\] Deprecated, see [RemoveTrackSend](#RemoveTrackSend) (v5.15pre1+). Removes a receive. Returns false if nothing updated. */
      function SNM_RemoveReceive(tr: MediaTrack, rcvidx: number): boolean

      
      /** [S&amp;M] Removes all receives from srctr. Returns false if nothing updated. */
      function SNM_RemoveReceivesFrom(tr: MediaTrack, srctr: MediaTrack): boolean

      
      /** [S&amp;M] Select a bookmark of the Resources window. Returns the related bookmark id (or -1 if failed). */
      function SNM_SelectResourceBookmark(name: string): number

      
      /** [S&amp;M] Sets a floating-point preference (look in project prefs first, then in general prefs). Returns false if failed (e.g. varname not found or newvalue out of range).
	*
	*         
	*
	* The settings can be from the Preferences, Project settings and Render-dialog, as well as numerous other settings, as e.g. set in the context menu of the transport-area.
	*
	* Some variables are bitfields, where each bit represents e.g a checkbox in the preferences.
	*
	* 
	*
	* The changed settings are usually only changed within the running Reaper, but not stored in the config-files, so you need to do it manually or they get lost after Reaper is closed! */
      function SNM_SetDoubleConfigVar(varname: string, newvalue: number): boolean

      
      /** [S&amp;M] Sets the "fast string" content. Returns str for facility. */
      function SNM_SetFastString(str: WDL_FastString, newstr: string): WDL_FastString

      
      /** [S&amp;M] Sets an integer preference (look in project prefs first, then in general prefs). Returns false if failed (e.g. varname not found).
	*
	* 
	*
	* Some variables are bitfields, where each bit represents e.g a checkbox in the preferences.
	*
	* The changed settings are usually only changed within the running Reaper, but not stored in the config-files, so you need to do it manually or they get lost after Reaper is closed! */
      function SNM_SetIntConfigVar(varname: string, newvalue: number): boolean

      
      /** [S&amp;M] Sets a 64-bit integer preference from two 32-bit integers (look in project prefs first, then in general prefs). Returns false if failed (e.g. varname not found).
	*
	* 
	*
	* Some variables are bitfields, where each bit represents e.g a checkbox in the preferences.
	*
	* The changed settings are usually only changed within the running Reaper, but not stored in the config-files, so you need to do it manually or they get lost after Reaper is closed! */
      function SNM_SetLongConfigVar(reaper: boolean, varname: string, newHighValue: number, newLowValue: number): void

      
      /** \[S&amp;M\] Deprecated, see [SetProjectMarker4](#SetProjectMarker4) -- Same function as SetProjectMarker3() except it can set empty names "". */
      function SNM_SetProjectMarker(proj: ReaProject, num: number, isrgn: boolean, pos: number, rgnend: number, name: string, color: number): boolean

      
      /** \[S&amp;M\] Tags a media file thanks to [TagLib](https://taglib.github.io). Use an empty tagval to clear a tag. When a file is opened in REAPER, turn it offline before using this function. Returns false if nothing updated. See [SNM\_ReadMediaFileTag](#SNM_ReadMediaFileTag). */
      function SNM_TagMediaFile(fn: string, tag: string, tagval: string): boolean

      
      /** [S&amp;M] Attach Resources slot actions to a given bookmark. */
      function SNM_TieResourceSlotActions(bookmarkId: number): void

      
      /** Focuses the active/open MIDI editor. */
      function SN_FocusMIDIEditor(): void

      
      /** \[ULT\]Get item notes.
	*
	* 
	*
	* Gets the information from the NOTES-tag, as stored by [ULT\_SetMediaItemNote](#ULT_SetMediaItemNote). */
      function ULT_GetMediaItemNote(item: MediaItem): string

      
      /** \[ULT\]Set item notes.
	*
	* 
	*
	* Will be added as new tag NOTES in the MediaItem-StateChunk. Can be read again with [ULT\_GetMediaItemNote](#ULT_GetMediaItemNote) */
      function ULT_SetMediaItemNote(item: MediaItem, note: string): void

      
      /** Returns the unsigned byte at address[offset]. Offset is added as steps of 1 byte each. */
      function JS_Byte(pointer: identifier, offset: number): number

      
      /** Composites a LICE bitmap with a REAPER window. Each time that the window is re-drawn, the bitmap will be blitted over the window's client area (with per-pixel alpha blending).
	*
	* 
	*
	* \* If dstw or dsth is -1, the bitmap will be stretched to fill the width or height of the window, respectively.
	*
	* 
	*
	* \* autoUpdate is an optional parameter that is false by default. If true, JS\_Composite will automatically invalidate and re-draw the part of the window that covers the current position of the bitmap, and if the bitmap is being moved, also the previous position. (If only one or a handful of bitmaps are being moved across the screen, autoUpdate should result in smoother animation on WindowsOS; if numerous bitmaps are spread over the entire window, it may be faster to disable autoUpdate and instead call [JS\_Window\_InvalidateRect](#JS_Window_InvalidateRect) explicitly once all bitmaps have been moved.)
	*
	* 
	*
	* \* InvalidateRect should also be called whenever the contents of the bitmap contents have been changed, but not the position, to trigger a window update.
	*
	* 
	*
	* \* On WindowsOS, the key to reducing flickering is to slow down the frequency at which the window is re-drawn. InvalidateRect should only be called when absolutely necessary, preferably not more than 20 times per second. (Also refer to the [JS\_Composite\_Delay](#JS_Composite_Delay) function.)
	*
	* 
	*
	* \* On WindowsOS, flickering can further be reduced by keeping the invalidated area as small as possible, covering only the bitmaps that have been edited or moved. However, if numerous bitmaps are spread over the entire window, it may be faster to simply invalidate the entire client area.
	*
	* 
	*
	* \* This function should not be applied directly to top-level windows, but rather to child windows.
	*
	* 
	*
	* \* Some classes of UI elements, particularly buttons, do not take kindly to being composited, and may crash REAPER.
	*
	* 
	*
	* \* On WindowsOS, GDI blitting does not perform alpha multiplication of the source bitmap. For proper color rendering, a separate pre-multiplication step is therefore required, using either [LICE\_Blit](#LICE_Blit) or [LICE\_ProcessRect](#LICE_ProcessRect).
	*
	* 
	*
	* Returns:
	*
	* 1 if successful, otherwise -1 = windowHWND is not a window, -3 = Could not obtain the original window process, -4 = sysBitmap is not a LICE bitmap, -5 = sysBitmap is not a system bitmap, -6 = Could not obtain the window HDC, -7 = Error when subclassing to new window process. */
      function JS_Composite(reaper: number, windowHWND: identifier, dstx: number, dsty: number, dstw: number, dsth: number, sysBitmap: identifier, srcx: number, srcy: number, srcw: number, srch: number, boolean: any | 'optional'): void

      
      /** On WindowsOS, flickering of composited images can be improved considerably by slowing the refresh rate of the window. The optimal refresh rate may depend on the number of composited bitmaps.
	*
	* 
	*
	* minTime is the minimum refresh delay, in seconds, when only one bitmap is composited onto the window. The delay time will increase linearly with the number of bitmaps, up to a maximum of maxTime when numBitmapsWhenMax is reached.
	*
	* 
	*
	* If both minTime and maxTime are 0, all delay settings for the window are cleared.
	*
	* 
	*
	* Returns:
	*
	* \* retval = 1 if successful, 0 if arguments are invalid (i.e. if maxTime &lt; minTime, or maxBitmaps &lt; 1).
	*
	* \* If delay times have not previously been set for this window, prev time values are 0. */
      function JS_Composite_Delay(windowHWND: identifier, minTime: number, maxTime: number, numBitmapsWhenMax: number): MultiReturn<[retval: number, prevMinTime: number, prevMaxTime: number, prevBitmaps: number]>

      
      /** Returns all bitmaps composited to the given window.
	*
	* 
	*
	* The list is formatted as a comma-separated string of hexadecimal values, each representing a LICE_IBitmap\* pointer.
	*
	* 
	*
	* retval is the number of linked bitmaps found, or negative if an error occured. */
      function JS_Composite_ListBitmaps(windowHWND: identifier): MultiReturn<[retval: number, list: string]>

      
      /** Unlinks the window and bitmap.
	*
	* 
	*
	* 			\* autoUpdate is an optional parameter. If unlinking a single bitmap and autoUpdate is true, the function will automatically re-draw the window to remove the blitted image.
	*
	* 
	*
	* 			If no bitmap is specified, all bitmaps composited to the window will be unlinked -- even those by other scripts. */
      function JS_Composite_Unlink(windowHWND: identifier, bitmap: identifier, autoUpdate: unsupported): void

      
      /** Returns the 8-byte floating point value at address[offset]. Offset is added as steps of 8 bytes each. */
      function JS_Double(address: identifier, pointer: number): number

      
      /** Returns information about a file.
	*
	* 
	*
	* cTime is not implemented on all systems. If it does return a time, the value may differ depending on the OS: on WindowsOS, it may refer to the time that the file was either created or copied, whereas on Linux and macOS, it may refer to the time of last status change.
	*
	* 
	*
	* retval is 0 if successful, negative if not. */
      function JS_File_Stat(filePath: string): MultiReturn<[retval: number, size: number, accessedTime: string, modifiedTime: string, cTime: string, deviceID: number, deviceSpecialID: number, inode: number, mode: number, numLinks: number, ownerUserID: number, ownerGroupID: number]>

      
      /** Blits between two device contexts, which may include LICE "system bitmaps".
	*
	* 
	*
	* 			mode: Optional parameter. "SRCCOPY" by default, or specify "ALPHA" to enable per-pixel alpha blending.
	*
	* 
	*
	* 			WARNING: On WindowsOS, GDI\_Blit does not perform alpha multiplication of the source bitmap. For proper color rendering, a separate pre-multiplication step is therefore required, using either LICE\_Blit or LICE\_ProcessRect. */
      function JS_GDI_Blit(destHDC: identifier, dstx: number, dsty: number, sourceHDC: identifier, srcx: number, srxy: number, width: number, height: number, string: any | 'optional'): void

      
      /**  */
      function JS_GDI_CreateFillBrush(reaper: identifier, color: number): void

      
      /** Parameters:
	*
	*            
	*
	* \* weight: 0 - 1000, with 0 = auto, 400 = normal and 700 = bold.
	*
	*            
	*
	* \* angle: the angle, in tenths of degrees, between the text and the x-axis of the device.
	*
	*            
	*
	* \* fontName: If empty string "", uses first font that matches the other specified attributes.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Note: Text color must be set separately. */
      function JS_GDI_CreateFont(reaper: identifier, height: number, weight: number, angle: number, italic: boolean, underline: boolean, strike: boolean, fontName: string): void

      
      /**  */
      function JS_GDI_CreatePen(reaper: identifier, width: number, color: number): void

      
      /**  */
      function JS_GDI_DeleteObject(GDIObject: identifier): void

      
      /** Parameters:
	*
	*            
	*
	* \* align: Combination of: "TOP", "VCENTER", "LEFT", "HCENTER", "RIGHT", "BOTTOM", "WORDBREAK", "SINGLELINE", "NOCLIP", "CALCRECT", "NOPREFIX" or "ELLIPSIS" */
      function JS_GDI_DrawText(reaper: number, deviceHDC: identifier, text: string, len: number, left: number, top: number, right: number, bottom: number, align: string): void

      
      /**  */
      function JS_GDI_FillEllipse(deviceHDC: identifier, left: number, top: number, right: number, bottom: number): void

      
      /** packedX and packedY are strings of points, each packed as "&lt;i4". */
      function JS_GDI_FillPolygon(deviceHDC: identifier, packedX: string, packedY: string, numPoints: number): void

      
      /**  */
      function JS_GDI_FillRect(deviceHDC: identifier, left: number, top: number, right: number, bottom: number): void

      
      /**  */
      function JS_GDI_FillRoundRect(deviceHDC: identifier, left: number, top: number, right: number, bottom: number, xrnd: number, yrnd: number): void

      
      /** Returns the device context for the client area of the specified window. */
      function JS_GDI_GetClientDC(reaper: identifier, windowHWND: identifier): void

      
      /** Returns a device context for the entire screen.
	*
	*            
	*
	*            
	*
	*            
	*
	*            WARNING: Only available on Windows, not Linux or MacOS. */
      function JS_GDI_GetScreenDC(reaper: identifier): void

      
      /**  */
      function JS_GDI_GetSysColor(reaper: number, GUIElement: string): void

      
      /**  */
      function JS_GDI_GetTextColor(reaper: number, deviceHDC: identifier): void

      
      /** Returns the device context for the entire window, including title bar and frame. */
      function JS_GDI_GetWindowDC(reaper: identifier, windowHWND: identifier): void

      
      /**  */
      function JS_GDI_Line(deviceHDC: identifier, x1: number, y1: number, x2: number, y2: number): void

      
      /** packedX and packedY are strings of points, each packed as "&lt;i4". */
      function JS_GDI_Polyline(deviceHDC: identifier, packedX: string, packedY: string, numPoints: number): void

      
      /** To release a window HDC, both arguments must be supplied: the HWND as well as the HDC. To release a screen DC, only the HDC needs to be supplied.
	*
	* 
	*
	* For compatibility with previous versions, the HWND and HDC can be supplied in any order.
	*
	* 
	*
	* NOTE: Any GDI HDC should be released immediately after drawing, and deferred scripts should get and release new DCs in each cycle. */
      function JS_GDI_ReleaseDC(windowHWND: identifier, deviceHDC: identifier): void

      
      /** Activates a font, pen, or fill brush for subsequent drawing in the specified device context. */
      function JS_GDI_SelectObject(reaper: identifier, deviceHDC: identifier, GDIObject: identifier): void

      
      /**  */
      function JS_GDI_SetPixel(deviceHDC: identifier, x: number, y: number, color: number): void

      
      /**  */
      function JS_GDI_SetTextBkColor(deviceHDC: identifier, color: number): void

      
      /**  */
      function JS_GDI_SetTextBkMode(deviceHDC: identifier, mode: number): void

      
      /**  */
      function JS_GDI_SetTextColor(deviceHDC: identifier, color: number): void

      
      /** Blits between two device contexts, which may include LICE "system bitmaps".
	*
	* 
	*
	* 			modeOptional: "SRCCOPY" by default, or specify "ALPHA" to enable per-pixel alpha blending.
	*
	* 
	*
	* 			WARNING: On WindowsOS, GDI\_Blit does not perform alpha multiplication of the source bitmap. For proper color rendering, a separate pre-multiplication step is therefore required, using either LICE\_Blit or LICE\_ProcessRect. */
      function JS_GDI_StretchBlit(destHDC: identifier, dstx: number, dsty: number, dstw: number, dsth: number, sourceHDC: identifier, srcx: number, srxy: number, srcw: number, srch: number, string: any | 'optional'): void

      
      /** Returns the 4-byte signed integer at address[offset]. Offset is added as steps of 4 bytes each. */
      function JS_Int(pointer: identifier, offset: number): number

      
      /** Hue is rolled over, saturation and value are clamped, all 0..1. (Alpha remains unchanged.) */
      function JS_LICE_AlterBitmapHSV(bitmap: identifier, hue: number, saturation: number, value: number): void

      
      /** Hue is rolled over, saturation and value are clamped, all 0..1. (Alpha remains unchanged.) */
      function JS_LICE_AlterRectHSV(bitmap: identifier, x: number, y: number, w: number, h: number, hue: number, saturation: number, value: number): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	* 
	*
	* LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_Arc(bitmap: identifier, cx: number, cy: number, r: number, minAngle: number, maxAngle: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /**  */
      function JS_LICE_ArrayAllBitmaps(reaperarray: identifier): number

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA" to enable per-pixel alpha blending.
	*
	* 
	*
	* LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_Bezier(bitmap: identifier, xstart: number, ystart: number, xctl1: number, yctl1: number, xctl2: number, yctl2: number, xend: number, yend: number, tol: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /** Standard LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA" to enable per-pixel alpha blending.
	*
	* 
	*
	* In addition to the standard LICE modes, LICE\_Blit also offers:
	*
	* \* "CHANCOPY\_XTOY", with X and Y any of the four channels, A, R, G or B. (CHANCOPY\_ATOA is similar to MASK mode.)
	*
	* \* "BLUR"
	*
	* \* "ALPHAMUL", which overwrites the destination with a per-pixel alpha-multiplied copy of the source. (Similar to first clearing the destination with 0x00000000 and then blitting with "COPY,ALPHA".) */
      function JS_LICE_Blit(destBitmap: identifier, dstx: number, dsty: number, sourceBitmap: identifier, srcx: number, srcy: number, width: number, height: number, alpha: number, mode: string): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_Circle(bitmap: identifier, cx: number, cy: number, r: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /**  */
      function JS_LICE_Clear(bitmap: identifier, color: number): void

      
      /**  */
      function JS_LICE_CreateBitmap(reaper: identifier, isSysBitmap: boolean, width: number, height: number): void

      
      /**  */
      function JS_LICE_CreateFont(reaper: identifier): void

      
      /** Deletes the bitmap, and also unlinks bitmap from any composited window. */
      function JS_LICE_DestroyBitmap(bitmap: identifier): void

      
      /**  */
      function JS_LICE_DestroyFont(LICEFont: identifier): void

      
      /**  */
      function JS_LICE_DrawChar(bitmap: identifier, x: number, y: number, c: number, color: number, alpha: number, mode: number): void

      
      /**  */
      function JS_LICE_DrawText(reaper: number, bitmap: identifier, LICEFont: identifier, text: string, textLen: number, x1: number, y1: number, x2: number, y2: number): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_FillCircle(bitmap: identifier, cx: number, cy: number, r: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /** packedX and packedY are two strings of coordinates, each packed as "&lt;i4".
	*
	* 
	*
	* LICE modes : "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA" to enable per-pixel alpha blending.
	*
	* 
	*
	* LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_FillPolygon(bitmap: identifier, packedX: string, packedY: string, numPoints: number, color: number, alpha: number, mode: string): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_FillRect(bitmap: identifier, x: number, y: number, w: number, h: number, color: number, alpha: number, mode: string): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_FillTriangle(bitmap: identifier, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, alpha: number, mode: string): void

      
      /**  */
      function JS_LICE_GetDC(reaper: identifier, bitmap: identifier): void

      
      /**  */
      function JS_LICE_GetHeight(reaper: number, bitmap: identifier): void

      
      /** Returns the color of the specified pixel. */
      function JS_LICE_GetPixel(reaper: number, bitmap: identifier, x: number, y: number): void

      
      /**  */
      function JS_LICE_GetWidth(reaper: number, bitmap: identifier): void

      
      /**  */
      function JS_LICE_GradRect(bitmap: identifier, dstx: number, dsty: number, dstw: number, dsth: number, ir: number, ig: number, ib: number, ia: number, drdx: number, dgdx: number, dbdx: number, dadx: number, drdy: number, dgdy: number, dbdy: number, dady: number, mode: string): void

      
      /**  */
      function JS_LICE_IsFlipped(reaper: boolean, bitmap: identifier): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_Line(bitmap: identifier, x1: number, y1: number, x2: number, y2: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /**  */
      function JS_LICE_ListAllBitmaps(): MultiReturn<[retval: number, list: string]>

      
      /** Returns a system LICE bitmap containing the JPEG. */
      function JS_LICE_LoadJPG(reaper: identifier, filename: string): void

      
      /** Returns a system LICE bitmap containing the PNG. */
      function JS_LICE_LoadPNG(reaper: identifier, filename: string): void

      
      /**  */
      function JS_LICE_MeasureText(text: string): MultiReturn<[width: number, Height: number]>

      
      /** Applies bitwise operations to each pixel in the target rectangle.
	*
	* 
	*
	* operand: a color in 0xAARRGGBB format.
	*
	* 
	*
	* modes:
	*
	* \* "XOR", "OR" or "AND".
	*
	* \* "SET\_XYZ", with XYZ any combination of A, R, G, and B: copies the specified channels from operand to the bitmap. (Useful for setting the alpha values of a bitmap.)
	*
	* \* "ALPHAMUL": Performs alpha pre-multiplication on each pixel in the rect. operand is ignored in this mode. (On WindowsOS, GDI\_Blit does not perform alpha multiplication on the fly, and a separate alpha pre-multiplication step is therefore required.)
	*
	* 
	*
	* NOTE:
	*
	* LICE\_Blit and LICE\_ScaledBlit are also useful for processing bitmap colors. For example, to multiply all channel values by 1.5:
	*
	* reaper.JS\_LICE\_Blit(bitmap, x, y, bitmap, x, y, w, h, 0.5, "ADD"). */
      function JS_LICE_ProcessRect(reaper: boolean, bitmap: identifier, x: number, y: number, w: number, h: number, mode: string, operand: number): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_PutPixel(bitmap: identifier, x: number, y: number, color: number, alpha: number, mode: string): void

      
      /**  */
      function JS_LICE_Resize(bitmap: identifier, width: number, height: number): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA" to enable per-pixel alpha blending. */
      function JS_LICE_RotatedBlit(destBitmap: identifier, dstx: number, dsty: number, dstw: number, dsth: number, sourceBitmap: identifier, srcx: number, srcy: number, srcw: number, srch: number, angle: number, rotxcent: number, rotycent: number, cliptosourcerect: boolean, alpha: number, mode: string): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA".
	*
	*            
	*
	*            
	*
	*            
	*
	*            LICE color format: 0xAARRGGBB (AA is only used in ALPHA mode). */
      function JS_LICE_RoundRect(bitmap: identifier, x: number, y: number, w: number, h: number, cornerradius: number, color: number, alpha: number, mode: string, antialias: boolean): void

      
      /** LICE modes: "COPY" (default if empty string), "MASK", "ADD", "DODGE", "MUL", "OVERLAY" or "HSVADJ", any of which may be combined with "ALPHA" to enable per-pixel alpha blending. */
      function JS_LICE_ScaledBlit(destBitmap: identifier, dstx: number, dsty: number, dstw: number, dsth: number, srcBitmap: identifier, srcx: number, srcy: number, srcw: number, srch: number, alpha: number, mode: string): void

      
      /** Sets all pixels that match the given color's RGB values to fully transparent, and all other pixels to fully opaque. (All pixels' RGB values remain unchanged.) */
      function JS_LICE_SetAlphaFromColorMask(bitmap: identifier, colorRGB: number): void

      
      /**  */
      function JS_LICE_SetFontBkColor(LICEFont: identifier, color: number): void

      
      /**  */
      function JS_LICE_SetFontColor(LICEFont: identifier, color: number): void

      
      /** Converts a GDI font into a LICE font.
	*
	*            
	*
	*            The font can be modified by the following flags, in a comma-separated list:
	*
	*            
	*
	*            "VERTICAL", "BOTTOMUP", "NATIVE", "BLUR", "INVERT", "MONO", "SHADOW" or "OUTLINE". */
      function JS_LICE_SetFontFromGDI(LICEFont: identifier, GDIFont: identifier, moreFormats: string): void

      
      /** Parameters:
	*
	* 
	*
	* \* quality is an integer in the range 1..100.
	*
	* \* forceBaseline is an optional boolean parameter that ensures compatibility with all JPEG viewers by preventing too low quality, "cubist" settings.  */
      function JS_LICE_WriteJPG(reaper: boolean, filenameLICE_IBitmap: string, quality: number, boolean: any | 'optional'): void

      
      /** Writes the contents of a LICE_IBitMap as png-file. */
      function JS_LICE_WritePNG(reaper: boolean, filenameLICE_IBitmap: string, wantAlpha: boolean): void

      
      /**  */
      function JS_ListView_EnsureVisible(listviewHWND: identifier, index: number, partialOK: boolean): void

      
      /** Returns the translation of the given US English text, according to the currently loaded Language Pack.
	*
	* 
	*
	* Parameters:
	*
	* \* LangPackSection: Language Packs are divided into sections such as "common" or "DLG\_102".
	*
	* \* In Lua, by default, text of up to 1024 chars can be returned. To increase (or reduce) the default buffer size, a string and size can be included as optional 3rd and 4th arguments.
	*
	* 
	*
	* Example: reaper.JS\_Localize("Actions", "common", "", 20) */
      function JS_Localize(USEnglish: string, LangPackSection: string): string

      
      /** Returns the addresses of all open MIDI windows (whether docked or not).
	*
	*            
	*
	* \* The addresses are stored in the provided reaper.array.
	*
	*            
	*
	* \* Each address can be converted to a REAPER object (HWND) by the function JS\_Window\_HandleFromAddress. */
      function JS_MIDIEditor_ArrayAll(reaperarray: identifier): void

      
      /** Returns a list of HWNDs of all open MIDI windows (whether docked or not).
	*
	*            
	*
	* \* The list is formatted as a comma-separated (and terminated) string of hexadecimal values.
	*
	*            
	*
	* \* Each value is an address that can be converted to a HWND by the function JS\_Window\_HandleFromAddress. */
      function JS_MIDIEditor_ListAll(buf: string): string

      
      /** Allocates memory for general use by functions that require memory buffers. */
      function JS_Mem_Alloc(reaper: identifier, sizeBytes: number): void

      
      /** Frees memory that was previously allocated by JS\_Mem\_Alloc. */
      function JS_Mem_Alloc(reaper: identifier, sizeBytes: number): void

      
      /** Copies a packed string into a memory buffer. */
      function JS_Mem_FromString(reaper: boolean, mallocPointer: identifier, offset: number, packedString: string, stringLength: number): void

      
      /** On Windows, retrieves a handle to the current mouse cursor.
	*
	* On Linux and macOS, retrieves a handle to the last cursor set by REAPER or its extensions via SWELL. */
      function JS_Mouse_GetCursor(): identifier

      
      /** Retrieves the states of mouse buttons and modifiers keys.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Parameters:
	*
	*            
	*
	* \* flags, state: The parameter and the return value both use the same format as gfx.mouse_cap. I.e., to get the states of the left mouse button and the ctrl key, use flags = 0b00000101.
	*
	* 
	*
	* use -1 as flags to retrieve the states of all mouse-buttons and modifier */
      function JS_Mouse_GetState(reaper: number, flags: number): void

      
      /** Loads a cursor by number.
	*
	*            
	*
	*            cursorNumber: Same as used for gfx.setcursor, and includes some of Windows' predefined cursors (with numbers &gt; 32000; refer to documentation for the Win32 C++ function LoadCursor), and REAPER's own cursors (with numbers &lt; 2000). 
	*
	*            
	*
	*            If successful, returns a handle to the cursor, which can be used in [JS\_Mouse\_SetCursor](#JS_Mouse_SetCursor). */
      function JS_Mouse_LoadCursor(reaper: identifier, cursorNumber: number): void

      
      /** Loads a cursor from a .cur file.
	*
	*            
	*
	* If omitted or false, and if the .cur file has already been loaded previously during the REAPER session, the file will not be re-loaded, and the previous handle will be returned, thereby (slightly) improving speed and (slighty) lowering memory usage.
	*
	* If true, the file will be re-loaded and a new handle will be returned.
	*
	*            
	*
	* If successful, returns a handle to the cursor, which can be used in [JS\_Mouse\_SetCursor](#JS_Mouse_SetCursor).
	*
	* forceNewLoad is an optional boolean parameter: */
      function JS_Mouse_LoadCursorFromFile(reaper: identifier, pathAndFileName: string, boolean: any | 'optional'): void

      
      /** Sets the mouse cursor.  (Only lasts while script is running, and for a single "defer" cycle.) */
      function JS_Mouse_SetCursor(cursorHandle: identifier): void

      
      /** Moves the mouse cursor to the specified coordinates. */
      function JS_Mouse_SetPosition(reaper: boolean, x: number, y: number): void

      
      /**  */
      function JS_PtrFromStr(reaper: identifier, s: string): void

      
      /** Returns the version of the js_ReaScriptAPI extension. */
      function JS_ReaScriptAPI_Version(): number

      
      /** Returns the memory contents starting at address[offset] as a packed string. Offset is added as steps of 1 byte (char) each. */
      function JS_String(pointer: identifier, offset: number, lengthChars: number): MultiReturn<[retval: boolean, buf: string]>

      
      /** Returns a 255-byte array that specifies which virtual keys, from 0x01 to 0xFF, have sent KEYDOWN messages since cutoffTime.
	*
	* 
	*
	* Notes:
	*
	* * Mouse buttons and modifier keys are not (currently) reliably detected, and JS\_Mouse\_GetState can be used instead.
	*
	* * Auto-repeated KEYDOWN messages are ignored. */
      function JS_VKeys_GetDown(cutoffTime: number): string

      
      /** deprecated */
      function JS_VKeys_ClearHistory(): void

      
      /** deprecated */
      function JS_VKeys_GetHistory(): MultiReturn<[retval: boolean, state: string]>

      
      /** Retrieves the current states (0 or 1) of all virtual keys, from 0x01 to 0xFF, in a 255-byte array.
	*
	* 
	*
	* cutoffTime: A key is only regarded as down if it sent a KEYDOWN message after the cut-off time, not followed by KEYUP. (This is useful for excluding old KEYDOWN messages that weren't properly followed by KEYUP.) 
	*
	* If cutoffTime is positive, is it interpreted as absolute time in similar format as time_precise().
	*
	* If cutoffTime is negative, it is relative to the current time.
	*
	* 
	*
	* Notes:
	*
	* Notes:
	*
	* * Mouse buttons and modifier keys are not (currently) reliably detected, and JS\_Mouse\_GetState can be used instead.
	*
	* * Auto-repeated KEYDOWN messages are ignored. */
      function JS_VKeys_GetState(): MultiReturn<[retval: boolean, state: string]>

      
      /** Return a 255-byte array that specifies which virtual keys, from 0x01 to 0xFF, have sent KEYUP messages since cutoffTime.
	*
	* 
	*
	* Note: Mouse buttons and modifier keys are not (currently) reliably detected, and [JS\_Mouse\_GetState](#JS_Mouse_GetState) can be used instead. */
      function JS_VKeys_GetUp(cutoffTime: number): string

      
      /** Intercepting (blocking) virtual keys work similar to the native function PreventUIRefresh: Each key has a (non-negative) intercept state, and the key is passed through as usual if the state equals 0, or blocked if the state is greater than 0.
	*
	* 
	*
	* keyCode: The virtual key code of the key, or -1 to change the state of all keys.
	*
	* 
	*
	* intercept: A script can increase the intercept state by passing +1, or lower the state by passing -1. 
	*
	* Multiple scripts can block the same key, and the intercept state may reach up to 255. 
	*
	* If zero is passed, the intercept state is not changed, but the current state is returned.
	*
	* 
	*
	* Returns: If keyCode refers to a single key, the intercept state of that key is returned. If keyCode = -1, the state of the key that is most strongly blocked (highest intercept state) is returned. */
      function JS_VKeys_Intercept(keyCode: number, intercept: number): number

      
      /** Intercepts window messages to specified window.
	*
	* 
	*
	* Parameters:
	*
	* 
	*
	*  * message: a single message type to be intercepted, either in WM_ or hexadecimal format. For example "WM_SETCURSOR" or "0x0020".
	*
	* 
	*
	*  * passThrough: Whether message should be blocked (false) or passed through (true) to the window.
	*
	* 
	*
	*     For more information on message codes, refer to the Win32 C++ API documentation.
	*
	* 
	*
	*     For a list of message types that are valid cross-platform, refer to swell-types.h. Only these will be recognized by WM_ name.
	*
	* 
	*
	* 
	*
	* 
	*
	* Returns:
	*
	* 
	*
	*  * 1: Success.
	*
	* 
	*
	*  * 0: The message type is already being intercepted by another script.
	*
	* 
	*
	*  * -2: message string could not be parsed.
	*
	* 
	*
	*  * -3: Failure getting original window process / window not valid.
	*
	* 
	*
	*  * -6: Could not obtain the window client HDC.
	*
	* 
	*
	* 
	*
	* Notes:
	*
	* 
	*
	*  * Intercepted messages can be polled using JS_WindowMessage_Peek.
	*
	* 
	*
	*  * Intercepted messages can be edited, if necessary, and then forwarded to their original destination using JS_WindowMessage_Post or JS_WindowMessage_Send.
	*
	* 
	*
	*  * To check whether a message type is being blocked or passed through, Peek the message type, or retrieve the entire List of intercepts.
	*
	* 
	*
	*  * Mouse events are typically received by the child window under the mouse, not the parent window.
	*
	*  
	*
	*  Keyboard events are usually *not* received by any individual window. To intercept keyboard events, use the VKey functions. */
      function JS_WindowMessage_Intercept(reaper: number, windowHWND: identifier, messages: string, passThrough: boolean): void

      
      /** Intercepts window messages to specified window.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Parameters:
	*
	*            
	*
	* * messages: comma-separated string of message types to be intercepted (either in WM_ or hexadecimal format), each with a "block" or "passthrough" modifier to specify whether the message should be blocked or passed through to the window. For example "WM_SETCURSOR:block, 0x0201:passthrough".
	*
	*            
	*
	*    For more information on message codes, refer to the Win32 C++ API documentation.
	*
	*            
	*
	*    For a list of message types that are valid cross-platform, refer to swell-types.h. Only these will be recognized by WM_ name.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Returns:
	*
	*            
	*
	* * 1: Success.
	*
	*            
	*
	* * 0: The message type is already being intercepted by another script.
	*
	*            
	*
	* * -1: windowHWND is not a valid window.
	*
	*            
	*
	* * -2: message string could not be parsed.
	*
	*            
	*
	* * -3: Failure getting original window process.
	*
	*            
	*
	* * -6: Could not obtain the window client HDC.
	*
	*            
	*
	*            Notes:
	*
	*            
	*
	* * Intercepted messages can be polled using JS_WindowMessage_Peek.
	*
	*            
	*
	* * Intercepted messages can be edited, if necessary, and then forwarded to their original destination using JS_WindowMessage_Post or JS_WindowMessage_Send.
	*
	*            
	*
	* * To check whether a message type is being blocked or passed through, Peek the message type, or retrieve the entire List of intercepts. */
      function JS_WindowMessage_InterceptList(reaper: number, windowHWND: identifier, messages: string): void

      
      /** Returns a string with a list of all message types currently being intercepted for the specified window. */
      function JS_WindowMessage_ListIntercepts(windowHWND: identifier, buf: string): MultiReturn<[retval: boolean, buf: string]>

      
      /** Changes the passthrough setting of a message type that is already being intercepted.
	*
	* 
	*
	* Returns 1 if successful, 0 if the message type is not yet being intercepted, or -2 if the argument could not be parsed. */
      function JS_WindowMessage_PassThrough(reaper: number, windowHWND: identifier, message: string, passThrough: boolean): void

      
      /** Polls the state of an intercepted message.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Parameters:
	*
	*            
	*
	* * message: String containing a single message name, such as "WM_SETCURSOR", or in hexadecimal format, "0x0020".
	*
	*            
	*
	* (For a list of message types that are valid cross-platform, refer to swell-types.h. Only these will be recognized by WM_ name.)
	*
	*            
	*
	*            
	*
	*            
	*
	*            Returns:
	*
	*            
	*
	* * A retval of false indicates that the message type is not being intercepted in the specified window.
	*
	*            
	*
	* * All messages are timestamped. A time of 0 indicates that no message if this type has been intercepted yet.
	*
	*            
	*
	* * For more information about wParam and lParam for different message types, refer to Win32 C++ documentation.
	*
	*            
	*
	* * For example, in the case of mousewheel, returns mousewheel delta, modifier keys, x position and y position.
	*
	*            
	*
	* * wParamHigh, lParamLow and lParamHigh are signed, whereas wParamLow is unsigned. */
      function JS_WindowMessage_Peek(windowHWND: identifier, message: string): MultiReturn<[retval: boolean, passedThrough: boolean, time: number, wParamLow: number, wParamHigh: number, lParamLow: number, lParamHigh: number]>

      
      /** If the specified window and message type are not currently being intercepted by a script, this function will post the message in the message queue of the specified window, and return without waiting.
	*
	* 
	*
	* If the window and message type are currently being intercepted, the message will be sent directly to the original window process, similar to WindowMessage_Send, thereby skipping any intercepts.
	*
	* 
	*
	* Parameters:
	*
	* * message: String containing a single message name, such as "WM_SETCURSOR", or in hexadecimal format, "0x0020".
	*
	* (For a list of WM_ and CB_ message types that are valid cross-platform, refer to swell-types.h. Only these will be recognized by WM_ or CB_ name.)
	*
	* * wParam, wParamHigh, lParam and lParamHigh: Low and high 16-bit WORDs of the WPARAM and LPARAM parameters.
	*
	* (Most window messages encode separate information into the two WORDs. However, for those rare cases in which the entire WPARAM and LPARAM must be used to post a large pointer, the script can store this address in wParam or lParam, and keep wParamHigh and lParamHigh zero.)
	*
	* 
	*
	* Notes:
	*
	* * For more information about parameter values, refer to documentation for the Win32 C++ function PostMessage.
	*
	* * Messages should only be sent to windows that were created from the main thread.
	*
	* * Useful for simulating mouse clicks and calling mouse modifier actions from scripts. */
      function JS_WindowMessage_Post(windowHWND: identifier, message: string, wParam: number, wParamHighWord: number, lParam: number, lParamHighWord: number): boolean

      
      /** Release intercepts of specified message types.
	*
	*            
	*
	*            Parameters:
	*
	*            
	*
	* * messages: "WM_SETCURSOR,WM_MOUSEHWHEEL" or "0x0020,0x020E", for example. */
      function JS_WindowMessage_Release(reaper: number, windowHWND: identifier, messages: string): void

      
      /** Release script intercepts of window messages for all windows. */
      function JS_WindowMessage_ReleaseAll(): void

      
      /** Release script intercepts of window messages for specified window. */
      function JS_WindowMessage_ReleaseWindow(windowHWND: identifier): void

      
      /** Sends a message to the specified window by calling the window process directly, and only returns after the message has been processed. Any intercepts of the message by scripts will be skipped, and the message can therefore not be blocked.
	*
	* 
	*
	* Parameters:
	*
	* * message: String containing a single message name, such as "WM_SETCURSOR", or in hexadecimal format, "0x0020".
	*
	* (For a list of WM_ and CB_ message types that are valid cross-platform, refer to swell-types.h. Only these will be recognized by WM_ or CB_ name.)
	*
	* * wParam, wParamHigh, lParam and lParamHigh: Low and high 16-bit WORDs of the WPARAM and LPARAM parameters.
	*
	* (Most window messages encode separate information into the two WORDs. However, for those rare cases in which the entire WPARAM and LPARAM must be used to post a large pointer, the script can store this address in wParam or lParam, and keep wParamHigh and lParamHigh zero.)
	*
	* 
	*
	* Notes:
	*
	* * For more information about parameter and return values, refer to documentation for the Win32 C++ function SendMessage.
	*
	* * Messages should only be sent to windows that were created from the main thread.
	*
	* * Useful for simulating mouse clicks and calling mouse modifier actions from scripts. */
      function JS_WindowMessage_Send(reaper: number, windowHWND: identifier, message: string, wParam: number, wParamHighWord: number, lParam: number, lParamHighWord: number): void

      
      /**  */
      function JS_Window_AddressFromHandle(handle: identifier): number

      
      /** Returns all child windows of the specified parent.
	*
	*            
	*
	*            
	*
	*            
	*
	*            The addresses are stored in the provided reaper.array, and can be converted to REAPER objects (HWNDs) by the function JS_Window_HandleFromAddress. */
      function JS_Window_ArrayAllChild(parentHWND: identifier, reaperarray: identifier): void

      
      /** Returns all top-level windows.
	*
	*            
	*
	*            
	*
	*            
	*
	*            The addresses are stored in the provided reaper.array, and can be converted to REAPER objects (HWNDs) by the function JS_Window_HandleFromAddress. */
      function JS_Window_ArrayAllTop(reaperarray: identifier): void

      
      /** Returns all windows, whether top-level or child, whose titles match the specified string.
	*
	*            
	*
	*            
	*
	*            
	*
	*            The addresses are stored in the provided reaper.array, and can be converted to REAPER objects (HWNDs) by the function JS_Window_HandleFromAddress.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Parameters: * exact: Match entire title exactly, or match substring of title. */
      function JS_Window_ArrayFind(title: string, exact: boolean, reaperarray: identifier): void

      
      /**  */
      function JS_Window_AttachResizeGrip(windowHWND: identifier): void

      
      /** Attaches a "pin on top" button to the window frame. The button should remember its state when closing and re-opening the window.
	*
	* 
	*
	* WARNING: This function does not yet work on Linux. */
      function JS_Window_AttachTopmostPin(windowHWND: identifier): identifier

      
      /** Converts the client-area coordinates of a specified point to screen coordinates. */
      function JS_Window_ClientToScreen(windowHWND: identifier, x: number, y: number): MultiReturn<[x: number, y: number]>

      
      /** Creates a modeless window with WS\_OVERLAPPEDWINDOW style and only rudimentary features. Scripts can paint into the window using GDI or LICE/Composite functions (and JS\_Window\_InvalidateRect to trigger re-painting).
	*
	* 
	*
	* style: An optional parameter that overrides the default style. The string may include any combination of standard window styles, such as "POPUP" for a frameless window, or "CAPTION,SIZEBOX,SYSMENU" for a standard framed window.
	*
	* 
	*
	* On Linux and macOS, "MAXIMIZE" has not yet been implemented, and the remaining styles may appear slightly different from their WindowsOS counterparts.
	*
	* 
	*
	* className: On Windows, only standard ANSI characters are supported.
	*
	* 
	*
	* ownerHWND: Optional parameter, only available on WindowsOS. Usually either the REAPER main window or another script window, and useful for ensuring that the created window automatically closes when the owner is closed.
	*
	* 
	*
	* NOTE: On Linux and macOS, the window contents are only updated \*between\* defer cycles, so the window cannot be animated by for/while loops within a single defer cycle. */
      function JS_Window_Create(title: string, className: string, x: number, y: number, w: number, h: number, string: any | 'optional', ownerHWND: identifier): MultiReturn<[retval: identifier, string: any | 'optional']>

      
      /** Destroys the specified window. */
      function JS_Window_Destroy(windowHWND: identifier): void

      
      /** Enables or disables mouse and keyboard input to the specified window or control. */
      function JS_Window_Enable(windowHWND: identifier, enable: boolean): void

      
      /** On macOS, returns the Metal graphics setting:
	*
	* 			2 = Metal enabled and support GetDC()/ReleaseDC() for drawing (more overhead).
	*
	* 			1 = Metal enabled.
	*
	* 			0 = N/A (Windows and Linux).
	*
	* 			-1 = non-metal async layered mode.
	*
	* 			-2 = non-metal non-async layered mode.
	*
	* 
	*
	* 			WARNING: If using mode -1, any BitBlt()/StretchBlt() MUST have the source bitmap persist. If it is resized after Blit it could cause crashes. */
      function JS_Window_EnableMetal(windowHWND: identifier): number

      
      /** Returns a HWND to a window whose title matches the specified string.
	*
	* \* Unlike the Win32 function FindWindow, this function searches top-level as well as child windows, so that the target window can be found irrespective of docked state.
	*
	* \* In addition, the function can optionally match substrings of the title.
	*
	* \* Matching is not case sensitive.
	*
	* 
	*
	* Parameters:
	*
	* \* exact: Match entire title, or match substring of title. */
      function JS_Window_Find(reaper: identifier, title: string, exact: boolean): void

      
      /** Returns a HWND to a child window whose title matches the specified string.
	*
	* 
	*
	* Parameters:
	*
	* 
	*
	*  \* exact: Match entire title length, or match substring of title. In both cases, matching is not case sensitive. */
      function JS_Window_FindChild(reaper: identifier, parentHWND: identifier, title: string, exact: boolean): void

      
      /** Similar to the C++ WIN32 function GetDlgItem, this function finds child windows by ID.
	*
	* 
	*
	* (The ID of a window may be retrieved by JS\_Window\_GetLongPtr.)
	*
	* 
	*
	* For instance: with Reaper's [MainHWND](#GetMainHwnd), you can get:
	*
	*     0: Transport(Windows)/MainHWND(Mac)
	*
	*     999: project-tabs(if existing, otherwise will be nil)
	*
	*     1000: trackview
	*
	*     1005: timeline
	*
	*     1259: Mouse editing help in the area beneath the track control panels */
      function JS_Window_FindChildByID(parentHWND: identifier, ID: number): identifier

      
      /** Returns a handle to a child window whose class and title match the specified strings.
	*
	* 
	*
	* Parameters: \* childWindow: The function searches child windows, beginning with the window *after* the specified child window. If childHWND is equal to parentHWND, the search begins with the first child window of parentHWND.
	*
	* \* title: An empty string, "", will match all windows. (Search is not case sensitive.) */
      function JS_Window_FindEx(HWND: identifier, parentHWND: identifier, childHWND: identifier, className: string, title: string): void

      
      /** Returns a HWND to a top-level window whose title matches the specified string.
	*
	* 
	*
	* Parameters:
	*
	* \* exact: Match entire title length, or match substring of title. In both cases, matching is not case sensitive. */
      function JS_Window_FindTop(reaper: identifier, title: string, exact: boolean): void

      
      /** Retrieves a HWND to the window that contains the specified point. */
      function JS_Window_FromPoint(reaper: identifier, x: number, y: number): void

      
      /** WARNING: May not be fully implemented on MacOS and Linux. */
      function JS_Window_GetClassName(windowHWND: identifier, buf: string): string

      
      /** Retrieves the coordinates of the client area rectangle of the specified window. The dimensions are given in screen coordinates relative to the upper-left corner of the screen.
	*
	*            
	*
	*            NOTE 1: Unlike the C++ function GetClientRect, this function returns the actual coordinates, not the width and height.
	*
	*            
	*
	*            NOTE 2: The pixel at (right, bottom) lies immediately outside the rectangle. */
      function JS_Window_GetClientRect(windowHWND: identifier): MultiReturn<[retval: boolean, left: number, top: number, right: number, bottom: number]>

      
      /** Retrieves a HWND to the window that has the keyboard focus, if the window is attached to the calling thread's message queue. */
      function JS_Window_GetClientSize(windowHWND: identifier): MultiReturn<[retval: boolean, width: number, height: number]>

      
      /** Retrieves a HWND to the window that has the keyboard focus, if the window is attached to the calling thread's message queue. */
      function JS_Window_GetFocus(reaper: identifier): void

      
      /** Retrieves a HWND to the top-level foreground window (the window with which the user is currently working). */
      function JS_Window_GetForeground(reaper: identifier): void

      
      /** In the case of "DLGPROC" and "WNDPROC", the return values can be converted to pointers by [JS\_Window\_HandleFromAddress](#JS_Window_HandleFromAddress).
	*
	* 
	*
	* 		   If the function fails, the return value is 0. */
      function JS_Window_GetLong(windowHWND: identifier, info: string): number

      
      /** Returns information about the specified window.
	*
	*            
	*
	*            
	*
	*            
	*
	*            info: "USERDATA", "WNDPROC", "DLGPROC", "ID", "EXSTYLE" or "STYLE".
	*
	*            
	*
	*            
	*
	*            
	*
	*            For documentation about the types of information returned, refer to the Win32 function GetWindowLongPtr.
	*
	* 		   The values returned by "DLGPROC" and "WNDPROC" are typically used as-is, as pointers, whereas the others should first be converted to integers. */
      function JS_Window_GetLongPtr(reaper: identifier, windowHWND: identifier, info: string): void

      
      /** Retrieves a HWND to the specified window's parent or owner.
	*
	*            
	*
	*            Returns NULL if the window is unowned or if the function otherwise fails. */
      function JS_Window_GetParent(reaper: identifier, windowHWND: identifier): void

      
      /** Retrieves the coordinates of the bounding rectangle of the specified window. The dimensions are given in screen coordinates relative to the upper-left corner of the screen.
	*
	*            
	*
	*            NOTE: The pixel at (right, bottom) lies immediately outside the rectangle. */
      function JS_Window_GetRect(windowHWND: identifier): MultiReturn<[retval: boolean, left: number, top: number, right: number, bottom: number]>

      
      /** Retrieves a handle to a window that has the specified relationship (Z-Order or owner) to the specified window.
	*
	*            
	*
	*            relation: "LAST", "NEXT", "PREV", "OWNER" or "CHILD".
	*
	*            
	*
	*            (Refer to documentation for Win32 C++ function GetWindow.) */
      function JS_Window_GetRelated(reaper: identifier, windowHWND: identifier, relation: string): void

      
      /** Retrieves the scroll information of a window.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Parameters:
	*
	*            
	*
	* \* scrollbar: "v" (or "SB\_VERT", or "VERT") for vertical scroll, "h" (or "SB\_HORZ" or "HORZ") for horizontal.
	*
	*            
	*
	*            
	*
	*            
	*
	*            Returns:
	*
	*            
	*
	* \* Leftmost or topmost visible pixel position, as well as the visible page size, the range minimum and maximum, and scroll box tracking position. */
      function JS_Window_GetScrollInfo(windowHWND: identifier, scrollbar: string): MultiReturn<[retval: boolean, position: number, pageSize: number, min: number, max: number, trackPos: number]>

      
      /** Returns the title (if any) of the specified window. */
      function JS_Window_GetTitle(windowHWND: identifier): string

      
      /** Retrieves the dimensions of the display monitor that has the largest area of intersection with the specified rectangle.
	*
	* 
	*
	* If the monitor is not the primary display, some of the rectangle's coordinates may be negative.
	*
	* 
	*
	* wantWork: Returns the work area of the display, which excludes the system taskbar or application desktop toolbars. */
      function JS_Window_GetViewportFromRect(x1: number, y1: number, x2: number, y2: number, wantWork: boolean): MultiReturn<[left: number, top: number, right: number, bottom: number]>

      
      /** Converts an address to a handle (such as a HWND) that can be utilized by REAPER and other API functions. */
      function JS_Window_HandleFromAddress(reaper: identifier, address: number): void

      
      /** Similar to the Win32 function InvalidateRect. */
      function JS_Window_InvalidateRect(windowHWND: identifier, left: number, top: number, right: number, bottom: number, eraseBackground: boolean): boolean

      
      /** Determines whether a window is a child window or descendant window of a specified parent window. */
      function JS_Window_IsChild(reaper: boolean, parentHWND: identifier, childHWND: identifier): void

      
      /** Determines the visibility state of the window. */
      function JS_Window_IsVisible(reaper: boolean, windowHWND: identifier): void

      
      /** Determines whether the specified window handle identifies an existing window.
	*
	* 
	*
	* On macOS and Linux, only windows that were created by WDL/swell will be identified (and only such windows should be acted on by scripts).
	*
	* 
	*
	* NOTE: Since REAPER v5.974, windows can be checked using the native function ValidatePtr(windowHWND, "HWND"). */
      function JS_Window_IsWindow(reaper: boolean, windowHWND: identifier): void

      
      /** Finds all child windows of the specified parent.
	*
	* 
	*
	* Returns:
	*
	* \* retval: The number of windows found; negative if an error occurred.
	*
	* \* list: A comma-separated string of hexadecimal values.
	*
	* Each value is an address that can be converted to a HWND by the function JS\_Window\_HandleFromAddress. */
      function JS_Window_ListAllChild(parentHWND: identifier): MultiReturn<[retval: number, list: string]>

      
      /** Finds all top-level windows.
	*
	* 
	*
	* Returns:
	*
	* \* retval: The number of windows found; negative if an error occurred.
	*
	* \* list: A comma-separated string of hexadecimal values. Each value is an address that can be converted to a HWND by the function JS\_Window\_HandleFromAddress. */
      function JS_Window_ListAllTop(): MultiReturn<[retval: number, list: string]>

      
      /** Finds all windows (whether top-level or child) whose titles match the specified string.
	*
	* 
	*
	* Returns:
	*
	* \* retval: The number of windows found; negative if an error occurred.
	*
	* \* list: A comma-separated string of hexadecimal values. Each value is an address that can be converted to a HWND by the function JS\_Window\_HandleFromAddress.
	*
	* 
	*
	* Parameters:
	*
	* \* exact: Match entire title exactly, or match substring of title. */
      function JS_Window_ListFind(title: string, exact: boolean): MultiReturn<[retval: number, list: string]>

      
      /** Deprecated - use [GetViewportFromRect](#GetViewportFromRect) instead. */
      function JS_Window_MonitorFromRect(x1: number, y1: number, x2: number, y2: number, wantWork: boolean): MultiReturn<[left: number, top: number, right: number, bottom: number]>

      
      /** Changes the position of the specified window, keeping its size constant.
	*
	* 
	*
	* NOTES:
	*
	* * For top-level windows, position is relative to the primary display.
	*
	* * On Windows and Linux, position is calculated as the coordinates of the upper left corner of the window, relative to upper left corner of the primary display, and the positive Y-axis points downward.
	*
	* * On macOS, position is calculated as the coordinates of the bottom left corner of the window, relative to bottom left corner of the display, and the positive Y-axis points upward.
	*
	* * For a child window, on all platforms, position is relative to the upper-left corner of the parent window's client area.
	*
	* * Equivalent to calling [JS\_Window\_SetPosition](#JS_Window_SetPosition) with NOSIZE, NOZORDER, NOACTIVATE and NOOWNERZORDER flags set. */
      function JS_Window_Move(windowHWND: identifier, left: number, top: number): void

      
      /** Sends a "WM\_COMMAND" message to the specified window, which simulates a user selecting a command in the window menu.
	*
	* 
	*
	* This function is similar to Main\_OnCommand and MIDIEditor\_OnCommand, but can send commands to any window that has a menu.
	*
	* 
	*
	* In the case of windows that are listed among the Action list's contexts (such as the Media Explorer), the commandIDs of the actions in the Actions list may be used. */
      function JS_Window_OnCommand(windowHWND: identifier, commandID: number): boolean

      
      /** deprecated, removed from JS_0.952 and later */
      function JS_Window_RemoveXPStyle(reaper: boolean, windowHWND: identifier, remove: boolean): void

      
      /** Changes the dimensions of the specified window, keeping the top left corner position constant.
	*
	*            
	*
	* * If resizing script GUIs, call gfx.update() after resizing.
	*
	* 
	*
	* * Equivalent to calling [JS\_Window\_SetPosition](#JS_Window_SetPosition) with NOMOVE, NOZORDER, NOACTIVATE and NOOWNERZORDER flags set. */
      function JS_Window_Resize(windowHWND: identifier, width: number, height: number): void

      
      /** Converts the screen coordinates of a specified point on the screen to client-area coordinates. */
      function JS_Window_ScreenToClient(windowHWND: identifier, x: number, y: number): MultiReturn<[x: number, y: number]>

      
      /** Sets the keyboard focus to the specified window. */
      function JS_Window_SetFocus(windowHWND: identifier): void

      
      /** Brings the specified window into the foreground, activates the window, and directs keyboard input to it. */
      function JS_Window_SetForeground(windowHWND: identifier): void

      
      /** Similar to the Win32 function SetWindowLongPtr. 
	*
	* 
	*
	* info: "USERDATA", "WNDPROC", "DLGPROC", "ID", "EXSTYLE" or "STYLE", and only on WindowOS, "INSTANCE" and "PARENT". */
      function JS_Window_SetLong(windowHWND: identifier, info: string, value: number): number

      
      /** Sets the window opacity.
	*
	* 
	*
	* Parameters:  
	*
	* mode: either "ALPHA" or "COLOR".  
	*
	* value: If ALPHA, the specified value may range from zero to one, and will apply to the entire window, frame included.  
	*
	* If COLOR, value specifies a 0xRRGGBB color, and all pixels of this color will be made transparent. (All mouse clicks over transparent pixels will pass through, too).  
	*
	* 
	*
	* WARNING: COLOR mode is only available in Windows, not Linux or macOS.
	*
	* 
	*
	* Transparency can only be applied to top-level windows. If windowHWND refers to a child window, the entire top-level window that contains windowHWND will be made transparent.   */
      function JS_Window_SetOpacity(reaper: boolean, windowHWND: identifier, mode: string, value: number): void

      
      /** If successful, returns a handle to the previous parent window. */
      function JS_Window_SetParent(reaper: identifier, childHWND: identifier, parentHWND: identifier): void

      
      /** Interface to the Win32/swell function SetWindowPos, with which window position, size, Z-order and visibility can be set, and new frame styles can be applied.
	*
	* 
	*
	* ZOrder and flags are optional parameters. If no arguments are supplied, the window will simply be moved and resized, as if the NOACTIVATE, NOZORDER, NOOWNERZORDER flags were set.
	*
	* \* ZOrder: "BOTTOM", "TOPMOST", "NOTOPMOST", "TOP" or a window HWND converted to a string, for example by the Lua function tostring.
	*
	* \* flags: Any combination of the standard flags, of which "NOMOVE", "NOSIZE", "NOZORDER", "NOACTIVATE", "SHOWWINDOW", "FRAMECHANGED" and "NOCOPYBITS" should be valid cross-platform. */
      function JS_Window_SetPosition(windowHWND: identifier, left: number, top: number, width: number, height: number, string: any | 'optional', string: any | 'optional'): MultiReturn<[retval: boolean, string: any | 'optional', string: any | 'optional']>

      
      /** Parameters:
	*
	*            
	*
	* * scrollbar: "v" (or "SB_VERT", or "VERT") for vertical scroll, "h" (or "SB_HORZ" or "HORZ") for horizontal.
	*
	*            
	*
	*            
	*
	*            
	*
	*            NOTE: API functions can scroll REAPER's windows, but cannot zoom them.  Instead, use actions such as "View: Zoom to one loop iteration". */
      function JS_Window_SetScrollPos(reaper: boolean, windowHWND: identifier, scrollbar: string, position: number): void

      
      /** Sets and applies a window style.
	*
	* 
	*
	* style may include any combination of standard window styles, such as "POPUP" for a frameless window, or "CAPTION,SIZEBOX,SYSMENU" for a standard framed window.
	*
	* 
	*
	* On Linux and macOS, "MAXIMIZE" has not yet been implmented, and the remaining styles may appear slightly different from their WindowsOS counterparts. */
      function JS_Window_SetStyle(windowHWND: identifier, style: string): MultiReturn<[retval: boolean, style: string]>

      
      /** Changes the title of the specified window. Returns true if successful. */
      function JS_Window_SetTitle(reaper: boolean, windowHWND: identifier, title: string): void

      
      /** Sets the window Z order.
	*
	* * Equivalent to calling JS_Window_SetPos with flags NOMOVE | NOSIZE.
	*
	* * Not all the Z orders have been implemented in Linux yet.
	*
	* 
	*
	* Parameters:
	*
	* * ZOrder: "BOTTOM", "TOPMOST", "NOTOPMOST", "TOP", or a window HWND converted to a string, for example by the Lua function tostring.
	*
	* 
	*
	* * InsertAfterHWND: For compatibility with older versions, this parameter is still available, and is optional. If ZOrder is "INSERTAFTER", insertAfterHWND must be a handle to the window behind which windowHWND will be placed in the Z order, equivalent to setting ZOrder to this HWND; otherwise, insertAfterHWND is ignored and can be left out (or it can simply be set to the same value as windowHWND). */
      function JS_Window_SetZOrder(reaper: boolean, windowHWND: identifier, ZOrder: string, insertAfterHWND: identifier): void

      
      /** Sets the specified window's show state.
	*
	* 
	*
	* Parameters:
	*
	* \* state: One of the following options: "SHOW", "SHOWNA" (or "SHOWNOACTIVATE"), "SHOWMINIMIZED", "HIDE", "NORMAL", "SHOWNORMAL", "SHOWMAXIMIZED", "SHOWDEFAULT" or "RESTORE".
	*
	* 
	*
	* On Linux and macOS, only the first four options are fully implemented. */
      function JS_Window_Show(windowHWND: identifier, state: string): void

      
      /** Similar to the Win32 function UpdateWindow. */
      function JS_Window_Update(windowHWND: identifier): void

      
      /** retval is 1 if a folder was selected, 0 if the user canceled the dialog, and -1 if an error occurred. */
      function JS_Dialog_BrowseForFolder(caption: string, initialFolder: string): MultiReturn<[retval: number, folder: string]>

      
      /** If allowMultiple is true, multiple files may be selected. The returned string is \0-separated, with the first substring containing the folder path and subsequent substrings containing the file names.
	*
	* * On macOS, the first substring may be empty, and each file name will then contain its entire path.
	*
	* * This function only allows selection of existing files, and does not allow creation of new files.
	*
	* 
	*
	* extensionList is a string containing pairs of \0-terminated substrings. The last substring must be terminated by two \0 characters. Each pair defines one filter pattern:
	*
	* * The first substring in each pair describes the filter in user-readable form (for example, "Lua script files (*.lua)") and will be displayed in the dialog box.
	*
	* * The second substring specifies the filter that the operating system must use to search for the files (for example, "*.txt"; the wildcard should not be omitted). To specify multiple extensions for a single display string, use a semicolon to separate the patterns (for example, "*.lua;*.eel").
	*
	* 
	*
	* An example of an extensionList string:
	*
	* "ReaScript files\0*.lua;*.eel\0Lua files (.lua)\0*.lua\0EEL files (.eel)\0*.eel\0\0".
	*
	* 
	*
	* On macOS, file dialogs do not accept empty extensionLists, nor wildcard extensions (such as "All files\0*.*\0\0"), so each acceptable extension must be listed explicitly. On Linux and Windows, wildcard extensions are acceptable, and if the extensionList string is empty, the dialog will display a default "All files (*.*)" filter.
	*
	* 
	*
	* retval is 1 if one or more files were selected, 0 if the user cancelled the dialog, or negative if an error occurred.
	*
	* 
	*
	* Displaying \0-separated strings:
	*
	* * REAPER's IDE and ShowConsoleMsg only display strings up to the first \0 byte. If multiple files were selected, only the first substring containing the path will be displayed. This is not a problem for Lua or EEL, which can access the full string beyond the first \0 byte as usual. */
      function JS_Dialog_BrowseForOpenFiles(windowTitle: string, initialFolder: string, initialFile: string, extensionList: string, allowMultiple: boolean): MultiReturn<[retval: number, fileNames: string]>

      
      /** Opens a file-chooser-dialog for saving operations.
	*
	* 
	*
	* retval is 1 if a file was selected, 0 if the user cancelled the dialog, or negative if an error occurred.
	*
	* 
	*
	* extensionList is a string containing pairs of 0-terminated substrings. The last substring must be terminated by two 0 characters. Each pair defines one filter pattern:
	*
	* * The first substring in each pair describes the filter in user-readable form (for example, "Lua script files (*.lua)") and will be displayed in the dialog box.
	*
	* * The second substring specifies the filter that the operating system must use to search for the files (for example, "*.txt"; the wildcard should not be omitted). To specify multiple extensions for a single display string, use a semicolon to separate the patterns (for example, "*.lua;*.eel").
	*
	* 
	*
	* An example of an extensionList string:
	*
	* "ReaScript files\0*.lua;*.eel\0Lua files (.lua)\0*.lua\0EEL files (.eel)\0*.eel\0\0".
	*
	* 
	*
	* If the extensionList string is empty, it will display the default "All files (*.*)" filter. */
      function JS_Dialog_BrowseForSaveFile(windowTitle: string, initialFolder: string, initialFile: string, extensionList: string): MultiReturn<[retval: number, fileName: string]>

      
      /** Returns the index of the next selected list item with index greater that the specified number. Returns -1 if no selected items left. */
      function JS_ListView_EnumSelItems(reaper: number, listviewHWND: identifier, index: number): void

      
      /** Returns the index and text of the focused item, if any. */
      function JS_ListView_GetFocusedItem(listviewHWND: identifier): MultiReturn<[retval: number, text: string]>

      
      /** Returns the text and state of specified item. */
      function JS_ListView_GetItem(listviewHWND: identifier, index: number, subItem: number): MultiReturn<[text: string, state: number]>

      
      /**  */
      function JS_ListView_GetItemCount(listviewHWND: identifier): number

      
      /** Returns client coordinates of the item. */
      function JS_ListView_GetItemRect(listviewHWND: identifier, index: number): MultiReturn<[retval: boolean, left: number, top: number, right: number, bottom: number]>

      
      /** State is a bitmask:
	*
	* 1 = selected, 2 = focused. On Windows only, cut-and-paste marked = 4, drag-and-drop highlighted = 8.
	*
	* 
	*
	* Warning: this function uses the Win32 bitmask values, which differ from the values used by WDL/swell. */
      function JS_ListView_GetItemState(listviewHWND: identifier, index: number): number

      
      /**  */
      function JS_ListView_GetItemText(listviewHWND: identifier, index: number, subItem: number): string

      
      /**  */
      function JS_ListView_GetSelectedCount(listviewHWND: identifier): number

      
      /**  */
      function JS_ListView_GetTopIndex(reaper: number, listviewHWND: identifier): void

      
      /**  */
      function JS_ListView_HitTest(listviewHWND: identifier, clientX: number, clientY: number): MultiReturn<[index: number, subItem: number, flags: number]>

      
      /** Returns the indices of all selected items as a comma-separated list.
	*
	* 
	*
	* * retval: Number of selected items found; negative or zero if an error occured. */
      function JS_ListView_ListAllSelItems(listviewHWND: identifier): MultiReturn<[retval: number, items: string]>

      
      /** The mask parameter specifies the state bits that must be set, and the state parameter specifies the new values for those bits.
	*
	* 
	*
	* 1 = selected, 2 = focused. On Windows only, cut-and-paste marked = 4, drag-and-drop highlighted = 8.
	*
	* 
	*
	* Warning: this function uses the Win32 bitmask values, which differ from the values used by WDL/swell. */
      function JS_ListView_SetItemState(listviewHWND: identifier, index: number, state: number, mask: number): void

      
      /** Currently, this fuction only accepts ASCII text. */
      function JS_ListView_SetItemText(listviewHWND: identifier, index: number, subItem: number, text: string): void

      
      /** Creates writer for 32 bit floating point WAV */
      function Xen_AudioWriter_Create(reaper: AudioWriter, filename: string, numchans: number, samplerate: number): void

      
      /** Destroys writer */
      function Xen_AudioWriter_Destroy(writer: AudioWriter): void

      
      /** Write interleaved audio data to disk */
      function Xen_AudioWriter_Write(reaper: number, writer: AudioWriter, numframes: number, data: identifier, offset: number): void

      
      /** Get interleaved audio data from media source */
      function Xen_GetMediaSourceSamples(reaper: number, src: PCM_source, destbuf: identifier, destbufoffset: number, numframes: number, numchans: number, samplerate: number, sourceposition: number): void

      
      /** Start audio preview of a PCM\_source, which can be created using functions like [PCM\_Source\_CreateFromFile](#PCM_Source_CreateFromFile)
	*
	* 
	*
	* Returns id of a preview handle that can be provided to [Xen\_StopSourcePreview](#Xen_StopSourcePreview).
	*
	* 
	*
	* If the given PCM\_source does not belong to an existing MediaItem/Take, it will be deleted by the preview system when the preview is stopped.
	*
	* 
	*
	* You can preview more than one file at the same time. */
      function Xen_StartSourcePreview(reaper: number, source: PCM_source, gain: number, loop: boolean, number: any | 'optional'): void

      
      /** Stop audio preview. 
	*
	* 
	*
	* To stop all running previews, set id=-1 */
      function Xen_StopSourcePreview(preview_id: number): number

      
      /** [BR] Equivalent to win32 API ComboBox_FindString(). */
      function BR_Win32_CB_FindString(reaper: number, comboBoxHwnd: identifier, startId: number, string: string): void

      
      /** [BR] Equivalent to win32 API ComboBox_FindStringExact(). */
      function BR_Win32_CB_FindStringExact(reaper: number, comboBoxHwnd: identifier, startId: number, string: string): void

      
      /** [BR] Equivalent to win32 API ClientToScreen(). */
      function BR_Win32_ClientToScreen(hwnd: identifier, xIn: number, yIn: number): MultiReturn<[x: number, y: number]>

      
      /** \[BR\] Equivalent to win32 API FindWindowEx(). Since ReaScript doesn't allow passing NULL (None in Python, nil in Lua etc...) parameters, to search by supplied class or name set searchClass and searchName accordingly. HWND parameters should be passed as either "0" to signify NULL or as string obtained from [BR\_Win32_HwndToString](#BR_Win32_HwndToString). */
      function BR_Win32_FindWindowEx(reaper: identifier, hwndParent: string, hwndChildAfter: string, className: string, windowName: string, searchClass: boolean, searchName: boolean): void

      
      /** [BR] Equivalent to win32 API GET_X_LPARAM(). */
      function BR_Win32_GET_X_LPARAM(reaper: number, lParam: number): void

      
      /** [BR] Equivalent to win32 API GET_Y_LPARAM(). */
      function BR_Win32_GET_Y_LPARAM(reaper: number, lParam: number): void

      
      /** [BR] Returns various constants needed for BR_Win32 functions.
	*
	* Supported constants are:
	*
	* CB_ERR, CB_GETCOUNT, CB_GETCURSEL, CB_SETCURSEL
	*
	* EM_SETSEL
	*
	* GW_CHILD, GW_HWNDFIRST, GW_HWNDLAST, GW_HWNDNEXT, GW_HWNDPREV, GW_OWNER
	*
	* GWL_STYLE
	*
	* SW_HIDE, SW_MAXIMIZE, SW_SHOW, SW_SHOWMINIMIZED, SW_SHOWNA, SW_SHOWNOACTIVATE, SW_SHOWNORMAL
	*
	* SWP_FRAMECHANGED, SWP_FRAMECHANGED, SWP_NOMOVE, SWP_NOOWNERZORDER, SWP_NOSIZE, SWP_NOZORDER
	*
	* VK_DOWN, VK_UP
	*
	* WM_CLOSE, WM_KEYDOWN
	*
	* WS_MAXIMIZE, WS_OVERLAPPEDWINDOW */
      function BR_Win32_GetConstant(reaper: number, constantName: string): void

      
      /** [BR] Equivalent to win32 API GetCursorPos(). */
      function BR_Win32_GetCursorPos(): MultiReturn<[retval: boolean, x: number, y: number]>

      
      /** [BR] Equivalent to win32 API GetFocus(). */
      function BR_Win32_GetFocus(reaper: identifier): void

      
      /** [BR] Equivalent to win32 API GetForegroundWindow(). */
      function BR_Win32_GetForegroundWindow(reaper: identifier): void

      
      /** \[BR\] Alternative to [GetMainHwnd](#GetMainHwnd). REAPER seems to have problems with extensions using HWND type for exported functions so all BR_Win32 functions use void* instead of HWND type */
      function BR_Win32_GetMainHwnd(reaper: identifier): void

      
      /** [BR] Get mixer window HWND. isDockedOut will be set to true if mixer is docked */
      function BR_Win32_GetMixerHwnd(): MultiReturn<[retval: identifier, isDocked: boolean]>

      
      /** [BR] Get coordinates for screen which is nearest to supplied coordinates. Pass workingAreaOnly as true to get screen coordinates excluding taskbar (or menu bar on OSX). */
      function BR_Win32_GetMonitorRectFromRect(workingAreaOnly: boolean, leftIn: number, topIn: number, rightIn: number, bottomIn: number): MultiReturn<[left: number, top: number, right: number, bottom: number]>

      
      /** [BR] Equivalent to win32 API GetParent(). */
      function BR_Win32_GetParent(reaper: identifier, hwnd: identifier): void

      
      /** [BR] Equivalent to win32 API GetWindow(). */
      function BR_Win32_GetWindow(reaper: identifier, hwnd: identifier, cmd: number): void

      
      /** [BR] Equivalent to win32 API GetWindowLong(). */
      function BR_Win32_GetWindowLong(reaper: number, hwnd: identifier, index: number): void

      
      /** [BR] Equivalent to win32 API GetWindowRect(). */
      function BR_Win32_GetWindowRect(hwnd: identifier): MultiReturn<[retval: boolean, left: number, top: number, right: number, bottom: number]>

      
      /** [BR] Equivalent to win32 API GetWindowText(). */
      function BR_Win32_GetWindowText(hwnd: identifier): MultiReturn<[retval: number, text: string]>

      
      /** [BR] Equivalent to win32 API HIBYTE(). */
      function BR_Win32_HIBYTE(reaper: number, value: number): void

      
      /** [BR] Equivalent to win32 API HIWORD(). */
      function BR_Win32_HIWORD(reaper: number, value: number): void

      
      /** \[BR\] Convert HWND to string. To convert string back to HWND, see [BR\_Win32_StringToHwnd](#BR_Win32_StringToHwnd). */
      function BR_Win32_HwndToString(hwnd: identifier): string

      
      /** [BR] Equivalent to win32 API IsWindow(). */
      function BR_Win32_IsWindow(reaper: boolean, hwnd: identifier): void

      
      /** [BR] Equivalent to win32 API IsWindowVisible(). */
      function BR_Win32_IsWindowVisible(reaper: boolean, hwnd: identifier): void

      
      /** [BR] Equivalent to win32 API LOBYTE(). */
      function BR_Win32_LOBYTE(reaper: number, value: number): void

      
      /** [BR] Equivalent to win32 API LOWORD(). */
      function BR_Win32_LOWORD(reaper: number, value: number): void

      
      /** [BR] Equivalent to win32 API MAKELONG(). */
      function BR_Win32_MAKELONG(reaper: number, low: number, high: number): void

      
      /** [BR] Equivalent to win32 API MAKELPARAM(). */
      function BR_Win32_MAKELPARAM(reaper: number, low: number, high: number): void

      
      /** [BR] Equivalent to win32 API MAKELRESULT(). */
      function BR_Win32_MAKELRESULT(reaper: number, low: number, high: number): void

      
      /** [BR] Equivalent to win32 API MAKEWORD(). */
      function BR_Win32_MAKEWORD(reaper: number, low: number, high: number): void

      
      /** [BR] Equivalent to win32 API MAKEWPARAM(). */
      function BR_Win32_MAKEWPARAM(reaper: number, low: number, high: number): void

      
      /** \[BR\] Alternative to [MIDIEditor\_GetActive](#MIDIEditor_GetActive). REAPER seems to have problems with extensions using HWND type for exported functions so all BR\_Win32 functions use void* instead of HWND type. */
      function BR_Win32_MIDIEditor_GetActive(reaper: identifier): void

      
      /** [BR] Equivalent to win32 API ClientToScreen(). */
      function BR_Win32_ScreenToClient(hwnd: identifier, xIn: number, yIn: number): MultiReturn<[x: number, y: number]>

      
      /** [BR] Equivalent to win32 API SendMessage(). */
      function BR_Win32_SendMessage(reaper: number, hwnd: identifier, msg: number, lParam: number, wParam: number): void

      
      /** [BR] Equivalent to win32 API SetFocus(). */
      function BR_Win32_SetFocus(reaper: identifier, hwnd: identifier): void

      
      /** [BR] Equivalent to win32 API SetForegroundWindow(). */
      function BR_Win32_SetForegroundWindow(reaper: number, hwnd: identifier): void

      
      /** [BR] Equivalent to win32 API SetWindowLong(). */
      function BR_Win32_SetWindowLong(reaper: number, hwnd: identifier, index: number, newLong: number): void

      
      /** \[BR\] Equivalent to win32 API SetWindowPos().
	*
	* hwndInsertAfter may be a string: "HWND\_BOTTOM", "HWND\_NOTOPMOST", "HWND\_TOP", "HWND\_TOPMOST" or a string obtained with [BR\_Win32_HwndToString](#BR_Win32_HwndToString). */
      function BR_Win32_SetWindowPos(reaper: boolean, hwnd: identifier, hwndInsertAfter: string, x: number, y: number, width: number, height: number, flags: number): void

      
      /** [BR] Equivalent to win32 API ShowWindow(). */
      function BR_Win32_ShowWindow(reaper: boolean, hwnd: identifier, cmdShow: number): void

      
      /** \[BR\] Convert string to HWND. To convert HWND back to string, see [BR\_Win32\_HwndToString](BR_Win32_HwndToString). */
      function BR_Win32_StringToHwnd(reaper: identifier, string: string): void

      
      /** [BR] Equivalent to win32 API WindowFromPoint(). */
      function BR_Win32_WindowFromPoint(reaper: identifier, x: number, y: number): void

      
      /** Enumerate the source's media cues. Returns the next index or 0 when finished. */
      function CF_EnumMediaSourceCues(src: PCM_source, index: number): MultiReturn<[retval: number, time: number, endTime: number, isRegion: boolean, name: string]>

      
      /** Return the index of the next selected effect in the given FX chain. Start index should be -1. Returns -1 if there are no more selected effects. */
      function CF_EnumSelectedFX(reaper: number, hwnd: FxChain, index: number): void

      
      /** Wrapper for the unexposed kbd_enumerateActions API function.
	*
	* Main=0, Main (alt recording)=100, MIDI Editor=32060, MIDI Event List Editor=32061, MIDI Inline Editor=32062, Media Explorer=32063 */
      function CF_EnumerateActions(section: number, index: number): MultiReturn<[retval: number, name: string]>

      
      /** Export the source to the given file (MIDI only). */
      function CF_ExportMediaSource(reaper: boolean, src: PCM_source, fn: string): void

      
      /** Wrapper for the unexposed kbd\_getTextFromCmd API function. See [CF\_EnumerateActions](#CF_EnumerateActions) for common section IDs. */
      function CF_GetCommandText(reaper: string, section: number, command: number): void

      
      /** Return a handle to the currently focused FX chain window. */
      function CF_GetFocusedFXChain(): FxChain

      
      /** Returns the bit depth if available (0 otherwise). */
      function CF_GetMediaSourceBitDepth(reaper: number, src: PCM_source): void

      
      /** Get the value of the given metadata field (eg. DESC, ORIG, ORIGREF, DATE, TIME, UMI, CODINGHISTORY for BWF). */
      function CF_GetMediaSourceMetadata(src: PCM_source, name: string, out: string): MultiReturn<[retval: boolean, out: string]>

      
      /** Returns the online/offline status of the given source. */
      function CF_GetMediaSourceOnline(reaper: boolean, src: PCM_source): void

      
      /** Get the project associated with this source (BWF, subproject...). */
      function CF_GetMediaSourceRPP(src: PCM_source): MultiReturn<[retval: boolean, fn: string]>

      
      /** Return the current SWS version number. */
      function CF_GetSWSVersion(): string

      
      /** Return a handle to the given take FX chain window. HACK: This temporarily renames the take in order to disambiguate the take FX chain window from similarily named takes. */
      function CF_GetTakeFXChain(reaper: FxChain, take: MediaItem_Take): void

      
      /** Return a handle to the given track FX chain window. */
      function CF_GetTrackFXChain(reaper: FxChain, track: MediaTrack): void

      
      /** Select the given file in explorer/finder. */
      function CF_LocateInExplorer(reaper: boolean, file: string): void

      
      /** Set which track effect is active in the track's FX chain. The FX chain window does not have to be open. */
      function CF_SelectTrackFX(reaper: boolean, track: MediaTrack, index: number): void

      
      /** Set the online/offline status of the given source (closes files when set=false). */
      function CF_SetMediaSourceOnline(src: PCM_source, set: boolean): void

      
      /** Open the given file or URL in the default application. See also [CF\_LocateInExplorer](#CF_LocateInExplorer). */
      function CF_ShellExecute(reaper: boolean, file: string): void

      
      /** This function combines all other NF\_Peak/RMS functions in a single one and additionally returns peak RMS positions.  
	*
	* 
	*
	* [Lua example code here](https://forum.cockos.com/showpost.php?p=2050961&postcount=6). 
	*
	* 
	*
	* Note: It's recommended to use this function with ReaScript/Lua as it provides reaper.array objects. 
	*
	* If using this function with other scripting languages, you must provide arrays in the [reaper.array format](https://forum.cockos.com/showpost.php?p=2039829&postcount=2). */
      function NF_AnalyzeMediaItemPeakAndRMS(reaper: boolean, item: MediaItem, windowSize: number, reaper: identifier, reaper: identifier, reaper: identifier, reaper: identifier): void

      
      /** See [NF\_GetMediaItemMaxPeak](#NF_GetMediaItemMaxPeak), additionally returns maxPeakPos (relative to item position). */
      function NF_GetMediaItemMaxPeakAndMaxPeakPos(item: MediaItem): MultiReturn<[retval: number, maxPeakPos: number]>

      
      /** Returns SWS/S&amp;M marker/region subtitle. markerRegionIdx: Refers to index that can be passed to [EnumProjectMarkers](#EnumProjectMarkers) (not displayed marker/region index).  
	*
	* Returns empty string if marker/region with specified index not found or marker/region subtitle not set.  
	*
	* 
	*
	* [Lua code example can be found here](https://github.com/ReaTeam/ReaScripts-Templates/blob/master/Markers%20and%20Regions/NF_Get%20SWS%20markers%20and%20regions%20notes.lua) */
      function NF_GetSWSMarkerRegionSub(reaper: string, markerRegionIdx: number): void

      
      /** Get the SWS tracknotes. */
      function NF_GetSWSTrackNotes(tracknotes: string, track: MediaTrack): void

      
      /** Get SWS analysis/normalize options. See [NF\_SetSWS\_RMSoptions](#NF_SetSWS_RMSoptions). */
      function NF_GetSWS_RMSoptions(): MultiReturn<[target: number, windowSize: number]>

      
      /** Reads an ID3v2 tag ('text information frame'), works with mp3 only. Supported tags e.g.: "TBPM" (BPM), "TCOP" (Copyright). For other possibly supported tags see [id3v2.4.0-frames.txt](http://id3.org/id3v2.4.0-frames) Returns false if tag was not found. */
      function NF_ReadID3v2Tag(fn: string, tag: string): MultiReturn<[retval: boolean, tagval: string]>

      
      /** Set SWS/S&amp;M marker/region subtitle. markerRegionIdx: Refers to index that can be passed to [EnumProjectMarkers](#EnumProjectMarkers)(not displayed marker/region index).  
	*
	* Returns true if subtitle is set successfully (i.e. marker/region with specified index is present in project). 
	*
	* 
	*
	* [Lua code example can be found here](https://github.com/ReaTeam/ReaScripts-Templates/blob/master/Markers%20and%20Regions/NF_Get%20SWS%20markers%20and%20regions%20notes.lua") */
      function NF_SetSWSMarkerRegionSub(reaper: boolean, markerRegionSub: string, markerRegionIdx: number): void

      
      /**  */
      function NF_SetSWSTrackNotes(track: MediaTrack, str: string): void

      
      /** Set SWS analysis/normalize options (same as running action 'SWS: Set RMS analysis/normalize options'). targetLevel: target RMS normalize level (dB), windowSize: window size for peak RMS (sec.)
	*
	* 
	*
	* See [NF\_GetSWS\_RMSoptions](#NF_GetSWS_RMSoptions). */
      function NF_SetSWS_RMSoptions(retval: boolean, targetLevel: number, windowSize: number): void

      
      /** Deprecated.
	*
	* Retrieves the name of the module of a takefx from a MediaItem.
	*
	* 
	*
	*             See [BR\_TrackFX\_GetFXModuleName](#BR_TrackFX_GetFXModuleName). fx: counted consecutively across all takes (zero-based). */
      function NF_TakeFX_GetModuleName(item: MediaItem, fx: number): MultiReturn<[retval: boolean, name: string]>

      
      /** Redraw the Notes window (call if you've changed a subtitle via [NF\_SetSWSMarkerRegionSub](#NF_SetSWSMarkerRegionSub) which is currently displayed in the Notes window and you want to appear the new subtitle immediately.) */
      function NF_UpdateSWSMarkerRegionSubWindow(): void

      
      /** This function allows you to get various information about your display.
	*
	*         
	*
	* Equivalent to [win32 API GetSystemMetrics()](https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-getsystemmetrics). */
      function NF_Win32_GetSystemMetrics(nIndex: number): number

      
      /** Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.
	*
	* 
	*
	* You can't defer this atexit-function, when it is run as exit-function, though, when it is run regularily before exiting the script.
	*
	* 
	*
	* You can define more than one atexit-function. They will be run in the order they've been registered as atexit-functions.
	*
	* For example:
	*
	* 
	*
	*     reaper.atexit(exit1)
	*
	*     reaper.atexit(exit2)
	*
	*     reaper.atexit(exit3)
	*
	*     
	*
	* will run exit1, exit2 and then exit3, when exiting the script.
	*
	* 
	*
	* You can have up to 1024 atexit-functions set in one script, no matter if its different or the same function. */
      function atexit(_function: function): void

      
      /** Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to runloop().Note that no undo point will be automatically created when the script finishes, unless you create it explicitly.
	*
	* 
	*
	* There can be 1024 defer-nodes running at the same time in one script, no matter if it's different functions or the same one. */
      function defer(_function: function): boolean

      
      /** Returns contextual information about the script, typically MIDI/OSC input values.val will be set to a relative or absolute value depending on mode (=0: absolute mode, &gt;0: relative modes). resolution=127 for 7-bit resolution, =16383 for 14-bit resolution.Notes: sectionID, and cmdID will be set to -1 if the script is not part of the action list. mode, resolution and val will be set to -1 if the script was not triggered via MIDI/OSC.
	*
	* 
	*
	* For relative mode bindings, calling get_action_context() will return the accumulated relative value in decoded form (not 65 or 63, but +1/-1 etc), and clear the internal state. So if you call it multiple times, the first one will return the accumulated value, and the second will always return 0. */
      function get_action_context(): MultiReturn<[is_new_value: boolean, filename_with_path: string, sectionID: number, cmdID: number, mode: number, resolution: number, val: number]>

      
      /** Causes gmem_read()/gmem_write() to read EEL2/JSFX/Video shared memory segment named by parameter. Set to empty string to detach.
	*
	* 
	*
	* Must be called, before you can use a specific gmem-variable-index with gmem_write! */
      function gmem_attach(sharedMemoryName: string): void

      
      /** Read (number) value from shared memory attached-to by gmem_attach(). index can be [0..1&lt;&lt;25).
	*
	* 
	*
	* returns nil if not available */
      function gmem_read(index: number): number

      
      /** Write (number) value to shared memory attached-to by gmem_attach(). index can be \[0..1&lt;&lt;25).
	*
	* 
	*
	* Before you can write into a currently unused variable with index "index", you must call [gmem\_attach](#lua_gmem_attach) first! */
      function gmem_write(index: number, value: number): void

      
      /** Creates a new reaper.array object of maximum and initial size size, if specified, or from the size/values of a table/array. Both size and table/array can be specified, the size parameter will override the table/array size. */
      function new_array(): ReaperArray

      
      /** Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to defer().Note that no undo point will be automatically created when the script finishes, unless you create it explicitly. */
      function runloop(_function: function): boolean

      
      /** Sets the value of zero or more items in the array. If value not specified, 0.0 is used. offset is 1-based, if size omitted then the maximum amount available will be set. */
      function array(): boolean

      
      /** Convolves complex value pairs from reaper.array, starting at 1-based srcoffs, reading/writing to 1-based destoffs. size is in normal items (so it must be even) */
      function array(): number

      
      /** Copies values from reaper.array or table, starting at 1-based srcoffs, writing to 1-based destoffs. */
      function array(): number

      
      /** Performs a forward FFT of size. size must be a power of two between 4 and 32768 inclusive. If permute is specified and true, the values will be shuffled following the FFT to be in normal order. */
      function array(): void

      
      /** Performs a forward real-&gt;complex FFT of size. size must be a power of two between 4 and 32768 inclusive. If permute is specified and true, the values will be shuffled following the FFT to be in normal order. */
      function array(): void

      
      /** Returns the maximum (allocated) size of the array. */
      function array(): number

      
      /** Performs a backwards FFT of size. size must be a power of two between 4 and 32768 inclusive. If permute is specified and true, the values will be shuffled before the IFFT to be in fft-order. */
      function array(): void

      
      /** Performs a backwards complex-&gt;real FFT of size. size must be a power of two between 4 and 32768 inclusive. If permute is specified and true, the values will be shuffled before the IFFT to be in fft-order. */
      function array(): void

      
      /** Multiplies values from reaper.array, starting at 1-based srcoffs, reading/writing to 1-based destoffs. */
      function array(): void

      
      /** Resizes an array object to size. size must be [0..max_size]. */
      function array(): void

      
      /** Returns a new table with values from items in the array. Offset is 1-based and if size is omitted all available values are used. */
      function array(): void

      
      /** Show the about dialog of the given package entry.
	*
	* The repository index is downloaded asynchronously if the cached copy doesn't exist or is older than one week. */
      function ReaPack_AboutInstalledPackage(reaper: boolean, entry: PackageEntry): void

      
      /** Show the about dialog of the given repository. Returns true if the repository exists in the user configuration.
	*
	* The repository index is downloaded asynchronously if the cached copy doesn't exist or is older than one week. */
      function ReaPack_AboutRepository(reaper: boolean, repoName: string): void

      
      /** Add or modify a repository. Set url to nullptr (or empty string in Lua) to keep the existing URL. Call [ReaPack\_ProcessQueue(true)](#ReaPack_ProcessQueue) when done to process the new list and update the GUI.
	*
	* 
	*
	* autoInstall: usually set to 2 (obey user setting). */
      function ReaPack_AddSetRepository(name: string, url: string, enable: boolean, autoInstall: number): MultiReturn<[retval: boolean, error: string]>

      
      /** Opens the package browser with the given filter string. */
      function ReaPack_BrowsePackages(filter: string): void

      
      /** Compares two versionnumbers. Versionnumbers must start with a number/digit, or they can't be compared.
	*
	* Returns 0 if both versions are equal, a positive value if ver1 is higher than ver2 and a negative value otherwise. */
      function ReaPack_CompareVersions(ver1: string, ver2: string): MultiReturn<[retval: number, error: string]>

      
      /** Enumerate the files owned by the given package. Returns false when there is no more data.
	*
	* 
	*
	*     sections: 0=not in action list, &1=main, &2=midi editor, &4=midi inline editor
	*
	*     type: see [ReaPack\_GetEntryInfo](#ReaPack_GetEntryInfo). */
      function ReaPack_EnumOwnedFiles(entry: PackageEntry, index: number): MultiReturn<[retval: boolean, path: string, sections: number, type: number]>

      
      /** Free resources allocated for the given package entry. Must be used to free PackageEntry-objects created by [ReaPack\_GetOwner](#ReaPack_GetOwner). */
      function ReaPack_FreeEntry(reaper: boolean, entry: PackageEntry): void

      
      /** Get the repository name, category, package name, package description, package type, the currently installed version, author name, pinned status and how many files are owned by the given package entry. */
      function ReaPack_GetEntryInfo(entry: PackageEntry): MultiReturn<[retval: boolean, repo: string, cat: string, pkg: string, desc: string, type: number, ver: string, author: string, pinned: boolean, fileCount: number]>

      
      /** Returns the package entry owning the given file.
	*
	* Delete the returned object from memory after use with [ReaPack\_FreeEntry](#ReaPack_FreeEntry). */
      function ReaPack_GetOwner(fn: string): MultiReturn<[retval: PackageEntry, error: string]>

      
      /** Get the infos of the given repository. */
      function ReaPack_GetRepositoryInfo(name: string): MultiReturn<[retval: boolean, url: string, enabled: boolean, autoInstall: number]>

      
      /** Run pending operations and save the configuration file. If refreshUI is true the browser and manager windows are guaranteed to be refreshed (otherwise it depends on which operations are in the queue). */
      function ReaPack_ProcessQueue(refreshUI: boolean): void

      }

    /** @noSelf **/
    declare namespace r {

    
      /** call with a saved window rect for your window and it'll correct any positioning info. */
      function left(r: number, r: number, r: number, r: number): MultiReturn<[r: number, r: number, r: number, r: number]>

      }

    /** @noSelf **/
    declare namespace gfx {

    
      /** Draws an arc of the circle centered at x,y, with ang1/ang2 being specified in radians. */
      function arc(x: number, y: number, r: number, ang1: number, ang2: number, number: any | 'optional'): void

      
      /** Blits(draws) the content of source-image to another source-image or an opened window.
	*
	* 
	*
	* srcx/srcy/srcw/srch specify the source rectangle (if omitted srcw/srch default to image size), destx/desty/destw/desth specify dest rectangle (if not specified, these will default to reasonable defaults -- destw/desth default to srcw/srch * scale).  */
      function blit(source: number, scale: number, rotation: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional'): number

      
      /** Blits(draws) the content of source-image to another source-image or an opened window.
	*
	* 
	*
	* This is a simplified version of [gfx.blit()](#lua_gfx.blit).
	*
	* 
	*
	* If three parameters are specified, copies the entirity of the source bitmap to gfx.x,gfx.y using current opacity and copy mode (set with gfx.a, gfx.mode). You can specify scale (1.0 is unscaled) and rotation (0.0 is not rotated, angles are in radians).For the "source" parameter specify -1 to use the main framebuffer as source, or an image index (see gfx.loadimg()). */
      function blit(source: number, scale: number, rotation: number): number

      
      /** Deprecated, use gfx.blit instead. */
      function blitext(): void

      
      /** Blurs the region of the screen between gfx.x,gfx.y and x,y, and updates gfx.x,gfx.y to x,y. */
      function blurto(x: number, y: number): void

      
      /** Draws a circle, optionally filling/antialiasing.  */
      function circle(x: number, y: number, r: number, number: any | 'optional', number: any | 'optional'): void

      
      /** Converts the coordinates x,y to screen coordinates, returns those values. */
      function clienttoscreen(x: number, y: number): MultiReturn<[convx: int, convy: int]>

      
      /** Blits from srcimg(srcs,srct,srcw,srch) to destination (destx,desty,destw,desth). Source texture coordinates are s/t, dsdx represents the change in s coordinate for each x pixel, dtdy represents the change in t coordinate for each y pixel, etc. dsdxdy represents the change in dsdx for each line. If usecliprect is specified and 0, then srcw/srch are ignored.
	*
	* 
	*
	* This function allows you to manipulate the image, which you want to blit, by transforming, moving or cropping it.
	*
	* 
	*
	* To do rotation, you can manipulate dtdx and dsdy together. */
      function deltablit(srcimg: number, srcs: number, srct: number, srcw: number, srch: number, destx: number, desty: number, destw: number, desth: number, dsdx: number, dtdx: number, dsdy: number, dtdy: number, dsdxdy: number, dtdxdy: number, integer: any | 'optional'): number

      
      /** Queries or sets the docking-state of the gfx.init()-window.
	*
	* Call with v=-1 to query docked state, otherwise v&gt;=0 to set docked state. 
	*
	* State is &amp;1 if docked, second byte is docker index (or last docker index if undocked). 
	*
	* If wx-wh specified, additional values will be returned with the undocked window position/size
	*
	* 
	*
	* A specific docking index does not necessarily represent a specific docker, means, you can not query/set left docker top, but rather all dockers that exist in the current screenset.
	*
	* So the first queried/set docker can be top-left-docker or the top docker or even one of the bottom dockers.
	*
	* The order doesn't seem to make any sense. Especially with more than 16 windows docked in the current screenset. */
      function dock(v: number, integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional'): MultiReturn<[querystate: number, integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional']>

      
      /** Draws the character (can be a numeric ASCII code as well), to gfx.x, gfx.y, and moves gfx.x over by the size of the character. */
      function drawchar(char: number): number

      
      /** Draws the number n with ndigits of precision to gfx.x, gfx.y, and updates gfx.x to the right side of the drawing. The text height is gfx.texth. */
      function drawnumber(n: number, ndigits: number): void

      
      /** Draws a string at gfx.x, gfx.y, and updates gfx.x/gfx.y so that subsequent draws will occur in a similar place.
	*
	* 
	*
	* You can optionally set a clipping area for the text, if you set parameter flags&amp;256 and the parameters right and bottom.
	*
	* 
	*
	* On Windows, fonts with a size > 255 may have trouble of being displayed correctly, due problems with the font-rendering and the alpha-channel. <a href="https://forum.cockos.com/showpost.php?p=2311977&postcount=7">Justin's post about this.</a>
	*
	* To overcome this, try this to disable the alpha-channel: 
	*
	* By default, gfx.blit() blits with alpha channel. You can disable this behavior by setting "gfx.mode=2" before calling gfx.blit(). */
      function drawstr(str: string, integer: any | 'optional', integer: any | 'optional', integer: any | 'optional'): void

      
      /** If char is 0 or omitted, returns a character from the keyboard queue, or 0 if no character is available, or -1 if the graphics window is not open. 
	*
	* 
	*
	* If char is specified and nonzero, that character's status will be checked, and the function will return greater than 0 if it is pressed.
	*
	* Common values are standard ASCII, such as 'a', 'A', '=' and '1', but for many keys multi-byte values are used, 
	*
	* including 'home', 'up', 'down', 'left', 'right', 'f1'.. 'f12', 'pgup', 'pgdn', 'ins', and 'del'. 
	*
	* 
	*
	* 			Shortcuts with scope "Global + textfields" will still run the associated action, scope of "Normal" or "Global" will not.
	*
	* 			
	*
	* Modified and special keys can also be returned, including:  
	*
	* 
	*
	* - Ctrl/Cmd+A..Ctrl+Z as 1..26  
	*
	* - Ctrl/Cmd+Alt+A..Z as 257..282  
	*
	* - Alt+A..Z as 'A'+256..'Z'+256  
	*
	* - 27 for ESC  
	*
	* - 13 for Enter  
	*
	* - ' ' for space  
	*
	* -   
	*
	* - use 65536 as parameter charactercode to query special flags, returns: &1 (supported in this script), &2=window has focus, &4=window is visible  
	*
	* 
	*
	* Some multibyte-characters, like home, up, down, left, right, f1 .. f12, pgup, pgdn, ins, del are returned as values above 255, but some other characters, like €,  
	*
	* are "real"-multibyte-characters, stored as multiple 8-bit-values after each other.
	*
	* To retrieve them, you need to run gfx.getchar() twice per defer-cycle and return their retvals into two variables:  
	*
	* Example:
	*
	* 
	*
	*             A=gfx.getchar() -- first byte
	*
	*             B=gfx.getchar() -- second byte
	*
	*             
	*
	*             if A==261 and B==128 then reaper.MB("You typed the Euro-symbol.", "Message", 0) end -- typed character is the Euro-currency-symbol. */
      function getchar(integer: any | 'optional'): number

      
      /** Returns filenames, drag'n'dropped into a window created by gfx.init().
	*
	* Use idx to get a specific filename, that has been dropped into the gfx.init()-window.
	*
	* 
	*
	* Does NOT support mediaitems/takes or other Reaper-objects!
	*
	* 
	*
	* It MUST be called BEFORE calling gfx.update, as gfx.update flushes the filelist accessible with gfx.getdropfile. */
      function getdropfile(idx: number): MultiReturn<[retval: number, filename: string]>

      
      /** Returns current font index, and the actual font face used by this font (if available). */
      function getfont(): number

      
      /** Retrieves the dimensions of an image specified by handle, returns w, h pair.
	*
	* Handle is basically a frame-buffer. */
      function getimgdim(handle: number): MultiReturn<[w: number, h: number]>

      
      /** Returns r,g,b values [0..1] of the pixel at (gfx.x,gfx.y) */
      function getpixel(): MultiReturn<[r: number, g: number, b: number]>

      
      /** Fills a gradient rectangle with the color and alpha specified. drdx-dadx reflect the adjustment (per-pixel) applied for each pixel moved to the right, drdy-dady are the adjustment applied for each pixel moved toward the bottom. Normally drdx=adjustamount/w, drdy=adjustamount/h, etc. */
      function gradrect(): void

      
      /** Initializes the graphics window with title name. Suggested width and height can be specified.Once the graphics window is open, gfx.update() should be called periodically. 
	*
	* 
	*
	* Only one graphics-window can be opened per script! Calling gfx.ini after a window has been opened has no effect.
	*
	* 			
	*
	* 			To resizes/reposition the window, call gfx.init again and pass an empty string as name-parameter.
	*
	* 
	*
	* To get the current window-states, dimensions, etc, you can use [gfx.dock](#lua_gfx.dock).             */
      function init(integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional', integer: any | 'optional'): number

      
      /** Draws a line from x,y to x2,y2, and if aa is not specified or 0.5 or greater, it will be antialiased.  */
      function line(x: number, y: number, x2: number, y2: number, number: any | 'optional'): void

      
      /** Draws a line from gfx.x,gfx.y to x,y. If aa is 0.5 or greater, then antialiasing is used. Updates gfx.x and gfx.y to x,y. */
      function lineto(x: number, y: number, aa: number): void

      
      /** Load image from filename into slot 0..1024-1 specified by image. Returns the image index if success, otherwise -1 if failure. The image will be resized to the dimensions of the image file.  */
      function loadimg(image: number, filename: string): number

      
      /** Measures the drawing dimensions of a character with the current font (as set by [gfx.setfont](#lua_gfx.setfont)). Returns width and height of character. */
      function measurechar(char: number): MultiReturn<[width: number, height: number]>

      
      /** Measures the drawing dimensions of a string with the current font (as set by [gfx.setfont](#lua_gfx.setfont)). Returns width and height of string. */
      function measurestr(str: string): MultiReturn<[width: number, height: number]>

      
      /** Multiplies each pixel within the given rectangle(x,y,w,h) by the mul_*-parameters and optionally adds add_*-parameters, and updates in-place. Useful for changing brightness/contrast, or other effects.
	*
	* 
	*
	* The multiplied values usually affect only pixels, that are not black(0,0,0,0), while the added values affect all pixels. */
      function muladdrect(x: number, y: number, w: number, h: number, mul_r: number, mul_g: number, mul_b: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional', number: any | 'optional'): number

      
      /** Formats and draws a string at gfx.x, gfx.y, and updates gfx.x/gfx.y accordingly (the latter only if the formatted string contains newline). For more information on format strings, see sprintf()
	*
	* 
	*
	*     * %% = %
	*
	*     * %s = string from parameter
	*
	*     * %d = parameter as integer
	*
	*     * %i = parameter as integer
	*
	*     * %u = parameter as unsigned integer
	*
	*     * %x = parameter as hex (lowercase) integer
	*
	*     * %X = parameter as hex (uppercase) integer
	*
	*     * %c = parameter as character
	*
	*     * %f = parameter as floating point
	*
	*     * %e = parameter as floating point (scientific notation, lowercase)
	*
	*     * %E = parameter as floating point (scientific notation, uppercase)
	*
	*     * %g = parameter as floating point (shortest representation, lowercase)
	*
	*     * %G = parameter as floating point (shortest representation, uppercase)
	*
	* 
	*
	* Many standard C printf() modifiers can be used, including:
	*
	* 
	*
	*     * %.10s = string, but only print up to 10 characters
	*
	*     * %-10s = string, left justified to 10 characters
	*
	*     * %10s = string, right justified to 10 characters
	*
	*     * %+f = floating point, always show sign
	*
	*     * %.4f = floating point, minimum of 4 digits after decimal point
	*
	*     * %10d = integer, minimum of 10 digits (space padded)
	*
	*     * %010f = integer, minimum of 10 digits (zero padded)
	*
	* 
	*
	* Values for format specifiers can be specified as additional parameters to gfx.printf, or within {} in the format specifier (such as %{varname}d, in that case a global variable is always used). */
      function printf(): void

      
      /** Closes the graphics window. */
      function quit(): number

      
      /** Fills a rectangle at x,y, w,h pixels in dimension, filled by default.  */
      function rect(x: number, y: number, w: number, h: number, integer: any | 'optional'): number

      
      /** Fills a rectangle from gfx.x,gfx.y to x,y. Updates gfx.x,gfx.y to x,y.  */
      function rectto(x: number, y: number): number

      
      /** Draws a rectangle with rounded corners.  */
      function roundrect(x: number, y: number, w: number, h: number, radius: number, integer: any | 'optional'): number

      
      /** Converts the screen coordinates x,y to client coordinates, returns those values. */
      function screentoclient(x: number, y: number): MultiReturn<[convx: number, convy: number]>

      
      /** Sets color, drawing mode and optionally the drawing-image-source-destination.
	*
	* If sets the corresponding gfx-variables.
	*
	* Sets gfx.r/gfx.g/gfx.b/gfx.a2/gfx.mode sets gfx.dest if final parameter specified */
      function set(r: number, number: any | 'optional', number: any | 'optional', number: any | 'optional', integer: any | 'optional', integer: any | 'optional'): number

      
      /** Sets the mouse cursor. resource_id is a value like 32512 (for an arrow cursor), custom_cursor_name is a string like "arrow" (for the REAPER custom arrow cursor). resource_id must be nonzero, but custom_cursor_name is optional. */
      function setcursor(): void

      
      /** Can select a font and optionally configure it. 
	*
	* 
	*
	* After calling gfx_setfont(), gfx_texth may be updated to reflect the new average line height. */
      function setfont(idx: number, string: any | 'optional', integer: any | 'optional', integer: any | 'optional'): void

      
      /** Resize image referenced by index 0..1024-1, width and height must be 0-8192. The contents of the image will be undefined after the resize. */
      function setimgdim(image: number, w: number, h: number): number

      
      /** Writes a pixel of r,g,b to gfx.x,gfx.y. */
      function setpixel(r: number, g: number, b: number): number

      
      /** Shows a popup menu at gfx.x,gfx.y. str is a list of fields separated by | characters. 
	*
	* Each field represents a menu item. Fields can start with special characters:#, grayed out; !, checked; &gt;, this menu item shows a submenu;&gt;, last item in the current submenu. 
	*
	* An empty field will appear as a separator in the menu. 
	*
	* 
	*
	* Example: selection = gfx.showmenu("first item, followed by separator||!second item, checked|&gt;third item which spawns a submenu|#first item in submenu, grayed out|&gt;second and last item in submenu|fourth item in top menu")
	*
	* 
	*
	* gfx.showmenu returns 0 if the user selected nothing from the menu, 1 if the first field is selected, etc. */
      function showmenu(str: string): number

      
      /** Blits to destination at (destx,desty), size (destw,desth). div_w and div_h should be 2..64, and table should point to a table of 2*div_w*div_h values (table can be a regular table or (for less overhead) a reaper.array). Each pair in the table represents a S,T coordinate in the source image, and the table is treated as a left-right, top-bottom list of texture coordinates, which will then be rendered to the destination. */
      function transformblit(srcimg: number, destx: number, desty: number, destw: number, desth: number, div_w: number, div_h: number, table: object): void

      
      /** Draws a filled triangle, or any convex polygon.  */
      function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, integer: any | 'optional', integer: any | 'optional'): void

      
      /** Updates the graphics display, if opened */
      function update(): void

      }
