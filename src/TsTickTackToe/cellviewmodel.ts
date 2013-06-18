/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="gamemodel.ts" />
/// <reference path="gameconv.ts" />

module ViewModel {
    export class Cell {
        x: number;
        y: number;
        figure: string;
        game: Model.Game;
        canPutFigure: boolean;

        constructor(x:number, y:number, fig:Figure, parent:Model.Game) {
            this.x = x;
            this.y = y;
            this.figure = Conv.figureToStr(fig);
            this.game = parent;
            this.canPutFigure = (fig === Figure.blank);
        }

        putFigure() {
            if (this.canPutFigure == false) {
                return;
            }

            this.canPutFigure = false;
            this.game.putFigure(this.x, this.y);
        }
    }
}