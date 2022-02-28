export enum PieceType {
    KING,
    QUEEN,
    BISHOP,
    KNIGHT,
    ROOK,
    PAWN,
}

export enum MessageType {
    INFO,
    WIN,
    LOSE,
    WARNING,
    DEAD_PLAYER,
}

export enum EventCode {
    ROULETTE_TRIGGERED,
    CHANGED_ACTIVE_PIECE,
    RELEASE_PIECE,
}

export enum ScoreType {
    KILL,
    PIECE_RELEASED,
}

export enum GamePhase {
    IDLE,
    RUNNING,
    FINISHED,
}
