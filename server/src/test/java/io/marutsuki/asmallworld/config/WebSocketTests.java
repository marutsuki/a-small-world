package io.marutsuki.asmallworld.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.lang.NonNull;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT

)
public final class WebSocketTests {

    @Value("${local.server.port}")
    private int port;

    @Test
    public void sockJsClientConnects() throws ExecutionException, InterruptedException, TimeoutException, IOException {
        SockJsClient sockJsClient = client();

        WebSocketSession wsSession = sockJsClient.execute(new WebSocketHandler() {
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
             },
            "ws://localhost:" + port + "/events").get(1000, TimeUnit.MILLISECONDS);

        assertTrue(wsSession.isOpen());
        wsSession.close();
    }

    @Test
    public void stompClientConnects() throws ExecutionException, InterruptedException, TimeoutException {
        WebSocketStompClient stompClient = new WebSocketStompClient(client());
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSession stompSession = stompClient.connectAsync("ws://localhost:" + port + "/events",
                new StompSessionHandlerAdapter() {
                }).get(1000, TimeUnit.MILLISECONDS);

        assertTrue(stompSession.isConnected());
        stompSession.disconnect();
    }

    private static SockJsClient client() {
        return new SockJsClient(List.of(new WebSocketTransport(new StandardWebSocketClient())));
    }
}
