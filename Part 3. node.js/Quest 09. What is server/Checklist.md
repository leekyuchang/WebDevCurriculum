# Quest 09. What is server


## Introduction
* 이번 퀘스트에서는 인터넷이 어떻게 동작하며, 서버와 클라이언트, 웹 브라우저 등의 역할은 무엇인지 알아보겠습니다.

## Topics
* 서버와 클라이언트, 그리고 웹 브라우저
* 인터넷을 구성하는 여러 가지 프로토콜
  * IP (Internet Protocol)
    - 인터넷에서 사용되는 주소체계
  * TCP (Transmission Control Protocol)
    - 네트워크의 정보 전달을 통제하는 프로토콜
    - 네트워크 상의 data는 많은 packet들로 나뉘게 되고 packet는 여러 router를 거쳐 목적지 IP에 전송된다.
  * HTTP
    - HTTP는 클라이언트와 서버 사이에서 데이터를 주고 받기 위해 이루어지는 요청/응답(request/response) 프로토콜
* DNS (Domain Name System)
    - 문자로 되어있는 주소를 해당 IP로 변환하는 방법, Domain name server에서 이루어진다.

## Resources
* [OSI 모형](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95)
* [IP](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
  * [Traceroute from around the world](http://tracert.com/traceroute)
* [TCP](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EC%A0%9C%EC%96%B4_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
  * [Wireshark](https://www.wireshark.org/download.html)
* [HTTP](https://ko.wikipedia.org/wiki/HTTP)
  * Chrome developer tool, Network tab
* [DNS](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)
  * [Web-based Dig](http://networking.ringofsaturn.com/Tools/dig.php)

## Checklist
* 인터넷은 어떻게 동작하나요? OSI 7 Layer에 입각하여 설명해 보세요.
    - OSI 7 Layer은 물리 계층, 데이터 링크 계층, 네트워크 계층, 전송 계층, 세션 계층, 표현 계층, 응용계층으로 구성
    - 물리 계층과 응용계층을 제외한 나머지 계층에서는 데이터가 전송될때 헤더를 추가한다.
    - 송신측에서 전송한 데이터는 응용 계층부터 물리계층까지 각 단계를 거쳐 수신측으로 전송된다.
    - 수신측에 전송된 데이터는 다시 물리 계층부터 응용계층 까지 각 단계를 거치며 (각 단계에서 헤더제거) 데이터를 받게된다.
* 각 층의 기능:
    - 물리 계층: 데이터 링크 계층에서 전달한 프레임을 전기적 신호인 비트열로 변화시킨다.
    - 데이터 링크 계층: 패킷을 프레임 형태로 만들고, 물리적 네트워크를 통하여 패킷을 오류 없이 전달하는 기능을 수행한다.
    - 네트워크 계층: 데이터 전송과 경로 선택 기능, 라우팅 프로토콜을 사용하여 최적 경로를 선택한다. (IP)
    - 전송 계층: 프로토콜(TCP, UDP)과 관련된 계층. 데이터의 전달 보장, 오류 복구와 흐름 제어 (TCP, UDP)
    - 세션 계층: 응용 프로그램 계층 사이의 접속을 설정·유지·종료시켜주는 역할을 한다. 또한 사용자와 전송 계층 간의 인터페이스 역할을 한다.
    - 표현 계층: 데이터를 다른 형식으로 변환하거나 공통 형식을 제공하는 계층이다.
    - 응용 계층: 파일 전송, 데이터베이스, 원격 접속, 이메일 전송등 응용 서비스를 네트워크에 접속시키는 역할을 한다 (HTTP, FTP, WWW)
* 우리가 브라우저의 주소 창에 www.knowre.com 을 쳤을 때, 어떤 과정을 통해 노리의 서버 주소를 알게 되나요?
    - 주소창에 주소를 치게 되면 Domain name server에 연결되어 해당 Domain의 IP주소를 얻게 된다.
    - 브라우저는 HTTP를 통해서 IP주소에 접근하여 request한다.
    - 해당 웹서버는 response하여 HTML, CSS, js등의 파일의 데이타들을 보내고(packet개념, OSI 7 Layer) 사이트는 브라우저 창에 렌더링된다.

## Quest
* tracert(Windows가 아닌 경우 traceroute) 명령을 통해 www.google.com까지 가는 경로를 찾아 보세요.
  * tracerout는 경로를 추적하고 경로의 상태 및 흐름을 파악하기 위해 사용
  * 어떤 IP주소들이 있나요?
    - 128.134.79.254 KT의 공인IP
    - 61.78.42.166 KT의 공인IP
    - 112.189.28.73 KT의 공인IP
    - 112.174.103.197 KT의 공인IP
    - 112.174.8.162 KT의 공인IP
    - 112.174.83.58 KT의 공인IP
    - 72.14.194.194 Google의 공인IP
    - 216.239.49.137 Google의 공인IP
    - 216.239.62.27 Google의 공인IP
  * 그 IP주소들은 어디에 위치해 있나요?
* Wireshark를 통해 www.google.com으로 요청을 날렸을 떄 어떤 TCP 패킷이 오가는지 확인해 보세요
  * Wireshark는 네트워크 프로토콜 분석기
  * TCP 패킷을 주고받는 과정은 어떻게 되나요?
    - 3 handshaking
    - 1단계: 80포트local에서 google로 접속을 요청하는 SYN(synchronize sequence numbers) 패킷를 보낸다.
    - 2단계: google에서 80포트로 접속 요청을 수락하는 SYN, ACK(acknowledgment) 패킷를 보낸다.
    - 3단계: 80포트에서 google로 ACK를 보낸다.
  * 각각의 패킷에 어떤 정보들이 담겨 있나요?
    - Source/Destination port (송/수신지 포트)
    - Sequence number (송신 일련번호)
        - 송신자가 세그먼트를 보낼때 순서를 의미하는 일련번호를 붙인다.
    - Acknowledgment number (수신 확인 일련번호)
        - 수신자가 SYN을 받았다는 의미로 세그먼트에 다음에 올것을 기대하는 세그먼트의 송신 일련번호를 붙인다.
    - Header length (헤더 길이)
    - Flag
        - URG(Urgent) 비트가 1일경우 세그먼트(tcp가 보내는 패킷의 기본단)의 데이터중 우선적으로 처리
        - ACK 비트가 1일경우 수신 확인 필드가 유효하다는 의미
        - PSH(push) 긴급데이터가 아닌 데이터를 빨리 처리하기를 요청
        - RST(reset) TCP연결 종료 요청
        - SYN 송신자, 수신자의 일련번호를 확인할때 사용. 이비트가 1이면 3handshake 단계중 SYN단계(1,2)
        - FIN(finish) 프로세스가 완료, 데이터가 전송되었다는 의미
    - Window Size (송신자 윈도우 크기)
        - 흐름제어를 위해 송신자에게 수신자가 자신의 버퍼 여유용량크기를 지속적으로 보냄
    - Checksum: 세그먼트의 내용이 유효한지 검증, 손상여부 검사
    - Urgent pointer
        - Flag의 URG가 1인경우 긴급데이터 크기를 8진수로 표현
        - Flag의 URG가 0인경우 16진수로 0000이며, 긴급데이터 없음을 의미
    - Options
        - 여러 옵션들을 정의
        - 최대 세그먼트 크기 MMS
        - 윈도우 크기 지정
    * [TCP 헤더 자세한 설명](http://stih.tistory.com/52)
* telnet 명령을 통해 http://www.google.com/ URL에 HTTP 요청을 날려 보세요.
  * telnet란 인터넷이나 로컬 영역 네트워크 연결에 쓰이는 네트워크 프로토콜
    - telnet www.google.co.kr 80
    - GET / HTTP/1.0     (HEAD / HTTP/1.0)
    - Host: www.google.co.kr

  * 어떤 헤더들이 있나요? 그 헤더들은 어떤 역할을 하나요?
    - Date
    - Expires
    - Cache-Control
    - Content-Type
    - P3P
    - server
    - X-XXS-Protection
    - X-Frame-Options
    - Set-Cookie
    - Accept-Ranges
    - Vary




## OSI 7 Layer 사진

  ![OSI 7 Layer2](http://cfile27.uf.tistory.com/image/193573414E9E6400111D13)

  ![OSI 7 Layer2](http://cfile3.uf.tistory.com/image/157A59464E9E64020EE598)
