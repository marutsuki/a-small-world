package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.misc.Input;
import io.marutsuki.asmallworld.players.Player;

public interface GameService {

    Player addPlayer(String worldId);

    void startWorld(String worldId);

    void stopWorld(String worldId);

    void spawnPlayer(String worldId, String playerId);

    void despawnPlayer(String worldId, String playerId);

    void playerInput(String worldId, String playerId, Input input);

}
