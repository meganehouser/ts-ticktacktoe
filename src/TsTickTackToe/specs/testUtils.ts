/// <reference path="../Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="../gamemodel.ts" />

module TestUtils {
    export function putFigures(first: number[][], second: number[][], game:Model.IGame) {
        var turns = _.zip(first, second);
        var notation: number[][] = _.flatten(turns, true);

        notation.forEach(p => {
            if (p != null) { game.putFigure(p[0], p[1]) }
        });
    }
}
