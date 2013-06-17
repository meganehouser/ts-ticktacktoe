/// <reference path="gamemodel.ts" />

module Conv {
    export function figureToStr(fig: Figure) {
        switch (fig) {
            case Figure.circle:
                return "○";
            case Figure.cross:
                return "×";
        }
        return "△";                
    }

    export function playerToStr(p: Player) {
        switch (p) {
            case Player.first:
                return "先手";
            case Player.second:
                return "後手";
        }
        return "";
    }

    export function statusToStr(s: Status, p: Player) {
        if (s == Status.finished) {
            return "勝者：" + playerToStr(p);
        }

        return "";
    }
}