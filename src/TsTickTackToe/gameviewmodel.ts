/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="gamemodel.ts" />
/// <reference path="gameconv.ts" />

module ViewModel {
    export class Game {
        game : Model.Game
        board: KnockoutObservableArray;
        currentPlayer: KnockoutObservable<string>;
        status: KnockoutObservable<string>;

        constructor() {
            try {
                this.game = new Model.Game();
                this.currentPlayer = ko.computed(() => {
                    return Conv.playerToStr(this.game.currentPlayer());
                }, this);
                this.status = ko.computed(() => {
                return Conv.statusToStr(this.game.status(), this.game.currentPlayer())
            }, this);
                this.board = ko.observableArray(Conv.boardToArray(this.game.board()));

                this.game.board.subscribe(_ => {
                    this.board(Conv.boardToArray(this.game.board()));
                });
            }
            catch(e){
                alert(e);
            }
        }


        putFigure(x: number, y: number) {
            this.game.putFigure(x, y);
        }
    }
}