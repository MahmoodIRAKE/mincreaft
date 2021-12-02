import { state, matrix } from "./constants.js";


const gameBoard = document.querySelector('.game-board')

function main() {
    draw(matrix);
}

function draw(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            let str = '';
            switch (matrix[i][j]) {
                case state.sky:
                    str = '<div class="sky"> </div>'
                    break;
                case state.cloud:
                    str = '<div class="cloud"> </div>'
                    break;
                case state.ground:
                    if (i === state.ground_limit) {
                        str = '<div class="ground-grass"> </div>'
                    } else {
                        str = '<div class="ground"> </div>'
                    }
                    break;
                case state.grass:
                    str = '<div class="grass"> </div>'
                    break;
                case state.stone:
                    str = '<div class="stone"> </div>'
                    break;
                case state.wood:
                    str = '<div class="wood"> </div>'
            }
            gameBoard.innerHTML += str;
        }
    }
}
main();