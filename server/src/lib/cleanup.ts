import type { Db } from "mongodb";

export function removeInactiveGames(db: Db) {
    db.collection("games").deleteMany({
        players: {
            $size: 0,
        },
    });

    db.collection("games").deleteMany({
        last_updated: {
            $lt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day
        },
    });
}