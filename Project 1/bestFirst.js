const estadoFinal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let hash = {};
let openList = [];
let auxState = false;
let pasos = 0;

function compare(state) {
  const pos = state.indexOf(0);
  let _state = state.slice();
  _state.splice(pos,1);
  let count = 0;
  for (let i = 0; i < _state.length; i++) {
    for (let j = i + 1; j < _state.length; j++) {
      if (_state[i] > _state[j]) {
        count++;
      }
    }
  }
  return count % 2 === 0;
}

function move(state, sucesores, pos, steps) {
  let _state, newState;
  newState = state.slice();
  swap(newState, pos, pos + steps);
  if (!compare(newState, state.prev)) {
    _state = newState.join('');
    if (typeof hash[_state] === 'undefined') {
      hash[_state] = newState;
      newState.prev = state;
      newState.manhanttanDistance = calcDistancia(newState);
      newState.levels = newState.prev.levels + 1;
      sucesores.push(newState);
    }
  }
}

function swap(state, from, to) {
  let _ = state[from];
  state[from] = state[to];
  state[to] = _;
}

function compare(arr1, arr2) {
  if (!arr1 || !arr2) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}


function getSuccessors(state) {
  let sucesores = [];
  let pos = state.indexOf(0);
  let fila = Math.floor(pos / 3);
  let columna = pos % 3;
  if (fila > 0) {
    move(state, sucesores, pos, -3);
  }
  if (columna > 0) {
    move(state, sucesores, pos, -1);
  }
  if (fila < 2) {
    move(state, sucesores, pos, 3);
  }
  if (columna < 2) {
    move(state, sucesores, pos, 1);
  }
  return sucesores;
}

function calcDistancia(state) {
  let totalDistancia = 0;
  for (let i = 0; i < state.length - 1; i++) {
    if (state[i] !== 0) {
      let realPos = estadoFinal.indexOf(state[i]);
      let realCol = realPos % 3;
      let realRow = Math.floor(realPos / 3);
      let col = i % 3;
      let row = Math.floor(i / 3);
      totalDistancia += (Math.abs(realCol - col) + Math.abs(realRow - row));
    }
  }
  return totalDistancia;
}

function collateSteps(state) {
    let aux = state.splice(0, 9) ;
	console.log(aux);
	
    pasos++;
    if (!state.prev) {
      console.log(state, pasos);
      return state;
    }
    collateSteps(state.prev);
  }

function solve(state) {
  state.levels = 0;
  state.prev = null;
  openList.push(state);
  while (auxState !== true) {
    let currentState = openList.shift();
    let successors = getSuccessors(currentState);
    for (let i = 0; i < successors.length; i++) {
      if (compare(estadoFinal, successors[i])) {
        auxState = true;
        collateSteps(successors[i]);
        break;
      } else {
        heap(openList, successors[i]);
      }
    }
  }
}

function parent(index) {
  return Math.floor((index - 1) / 2);
}

function heap(state, successor) {
  state.push(successor);
  let node = state.length - 1;
  while (parent(node) >= 0 && node > 0) {
    let parentElement = state[parent(node)];
    let currentElement = state[node];
    let totalWeightA = parentElement.manhanttanDistance + parentElement.levels;
    let totalWeightB = currentElement.manhanttanDistance + currentElement.levels;
    if (totalWeightA >= totalWeightB) {
      swap(state, parent(node), node);
      node = parent(node);
      continue;
    }
    break;
  }
}


function main() {
  let puzzle = [5,7,6,2,1,3,4,8,0];
  document.getElementById("logStates").innerHTML+="<br> PUZZLE A RESOLVER: [".concat(puzzle).concat("]");
  solve(puzzle);
  // document.getElementById("log").innerHTML+="move".concat(": [").concat(arreglos).concat("]");
}
main();
