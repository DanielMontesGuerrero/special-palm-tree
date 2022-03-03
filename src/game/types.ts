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
    TRIGGERED_ROULETTE,
    CHANGED_ACTIVE_PIECE,
    RELEASED_PIECE,
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
