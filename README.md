# codesquad-test

2021 마스터즈 코스 지원을 위한 테스트용 저장소  
Node.js를 사용하여 값을 입력받습니다.

## step-1

1. 입력된 값을 split을 사용하여 변수 __word, count, direction__ 에 할당합니다.
2. split을 통해 변수 __count__ 에 할당한 값의 데이터 타입은 String이므로 Number로 형변환 합니다.
3. 변수 __count__ 의 범위가 -99 ~ 99지만 입력받은 __word__ 의 길이보다 클 경우 불필요한 연산이 발생하므로 __word__ 의 길이 이하를 갖도록 나머지 연산 처리합니다.
4. 변수 __count__ 가 음수인 경우 __reverseDirection()__ 를 호출하여 방향을 반대로 재할당합니다.  이후 __count__ 를 양수로 만들어줍니다.
5. __moveWord()__ 를 호출하여 문자열을 이동합니다.
