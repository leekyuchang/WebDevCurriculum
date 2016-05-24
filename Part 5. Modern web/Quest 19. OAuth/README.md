# Quest 19. OAuth


## Introduction
* 이번 퀘스트에서는 웹사이트들에서 보이는 페이스북이나 구글 로그인 기능은 어떻게 만드는지 알아보겠습니다.

## Topics
* OAuth 2.0
* OpenAPI

## Resources
* [OAuth](https://en.wikipedia.org/wiki/OAuth)
* [Google OAuth API HowTo](https://developers.google.com/identity/protocols/OAuth2)
* [node.js Google OAuth API](https://github.com/google/google-api-nodejs-client/)
* [Google Developers Console](https://console.developers.google.com)

## Checklist
* 페이스북이나 구글같은 회사는 어떤 식으로 다른 사이트에게 사용자 비밀번호를 넘기지 않고 사용자 인증을 해 줄 수 있을까요?
    * API 인증, 권한 부여를 통해 사용자의 비밀번호를 넘기지 않고 인증하며 토큰을 제공하여 이용권한 승인
  * OAuth란 무엇인가요?
    * OAuth는 3rd party(외부 서비스)를 위한 범용적인 인증 표준
    * OAuth는 인증을 위한 오픈 스탠더드 프로토콜로, 사용자가 인터넷 서비스의 기능을 다른 애플리케이션에서도 사용할 수 있게 한 것
  * OAuth를 통해 사용자 인증을 할 때 어떤 경로로 어떤 정보가 흘러가야 할까요?
    * 구글 OAuth 권한 서버에서 토큰 요청을 통해 전달 받게 된다.
    * 토큰은 구글 API를 요청하기 위한 것
    * 토큰 발급 요청 시 사용하는 코드에는 여러가지 정보가 포함(인증을 완료한 후 리다이렉트할 주소, 사용자 구별 키값 등등)

## Quest
* Quest 12~15에서 만든 메모장 시스템에 구글 로그인 버튼을 추가하고자 합니다.
  * 구글 버튼을 통해 로그인을 할 수 있어야 합니다.
    * 처음 로그인했을 경우, 해당하는 유저 테이블에 이메일 주소와 해당하는 사람의 이름이 추가되게 됩니다.
    * 두 번째 로그인부터는 일치하는 이메일 주소를 찾아 그 유저의 이름으로 모든 것이 저장되어야 합니다.
