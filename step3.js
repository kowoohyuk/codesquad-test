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
    // 큐브 이동처리
  }
  if(stat) {
    play(cube);
  } else {
    quit(cube);
  }
}

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