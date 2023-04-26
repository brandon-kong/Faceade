export default (code, hostClient) => {
    let joinCode = code,
    host = hostClient,
    status = '',
    words = [],
    wordsUsed = [],
    players = [],
    started = false,
    round = 0,
    rounds = 0;

    function getCode() { return joinCode; }
    function getPlayers() { return players; }
    function getHost() { return host; }
    function getStarted() { return started; }
    function getRound() { return round; }
    function getRounds() { return rounds; }
    function getStatus() { return status; }
    function getWords() { return words; }
    function getWordsUsed() { return wordsUsed; }

    return {
        getCode,
        getPlayers,
        getHost,
        getStarted,
        getRound,
        getRounds,
        getStatus,
        getWords,
        getWordsUsed,
    }
}