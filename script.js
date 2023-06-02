// Declaring variables and constants 
let round = 0;
let player_lives = 5;
let pc_lives = 5;

const entity_buttons = document.querySelectorAll('.entity-button');
const rounds = document.querySelector('.round');
const message = document.querySelector('.fight-message');
const play_again_button = document.querySelector('.play-again');

// Function that increments the number of rounds by 1
function add_round() {
    round = round + 1;
    rounds.innerText = `Round: ${round}`;
    return round;
}

// Function that chooses an entity for the pc randomly
function pc_choice() {
    const entities = ['foot', 'cockroach', 'nuclearbomb'];
    const choice = entities[Math.floor(Math.random() * 3)];
    return choice;
}

// Function that displays what the pc has chosen 
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

// Function that deals with the lives of the player and the pc
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

// When the game ends, the entity buttons are disabled and a message of victory or defeat is displayed
function end_game(player_health, pc_health) {
    if (player_health === 0 || pc_health === 0) {
        const end_text = document.querySelector('.game-end-text');
        if (player_lives > pc_lives) {
            message.innerText = 'Hehe good job! You crushed your enemy.';
            end_text.innerText = "You won the game! :D";
        }
        else {
            message.innerText = "Unfortunately, it wasn't this time.";
            end_text.innerText = "You lost the game. :(";
        }
        document.querySelector('.foot-button').disabled = true;
        document.querySelector('.cockroach-button').disabled = true;
        document.querySelector('.nuclearbomb-button').disabled = true;

    }
    play_again_button.style.visibility = 'visible';
}

// Function that resets the game
function reset_game() {
    play_again_button.addEventListener('click', () => {
        window.location.reload();
    });
}


// Function that contains the whole logic of the game
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


