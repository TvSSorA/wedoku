type SoloGame = {
    gameId: string,
    difficulty: string,
    time: string
}

type PVPGame = {
    gameId: string,
    teamA: string[],
    teamB: string[],
    winner: "teamA" | "teamB"
}

export type UserDoc = {
    onlineStatus: "online" | "offline" | "in-game",
    settings: {
        dark: boolean,
        music: boolean,
        sound: boolean,
        showOnlineStatus: boolean,
        notifications: boolean
    },
    soloGameHistory: SoloGame[],
    pvpGameHistory: PVPGame[],
    friends: string[],
    savedGame: {
        board: number[][],
        fullBoard: number[][],
        currentBoard: number[][],
        notes: number[][],
        time: number
    } | null
}