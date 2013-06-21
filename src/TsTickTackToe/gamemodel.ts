/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
enum Player {
    first,
    second
}

enum Figure {
    blank,
    circle,
    cross
}

enum Status {
    playing,
    finished
}

module Model {
    export class Game {
        board: KnockoutObservable<Array<Array<Figure>>>;
        currentPlayer: KnockoutObservable<Player>;
        status: KnockoutObservable<Status>;

        constructor() {
            this.currentPlayer = ko.observable(Player.first);
            this.status = ko.observable(Status.playing);
            this.board = ko.observable(this.getInitialBoard());
        }

        private getInitialBoard() {
            var b = new Array<Array<Figure>>();

            [0, 1, 2].forEach(i => {
                var line = new Array<Figure>();
                [0, 1, 2].forEach(j => {
                    line[j] = Figure.blank;
                })
                b[i] = line;
            });
            return b;
        }

        putFigure(x:number, y:number) {
            var b = this.board();
            
            // 升に駒を置く
            b[x][y] = (this.currentPlayer() == Player.first) ? Figure.circle : Figure.cross;
            this.board(b);

            // 指し手の交代
            this.currentPlayer((this.currentPlayer() == Player.first) ? Player.second : Player.first);
        }
    }
}