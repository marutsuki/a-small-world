package io.marutsuki.asmallworld.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static io.marutsuki.asmallworld.config.WebSocketUtils.session;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public final class WebSocketTests {

    @Value("${local.server.port}")
    private int port;

    @Test
    public void sockJsClientConnects() throws ExecutionException, InterruptedException, TimeoutException, IOException {
        WebSocketSession session = session(new DummyHandler(), port);
        assertTrue(session.isOpen());
        session.close();
    }

    @Test
    public void stompClientConnects() throws ExecutionException, InterruptedException, TimeoutException {
        StompSession stompSession = session(port);
        assertTrue(stompSession.isConnected());
        stompSession.disconnect();
    }

    static final class DummyHandler implements WebSocketHandler {
        @Override
        public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        }

        @Override
        public void handleMessage(@NonNull WebSocketSession session, @NonNull WebSocketMessage<?> message) {
        }

        @Override
        public void handleTransportError(@NonNull WebSocketSession session, @NonNull Throwable exception) {
        }

        @Override
        public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus closeStatus) {
        }

        @Override
        public boolean supportsPartialMessages() {
            return false;
        }
    }
}
