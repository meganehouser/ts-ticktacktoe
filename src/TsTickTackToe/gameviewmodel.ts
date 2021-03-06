/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="gamemodel.ts" />
/// <reference path="gameconv.ts" />
/// <reference path="cellviewmodel.ts" />

module ViewModel {
    export class Game {
        game : Model.Game
        board: KnockoutObservableArray<ViewModel.Cell>;
        currentPlayer: KnockoutObservable<string>;
        status: KnockoutComputed<string>;
        notifyResultMessage: (s:string) => void;

        constructor(model:Model.IGame) {
            try {
                this.game = model;

                this.currentPlayer = ko.computed(() => {
                    return Conv.playerToStr(this.game.currentPlayer());
                }, this);

                this.status = ko.computed(() => {
                    return Conv.statusToStr(<Model.Status>this.game.status())
                }, this);

                this.status.subscribe(_ => {
                    this.notifyResultMessage(this.status())
                });
                
                this.board = ko.observableArray(this.boardToCollection(this.game.board()));

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
            
            _.range(b.length).forEach(x => {
                _.range(b[0].length).forEach(y => {
                    arr.push(new Cell(x, y, b[x][y], this.game));
                })
            });

            return arr;
        }
    }
}