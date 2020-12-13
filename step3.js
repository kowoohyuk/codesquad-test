// readline-sync 패키지가 필요합니다.
const rSync = require('readline-sync');

const {log} = console;

// 큐브 생성을 위한 생성자 함수
function Cube() {
  this.front = [
    ['W', 'W', 'W'],
    ['W', 'W', 'W'],
    ['W', 'W', 'W']
  ]
  this.right = [
    ['O', 'O', 'O'],
    ['O', 'O', 'O'],
    ['O', 'O', 'O']
  ]
  this.back = [
    ['G', 'G', 'G'],
    ['G', 'G', 'G'],
    ['G', 'G', 'G']
  ]
  this.left = [
    ['Y', 'Y', 'Y'],
    ['Y', 'Y', 'Y'],
    ['Y', 'Y', 'Y']
  ]
  this.up = [
    ['B', 'B', 'B'],
    ['B', 'B', 'B'],
    ['B', 'B', 'B']
  ]
  this.down = [
    ['R', 'R', 'R'],
    ['R', 'R', 'R'],
    ['R', 'R', 'R']
  ]
  this.startTime = new Date();
  this.count = 0;
}

// 게임을 시작하는 함수
const gameStart = cube => {
  printCube(cube);
  log('게임을 시작합니다!\n');
  play(cube);
}

// 현재 큐브를 출력
const printCube = cube => {
  const largeGap = '               ';
  const gap = '     ';
  let upText = '';
  let middleText = '';
  let downText = '';
  cube.up.forEach(line => upText += largeGap + line.join(' ') + '\r\n');
  cube.front.forEach((_, index) => {
    middleText += cube.front[index].join(' ') + gap;
    middleText += cube.right[index].join(' ') + gap;
    middleText += cube.back[index].join(' ') + gap;
    middleText += cube.left[index].join(' ') + '\r\n';
  });
  cube.down.forEach(line => downText += largeGap + line.join(' ') + '\r\n');
  log(upText);
  log(middleText);
  log(downText);
};

// 게임을 진행하며 사용자로부터 텍스트를 입력받는 함수
const play = cube => {
  str = rSync.question('CUBE> ');
  let stat = true;
  for(let i = 0; i < str.length; i++) {
    let text = str[i];
    if(text === 'Q') {
      stat = false;
      break;
    }
    if(i < str.length - 1 && str[i + 1] === '\'') {
      text = str.slice(i, ++i + 1);
    }
    log(text);
    cube = handleCube(text, cube);
    printCube(cube);
  }
  if(stat) {
    play(cube);
  } else {
    quit(cube);
  }
}

// 이동 방향에 맞는 함수를 호출하는 제어 함수
const handleCube = (text, cube) => {
  switch(text) {
    case 'F': cube = frontMove(cube); break;
    case 'F\'': cube = frontReverseMove(cube); break;
    case 'R': cube = rightMove(cube); break;
    case 'R\'': cube = rightReverseMove(cube); break;
    case 'U': cube = upMove(cube); break;
    case 'U\'': cube = upReverseMove(cube); break;
    case 'B': cube = backMove(cube); break;
    case 'B\'': cube = backReverseMove(cube); break;
    case 'L': cube = leftMove(cube); break;
    case 'L\'': cube = leftReverseMove(cube); break;
    case 'D': cube = downMove(cube); break;
    case 'D\'': cube = downReverseMove(cube); break;
    default: break;
  }
  cube.count += 1;
  return cube;
}

// 큐브의 앞부분을 시계방향으로 회전하는 함수
const frontMove = cube => {
  let tmpUp = cube.up[2].slice();
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  cube.up[2][0] = cube.left[2][2];
  cube.up[2][1] = cube.left[1][2];
  cube.up[2][2] = cube.left[0][2];
  cube.left[0][2] = cube.down[0][0];
  cube.left[1][2] = cube.down[0][1];
  cube.left[2][2] = cube.down[0][2];
  cube.down[0][0] = cube.right[2][0];
  cube.down[0][1] = cube.right[1][0];
  cube.down[0][2] = cube.right[0][0];
  cube.right[0][0] = tmpUp[2];
  cube.right[1][0] = tmpUp[1];
  cube.right[2][0] = tmpUp[0];
  cube.front[0][0] = tmpFront[2][0];
  cube.front[0][1] = tmpFront[1][0];
  cube.front[0][2] = tmpFront[0][0];
  cube.front[1][0] = tmpFront[2][1];
  cube.front[1][2] = tmpFront[0][1];
  cube.front[2][0] = tmpFront[2][2];
  cube.front[2][1] = tmpFront[1][2];
  cube.front[2][2] = tmpFront[0][2];
  return cube;
};

