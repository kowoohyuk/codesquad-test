const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const {log} = console;

// 방향을 변경하기 위한 함수
const reverseDirection = direction => {
  if (direction === 'L') {
    direction = 'R';
  } else {
    direction = 'L';
  }
  return direction;
}

// 글자를 이동하는 함수
const moveWord = (word, count, direction) => {
  if (direction === 'L') {
    word = word.slice(count) + word.slice(0, count);
  } else {
    const len = word.length;
    word = word.slice(len - count) + word.slice(0, len - count);
  }
  return word;
}

rl.on('line', line => {
  let [word, count, direction] = line.split(' ');
  count = +count;
  count %= word.length;
  if (count < 0) {
    direction = reverseDirection(direction);
    count *= -1;
  }
  word = moveWord(word, count, direction);
  log(word);
  rl.close();
}).on('close', process.exit);