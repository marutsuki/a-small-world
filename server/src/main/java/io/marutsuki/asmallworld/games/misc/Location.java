package io.marutsuki.asmallworld.games.misc;

public record Location(int x, int y) {
    public static Location randomLocation(Dimension bounds) {
        return new Location((int) Math.random() * bounds.width(), (int) Math.random() * bounds.height());
    }
}
