let cvsWrapper = null;

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
let bgImg, bgImg_night, bgImg_day, GGImg, baseImg, welcomeImg;
let bird_state_img;
let bird_state = 0;
let bg_x;
let bg_x_record;
let bg_vx;
let bird_y, bird_vy, bird_ay, rotAngle;
let pipe1_x, pipe1_up_y, pipe1_low_y, pipe2_x, pipe2_up_y, pipe2_low_y = 0;
let curr_safe_top, curr_safe_low = 0;
let in_the_pipe = false;
let gotoWelcome = true;
let counter = 0;
let bird_status = {
    FLY: 0,
    HIT_THE_GROUND: 1,
    HIT_THE_CEILING: 2,
    HIT_THE_PIPE: 3,
    WELCOME: 4

}
assets = {};

function preload() {
    assets["bird"] = ["blue", "red", "yellow"].map(
        color => ["upflap", "midflap", "downflap"].map(
            flap => loadImage(`assets/sprites/${color}bird-${flap}.png`)
        )
    );
    bgImg_night = loadImage("assets/sprites/background-night.png");
    bgImg_day = loadImage("assets/sprites/background-day.png");
    GGImg = loadImage("assets/sprites/gameover.png");
    baseImg = loadImage("assets/sprites/base.png");
    welcomeImg = loadImage("assets/sprites/message.png");

    bird_state_img = assets["bird"][getRandom(3) - 1];
    assets["sound"] = ["wing", "die", "hit", "point"].map(effect => loadSound(`assets/audio/${effect}.wav`));

    assets["pipe"] = ["green", "red"].map(
        color => ["upper", "lower"].map(
            position => loadImage(`assets/sprites/pipe-${color}-${position}.png`)
        )
    );
    assets["num"] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
        num => loadImage(`assets/sprites/${num}.png`)
    );
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");

    // setup code below
    bg_x = 0;
    bg_x_record = 0;
    bg_vx = 2;

    bird_y = (cvsWrapper.offsetHeight - 170) / 2;
    bird_vy = 5;
    bird_ay = 0.25;
    rotAngle = 0;

    pipe1_x = cvsWrapper.offsetWidth;
    pipe1_up_y = 0 - getRandom(assets["pipe"][0][0].height) * 3 / 4;
    pipe1_low_y = pipe1_up_y + assets["pipe"][0][0].height + 250;
    pipe2_x = pipe1_x + 250;
    pipe2_up_y = 0 - getRandom(assets["pipe"][0][0].height) * 3 / 4;
    pipe2_low_y = pipe2_up_y + assets["pipe"][0][0].height + 250;
    if (getRandom(2) === 1) {
        bgImg = bgImg_day;
    } else {
        bgImg = bgImg_night;
    }

}

function draw() {
    if (gotoWelcome === true) {

        image(bgImg, bg_x, 0, cvsWrapper.offsetWidth, cvsWrapper.offsetHeight);
        image(bgImg, bg_x + cvsWrapper.offsetWidth, 0, cvsWrapper.offsetWidth, cvsWrapper.offsetHeight);
        image(welcomeImg, 142, 125);
        image(bird_state_img[Math.floor(bird_state / 4)], cvsWrapper.offsetWidth / 2, (cvsWrapper.offsetHeight - 170) / 2);
        bird_state++;
        if (bird_state === 12)
            bird_state = 0;

        image(baseImg, bg_x, cvsWrapper.offsetHeight - 150, cvsWrapper.offsetWidth, 150);
        image(baseImg, bg_x + cvsWrapper.offsetWidth, cvsWrapper.offsetHeight - 150, cvsWrapper.offsetWidth, 150);

        bg_x -= bg_vx;
        pipe1_x -= bg_vx;
        pipe2_x -= bg_vx;
        if (bg_x + cvsWrapper.offsetWidth <= 0) {
            bg_x = bg_x + cvsWrapper.offsetWidth + bg_vx;
        }

    } else {
        image(bgImg, bg_x, 0, cvsWrapper.offsetWidth, cvsWrapper.offsetHeight);
        image(bgImg, bg_x + cvsWrapper.offsetWidth, 0, cvsWrapper.offsetWidth, cvsWrapper.offsetHeight);

        image(assets["pipe"][0][0], pipe1_x, pipe1_up_y);
        image(assets["pipe"][0][1], pipe1_x, pipe1_low_y);
        image(assets["pipe"][0][0], pipe2_x, pipe2_up_y);
        image(assets["pipe"][0][1], pipe2_x, pipe2_low_y);



        if (pipe1_x + assets["pipe"][0][0].width < 0) {
            pipe1_x = cvsWrapper.offsetWidth;
            pipe1_up_y = 0 - getRandom(assets["pipe"][0][0].height * 4 / 5);
            pipe1_low_y = pipe1_up_y + assets["pipe"][0][0].height + 250;
        } else if (pipe2_x + assets["pipe"][0][0].width < 0) {
            pipe2_x = pipe1_x + 250;
            pipe2_up_y = 0 - getRandom(assets["pipe"][0][0].height * 4 / 5);
            pipe2_low_y = pipe2_up_y + assets["pipe"][0][0].height + 250;
        }

        if (pipe1_x + assets["pipe"][0][0].width > cvsWrapper.offsetWidth / 2 + assets["bird"][0][0].width - 5 && pipe1_x < cvsWrapper.offsetWidth / 2 + assets["bird"][0][0].width - 5) {
            curr_safe_top = pipe1_up_y + assets["pipe"][0][0].height;
            curr_safe_low = curr_safe_top + 250;
            in_the_pipe = true;
        } else if (pipe2_x + assets["pipe"][0][0].width > cvsWrapper.offsetWidth / 2 + assets["bird"][0][0].width - 5 && pipe2_x < cvsWrapper.offsetWidth / 2 + assets["bird"][0][0].width - 5) {
            curr_safe_top = pipe2_up_y + assets["pipe"][0][0].height;
            curr_safe_low = curr_safe_top + 250;
            in_the_pipe = true;
        } else {
            if (in_the_pipe === true) {
                in_the_pipe = false;
                assets["sound"][3].play();
                counter++;
            }
            curr_safe_top = 0;
            curr_safe_low = cvsWrapper.offsetHeight;
        }
        if (curr_safe_top !== 0) {

            console.log("curr_safe_top : " + curr_safe_top);
            console.log("curr_safe_low : " + curr_safe_low);
        }


        if (check_GG() !== bird_status.HIT_THE_GROUND) {
            push();
            translate(cvsWrapper.offsetWidth / 2, bird_y);
            rotAngle += 0.018;
            rotate(rotAngle);
            image(bird_state_img[Math.floor(bird_state / 4)], 0, 0);
            pop();
            if (check_GG() === bird_status.HIT_THE_PIPE && has_hit_ceiling === false) {
                bird_vy = 0;
                assets["sound"][2].play();
                has_hit_ceiling = true;
            }
            bird_vy += bird_ay;
            bird_y += bird_vy;
        } else {
            image(GGImg, cvsWrapper.offsetWidth / 2 - 87, cvsWrapper.offsetHeight / 2);
            push();
            translate(cvsWrapper.offsetWidth / 2, bird_y);
            rotate(rotAngle);
            image(bird_state_img[Math.floor(bird_state / 4)], 0, 0);
            pop();
        }
        bird_state++;
        if (bird_state === 12)
            bird_state = 0;

        image(baseImg, bg_x, cvsWrapper.offsetHeight - 150, cvsWrapper.offsetWidth, 150);
        image(baseImg, bg_x + cvsWrapper.offsetWidth, cvsWrapper.offsetHeight - 150, cvsWrapper.offsetWidth, 150);
        if (check_GG() === bird_status.FLY && has_hit_ceiling === false) {
            bg_x -= bg_vx;
            pipe1_x -= bg_vx;
            pipe2_x -= bg_vx;
            if (bg_x + cvsWrapper.offsetWidth <= 0) {
                bg_x = bg_x + cvsWrapper.offsetWidth + bg_vx;
            }
        }
        score_display();

    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (check_GG() === bird_status.FLY && has_hit_ceiling === false) {
            bird_vy = -7;
            assets["sound"][0].play();
            rotAngle = -PI / 4;
        }
    }
}

