package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.players.Player;

public interface GameService {
    void startWorld(String worldId);

    void stopWorld(String worldId);

    Player addPlayer(String worldId);

    void spawnPlayer(String worldId, String playerId);

    void despawnPlayer(String worldId, String playerId);

    void movePlayer(String worldId, String playerId, Location location);

}
