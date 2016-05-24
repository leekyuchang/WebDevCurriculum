# Quest 18. WebSocket


## Introduction
* 이번 퀘스트에서는 브라우저의 요청 없이도 서버가 브라우저에게 무언가 말을 걸어 데이터를 주고받는 방법에 대해 알아보겠습니다.

## Topics
* websocket
  * socket.io

## Resources
* [www.websocket.org](http://www.websocket.org/)
* [MDN - WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [socket.io](http://socket.io/)
* 참고
    * [WebSocket방식](http://adrenal.tistory.com/20)

## Checklist
* WebSocket은 어떤 방식으로 HTTP 프로토콜 위에 실시간 통신을 구현하나요?
    * WebSocket는 서버와 클라이언트가 양방향 통신을 하여 실시간 상호작용 하도록 한다.
    * 기존의 양방향 통신 방법 (Polling, Long Polling, Streaming)
        * Polling - 클라이언트가 일정한 주기로 http request를 서버로 계속 날려서 이벤트 내용을 전달받는 방식, 서버의 부담이 급증
        * Long Polling -  클라이언트에서 HTTP 요청 후 대기, 서버는 이벤트가 있을시 response후 연결 종료. 클라이언트는 다시 request후 대기
        * Streaming - long polling과 비슷 클라이언트에서 서버로 http request. 서버에서 클라이언트로 이벤트를 전달할때 해당 요청을 끊지 않고 필요한 메시지만 보내기를(flush) 반복하는 방식
    * HTTP프로토콜은 연결을 유지하지 않는 특성으로 인해 효율에 문제()하나의 요청을 보내려면 연결을 맺고 요청을 보낸 후 응답을 받고 연결을 끊는 방식) 모든 요청에 헤더 파일이 중복, 낭비 - HTML5 표준안의 일부로 WebSocket API(이후 WebSocket)가 등장
    * WebSocket방식
        * 처음 브라우저는 "Upgrade: WebSocket" 헤더 등과 함께 랜덤하게 생성한 키를 서버에 보낸다. 웹 서버는 이 키를 바탕으로 토큰을 생성한 후 브라우저에 돌려준다. 이런 과정으로 WebSocket 핸드쉐이킹
        * http를 기반이지만 handshake과정이 성공적으로 끝나면 http를 웹소켓 프로토콜로 바꾸는 protocol switching 과정을 진행
        * 소켓을 이용해 통신
        * 웹소켓은 최초 접속을 제외 하고는 헤더 정보를 보내지 않는다. 또한, 양방향 통신(full-duplex)통신
        * 그 뒤 Protocol Overhead 방식으로 웹 서버와 브라우저가 데이터를 주고 받는다. - 하나의 80번 포트 TCP 커넥션을 이용하고, 별도의 헤더 등으로 여러 개의 커넥션을 맺는 효과를 내는 방식
* socket.io를 통해 node.js 서버에서 여러 개의 채팅방을 관리/구현하려면 어떻게 해야 하나요?
    * socket.join을 하게되면 해당 room에 binding, socket.leave하면 해당 방에서 나오게 된다.
    * room에 있는 클라이언트들에게 이벤트를 보내려면 기본적으로 emit
    * in - room안에 있는 모든 클라이언트들에게 이벤트 보내기
    * broadcast.to - room 안에 있는 나를 제외한 다른 클라이언트들에게 이벤트 보내기
* ![Polling](http://2.bp.blogspot.com/-cvWY81etsao/ViZSUVxywxI/AAAAAAAAMHo/wxrd6dIntM8/s320/HttpPolling.gif)
* ![Long Polling](http://2.bp.blogspot.com/-eL9rxi8th2A/ViZSW0ggEwI/AAAAAAAAMH4/k4S4-dRz3t4/s320/HttpLongPolling.gif)
* ![Streaming](http://4.bp.blogspot.com/-sRVlAdeU-Kw/ViZSWw-wB2I/AAAAAAAAMH0/3CmKGISDV-A/s320/HttpStreaming.gif)
* ![Websocket과 Long Polling의 비교](http://d2.naver.com/content/images/2015/06/helloworld-1336-1-1.png)

## Quest
* Quest 17에서 만든 스케치보드를 실시간 멀티플레이어 방식으로 업그레이드 해 보겠습니다.
  * 생성, 이동, 삭제 등 모든 변화는 실시간으로 기록되고 상대방에게 반영되어야 합니다.
  * 여러 개의 방을 구현할 수 있어야 합니다.
  * socket.io를 사용해도 무방합니다.
