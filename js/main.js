// Create the heading and explanation elements
const createGameIntro = () => {
    // Create a container div for the heading and explanation
    const container = document.createElement("div");
    container.style.padding = "10px"; // Add padding for spacing
    container.style.width = "30%"; // Set width to 30% of the viewport
    container.style.position = "fixed"; // Set position to fixed
    container.style.top = "60px"; // Set top position to 80px from the top
    container.style.left = "15%"; // Align the left to the middle of the viewport
    container.style.transform = "translate(-50%, -50%)";   
    container.style.background = "rgba(255, 100, 100, 0.8)"; // Add a slightly transparent red background
    container.style.borderRadius = "10px"; // Add rounded corners
    container.style.color = "white"; // Set text color to white
    container.style.fontFamily = "Arial, sans-serif"; // Use Arial font
    container.style.animation = "popUp 0.5s ease forwards"; // Apply pop-up animation

    // Define CSS keyframes for the pop-up animation
    const styles = `
        @keyframes popUp {
            to{
           
                transform: scale(1);
                opacity: 1;
            }
           
        }
    `;
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
    explanation.textContent = "Catch 3 flights to get to a better destination. Be careful, if you catch the bike, you will lose!";
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
backgroundImage.src = "./maledives.jpg"; // Set the image source
backgroundImage.style.position = "absolute";
backgroundImage.style.top = "0";
backgroundImage.style.left = "0";
backgroundImage.style.width = "100%";
backgroundImage.style.height = "100%";
backgroundImage.style.zIndex = "-1"; // Ensure it's behind other elements



// Append the image to the board element
const boardElm = document.getElementById("board");
boardElm.appendChild(backgroundImage);

// Create the player class
class Player {
    constructor() {
        this.width = 10;
        this.height = 30;
        this.positionX = 50;
        this.positionY = 0;
        this.domElm = null;

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
        img.src = "./traveller.png";
        img.style.width = "150px";
        img.style.height = "auto";
        this.domElm.appendChild(img);

        // Append the player element to the board
        boardElm.appendChild(this.domElm);
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.domElm.style.left = this.positionX + "vw";
        }
    }

    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX++;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
}

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
        img.src = "./redPlane.png";
        img.style.width = "80px";
        img.style.height = "auto";
        this.domElm.appendChild(img);

        // Append the obstacle element to the board
        boardElm.appendChild(this.domElm);
    }

    moveDown() {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vh";
    }
}

const player = new Player();
const obstacles = [];

// Generate obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 3000);

// Collision count element
const collisionGold = document.createElement("span");
collisionGold.id = "collisionCount";
document.body.appendChild(collisionGold);

// Collision detection
setInterval(() => {
    obstacles.forEach((obstacleInstance) => {
        // Move obstacles
        obstacleInstance.moveDown();

        // Collision detection
        if (player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY) {
            collisionCount++;
            collisionGold.textContent = `Collision Count: ${collisionCount}`;

            const collisionImage = document.createElement("img");
            collisionImage.src = "./ticket.png"; // Set source to collision image
            collisionImage.style.position = "absolute"; // Set position to absolute
            collisionImage.style.left = (player.positionX - 10) + "vw"; // Adjust horizontal position
            collisionImage.style.bottom = (player.positionY + 25) + "vh"; // Adjust vertical position
            collisionImage.style.width = "90px"; // Set width
            collisionImage.style.height = "auto"; // Maintain aspect ratio
            collisionImage.style.zIndex = "1";
            boardElm.appendChild(collisionImage);

            setTimeout(() => {
                collisionImage.remove();
            }, 1000);
        }
    });
}, 20);

// Event listeners
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});
