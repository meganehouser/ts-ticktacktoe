/// <reference path="../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" /> 
/// <reference path="../gamemodel.ts" />

describe("gameModel", () => {
    var game: Model.Game;
    beforeEach(() => { game = new Model.Game() });

    describe("駒を置く", () => {
        var notified = false;

        it("盤面に駒を置かれたことを知る", () => {
            game.board.subscribe(_ => { notified = true });
            game.putFigure(0, 0);
            expect(notified).toBeTruthy();
        });

        it("指し手が交代する", () => {
            expect(game.currentPlayer()).toBe(Player.first);
            game.putFigure(0, 0);
            expect(game.currentPlayer()).toEqual(Player.second);
            game.putFigure(0, 1);
            expect(game.currentPlayer()).toEqual(Player.first);
        });
    });
});