// 큐브의 앞부분을 반시계방향으로 회전하는 함수
const frontReverseMove = cube => {
  let tmpUp = cube.up[2].slice();
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  cube.up[2][0] = cube.right[0][0];
  cube.up[2][1] = cube.right[1][0];
  cube.up[2][2] = cube.right[2][0];
  cube.right[0][0] = cube.down[0][2];
  cube.right[1][0] = cube.down[0][1];
  cube.right[2][0] = cube.down[0][0];
  cube.down[0][0] = cube.left[0][2];
  cube.down[0][1] = cube.left[1][2];
  cube.down[0][2] = cube.left[2][2];
  cube.left[0][2] = tmpUp[2];
  cube.left[1][2] = tmpUp[1];
  cube.left[2][2] = tmpUp[0];
  cube.front[0][0] = tmpFront[0][2];
  cube.front[0][1] = tmpFront[1][2];
  cube.front[0][2] = tmpFront[2][2];
  cube.front[1][0] = tmpFront[0][1];
  cube.front[1][2] = tmpFront[2][1];
  cube.front[2][0] = tmpFront[0][0];
  cube.front[2][1] = tmpFront[1][0];
  cube.front[2][2] = tmpFront[2][0];
  return cube;
};

// 큐브의 가장 오른쪽 줄을 시계방향으로 회전하는 함수
const rightMove = cube => {
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  let tmpRight = [cube.right[0].slice(), cube.right[1].slice(), cube.right[2].slice()];
  cube.front[0][2] = cube.down[0][2];
  cube.front[1][2] = cube.down[1][2];
  cube.front[2][2] = cube.down[2][2];
  cube.down[0][2] = cube.back[2][0];
  cube.down[1][2] = cube.back[1][0];
  cube.down[2][2] = cube.back[0][0];
  cube.back[0][0] = cube.up[2][2];
  cube.back[1][0] = cube.up[1][2];
  cube.back[2][0] = cube.up[0][2];
  cube.up[0][2] = tmpFront[0][2];
  cube.up[1][2] = tmpFront[1][2];
  cube.up[2][2] = tmpFront[2][2];
  cube.right[0][0] = tmpRight[2][0];
  cube.right[0][1] = tmpRight[1][0];
  cube.right[0][2] = tmpRight[0][0];
  cube.right[1][0] = tmpRight[2][1];
  cube.right[1][2] = tmpRight[0][1];
  cube.right[2][0] = tmpRight[2][2];
  cube.right[2][1] = tmpRight[1][2];
  cube.right[2][2] = tmpRight[0][2];
  return cube;
};

// 큐브의 가장 오른쪽 줄을 반시계방향으로 회전하는 함수
const rightReverseMove = cube => {
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  let tmpRight = [cube.right[0].slice(), cube.right[1].slice(), cube.right[2].slice()];
  cube.front[0][2] = cube.up[0][2];
  cube.front[1][2] = cube.up[1][2];
  cube.front[2][2] = cube.up[2][2];
  cube.up[0][2] = cube.back[2][0];
  cube.up[1][2] = cube.back[1][0];
  cube.up[2][2] = cube.back[0][0];
  cube.back[0][0] = cube.down[2][2];
  cube.back[1][0] = cube.down[1][2];
  cube.back[2][0] = cube.down[0][2];
  cube.down[0][2] = tmpFront[0][2];
  cube.down[1][2] = tmpFront[1][2];
  cube.down[2][2] = tmpFront[2][2];
  cube.right[0][0] = tmpRight[0][2];
  cube.right[0][1] = tmpRight[1][2];
  cube.right[0][2] = tmpRight[2][2];
  cube.right[1][0] = tmpRight[0][1];
  cube.right[1][2] = tmpRight[2][1];
  cube.right[2][0] = tmpRight[0][0];
  cube.right[2][1] = tmpRight[1][0];
  cube.right[2][2] = tmpRight[2][0];
  return cube;
};

