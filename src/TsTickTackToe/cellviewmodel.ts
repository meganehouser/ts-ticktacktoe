/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="gamemodel.ts" />
/// <reference path="gameconv.ts" />

module ViewModel {
    export class Cell {
        x: number;
        y: number;
        figure: string;
        game: Model.Game;

        constructor(x:number, y:number, fig:Figure, parent:Model.Game) {
            this.x = x;
            this.y = y;
            this.figure = Conv.figureToStr(fig);
            this.game = parent;
        }

        putFigure() {
            this.game.putFigure(this.x, this.y);
        }
    }
}