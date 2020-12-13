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

// cube의 생성 및 game을 시작하는 초기화 목적의 함수
const init = () => {
  const cube = new Cube();
  printCube(cube);
}

init();