/// <reference path="../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="testUtils.ts" /> 
/// <reference path="../gamemodel.ts" />

describe("gameModel", () => {
    var game: Model.Game;
    beforeEach(() => { game = new Model.Game() });

    describe("ゲームを初期化する", () => {
        it("盤が準備される", () => {
            expect(game.board().length).toEqual(3);
            [0, 1, 2].forEach(i => expect(game.board()[i].length).toEqual(3));
        });

        it("盤上の升がすべて駒なし", () => {
            [0, 1, 2].forEach(x => [0, 1, 2].forEach(y => {
                expect(game.board()[x][y]).toEqual(Figure.blank);
            }));
        });
    });

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

    describe("同じ升に駒を置く", () => {
        it("エラーが発生する", () => {
            game.putFigure(0, 0);
            expect(() => game.putFigure(0,0)).toThrow("MultiplePutError");
        });
    });

    describe("盤の外に駒を置く", () => {
        it("上端より上", () => {
            expect(() => game.putFigure(1, -1)).toThrow("BoardRangeOutError")
        });
        it("左端より左", () => {
            expect(() => game.putFigure(-1, 0)).toThrow("BoardRangeOutError")
        });
        it("下端より下", () => {
            expect(() => game.putFigure(2, 3)).toThrow("BoardRangeOutError")
        });
        it("右端より右", () => {
            expect(() => game.putFigure(3, 1)).toThrow("BoardRangeOutError")
        });
    });

    describe("終了判定", () => {

        describe("盤面に空き升がなくなった場合", () => {
            // ○ × ○
            // × ○ ×
            // ○ × ○
            var first =  [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]];
            var second = [[1, 0], [0, 1], [2, 1], [1, 2]];
         
            it("引き分けとなる", () => {
                TestUtils.putFigures(first, second, game);

                expect(game.status().state).toEqual(GameState.finished);
                expect(game.status().winner).toEqual(Player.none);
            });
        });

        describe("○が横に3個そろった場合", () => {
            // ○ ○ ○
            // × × 空
            // 空 空 空
            var notation = [
                [0, 0], [0, 1], [1, 0], [1, 1], [2, 0]
            ];
            var first =  [[0, 0], [1, 0], [2, 0]];
            var second = [[0, 1], [1, 1]];

            it("先手の勝利", () => {
                TestUtils.putFigures(first, second, game);

                expect(game.status().state).toEqual(GameState.finished);
                expect(game.status().winner).toEqual(Player.first);
            });
        });

        describe("○が縦に3個そろった場合", () => {
            // ○ × ×
            // ○ 空 空
            // ○ 空 空
            var first  = [[0, 0], [0, 1], [0, 2]];
            var second = [[1, 0], [1, 1]];

            it("先手の勝利", () => {
                TestUtils.putFigures(first, second, game);

                expect(game.status().state).toEqual(GameState.finished);
                expect(game.status().winner).toEqual(Player.first);
            });
        });

        describe("○が斜めに3個そろった場合", () => {
            // ○ × ×
            // 空 ○ 空
            // 空 空 ○
            var first  = [[0, 0], [1, 1], [2, 2]];
            var second = [[1, 0], [0, 2]];

            it("先手の勝利", () => {
                TestUtils.putFigures(first, second, game);

                expect(game.status().state).toEqual(GameState.finished);
                expect(game.status().winner).toEqual(Player.first);
            });
        });

        describe("後手が先に3個そろった場合", () => {
            // ○ ○ 空
            // × × ×
            // 空 空 ○
            var notation = [
                [0, 0], [1, 0], [1, 0], [0, 2], [2, 2], [2, 1]
            ];
            var first  = [[0, 0], [1, 0], [2, 2]];
            var second = [[0, 1], [1, 1], [2, 1]];
           
            it("後手の勝利", () => {
                TestUtils.putFigures(first, second, game);

                expect(game.status().state).toEqual(GameState.finished);
                expect(game.status().winner).toEqual(Player.second);
            });
        });
    });
});
