const colors = ["red", "blue", "yellow", "green", "white", "orange"];
const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
const cube = document.getElementById('cube');
let rotateX = -30;
let rotateY = -45;

// Cube state management
let cubeState = {
    front: Array(9).fill('red'),
    back: Array(9).fill('orange'),
    left: Array(9).fill('blue'),
    right: Array(9).fill('green'),
    top: Array(9).fill('white'),
    bottom: Array(9).fill('yellow')
};

function createFace(face) {
    const faceDiv = document.createElement('div');
    faceDiv.classList.add('face', face);
    cubeState[face].forEach(color => {
        const piece = document.createElement('div');
        piece.classList.add(color);
        faceDiv.appendChild(piece);
    });
    return faceDiv;
}

function updateFace(face) {
    const faceDiv = document.querySelector(`.${face}`);
    faceDiv.innerHTML = '';
    cubeState[face].forEach(color => {
        const piece = document.createElement('div');
        piece.classList.add(color);
        faceDiv.appendChild(piece);
    });
}

function initializeCube() {
    cube.innerHTML = '';
    faces.forEach(face => {
        const faceDiv = createFace(face);
        faceDiv.classList.add(face);
        cube.appendChild(faceDiv);
    });
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            rotateX -= 10;
            break;
        case 'ArrowDown':
            rotateX += 10;
            break;
        case 'ArrowLeft':
            rotateY -= 10;
            break;
        case 'ArrowRight':
            rotateY += 10;
            break;
        // Rotate faces manually
        case 'f': // Front face
            rotateFace('front');
            break;
        case 'b': // Back face
            rotateFace('back');
            break;
        case 'l': // Left face
            rotateFace('left');
            break;
        case 'r': // Right face
            rotateFace('right');
            break;
        case 'u': // Top face
            rotateFace('top');
            break;
        case 'd': // Bottom face
            rotateFace('bottom');
            break;
    }
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

function shuffleCube() {
    // Implement realistic shuffling algorithm
    const moves = ["f", "b", "l", "r", "u", "d"];
    for (let i = 0; i < 20; i++) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        rotateFace(move);
    }
    alert("Shuffled!");
}

function rotateFace(face) {
    console.log(`Rotating ${face} face`);

    const faceIndex = {
        front: 0,
        back: 1,
        left: 2,
        right: 3,
        top: 4,
        bottom: 5
    };

    // Rotating the specified face
    const newFace = [...cubeState[face]];
    newFace[0] = cubeState[face][6];
    newFace[1] = cubeState[face][3];
    newFace[2] = cubeState[face][0];
    newFace[3] = cubeState[face][7];
    newFace[4] = cubeState[face][4];
    newFace[5] = cubeState[face][1];
    newFace[6] = cubeState[face][8];
    newFace[7] = cubeState[face][5];
    newFace[8] = cubeState[face][2];

    cubeState[face] = newFace;

    // Update adjacent faces
    switch (face) {
        case 'front':
            // Top to right, right to bottom, bottom to left, left to top
            rotateAdjacentFaces(['top', 'right', 'bottom', 'left'], [6, 7, 8], [0, 3, 6]);
            break;
        case 'back':
            // Top to left, left to bottom, bottom to right, right to top
            rotateAdjacentFaces(['top', 'left', 'bottom', 'right'], [0, 1, 2], [8, 5, 2]);
            break;
        case 'left':
            // Top to back, back to bottom, bottom to front, front to top
            rotateAdjacentFaces(['top', 'back', 'bottom', 'front'], [0, 3, 6], [6, 3, 0]);
            break;
        case 'right':
            // Top to front, front to bottom, bottom to back, back to top
            rotateAdjacentFaces(['top', 'front', 'bottom', 'back'], [8, 5, 2], [2, 5, 8]);
            break;
        case 'top':
            // Front to right, right to back, back to left, left to front
            rotateAdjacentFaces(['front', 'right', 'back', 'left'], [0, 1, 2], [0, 1, 2]);
            break;
        case 'bottom':
            // Front to left, left to back, back to right, right to front
            rotateAdjacentFaces(['front', 'left', 'back', 'right'], [6, 7, 8], [6, 7, 8]);
            break;
    }

    updateFace(face);
}

function rotateAdjacentFaces(faces, fromIndices, toIndices) {
    const temp = [
        cubeState[faces[0]][fromIndices[0]],
        cubeState[faces[0]][fromIndices[1]],
        cubeState[faces[0]][fromIndices[2]]
    ];

    for (let i = 0; i < 3; i++) {
        cubeState[faces[0]][fromIndices[i]] = cubeState[faces[3]][toIndices[i]];
    }

    for (let j = 3; j > 0; j--) {
        for (let i = 0; i < 3; i++) {
            cubeState[faces[j]][toIndices[i]] = cubeState[faces[j - 1]][fromIndices[i]];
        }
    }

    for (let i = 0; i < 3; i++) {
        cubeState[faces[1]][fromIndices[i]] = temp[i];
    }
}

document.getElementById('shuffle').addEventListener('click', shuffleCube);

// Initialize the cube on page load
initializeCube();
