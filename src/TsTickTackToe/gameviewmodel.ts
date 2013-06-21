/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="gamemodel.ts" />
/// <reference path="gameconv.ts" />
/// <reference path="cellviewmodel.ts" />

module ViewModel {
    export class Game {
        game : Model.Game
        board: KnockoutObservableArray;
        currentPlayer: KnockoutObservable<string>;
        status: KnockoutComputed<string>;

        constructor() {
            try {
                this.game = new Model.Game();

                this.currentPlayer = ko.computed(() => {
                    return Conv.playerToStr(this.game.currentPlayer());
                }, this);

                this.status = ko.computed(() => {
                    return Conv.statusToStr(this.game.status(), this.game.currentPlayer())
                }, this);

                this.board = ko.observableArray();
                this.board(this.boardToCollection(this.game.board()));

                this.game.board.subscribe(_ => {
                    this.board(this.boardToCollection(this.game.board()));
                });
            }
            catch(e){
                alert(e);
            }
        }

        private boardToCollection(b: Array<Array<Figure>>) {
            var arr = new Array<Cell>();

            [0, 1, 2].forEach(x => {
                [0, 1, 2].forEach(y => {
                    arr.push(new Cell(x, y, b[x][y], this.game));
                })
            });

            return arr;
        }
    }
}