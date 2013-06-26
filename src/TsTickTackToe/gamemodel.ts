/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />

enum Player {
    first,
    second,
    none
}

enum Figure {
    blank,
    circle,
    cross
}

enum GameState {
    playing,
    finished
}

module Model {
    export interface IGame {
        putFigure(x: number, y: number) :void; 
    }

    export class Status {
        constructor(public state:GameState, public winner:Player) {}
    }

    export class Game {
        board: KnockoutObservable<Figure[][]>;
        currentPlayer: KnockoutObservable<Player>;
        status: KnockoutObservable<Status>;

        constructor() {
            this.currentPlayer = ko.observable(Player.first);
            this.status = ko.observable(new Status(GameState.playing, Player.first));
            this.board = ko.observable(this.getInitialBoard());
        }

        private getInitialBoard() {
            var b = new Array<Array<Figure>>();

            [0, 1, 2].forEach(x => {
                b[x] = new Array<Figure>();
                [0, 1, 2].forEach(y => {
                    b[x][y] = Figure.blank;
                })
            });
            return b;
        }

        putFigure(x: number, y: number):void {
            // 範囲内か判定
            if (x < 0 || 2 < x || y < 0 || 2 < y) {
                throw new Error("BoardRangeOutError");
            }

            var b = this.board();

            if (b[x][y] != Figure.blank) {
                throw new Error("MultiplePutError");
            }

            // 升に駒を置く
            b[x][y] = (this.currentPlayer() == Player.first) ? Figure.circle : Figure.cross;
            this.board(b);
            
            if (this.isFinish(x, y, b))
            {
                return;
            }

            // 指し手の交代
            this.currentPlayer((this.currentPlayer() == Player.first) ? Player.second : Player.first);
        }

        isFinish(x: number, y: number, board: Figure[][]) {
            // 引き分け判定
            var isDraw = _.all(board, (line, x?, bd?) => {
                 return _.all(line, (cell, y?, ln?) => cell != Figure.blank)
                });

            if (isDraw) {
                this.status(new Status(GameState.finished, Player.none));
                return true;
            }

            var nowFigure = (this.currentPlayer() == Player.first) ? Figure.circle : Figure.cross;

            // 縦横判定
            var isVertical = _.all([0, 1, 2], (index, i?, bd?) => board[i][y] == nowFigure);
            var isHolizantal = _.all([0, 1, 2], (index, i?, bd?) => board[x][i] == nowFigure);
            
            // ななめ判定
            var isDiagonal = _.all([[0, 0], [1, 1], [2, 2]], (p, i?, bd?) => board[p[0]][p[1]] == nowFigure)
                            || _.all([[0, 2], [1,1], [2, 0]], (p, i?, bd?) => board[p[0]][p[1]] == nowFigure);

            if (isVertical || isHolizantal || isDiagonal) {
                this.status(new Status(GameState.finished, this.currentPlayer()));
                return true;
            }
            
            return false;
        }
    }
}