// 큐브의 윗부분을 시계방향으로 회전하는 함수
const upMove = cube => {
  let tmpFront = cube.front[0].slice();
  let tmpUp = [cube.up[0].slice(), cube.up[1].slice(), cube.up[2].slice()];
  cube.front[0] = cube.right[0];
  cube.right[0] = cube.back[0];
  cube.back[0] = cube.left[0];
  cube.left[0] = tmpFront;
  cube.up[0][0] = tmpUp[2][0];
  cube.up[0][1] = tmpUp[1][0];
  cube.up[0][2] = tmpUp[0][0];
  cube.up[1][0] = tmpUp[2][1];
  cube.up[1][2] = tmpUp[0][1];
  cube.up[2][0] = tmpUp[2][2];
  cube.up[2][1] = tmpUp[1][2];
  cube.up[2][2] = tmpUp[0][2];
  return cube;
};

// 큐브의 윗부분을 반시계방향으로 회전하는 함수
const upReverseMove = cube => {
  let tmpFront = cube.front[0].slice();
  let tmpUp = [cube.up[0].slice(), cube.up[1].slice(), cube.up[2].slice()];
  cube.front[0] = cube.left[0];
  cube.left[0] = cube.back[0];
  cube.back[0] = cube.right[0];
  cube.right[0] = tmpFront;
  cube.up[0][0] = tmpUp[0][2];
  cube.up[0][1] = tmpUp[1][2];
  cube.up[0][2] = tmpUp[2][2];
  cube.up[1][0] = tmpUp[0][1];
  cube.up[1][2] = tmpUp[2][1];
  cube.up[2][0] = tmpUp[0][0];
  cube.up[2][1] = tmpUp[1][0];
  cube.up[2][2] = tmpUp[2][0];
  return cube;
};

// 큐브의 뒷부분을 시계방향으로 회전하는 함수
const backMove = cube => {
  let tmpUp = cube.up[0].slice();
  let tmpBack = [cube.back[0].slice(), cube.back[1].slice(), cube.back[2].slice()];
  cube.up[0][0] = cube.right[0][2];
  cube.up[0][1] = cube.right[1][2];
  cube.up[0][2] = cube.right[2][2];
  cube.right[0][2] = cube.down[2][0];
  cube.right[1][2] = cube.down[2][1];
  cube.right[2][2] = cube.down[2][2];
  cube.down[2][0] = cube.left[0][0];
  cube.down[2][1] = cube.left[1][0];
  cube.down[2][2] = cube.left[2][0];
  cube.left[0][0] = tmpUp[0];
  cube.left[1][0] = tmpUp[1];
  cube.left[2][0] = tmpUp[2];
  cube.back[0][0] = tmpBack[2][0];
  cube.back[0][1] = tmpBack[1][0];
  cube.back[0][2] = tmpBack[0][0];
  cube.back[1][0] = tmpBack[2][1];
  cube.back[1][2] = tmpBack[0][1];
  cube.back[2][0] = tmpBack[2][2];
  cube.back[2][1] = tmpBack[1][2];
  cube.back[2][2] = tmpBack[0][2];
  return cube;
};

// 큐브의 뒷부분을 반시계방향으로 회전하는 함수
const backReverseMove = cube => {
  let tmpUp = cube.up[0].slice();
  let tmpBack = [cube.back[0].slice(), cube.back[1].slice(), cube.back[2].slice()];
  cube.up[0][0] = cube.left[2][0];
  cube.up[0][1] = cube.left[1][0];
  cube.up[0][2] = cube.left[0][0];
  cube.left[0][0] = cube.down[2][0];
  cube.left[1][0] = cube.down[2][1];
  cube.left[2][0] = cube.down[2][2];
  cube.down[2][0] = cube.right[0][2];
  cube.down[2][1] = cube.right[1][2];
  cube.down[2][2] = cube.right[2][2];
  cube.right[0][2] = tmpUp[0];
  cube.right[1][2] = tmpUp[1];
  cube.right[2][2] = tmpUp[2];
  cube.back[0][0] = tmpBack[0][2];
  cube.back[0][1] = tmpBack[1][2];
  cube.back[0][2] = tmpBack[2][2];
  cube.back[1][0] = tmpBack[0][1];
  cube.back[1][2] = tmpBack[2][1];
  cube.back[2][0] = tmpBack[0][0];
  cube.back[2][1] = tmpBack[1][0];
  cube.back[2][2] = tmpBack[2][0];
  return cube;
};

