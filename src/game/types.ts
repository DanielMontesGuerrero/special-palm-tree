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
    ACKNOWLEDGED_ROULETTE,
}

export enum ScoreType {
    KILL,
    PIECE_RELEASED,
    ALIVE_CELL,
}

export enum GamePhase {
    IDLE,
    RUNNING,
    FINISHED,
}

export enum NodeType {
    SELECTION,
    ACTION,
    SEQUENCE,
}
