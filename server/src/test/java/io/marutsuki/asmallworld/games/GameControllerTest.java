package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.misc.Input;
import io.marutsuki.asmallworld.games.misc.Vector;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.stomp.StompSession;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static io.marutsuki.asmallworld.config.WebSocketUtils.session;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.verify;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public class GameControllerTest {

    @Value("${local.server.port}")
    private int port;

    @MockBean
    private GameService service;

    @Test
    public void playerSpawnEndpointTest() throws ExecutionException, InterruptedException, TimeoutException {
        StompSession stompSession = session(port);
        stompSession.send("/publish/worldId/player/playerId/spawn", "");

        verify(service, timeout(1000).times(1)).spawnPlayer("worldId", "playerId");
        stompSession.disconnect();
    }

    @Test
    public void playerDespawnEndpointTest() throws ExecutionException, InterruptedException, TimeoutException {
        StompSession stompSession = session(port);
        stompSession.send("/publish/worldId/player/playerId/despawn", "");

        verify(service, timeout(1000).times(1)).despawnPlayer("worldId", "playerId");
        stompSession.disconnect();
    }

    @Test
    public void playerInputEndpointTest() throws ExecutionException, InterruptedException, TimeoutException {
        StompSession stompSession = session(port);
        Input expectedInput = new Input(new Vector(0, 1));
        stompSession.send("/publish/worldId/player/playerId/input", expectedInput);

        verify(service, timeout(1000).times(1)).playerInput("worldId", "playerId", expectedInput);
        stompSession.disconnect();
    }
}
