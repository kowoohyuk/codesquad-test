# codesquad-test

2021 마스터즈 코스 지원을 위한 테스트용 저장소  
Node.js를 사용하여 값을 입력받습니다.

링크  
[step-1](https://github.com/kowoohyuk/codesquad-test/tree/step-1)  
[step-2](https://github.com/kowoohyuk/codesquad-test/tree/step-2)  
[step-3](https://github.com/kowoohyuk/codesquad-test/tree/step-3)  

## step-1

1. 입력된 값을 split을 사용하여 변수 __word, count, direction__ 에 할당합니다.
2. split을 통해 변수 __count__ 에 할당한 값의 데이터 타입은 String이므로 Number로 형변환 합니다.
3. 변수 __count__ 의 범위가 -99 ~ 99지만 입력받은 __word__ 의 길이보다 클 경우 불필요한 연산이 발생하므로 __word__ 의 길이 이하를 갖도록 나머지 연산 처리합니다.
4. 변수 __count__ 가 음수인 경우 __reverseDirection()__ 를 호출하여 방향을 반대로 재할당합니다.  이후 __count__ 를 양수로 만들어줍니다.
5. __moveWord()__ 를 호출하여 문자열을 이동합니다.

## step-2

1. __init()__ 을 호출하여 생성자 함수 __Cube__ 로 정의된 __cube__ 객체를 생성합니다.
2. 생성된 __cube__ 를 인자로 __gameStart()__ 를 호출합니다.
3. __printState()__ 를 호출하여 현재 큐브의 상태를 출력합니다.
4. __play()__ 를 호출합니다.
5. __enterText()__ 를 통해 사용자로부터 값을 입력받습니다.
6. 입력받은 값을 스플릿하여 배열로 만든 후 순서대로 방문합니다.
  1. 문자가 '/help'일 때, __printHelp()__ 를 호출합니다.
  2. 문자가 'Q'일 때, 변수 __stat__ 에 __false__ 를 할당하고 반복문을 종료합니다.
  3. '/help' 또는 'Q'가 아닌 경우 __moveCube()__ 를 호출합니다.
7. 변수 __stat__ 을 반환합니다.
8. __stat__ === __true__ 인 경우 __quit()__ 를 호출합니다.
9. __stat__ !== __true__ 인 경우 4번 __play() 를 호출합니다__ 로 돌아갑니다.

## step-3

1. __init()__ 을 호출하여 생성자 함수 __Cube__ 로 정의된 __cube__ 객체를 생성합니다.
2. 생성된 __cube__ 를 인자로 __gameStart()__ 를 호출합니다.
3. __printCube()__ 를 호출하여 현재 큐브의 상태를 출력합니다.
4. __play()__ 를 호출하여 사용자로부터 값을 입력받습니다.
5. 입력받은 값을 스플릿하여 배열로 만든 후 순서대로 방문합니다.
  1. 문자가 'Q'일 때, 변수 __stat__ 에 __false__ 를 할당하고 반복문을 종료합니다.
  2. 문자가 'Q'가 아닌 경우 __handleCube()__ 를 호출합니다.
6. __handleCube__ 가 호출된 경우
  1. 해당하는 방향으로 __cube__ 를 이동합니다.
  2. __cube__ 를 반환합니다.
7. __stat__ === __true__ 인 경우 __quit()__ 를 호출합니다.
8. __stat__ !== __true__ 인 경우 4번 __play() 를 호출합니다__ 로 돌아갑니다.
