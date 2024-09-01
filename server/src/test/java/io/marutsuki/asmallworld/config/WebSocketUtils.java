package io.marutsuki.asmallworld.config;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public final class WebSocketUtils {

    private static final String WS_ENDPOINT = "/events";
    public static StompSession session(int port) throws ExecutionException, InterruptedException, TimeoutException {
        WebSocketStompClient client = new WebSocketStompClient(
                new SockJsClient(List.of(new WebSocketTransport(new StandardWebSocketClient()))));
        client.setMessageConverter(new MappingJackson2MessageConverter());

        WebSocketStompClient stompClient = client();

        return stompClient.connectAsync("ws://localhost:" + port + WS_ENDPOINT,
                new StompSessionHandlerAdapter() {
                }).get(1000, TimeUnit.MILLISECONDS);
    }

    public static WebSocketSession session(WebSocketHandler handler, int port) throws ExecutionException, InterruptedException, TimeoutException {
        SockJsClient client = new SockJsClient(List.of(new WebSocketTransport(new StandardWebSocketClient())));
        return client.execute(handler,
                "ws://localhost:" + port + WS_ENDPOINT).get(1000, TimeUnit.MILLISECONDS);
    }

    private static WebSocketStompClient client() {
        WebSocketStompClient client = new WebSocketStompClient(
                new SockJsClient(List.of(new WebSocketTransport(new StandardWebSocketClient()))));
        client.setMessageConverter(new MappingJackson2MessageConverter());
        return client;
    }
}
