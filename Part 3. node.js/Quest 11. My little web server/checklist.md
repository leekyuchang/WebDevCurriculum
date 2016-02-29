# Quest 11. My little web server


## Introduction
* 이번 퀘스트에서는 간단한 웹서버를 만들어 보겠습니다.

## Topics
* GET/POST
* node.js `http` module
  * `req`와 `res` 객체
    - HTTP요청을 핸들링하거나 응답을 보내는데 사용한다.

## Resources
* [HTTP Node.js v5.3.0 Manual & Documentation](https://nodejs.org/api/http.html)
* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

## Checklist
* HTTP의 GET과 POST 메소드는 어떻게 다른가요?
    - GET과 POST는 HTTP프로토콜을 이용해서 서버에 데이터를 전달할 때 사용하는 방식
    - GET: URL를 통해 전달하기 때문에 비밀번호와 같은 데이터는 알맞지 않으며 길이가 제한적,
    - POST: body에 포함되어 전달되기 때문에 길이에 제한이 없고, 숨겨져서 보내진다.
    - GET은 단순히 서버에서 가져와 보여주는 형태이고, POST는 서버의 값이나 상태를 바꾸기 위해 사용한다.
* 다른 HTTP 메소드에는 무엇이 있나요?
    - OPTION: 요청한 uri이 응답할 수 있는 HTTP 메소드가 무엇인지 요청
    - HEAD: GET요청에서 body를 제외한 헤더만 요청
    - PUT: 요청 url 저장될 정보를 보낸다
    - DELETE: 요청 url의 리소스를 삭제
    - TRACE: 요청한 메세지를 루프백
    - CONNECT: 프록시가 사용하는 요청
* HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?
    - GET과 POST는 일반적으로 form을 통해 submit되는 형태이다.
    - GET은 url에데이터가 포함되어 전달되고 POST는 요청 header 밑의 message body에 데이터가 포함되어 전달된다.

## Quest
* 다음의 동작을 하는 서버를 만들어 보세요.
  * 브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력하는 서버를 만들어 보세요.
  * 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력하는 서버를 만들어 보세요.
  * 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 POST 메소드로 보내면, `Hello, [문자열]`을 출력하는 서버를 만들어 보세요.
* express.JS와 같은 외부 프레임워크를 사용하지 않고 만들어 보세요.