function mousePressed() {
    if (check_GG() === bird_status.HIT_THE_GROUND) {
        gotoWelcome = true;
        if (getRandom(2) === 1) {
            bgImg = bgImg_day;
        } else {
            bgImg = bgImg_night;
        }
        bird_state_img = assets["bird"][getRandom(3) - 1];

    } else if (check_GG() === bird_status.WELCOME) {
        gotoWelcome = false;
        counter = 0;
        in_the_pipe = false;
        bird_y = (cvsWrapper.offsetHeight - 170) / 2;
        bird_vy = 5;
        bird_ay = 0.15;
        rotAngle = 0;

        pipe1_x = cvsWrapper.offsetWidth;
        pipe1_up_y = 0 - getRandom(assets["pipe"][0][0].height) * 3 / 4;
        pipe1_low_y = pipe1_up_y + assets["pipe"][0][0].height + 250;
        pipe2_x = pipe1_x + 250;
        pipe2_up_y = 0 - getRandom(assets["pipe"][0][0].height) * 3 / 4;
        pipe2_low_y = pipe2_up_y + assets["pipe"][0][0].height + 250;
        has_hit_ceiling = false;
        die_sound = false;

    }
}

function getRandom(x) {
    return Math.floor(Math.random() * x) + 1;
};
let die_sound = false;
let has_hit_ceiling = false;

function check_GG() {
    if (gotoWelcome === true) {
        return bird_status.WELCOME;
    } else if (bird_y >= cvsWrapper.offsetHeight - 170) { //so low and hit the ground
        bird_y = cvsWrapper.offsetHeight - 170;
        bird_vy = 0;
        bird_ay = 0;
        bird_state = 0;
        if (die_sound === false) {
            assets["sound"][1].play();
            die_sound = true;
        }
        return bird_status.HIT_THE_GROUND;
    } else if (0 > bird_y) { //hit the ceiling
        bird_y = 0;
        bird_vy = 0;
        assets["sound"][2].play();
        has_hit_ceiling = true;
        return bird_status.HIT_THE_CEILING;
    } else if (bird_y < curr_safe_top || bird_y + assets["bird"][0][0].height > curr_safe_low) {
        bird_state = 0;
        return bird_status.HIT_THE_PIPE;
    }
    return bird_status.FLY;
}

function score_display() {
    if (counter < 10) {
        image(assets["num"][counter], width / 2, 101);
    } else if (counter < 100) {
        image(assets["num"][Math.floor(counter / 10)], width / 2 - 20, 101);
        image(assets["num"][counter % 10], width / 2, 101);
    } else if (counter < 1000) {
        image(assets["num"][Math.floor(counter / 100)], width / 2 - 40, 101);
        image(assets["num"][Math.floor(counter / 10)], width / 2 - 20, 101);
        image(assets["num"][counter % 10], width / 2, 101);
    }
}