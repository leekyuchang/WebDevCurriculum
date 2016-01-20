#HTML 문서의 구조

```html
<!DOCTYPE html>

<html>
	<head>
		<title>title name</title>
	</head>
	<body>
		

	</body>
</html>
```

#HTML 문서의 엘리먼트

Semantic elements은 웹페이지의 각각 다른 parts를 정의한다.

* `<article>`
	* 독립적이고 혼자사용되는 content에 사용(self-contained block of related elements)
	* 주로 블로그 글 뉴스기사에 사용

* `<aside>`
	* sidebar처럼 부차적인 내용을 나타내는 태그
	* article태그 안에 사용가능

* `<figure>`
	* 신문의 사진처럼 사진과 사진의 caption을 묶을때 사용하는 태그

* `<figcaption>`
	* figure의 주석을 나타내는 태그

* `<footer>`
	* document나 section의 footer를 나타내는 태그
	* 주로 copyright, link, contact info등 아랫단..

* `<header>`
	* document나 section의 header를 나타내는 태그
	* content의 intro

* `<nav>`
	* navigation의 link들의 그룹을 표현할때 사용하는 태그

* `<section>`
	* 서로 관계있는 content들을 그룹핑하여 나눌때 사용(block of related elements).
	* 예로 홈페이지의 introduction, content, and contact information등을 분리

* 그외
	* `<main>`
	* `<mark>`
	* `<summary>`
	* `<time>`
	* `<details>`

		
![semantic elments parts](http://www.w3schools.com/html/img_sem_elements.gif)


####Block-level elements vs Inline elements
* Block-level elements
	* 항상 새로운 line에서 시작하며 width는 100%를 차지하는 덩어리 element
	* `<div>`
	* `<h1> - <h6>`
	* `<p>`
	* `<form>`
	* `<ul>`, `<ol>`
	
* Inline elements
	* 새로운 line에서 시작하지 않으며 한 line에 여러개 사용 가능
	* `<span>`
	* `<a>`
	* `<img>`
	* `<input>`
	* `<button>`
	* `<select>`

#Checklist

* HTML 4.x 이후의 HTML 표준의 변천사는 어떻게 되나요?
    * 1997년 HTML 4.0 (W3C)
    * 1999년 HTML 4.0.1 (W3C)
    * 2000년 XHTML 1.0 (W3C), DOM level 2
    * WHATWG 결성 XHTML의 문제 제기, DOM level 3
    * 2009년 XHTML포기 HTML 5.0, CSS3
* MS와 IE는 왜 역사의 죄인이 되었을까요?
    * IE6 - 95%
    * MS는 IE에 액트브X를 개발하여 브라우저 사용자에게 여러 플러그인들을 내려받아 설치해야하는 불편을 제공 
* `<section>`과 `<div>`, `<header>`, `<footer>`, `<article>` 엘리먼트의 차이점
    * `<section>`: 서로 관계있는 content들을 그룹핑할때 사용, section 하위에 section사용 가능 
    * `<div>`: 컴텐츠를 블록으로 구분지을때 일반적으로 많이 사용
    * `<header>`: content의 header를 나타낼때 사용
    * `<footer>`: content의 아랫단을 나타낼때 사용 주로 페이지의 intro, contact등의 정보를 표현
    * `<article>`: 독립적이고 혼자 사용되는 content들을 표현할때 사용, section과 다름
    
* 블럭 레벨 엘리먼트와 인라인 엘리먼트의 차이점
    * 블럭 레벨 엘리먼트: 웹페이지의 컨텐츠들을 블럭으로 구분되는 엘리먼트, 항상 새로운 line에서 시작
    * 인라인 엘리먼트: 텍스트안에 사용되며 새로운 라인으로 시작하지 않는다.