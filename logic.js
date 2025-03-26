const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");
const gridSize = 6;
const colors = ["color-1", "color-2", "color-3", "color-4", "color-5"];
let tiles = [];
let firstTile = null;
let secondTile = null;
let isSwapping = false;
let score = 0;

// Initialize Grid
function createGrid() {
    tiles = [];
    gameContainer.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.color = colors[Math.floor(Math.random() * colors.length)];
        tile.classList.add(tile.dataset.color);
        tile.dataset.index = i;
        tile.addEventListener("click", () => handleTileClick(tile));
        tiles.push(tile);
        gameContainer.appendChild(tile);
    }
}

// Handle Tile Click
function handleTileClick(tile) {
    if (isSwapping) return;
    if (!firstTile) {
        firstTile = tile;
        tile.style.border = "3px solid white";
    } else if (tile !== firstTile) {
        secondTile = tile;
        swapTiles(firstTile, secondTile);
    }
}

// Swap Tiles
function swapTiles(tile1, tile2) {
    isSwapping = true;

    // Swap Colors
    const tempColor = tile1.dataset.color;
    tile1.dataset.color = tile2.dataset.color;
    tile2.dataset.color = tempColor;

    tile1.className = "tile " + tile1.dataset.color;
    tile2.className = "tile " + tile2.dataset.color;

    tile1.style.border = "none";
    firstTile = null;
    secondTile = null;

    // Check for Matches
    setTimeout(() => {
        if (checkForMatches()) {
            score += 10;
            scoreBoard.textContent = `Score: ${score}`;
            removeMatches();
        } else {
            // Revert if no match
            swapTiles(tile1, tile2);
        }
        isSwapping = false;
    }, 300);
}

// Check for Matches
function checkForMatches() {
    let isMatch = false;

    // Check rows and columns
    for (let i = 0; i < gridSize; i++) {
        // Check Rows
        for (let j = 0; j < gridSize - 2; j++) {
            const idx = i * gridSize + j;
            if (
                tiles[idx].dataset.color === tiles[idx + 1].dataset.color &&
                tiles[idx].dataset.color === tiles[idx + 2].dataset.color
            ) {
                isMatch = true;
                tiles[idx].classList.add("matched");
                tiles[idx + 1].classList.add("matched");
                tiles[idx + 2].classList.add("matched");
            }
        }
        // Check Columns
        for (let j = 0; j < gridSize - 2; j++) {
            const idx = j * gridSize + i;
            if (
                tiles[idx].dataset.color === tiles[idx + gridSize].dataset.color &&
                tiles[idx].dataset.color === tiles[idx + gridSize * 2].dataset.color
            ) {
                isMatch = true;
                tiles[idx].classList.add("matched");
                tiles[idx + gridSize].classList.add("matched");
                tiles[idx + gridSize * 2].classList.add("matched");
            }
        }
    }
    return isMatch;
}

// Remove Matches and Refill
function removeMatches() {
    tiles.forEach((tile) => {
        if (tile.classList.contains("matched")) {
            tile.classList.remove("matched");
            tile.dataset.color = colors[Math.floor(Math.random() * colors.length)];
            tile.className = "tile " + tile.dataset.color;
        }
    });
}

// Start the Game
createGrid();

