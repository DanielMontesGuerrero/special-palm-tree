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
    LOOSE,
    WARNING,
}

export enum EventCode {
    ROULETTE_TRIGGERED,
    CHANGED_ACTIVE_PIECE,
    RELEASE_PIECE,
}