// 큐브의 가장 왼쪽 줄을 시계방향으로 회전하는 함수
const leftMove = cube => {
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  let tmpLeft = [cube.left[0].slice(), cube.left[1].slice(), cube.left[2].slice()];
  cube.front[0][0] = cube.down[0][0];
  cube.front[1][0] = cube.down[1][0];
  cube.front[2][0] = cube.down[2][0];
  cube.down[0][0] = cube.back[2][2];
  cube.down[1][0] = cube.back[1][2];
  cube.down[2][0] = cube.back[0][2];
  cube.back[0][2] = cube.up[2][0];
  cube.back[1][2] = cube.up[1][0];
  cube.back[2][2] = cube.up[0][0];
  cube.up[0][0] = tmpFront[0][0];
  cube.up[1][0] = tmpFront[1][0];
  cube.up[2][0] = tmpFront[2][0];
  cube.left[0][0] = tmpLeft[2][0];
  cube.left[0][1] = tmpLeft[1][0];
  cube.left[0][2] = tmpLeft[0][0];
  cube.left[1][0] = tmpLeft[2][1];
  cube.left[1][2] = tmpLeft[0][1];
  cube.left[2][0] = tmpLeft[2][2];
  cube.left[2][1] = tmpLeft[1][2];
  cube.left[2][2] = tmpLeft[0][2];
  return cube;
};

// 큐브의 가장 왼쪽 줄을 반시계방향으로 회전하는 함수
const leftReverseMove = cube => {
  let tmpFront = [cube.front[0].slice(), cube.front[1].slice(), cube.front[2].slice()];
  let tmpLeft = [cube.left[0].slice(), cube.left[1].slice(), cube.left[2].slice()];
  cube.front[0][0] = cube.up[0][0];
  cube.front[1][0] = cube.up[1][0];
  cube.front[2][0] = cube.up[2][0];
  cube.up[0][0] = cube.back[2][2];
  cube.up[1][0] = cube.back[1][2];
  cube.up[2][0] = cube.back[0][2];
  cube.back[0][2] = cube.down[2][0];
  cube.back[1][2] = cube.down[1][0];
  cube.back[2][2] = cube.down[0][0];
  cube.down[0][0] = tmpFront[0][0];
  cube.down[1][0] = tmpFront[1][0];
  cube.down[2][0] = tmpFront[2][0];
  cube.left[0][0] = tmpLeft[0][2];
  cube.left[0][1] = tmpLeft[1][2];
  cube.left[0][2] = tmpLeft[2][2];
  cube.left[1][0] = tmpLeft[0][1];
  cube.left[1][2] = tmpLeft[2][1];
  cube.left[2][0] = tmpLeft[0][0];
  cube.left[2][1] = tmpLeft[1][0];
  cube.left[2][2] = tmpLeft[2][0];
  return cube;
};

// 큐브의 아랫부분을 시계방향으로 회전하는 함수
const downMove = cube => {
  let tmpFront = cube.front[2].slice();
  let tmpDown = [cube.down[0].slice(), cube.down[1].slice(), cube.down[2].slice()];
  cube.front[2] = cube.right[2];
  cube.right[2] = cube.back[2];
  cube.back[2] = cube.left[2];
  cube.left[2] = tmpFront;
  cube.down[0][0] = tmpDown[2][0];
  cube.down[0][1] = tmpDown[1][0];
  cube.down[0][2] = tmpDown[0][0];
  cube.down[1][0] = tmpDown[2][1];
  cube.down[1][2] = tmpDown[0][1];
  cube.down[2][0] = tmpDown[2][2];
  cube.down[2][1] = tmpDown[1][2];
  cube.down[2][2] = tmpDown[0][2];
  return cube;
};

// 큐브의 아랫부분을 반시계방향으로 회전하는 함수
const downReverseMove = cube => {
  let tmpFront = cube.front[0].slice();
  let tmpDown = [cube.down[0].slice(), cube.down[1].slice(), cube.down[2].slice()];
  cube.front[2] = cube.left[2];
  cube.left[2] = cube.back[2];
  cube.back[2] = cube.right[2];
  cube.right[2] = tmpFront;
  cube.down[0][0] = tmpDown[0][2];
  cube.down[0][1] = tmpDown[1][2];
  cube.down[0][2] = tmpDown[2][2];
  cube.down[1][0] = tmpDown[0][1];
  cube.down[1][2] = tmpDown[2][1];
  cube.down[2][0] = tmpDown[0][0];
  cube.down[2][1] = tmpDown[1][0];
  cube.down[2][2] = tmpDown[2][0];
  return cube;
};

// 종료 처리하는 함수
const quit = cube => {
  log('이용해주셔서 감사합니다. 뚜뚜뚜.');
  process.exit();
};

// cube의 생성 및 game을 시작하는 초기화 목적의 함수
const init = () => {
  const cube = new Cube();
  gameStart(cube);
}

init();