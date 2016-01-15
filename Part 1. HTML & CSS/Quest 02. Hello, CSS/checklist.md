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
	 * static
	 * relative
	 * fixed
	 * absolute
  * `left`/`top`
  * `display`
	  * `display`는 Block-level, Inline Elements에 사용한다.
	  * `display: none;`
	  * `display: inline;` - li의 dot를 없애준다.
	  * `display: block;`
  * `width`/`height`
	  * 가로/세로를 표현
	  * `max-width`, `max-height`, `min-width`, `min-height`
  * `display: flex;`
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
* 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?
* 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?
* 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?
* `float` 속성은 왜 좋지 않을까요?
* Flexbox(Flexible box)를 사용할 때의 한계점은 무엇인가요?

## Quest
* 아래의 그림들은 모두 전체적으로 창의 크기에 꽉 차야 하며, 창의 크기가 일정 크기 이상일 경우 전체 창 크기가 어떻게 바뀌되더라도 그림에 맞게 각 박스의 크기가 조절되어야 합니다.
* **주의사항**
  * HTML 파일은 수정하면 안됩니다.
  * `float` 속성은 사용하면 안됩니다.
* [이 그림](layout1.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout1.html` 파일에 링크된 `skeletons/layout1.css` 파일을 수정하면 됩니다.
* [이 그림](layout2.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout2.html` 파일에 링크된 `skeletons/layout2.css` 파일을 수정하면 됩니다.
* [이 그림](layout3.png)을 flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout3.html` 파일에 링크된 `skeletons/layout3.css` 파일을 수정하면 됩니다.
* 위와 같은 그림을 flexbox를 써서 구현해 보세요. `skeletons/layout4.html` 파일에 링크된 `skeletons/layout4.css` 파일을 수정하면 됩니다.
