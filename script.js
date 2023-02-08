let round = 0;
let player_lives = 5;
let pc_lives = 5;

const entity_buttons = document.querySelectorAll('.entity-button');
const rounds = document.querySelector('.round');
const message = document.querySelector('.fight-message');
const play_again_button = document.querySelector('.play-again');

function add_round() {
    round = round + 1;
    rounds.innerText = `Round: ${round}`;
    return round;
}

function pc_choice() {
    const entities = ['foot', 'cockroach', 'nuclearbomb'];
    const choice = entities[Math.floor(Math.random() * 3)];
    return choice;
}

function display_pc_choice() {
    const choice = pc_choice();

    if (choice == 'foot') {
        document.getElementById("pc-icon").src = "https://cdn-icons-png.flaticon.com/512/1040/1040446.png"
    }

    else if (choice == 'cockroach') {
        document.getElementById("pc-icon").src = "https://cdn-icons-png.flaticon.com/512/8005/8005026.png"
    }

    else {
        document.getElementById("pc-icon").src = "https://cdn-icons-png.flaticon.com/512/1282/1282886.png"
    }

    return choice;
}

function count_lives(player_choice, pc_choice) {
    const game_output = document.querySelector('.game-output');
    const pc_play_div = document.querySelector('.pc-play-div');

    if (player_choice === pc_choice) {
        message.innerText = "It was a draw, no lives were lost";
    }

    else if ((player_choice === 'foot' && pc_choice === 'cockroach') ||
        (player_choice === 'cockroach' && pc_choice === 'nuclearbomb') ||
        (player_choice === 'nuclearbomb' && pc_choice === 'foot')) {
        message.innerText = "Your power is too big. The enemy lost 1 life.";
        pc_lives -= 1;
    }

    else {
        message.innerText = "What a shame... you lost 1 life.";
        player_lives -= 1;
    }

    const lives = document.querySelector('.lives');
    lives.innerText = `Your Lives: ${player_lives} ︱ Enemy's Lives: ${pc_lives}`;
    return [player_lives, pc_lives];
}

function end_game(player_health, pc_health) {
    if (player_health === 0 || pc_health === 0) {
        const end_text = document.querySelector('.game-end-text');
        if (player_lives > pc_lives) {
            message.innerText = 'Hehe good job! You crushed your enemy.';
            end_text.innerText = "You won the game! :D";
        }
        else {
            message.innerText = "Unfortunately, it wasn't this time.";
            end_text = "You lost the game. :(";
        }
    }

    play_again_button.style.visibility = 'visible';
}

function reset_game() {
    play_again_button.addEventListener('click', () => {
        window.location.reload();
    });
}

function game() {
    let player_choice;
    entity_buttons.forEach((entity) => {
        entity.addEventListener('click', () => {
            const entity_icons = document.querySelectorAll('.entity-icon');
            if (entity.classList.contains('foot-button')) {
                player_choice = 'foot';
            } else if (entity.classList.contains('cockroach-button')) {
                player_choice = 'cockroach';
            } else {
                player_choice = 'nuclearbomb';
            }

        add_round();
        count_lives(player_choice, display_pc_choice());
        end_game(player_lives, pc_lives);
        reset_game();
        });
    });
}

game();
    

