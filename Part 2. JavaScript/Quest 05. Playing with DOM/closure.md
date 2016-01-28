# Closure

## What is a Closure?
* Closure = function(returned by another function) + outer context
* 클로저는 현재의 유효범위를 넘어 scope chain으로 연결되어 있는 객체,변수등의 참조를 발생시키는 것
* 클로저는 외부함수에 포함하고 있는 변수에 접근할 수 있는 내부함수
* 외부함수가 리턴된 이후에도 여전히 내부함수가 외부함수의 변수에 접근
* Closure 예제
```javascript
    var sequencer = function() {
        var s = 0;
        return function() {
            return ++s;
        }
    };
    var seq = sequencer();
    seq(); // 1
    seq(); // 2
    seq(); // 3
```
 - 내부 함수는 자신이 선언된 환경(sequencer)에 연결하게 되며 변수s에 직접 접근(참조)한다.(복사하는 개념이 아님)
* Closure 예제2
```javascript
    function outerFunc(){
        var a= 0;
        return {
            innerFunc1 : function(){
                a+=1;
                console.log("a :"+a);
            },
            innerFunc2 : function(){
                a+=2;
                console.log("a :"+a);
            }
        };
    }
    var out = outerFunc();
    var out2 = outerFunc();
    out.innerFunc1();
    out.innerFunc2();
    out2.innerFunc1();
    out2.innerFunc2();
    /*
    a = 1
    a = 3
    a = 1
    a = 3
    */
```
 - 보기엔 같은 내부 변수 a로 보이지만 서로 다른 객체로 서로 다른 외 변수를 참조합니다.
* Closure 예제3
```javascript
    function makeAdder(x) {
      return function(y) {
        return x + y;
      };
    }
    var add5 = makeAdder(5);//함수호출종료
    var add10 = makeAdder(10);//함수호출종료
    print(add5(2));  // 7
    print(add10(2)); // 12
```

## Resources
* [클로저 사용시 주의할점](http://blog.javarouka.me/2012/01/closure.html#uds-search-results)
*

## What is Hoisting?
```javascript
    function showName() {
         console.log("First Name : " + name);
         var name = "Ford";
         console.log("Last Name : " + name);
    }
    showName();
    // First Name : undefined
    // Last Name : Ford
    // First Name이 undefined인 이유는 지역변수 name이 호이스트 되었기 때문입니다.
```
 - 위의 코드는 자바스크립트 엔진에 의해 다음과 같이 해석된다.

```javascript
    function showName() {
         var name; // name 변수는 호이스트 되었습니다. 할당은 이후에 발생하기 때문에, 이 시점에 name의 값은 undefined 입니다.
         console.log("First name : " + name); // First Name : undefined
         name = "Ford"; // name에 값이 할당 되었습니다.
         console.log("Last Name : " + name); // Last Name : Ford
    }
```
