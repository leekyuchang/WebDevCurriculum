# Quest 02. Hello, CSS
<br>

##CSS 기초 문법
* CSS Syntax
	* ```CSS
		selector { 
			property : value;
		}```
	* class .
	* id #

##CSS를 HTML에 적용하는 세 가지 방법
* Inline Style 
  * `<body style="background-color: orange;">`
* Internal Styles 
  * `<style>` `</style>` 
* Link 
  * `<link rel="stylesheet" href="...">`

##레이아웃을 위해 몇 가지 중요한 속성들
  * `position`
    * static - default, 위치를 지정하지 않은것
    * relative - property를 지정하지 않는한 static과 동일, top left등 property를 주어 위치조
    * fixed - 인터넷 창크기, 스크롤이위치가 변하더라도 그 위치가 고정된다.
    * absolute - 부모element의 위치를 기준으로 위치가 fix된다. 
  * `left`/`top`
  * `display`
	  * `display`는 Block-level, Inline Elements에 사용한다.
	  * `display: none;` - 해당 요소는 보여지지 않고 사라진다.
	  * `display: inline;` - 해당 요소의 줄바꿈이 되지않는다.
      * `display: block;` - 해당요소의 줄의 가로폭을 최대로 한다.(자동 줄바꿈)
      
  * `width`/`height`
	  * 가로/세로를 표현
	  * `max-width`, `max-height`, `min-width`, `min-height`
  * `display: flex;`
	  * CSS3의 flexbox로 block레벨의 flex container를 생성 (`display: inline-flex`inline레벨의 flex container를 생성)
	  * flexbox의 콘텐츠는 자유로운 정렬, 순서 지정, 크기와 위치 자동조정 가능.
      * `display: flex`를 하게되면 그요소가 flex container(부모요소)가 된다. 자식요소들의 배열 지정가능.

  * CSS Box Model
	  * margin, border, padding, content
![CSS Boxmodel](http://postfiles3.naver.net/20151113_2/kyuchang90_1447406426196U5jn8_PNG/%BD%BA%C5%A9%B8%B0%BC%A6_2015-11-13_%BF%C0%C8%C4_6.19.20.png?type=w2)

* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [W3sChools.com](http://www.w3schools.com/css/default.asp)
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?
	* Inline Style, Internal Styles
		* 장점: 간단하게 코드에 css를 사용할 수 있다.
		* 단점: 코드가 길어질 경우 복잡해진다. 
 	* Link 
	 	* 장점: 복잡한 프로젝트 진행시에 html파일과 css파일들을 나누어 관리를 쉽게 할 수 있다.
* 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?
	* 가장 마지막에 지정된 스타일을 우선적으로 적용한다.
		* 한개의 선택자에 여러개의 동일한 프로퍼티가 적용된경우 나중에 적은 프로퍼티가 적용
		* 같은 태그에 다중클래스를 주어 다른 프로퍼티를 적용한 경우 나중에 적은 클래스의 프로퍼티가  적용
	* CSS를 HTML에 적용하는 세 가지 방법중 Inline Style을 우선적으로 적용한다.
    * display: block !important;
* 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?
	* 부모element들 중 relative속성이 있는것을 찾아 그 위치를 기준으로 한다.
* 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?
	* 고정된 크기를 갖게 하려면 원하는 px값을 주어 크기를 고정시킨다. 가변적인 크기를 주려면 `width: auto;`, `height: auto;`로 한다. 
* `float` 속성은 왜 좋지 않을까요?
	* `float`는 block-line element의 정렬을 하기위한 속성이다. value는 left, right
    * float가 적용된 element는 html의 기본 구조에 제외되어 떠있는 레이어 처럼됨
	* `float`는 parent element의 높이가 child element에 상속되지 않는 문제가 있다.(parent element의 높이가 지정되지 않는 문제 해결법: overflow: hidden)
    * `float`속성을 부여하지 않은 객체는 박스 모델상 문제가 발생 될 수 있다.(해결법: overflow: hidden)
* Flexbox(Flexible box)를 사용할 때의 한계점은 무엇인가요?
    * flexbox는 브라우져마다 사용방법이 조금씩 다르며 지원하지 않는 버전도 있다.
        * display: -webkit-box;  /* chrome */
        * display: -moz-box;   /* firefox */
        * display: -ms-flexbox;   /* IE 10 */
        * display: -webkit-flex;   /* safari */
        * display: flex;   /* general */


## Quest
* 아래의 그림들은 모두 전체적으로 창의 크기에 꽉 차야 하며, 창의 크기가 일정 크기 이상일 경우 전체 창 크기가 어떻게 바뀌되더라도 그림에 맞게 각 박스의 크기가 조절되어야 합니다.
* **주의사항**
  * HTML 파일은 수정하면 안됩니다.
  * `float` 속성은 사용하면 안됩니다.
* [이 그림](layout1.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout1.html` 파일에 링크된 `skeletons/layout1.css` 파일을 수정하면 됩니다.
* [이 그림](layout2.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout2.html` 파일에 링크된 `skeletons/layout2.css` 파일을 수정하면 됩니다.
* [이 그림](layout3.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout3.html` 파일에 링크된 `skeletons/layout3.css` 파일을 수정하면 됩니다.
* 위와 같은 그림을 flexbox를 써서 구현해 보세요. `skeletons/layout4.html` 파일에 링크된 `skeletons/layout4.css` 파일을 수정하면 됩니다.
