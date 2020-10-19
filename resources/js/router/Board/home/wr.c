int func(int num){
    int count = 0;   // 1을 카운트할 변수
    for(int i = 0; num > 0; i++){
        if(num % 10 == 1){
            count++;    
        }
        num = num / 10;
    }
}


//num이 100181이면 num도 100181
//for문은 num가 0보다 클때만 반복

//1번째 for
// 100181 % 10 = 1
// count++ 실행
// num/10을 통해 10018이 됨
// count = 1

//2번째 for 
// 10018 % 10 = 8
// num/10을 통해 1001이 됨
// count = 1

//3번째 for
// 1001 % 10 = 1
// count++ 실행
// num/10을 통해 100이 됨
// count = 2

// ...6번째 for
// 1 % 10 = 1
// count++ 실행
// num/10을 통해 0이 됨
// count = 3



