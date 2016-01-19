# Quest 03. Publishing CSS


## Introduction
* 이번 퀘스트에서는 CSS를 이용해 실제 웹 페이지를 모사해 퍼블리싱하는 것에 도전해볼 예정입니다.

## Topics
* 퍼블리싱을 위해 몇 가지 중요한 속성들
  * `font-*`
    * `font-family` - 콤마로 여러 글꼴을 지정 첫번째 글꼴이 없으면 순차적으로 글꼴 적용, 마지막 값은 sans-serif, serif, monospace과 같은 스타일 지정
    * `font-stretch` - 글꼴의 폭 지정 (normal, ultra-condensed, extra-condensed)
    * `font-size` - 글꼴의 크기 지정 (%, px, em 등)
    * `font-style` - 글꼴의 모양 지정 (normal, italic, oblique)
  * `text-*`
    * `text-align` - 글자 위치 조정 (center, left, right, justify)
    * `text-decoration` - 글자 밑, 위, 중앙의 데코 (none, underline, overline)
    * `text-transform` - 글자 대문자, 소문자 표현 (uppercase, lowcase, capitalize)
    * `text-indent` - 글자 들여쓰기
  * `box-sizing`
    * `box-sizing: content-box;` - 너비와 높이를 입력 했을 때 그에 관한 사이즈를 선이나 안의 여백 부분을 포함시키지 않은 순수한 내용 부분만 사이즈가 적용
    * `box-sizing: border-box;` - 안의 여백과 선을 포함시켜 사이즈를 적용
    * `box-sizing: padding-box;` - 선을 제외한 안의 여백까지 사이즈를 적용
  * `:hover`/`:active`
    * selector에다 사용 (a:hover {})
    * `:hover` - 마우스를 올려놨을 때(클릭전) 동작
    * `:active` - 마우스로 클릭했을 때 동작
## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Checklist
* CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?

## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](github.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**
* 등장하는 아이콘은 그림파일이 아닌 GitHub에서 만든 [Octicons](https://octicons.github.com/)라는 폰트 파일입니다. 해당 폰트 파일은 폴더에 같이 있으니 링크하여 쓰시면 됩니다.
  * 특정 폰트로 임의의 유니코드 문자를 출력하려면 어떻게 해야 할까요?
