# Quest 16. Polymer


## Introduction
* 이번 퀘스트에서는 Polymer 프레임워크를 통해 현대적인 웹 클라이언트를 개발하는 법을 알아보겠습니다.

## Topics
* Web Component
* Polymer framework
* Shadow DOM
  * Shady DOM

## Resources
* [Polymer](https://www.polymer-project.org/1.0/)

## Checklist
* Polymer는 어떤 특징을 가지고 있는 웹 프레임워크인가요?
    * web components 패러다임
    * Custom Elements
    * HTML Templates
    * Shadow DOM
    * HTML Imports
* Shadow DOM이 무엇인가요?
    * 섀도 DOM은 DOM의 구조를 가지고 있으나 외부에는 노출되지 않은 DOM을 말하며 DOM의 구조를 캡슐화할 때 사용
    * Polymer 에서는 <template> 태그 안에 있는 부분이 shadow dom.
    * Dom끼리의 경계가 생기게 되며, 스타일의 캡슐화가 가능해진다.
* Web components가 무엇이고, 이 것을 사용할 때 어떤 점을 유의해야 하나요?
    * web components는 web application의 구성요로를 재사용할 수 있게 만든 컬렉션.
    * web application의 custom element가 될 부분들을 잘 정해야 한다.

## Quest
* Polymer를 통해 Quest 07에서 만들었던 바탕화면 시스템을 다시 한 번 만들어 보세요.
  * 어떤 Custom Element가 필요한지 생각해 보세요.
  * 각 클래스별로 해당하는 CSS와 자바스크립트를 어떤 식으로 붙여야 할까요?
  * Custom Element간에 데이터를 주고받으려면 어떤 식으로 하는 것이 좋을까요?
* **이제는 개발이 익숙해졌기 때문에 Skeleton code를 제공하지 않습니다!**
  * 이제부터의 퀘스트는 디렉토리 내에 `submit` 폴더를 만들어 제출해 주시면 됩니다.
  * 서버쪽 코드가 필요할 경우 적절한 `package.json` 파일을 포함하여 제출해 주세요!
