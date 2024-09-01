package io.marutsuki.asmallworld.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
public class WebSocketLogger {

    @EventListener
    public void onSessionConnect(SessionConnectEvent event) {
        log.info("Client connected, source: {}", event.getSource());
    }

    @EventListener
    public void onSessionDisconnect(SessionDisconnectEvent event) {
        log.info("Client disconnected, session closed: {}", event.getSessionId());
    }
}
