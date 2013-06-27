/// <reference path="../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../gamemodel.ts" />
/// <reference path="../gameviewmodel.ts" />

describe("gameviewmodel", () => {
    var testM: Model.IGame;
    var gameVM: ViewModel.Game;
    
    beforeEach(() => {
        testM = {
            board: ko.observable([[Figure.blank]]),
            currentPlayer: ko.observable(Player.first),
            status: ko.observable(new Model.Status(GameState.playing, Player.none)),
            putFigure: (x: number, y: number) => { }
        };

        gameVM = new ViewModel.Game(testM);
    });

    describe("盤を準備", () => {
        beforeEach(() => {
            var b = [[Figure.blank, Figure.blank],
                [Figure.circle, Figure.cross]];
            testM.board(b)
        });

        it("盤を表示用に変換する", () => {
            expect(gameVM.board().length).toEqual(4);
        });
    });

    describe("升を準備", () => {
        beforeEach(() => {
            var b = [[Figure.blank, Figure.blank],
                [Figure.circle, Figure.cross]];
            testM.board(b)
        });

       it("何も置かれていない升を表示用に変換する", () => {
            var cell = gameVM.board()[0];
            expect(cell.canPutFigure).toBeTruthy();
            expect(cell.x).toEqual(0);
            expect(cell.y).toEqual(0);
            expect(cell.figure).toEqual("");
        });

        it("○が置かれた升を表示用に変換する", () => {
            var cell = gameVM.board()[2];
            expect(cell.canPutFigure).toBeFalsy();
            expect(cell.x).toEqual(1);
            expect(cell.y).toEqual(0);
            expect(cell.figure).toEqual("○");
        });

        it("×が置かれた升を表示用に変換する", () => {
            var cell = gameVM.board()[3];
            expect(cell.canPutFigure).toBeFalsy();
            expect(cell.x).toEqual(1);
            expect(cell.y).toEqual(1);
            expect(cell.figure).toEqual("×");
       });
    });

    describe("指し手の表示", () => {
        it("先手を表示用に変換する", () => {
            testM.currentPlayer(Player.first);
            expect(gameVM.currentPlayer()).toEqual("先手");
        });

        it("後手を表示用に変換する", () => {
            testM.currentPlayer(Player.second);
            expect(gameVM.currentPlayer()).toEqual("後手");
        });
    });
    
    describe("ゲームが終わった場合", () => {
        var notification: string;
        
        beforeEach(() => {
            notification = "";
            gameVM.notifyResultMessage = (s) => { notification = s };
        });
        
        describe("通知を行う", () => {
            it("先手が勝者であることを通知する", () => {
                testM.status(new Model.Status(GameState.finished, Player.first));
                expect(notification).toContain("勝者");
                expect(notification).toContain("先手");
            });
            it("後手が勝者であることを通知する", () => {
                testM.status(new Model.Status(GameState.finished, Player.second));
                expect(notification).toContain("勝者");
                expect(notification).toContain("後手");
            });
            it("引き分けであることを通知する", () => {
                testM.status(new Model.Status(GameState.finished, Player.none));
                expect(notification).toContain("引き分け");
            });
        });
    });
});