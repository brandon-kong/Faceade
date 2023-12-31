import type { Db } from "mongodb";
import { GameType } from "../game";

export function removeInactiveGames(db: Db) {
    db.collection<GameType>("games").deleteMany({
        players: {
            $size: 0,
        },
    });

    db.collection<GameType>("games").deleteMany({
        last_updated: {
            $lt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day
        },
    });
}