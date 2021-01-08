export interface ReaScriptUSDocML {
  source_document: SourceDocument
  target_document: TargetDocument
  requires: Requires
  chapers: Chaper[]
  tags: string[]
  description: Description
  params: Params
  title: string
  functioncall: Functioncall
  return_values: Params
  signatures: any[] | SignaturesClass
}

export enum Chaper {
  APIHelperFunctions = "Api-Helper-Functions",
  AdditionalCFunctions = "Additional C++ Functions",
  AdditionalEELFunctions = "Additional EEL-Functions",
  AdditionalLuaFunctions = "Additional Lua-Functions",
  AdditionalPythonFunctions = "Additional Python-Functions",
  ArrangeviewManagement = "Arrangeview Management",
  AudioMIDIDevicemanagement = "AudioMidi Devicemanagement",
  AudioManagement = "Audio Management",
  AutomationManagement = "Automation Management",
  EnvelopeManagement = "Envelope Management",
  ExtendedStates = "Extended States",
  FXManagement = "FX Management",
  FileManagement = "File Management",
  JSPlugin = "JS_Plugin",
  JoystickManagement = "Joystick Management",
  MIDIManagement = "MIDI Management",
  MarkerManagement = "Marker Management",
  MediaitemManagement = "Mediaitem Management",
  MetaDataManagement = "MetaData Management",
  Miscellaneous = "Miscellaneous",
  Pitchshifting = "Pitchshifting",
  ProjectManagement = "Project Management",
  ReaPack = "ReaPack",
  ThemeManagement = "Theme management",
  TrackManagement = "Track Management",
  TransportManagement = "Transport Management",
  UserInterface = "User Interface",
}

export interface Description {
  language: string
  prog_lang: ProgLang
  description: string
  markup_type: MarkupType
}

export enum MarkupType {
  Markdown = "markdown",
  Plaintext = "plaintext",
}

export enum ProgLang {
  Eel = "eel",
  Empty = "*",
  ProgLang = "",
}

export interface Functioncall {
  lua?: string
  cpp?: string
  python?: string
  eel?: string
}

export interface Params {
  prog_lang?: ProgLang
  entries: Entry[]
  param_count?: number
  markup_type?: MarkupType
}

export interface Entry {
  identifier: string
  description: string
}

export interface Requires {
  Lua?: string
  Reaper: string
  SWS?: string
  JS?: string
  ReaPack?: string
}

export interface SignaturesClass {
  lua: LuaSignature
}

export interface LuaSignature {
  parameters: Parameter[]
  method_name?: string
  return_values: Parameter[]
}

export interface Parameter {
  identifier?: string
  type: Type
}

export enum Type {
  Array = "array",
  AudioAccessor = "AudioAccessor",
  AudioWriter = "AudioWriter",
  AudioXrun = "audio_xrun",
  BREnvelope = "BR_Envelope",
  Boolean = "boolean",
  Function = "function",
  FxChain = "FxChain",
  Gfx = "gfx",
  Hwnd = "HWND",
  IReaperControlSurface = "IReaperControlSurface",
  Identifier = "identifier",
  Int = "int",
  Integer = "integer",
  JoystickDevice = "joystick_device",
  KbdSectionInfo = "KbdSectionInfo",
  MediaItem = "MediaItem",
  MediaItemTake = "MediaItem_Take",
  MediaTrack = "MediaTrack",
  Number = "number",
  Optional = "optional",
  PCMSource = "PCM_source",
  PackageEntry = "PackageEntry",
  ReaProject = "ReaProject",
  ReaperArray = "ReaperArray",
  RprMIDINote = "RprMidiNote",
  RprMIDITake = "RprMidiTake",
  String = "string",
  Table = "table",
  TrackEnvelope = "TrackEnvelope",
  Unsupported = "unsupported",
  WDLFastString = "WDL_FastString",
}

export enum SourceDocument {
  ReaperApidocsUSDocML = "reaper-apidocs.USDocML",
  ReaperPluginH = "reaper_plugin.h",
}

export enum TargetDocument {
  ReaperAPIDocumentation = "Reaper_Api_Documentation",
}
