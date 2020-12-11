// readline-sync 패키지가 필요합니다.
const rSync = require('readline-sync');

const {log} = console;

// 큐브 생성을 위한 생성자 함수
function Cube() {
  this.state = [
    ['R', 'R', 'W'],
    ['G', 'C', 'W'],
    ['G', 'B', 'B'],
  ];
}

// 게임을 시작하는 함수
const gameStart = cube => {
  printState(cube.state);
  log('도움말: /help \n게임을 시작합니다!\n');
  play(cube);
}

// 현재 큐브를 출력
const printState = cube => {
  cube.forEach(line => log(line.join(' ')));
  log();
};

// 게임의 종료 여부를 확인하는 함수
const play = cube => {
  continueStat = enterText(cube, rSync.question('CUBE> '));
  if(continueStat) {
    play(cube);
    return;
  }
  quit(cube);
}

// 입력을 받는 함수
const enterText = (cube, str) => {
  let stat = true;
  if(str === '\/help') {
    // /help 입력 시 사전에 정의한 help 텍스트를 안내
    printHelp();
  } else {
    log();
    for(let i = 0; i < str.length; i++) {
      let text = str[i];
      if(text === 'Q') {
        // Q가 확인되면 종료.
        stat = false;
        break;
      }
      if(i < str.length - 1 && str[i + 1] === '\'') {
        text = str.slice(i, ++i + 1);
      }
      moveCube(text, cube);
    }
  }
  return stat;
}

// 큐브를 움직이는 함수
const moveCube = (str, cube) => {
  log(str);
  let tmp;
  switch(str) {
    case 'U':
      cube.state[0] = [cube.state[0][1], cube.state[0][2], cube.state[0][0]];
      break;
    case 'U\'':
      cube.state[0] = [cube.state[0][2], cube.state[0][0], cube.state[0][1]];
      break;
    case 'R':
      tmp = cube.state[0][2];
      cube.state[0][2] = cube.state[1][2];
      cube.state[1][2] = cube.state[2][2];
      cube.state[2][2] = tmp;
      break;
    case 'R\'':
      tmp = cube.state[0][2];
      cube.state[0][2] = cube.state[2][2];
      cube.state[2][2] = cube.state[1][2];
      cube.state[1][2] = tmp;
      break;
    case 'L':
      tmp = cube.state[0][0];
      cube.state[0][0] = cube.state[2][0];
      cube.state[2][0] = cube.state[1][0];
      cube.state[1][0] = tmp;
      break;
    case 'L\'':
      tmp = cube.state[0][0];
      cube.state[0][0] = cube.state[1][0];
      cube.state[1][0] = cube.state[2][0];
      cube.state[2][0] = tmp;
      break;
    case 'B':
      cube.state[2] = [cube.state[2][1], cube.state[2][2], cube.state[2][0]];
      break;
    case 'B\'':
      cube.state[2] = [cube.state[2][1], cube.state[2][2], cube.state[2][0]];
      break;
    default:
      break;
  }
  printState(cube.state);
};

// help 텍스트를 출력하는 함수
const printHelp = () => {
  log(`
    U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
    U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
    R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
    R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
    L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
    L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
    B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
    B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
    Q  Bye~를 출력하고 프로그램을 종료한다.
  `);
}

// 종료 처리하는 함수
const quit = cube => {
  log('Bye~');
  process.exit();
};

// cube의 생성 및 game을 시작하는 초기화 목적의 함수
const init = () => {
  const cube = new Cube();
  gameStart(cube);
}

init();
