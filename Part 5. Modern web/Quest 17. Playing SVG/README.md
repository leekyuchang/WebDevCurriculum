# Quest 17. Playing SVG


## Introduction
* 이번 퀘스트에서는 사각형과 박스 모델 일색인 웹에서 다양한 도형을 그리는 방법을 알아보겠습니다.

## Topics
* 벡터 그래픽
  * SVG 포맷(Scalable Vector Graphics)
    - 2차원 벡터 그래픽을 표현하기 위한 XML 기반의 벡터 이미지 형식
    - 이미지의 왜곡이나 손상 없이 다양한 해상도와 픽셀 밀도에 대응이 가능
    -
* 키보드 이벤트
  * `onkeypress`
  * `onkeydown` / `onkeyup`
  * keyCode

## Resources
* [MDN - SVG](https://developer.mozilla.org/ko/docs/Web/SVG)

## Checklist
* SVG 포맷은 JPG, PNG 등의 포맷과 어떤 점이 다른가요?
    * 비트맵 방식의 파일(.jpg, .png, .gif 등) - 각 픽셀 당 할당되는 정보를 해당 그림에 담긴 픽셀 수 만큼 순차적으로 해석해 모니터 상에 맞게 재구성
    * 벡터방식의 파일(.ai, .svg 등) - 선, 점, 사각형, 원, 글씨 등의 구성요소에 관한 정보와 이들이 각각 지니는 위치정보를 이용해 재구성
* SVG 포맷은 HTML 포맷과 어떤 점이 다른가요?
* 브라우저 상의 키보드 이벤트에서 keyCode는 어떤 역할을 하나요?

## Quest
* 간단한 스케치보드를 만들어 보려고 합니다.
  * 정해진 크기와 모양의 사각형, 삼각형, 원을 그리는 버튼이 있어야 합니다.
  * 그린 삼각형, 사각형, 원을 이동하고 삭제하는 기능이 있어야 합니다.
    * 키보드의 Arrow 키와 Delete 키를 통해 선택된 도형을 이동하고 삭제할 수 있어야 합니다.
  * 저장 기능은 굳이 구현하지 않아도 됩니다.
