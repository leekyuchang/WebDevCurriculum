# Quest 05. Playing with DOM

## Topics
* DOM API (Document Object Model)
  * HTMl문서를 구성하는 요소에 접근하기 위한 API
* `document` 객체
  * HTML의 Tag ex) `<body>`, `<a>`등등
* DOM Method
  * `document.getElementById()` - HTML요소 중 ID를 찾음
  * `document.querySelector()` - CSS에서 사용하는 tag Selector(. #)로 태그를 찾음, Internet Explorer 8, FireFox 3.5 이상의 브라우저에서 지원
  * `document.querySelectorAll()` - `document.querySelector()`와 다르게 해당하는 모든 태그를 찾음
  * 기타 DOM 조작을 위한 함수와 속성들
* Closure
    * 클로져는 그 함수의 지역 변수가 아닌 것들을 위한 참조 환경을 함께 가지고 있는 함수 이다. 
    * 클로저는 외부함수에 포함하고 있는 변수에 접근할 수 있는 내부함수
    * 외부함수가 리턴된 이후에도 여전히 내부함수가 외부함수의 변수에 접근

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  * `document.getElementsByClassName(classname)`
  * IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    * `document.querySelectorAll(.classname)`를 사용 한다.
* 자바스크립트의 Closure는 무엇이며, 어떤 식으로 활용할 수 있나요?

## Quest
* Skeleton 디렉토리에 주어진 HTML을 조작하는 스크립트를 완성해 보세요.
  * 첫째 줄에 있는 사각형의 박스들을 클릭할 때마다 배경색이 노란색->흰색으로 바뀌어야 합니다.
  * 둘째 줄에 있는 사각형의 박스들을 클릭할 때마다 `enabled`라는 이름의 CSS Class가 클릭된 DOM 노드에 추가되거나 제거되어야 합니다.
* 구현에는 여러 가지 방법이 있으나, 다른 곳은 건드리지 않고 TODO 부분만 고치는 방향으로 하시는 것을 권장해 드립니다.
