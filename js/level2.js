document.addEventListener("DOMContentLoaded", function () {
    // Code to execute when the DOM is ready
    console.log("DOMContentLoaded event fired");
});
// Create the heading and explanation elements
const createGameIntro = () => {
    // Create a container div for the heading and explanation
    const container = document.createElement("div");
    container.style.padding = "10px"; // Add padding for spacing
    container.style.width = "30%"; // Set width to 30% of the viewport
    container.style.position = "fixed"; // Set position to fixed
    container.style.top = "60px"; // Set top position to 80px from the top
    container.style.left = "20%"; // Align the left to the middle of the viewport
    container.style.transform = "translate(-50%, -50%)";
    container.style.background = "rgba(255, 140, 0, 0.9)"; // Add a slightly transparent red background
    container.style.borderRadius = "10px"; // Add rounded corners
    container.style.color = "white"; // Set text color to white
    container.style.fontFamily = "Arial, sans-serif"; // Use Arial font
    container.style.animation = "popUp 0.2s ease forwards";
    container.style.animationFillMode = "forwards"; // Keep the final state of the animation

    // Define CSS keyframes for the pop-up animation
    const styles = `
    @keyframes popUp {
        0% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
        }
    }`;
    // Add the styles to the head of the document
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create the heading element
    const heading = document.createElement("h1");
    heading.textContent = "Flight Catcher";
    heading.style.fontSize = "24px"; // Set the font size to 24 pixels

    // Create the explanation element
    const explanation = document.createElement("h4");
    explanation.textContent = "Congrats! You're in Maldives. Catch 3 more flights for your surprise destination. Avoid the bike!";

    explanation.style.fontSize = "14px"; // Set the font size to 14 pixels

    // Append the heading and explanation elements to the container
    container.appendChild(heading);
    container.appendChild(explanation);

    // Append the container to the body
    document.body.appendChild(container);

    // Remove the elements after 5 seconds
    setTimeout(() => {
        container.style.animation = "none"; // Apply pop-down animation
        setTimeout(() => {
            container.remove(); // Remove the container after the animation completes
        }, 100);
    }, 3000);
};

// Call the function to create the game intro when the game starts
createGameIntro();

// Create an image element for the background
const backgroundImage = document.createElement("img");
backgroundImage.src = "./images/maledives.jpg"; // Set the image source
backgroundImage.style.position = "absolute";
backgroundImage.style.top = "0";
backgroundImage.style.left = "0";
backgroundImage.style.width = "100%";
backgroundImage.style.height = "100%";
backgroundImage.style.zIndex = "-1"; // Ensure it's behind other elements
document.body.appendChild(backgroundImage);
////////--------////////----------/////-------//////////----------/////////////------------------------------------///////
// Create the player class
class Player {
    constructor() {
        this.width = 10;
        this.height = 30;
        this.positionX = 50;
        this.positionY = 0;
        this.domElm = null;
        this.speed = 2;
        this.planeCollisions = 0;
        this.bikeCollisions = 0;
        this.bikeCollided = false;

        this.createDomElement();


    }

    createDomElement() {
        // Create the player element
        this.domElm = document.createElement("div");

        // Set attributes and styles for the player element
        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        // Create and append the player image
        let img = document.createElement("img");
        img.src = "./images/traveller.png";
        img.style.width = "150px";
        img.style.height = "auto";
        this.domElm.appendChild(img);

        // Append the player element to the body
        document.body.appendChild(this.domElm);
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= this.speed;
            this.domElm.style.left = this.positionX + "vw";
        }
    }

    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX += this.speed;
            this.domElm.style.left = this.positionX + "vw";
        }
    }

    handleCollision(obstacle) {
        console.log("Collision Detected!");
        console.log("Collided with:", obstacle.constructor.name);

        if (!obstacle.bike) {
            // If collided with a plane obstacle
            this.planeCollisions++;
            console.log("Plane collisions:", this.planeCollisions, obstacle);
            if (this.planeCollisions === 3) {
                // Redirect to next level when 3 plane obstacles are collided
                window.location.href = "./level2.html";
            }
            // Remove the collided plane obstacle
            const index = obstacles.indexOf(obstacle);
            obstacles.splice(index, 1);
            obstacle.domElm.remove();
            console.log("Obstacle removed:", obstacle);

            // Display collision image only for plane obstacles
            const collisionImage = document.createElement("img");
            collisionImage.src = "./images/ticket.png"; // Set source to collision image
            collisionImage.style.position = "absolute"; // Set position to absolute
            collisionImage.style.left = (this.positionX - 10) + "vw"; // Adjust horizontal position
            collisionImage.style.bottom = (this.positionY + 25) + "vh"; // Adjust vertical position
            collisionImage.style.width = "90px"; // Set width
            collisionImage.style.height = "auto"; // Maintain aspect ratio
            collisionImage.style.zIndex = "1";
            document.body.appendChild(collisionImage);

            setTimeout(() => {
                collisionImage.remove();
            }, 1000);
        } else if (obstacle.bike) {
            console.log("BIKE", obstacle instanceof BikeObstacle)
            // If collided with a bike obstacle, game over
            if (!this.bikeCollided) {
                console.log("Game Over: Collided with BikeObstacle");
                this.bikeCollided = true;
                // showGameOverScreen();
                // Redirect to game over page
                window.location.href = "./gameoverr.html";
            }
        }
    }
}

// Move the collision detection logic inside the setInterval function
setInterval(() => {
    obstacles.forEach((obstacleInstance, index) => {
        // Move obstacles
        obstacleInstance.moveDown();

        // Collision detection
        if (player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY) {

            console.log("Collision detected with obstacle:", obstacleInstance);
            player.handleCollision(obstacleInstance);
        }
    });
}, 20);






// Create the obstacle class
class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.domElm = null;

        this.createDomElement();
    }

    createDomElement() {
        // Create the obstacle element
        this.domElm = document.createElement("div");

        // Set attributes and styles for the obstacle element
        this.domElm.setAttribute("class", "obstacle");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        // Create and append the obstacle image
        let img = document.createElement("img");
        img.src = "./images/redPlane.png";
        img.style.width = "80px";
        img.style.height = "auto";
        this.domElm.appendChild(img);

        // Append the obstacle element to the body
        document.body.appendChild(this.domElm);
    }

    moveDown() {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vh";
    }
}
obstaclesToRemove = [];
// Create bike obstacle class
class BikeObstacle extends Obstacle {
    constructor() {
        super();
        this.bike = true;
        this.domElm.querySelector("img").src = "./images/bike.png";

        // Define CSS keyframes for the rotation animation
        const keyframes = `@keyframes rotateDown {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }`;

        // Create a style element to hold the keyframes
        const style = document.createElement("style");
        style.innerHTML = keyframes;

        // Append the style element to the document head
        document.head.appendChild(style);

        // Add the animation to the bike element
        this.domElm.querySelector("img").style.animation = "rotateDown 1s linear forwards";
    }
    moveDown() {
        this.positionY -= 2; // Adjust the speed for bike obstacles (you can change the speed as needed)
        this.domElm.style.bottom = this.positionY + "vh";
    }
}

const player = new Player();
const obstacles = [];

// Generate obstacles (including bikes)
setInterval(() => {
    const random = Math.random();
    let newObstacle;
    if (random < 0.5) {
        newObstacle = new Obstacle();
        console.log("New plane obstacle created");
    } else {
        newObstacle = new BikeObstacle();
        console.log("New bike obstacle created");
    }
    obstacles.push(newObstacle);
}, 3000);



// Event listeners
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});
