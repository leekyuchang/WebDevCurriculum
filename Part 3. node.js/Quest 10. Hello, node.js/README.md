# Quest 10. Hello, node.js


## Introduction
* 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics
* 꼭 알아야 하는 것들
  * node.js
  * npm
  * `require()` 함수
  * module.exports

## Resources
* [Node.js 노드제이에스 프로그래밍](http://www.yes24.com/24/Goods/6271069?Acode=101), 에이콘출판사
* [모던 웹을 위한 Node.js 프로그래밍](http://www.yes24.com/24/Goods/10991708?Acode=101), 한빛미디어

## Checklist
* node.js는 어떤 식으로 동작하나요? ![Node.js의 동작방식](http://cfile26.uf.tistory.com/image/22796E4B54C5BF18122068)
    - 노드는 V8엔진 기반으로 자바스크립트 사용
    - 노드는 이벤트 기반 프로그래밍
        - 싱글스레드 기반의 Event Loop가 돌면서 순차적으로 요청을 처리
    - 비동기 IO방식
        - 어떠한 요청이 되었을때 요청 완료와 상관없이 return을 보내고 요청이 완료되면 callback함수를 호출하는 형태
    - Non blocking IO방식
        -  아떠한 요청이 있을때 요청이 완료 될때 까지 기다리지 않고 다른 요청을 수행하는 방식
    - Node.js 방식 정리: (이벤트 기반의 비동기/Non blocking I/O방식) I/o 작업과 같이 오랜 시간을 필요로 하는 작업은 스레드 풀로 보내서 작업을 진행, 작업끝난 이벤트를 다시 싱글 스레드가 받아서 그 이벤트를 실행하는 방식

  * `require()` 함수는 어떻게 쓰는 것인가요?
    - `require()`: 모듈을 로딩한다. (return은 module.exports의 객체)
    - ex) `require(./foo.js)`: 파일의 같은 디렉토리에 있는 foo.js파일을 로딩한다.
    - ex) `require(http)`: Node 코어에 있는 http모듈을 불러온다.
  * `module.exports`와 `exports` 변수는 어떻게 다른가요?
    - module.exports와 exports는 어떠한 모듈을 선언할때 사용. call by reference로만 선언해야 한다. ex) module.exports.foo = "foo"
    - module.exports와 exports는 같은 객체를 바라본다. 그러나 return은 module.exports의 객체.
    - module.exports와 exports를 같이 사용하는 경우를 줄이고, 같이 사용한다면 call by reference 를 꼭 지키기. [module.exports와 exports](http://nodeqa.com/nodejs_ref/7)
* npm이 무엇인가요?
    - npm(Node Packaged Modules)의 약자로 node의 외부 모듈을 쉽게 관리(설치, 삭제) 할수 패키지 매니져.
  * npm 패키지를 `-g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?
    - Global: 터미널에서 모듈을 사용할 때 global로 설치
    - Local: 현재 디렉토리에 모듈을 설치, 현재 프로젝트 내에서 require로 불러올 모듈들은 local로 설치


## Quest
* node.js를 PC에 설치해 보세요. 버전은 5.x 버전이 적당합니다!
* 커맨드 라인에서 다음과 같은 명령을 쳤을 때 위 파일들의 내용이 나타나도록 해 보세요.
  * `$ node app.js 1`
    *
        ```
        {
            name: 'Config1',
            var1: 'aaa',
            var2: [1, 2, 3, 4]
        }
        ```

  * `$ node app.js 2`
    *
        ```
        {
            name: 'Config2',
            var1: 'bbb',
            var2: [2, 3, 4, 5]
        }
        ```
* 단, 주어진 스켈레톤 코드에서 app.js는 변경할 수 없습니다.
