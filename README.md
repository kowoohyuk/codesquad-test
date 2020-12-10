# codesquad-test

2021 마스터즈 코스 지원을 위한 테스트용 저장소  
Node.js를 사용하여 값을 입력받는다.

## step-1

1. 값을 입력한다.
2. 입력된 값을 split을 사용하여 word, count, direction에 할당한다.  
3. split을 통해 count에 할당한 값의 데이터 타입은 String이므로 Number로 형변환한다.
4. count의 범위가 -99 ~ 99지만 입력받은 word의 길이보다 클 경우 불필요한 연산이 발생하므로 word의 길이 이하를 갖도록 나머지 연산 처리한다.
5. count가 음수인 경우 양수로 전환하며, reverseDirection 함수를 호출하여 direction의 값을 재할당한다.
6. moveWord 함수를 호출하여 이동처리를 진행한다.
7. 출력