export enum PartyStatus {
    loading = "loading",
    party = "party",
    ingame = "ingame",
}

export enum GameStatus {
    loading = "loading",
    inprogress = "inprogress",
    waitingforhost = "waitingforhost",
    error = "error",
}

export enum SocketEvent {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    RECONNECT = "reconnect",
    GAME_EXIT = "GAME_EXIT",
    GAME_SELECT = "GAME_SELECT",
    GAME_START = "GAME_START",
    HOST_GAME_LOADED = "HOST_GAME_LOADED",
    INVALID_NAME = "INVALID_NAME",
    INVALID_PARTY = "INVALID_PARTY",
    JOIN_PARTY = "JOIN_PARTY",
    NAME = "NAME",
    UPDATE = "UPDATE",
    FINDER_SUBSCRIBE = "FINDER_SUBSCRIBE",
    FINDER_UPDATE = "FINDER_UPDATE",
    CHAT_MESSAGE = "CHAT_MESSAGE",
    KICK_PLAYER = "KICK_PLAYER",
    SET_IS_PUBLIC = "SET_IS_PUBLIC",
}

export enum RocketcrabMode {
    MAIN, // will be shown on rocketcrab.com
    KIDS, // will be shown on kids.rocketcrab.com
    ALL, //  do not use. for testing only.
}
