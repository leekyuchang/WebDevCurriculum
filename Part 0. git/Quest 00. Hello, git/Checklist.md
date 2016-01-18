## 추가로 찾은 좋은 리소스
* http://gitref.org/index.html
* https://rogerdudler.github.io/git-guide/index.ko.html

## Checklist
* 버전 관리 시스템은 왜 필요한가요?
  
  * 버전관리 시스템은 소프트웨어 프로젝트에서 팀원들이 온라인 상으로 쉽게 협력할 수 있도록 도와주는 시스템입니다. 버전 관리 시스템을 이용하면 온라인상으로 팀원들끼리 수정한 코드를 공유할 수 있습니다. 

* git 외의 버전관리 시스템에는 무엇이 있나요? git은 그 시스템과 어떤 점이 다르며, 어떤 장점을 가지고 있나요?
	* SVN(Apache Subversion)
		* SVN은 보통 개인이 코드를 완성한후 중앙 저장소에 commit하기 때문에 개인 version history를 가질수 없다. (그에 반해 git은 commit을 해도 push하기 전까지는 서버에 영향을 미치지 않기 때문에 개인이 version history를 관리 할 수 있다.
		* SVN의 저장소는 외부에 존재, GIt은 로컬 저장소가 존재
	* Mercurial
		* Mercurial는 Git과 같은 DVCS의 형태이다.(history, branch, merge가 장점)
		* git의 저장소는 스냅샨 기반이다. git의 변경된 저장소를 통째 스냅샷을 통해 push하는 형태.
		* 그에 반해 Mercurial은 각 파일의 변경분만 추적을 한다.
		* mercurial의 같은경우 git보다 성능이 낮아 효율이 떨어

	* [SNV, Mercurial, GIT 비교](http://ora-sysdba.tistory.com/entry/Infra-%EB%B2%84%EC%A0%84%EA%B4%80%EB%A6%AC%EC%9D%98-%ED%9A%A8%EC%9C%A8%ED%99%94-git-%EA%B0%9C%EC%9A%94)
	

* git의 명령어
  * `clone` : git의 repo를 local로 복제
  * `add` : local directory의 변경된 파일을 index(stage)에 추
  * `commit` : 변경된 내용을 HEAD에 추가(수정사항에 대한 코멘트 남김)
  * `push` : HEAD에 추가된 변경사항을 git의 원격 저장소에 반영
  * `pull` : git의 원격저장소에 있는 파일을 local로 이동
  * `branch` : 새로운 작업 환경(저장소)를 만들거나 이동
  * `stash` : 작업중 commit을 하지 않을 경우 스택에 임시저장

* git의 사용 순서
  * local의 폴더에서 `git init` 명령어를 사용하여 git환경으로 전환
  * `git clon` 명령어를 통해 local저장소로 repo를 복제
  * 변경할 내용을 변경
  * `git add` 명령어를 통해 변경파일을 index(stage)에 추가
  * `git commit -m "comment"` 명령어를 통해 변경내용을 HEAD에 추가
  * `git push -u origin master` 명령어를 통해서 origin(현제 작업환경)에 있는 변경사항을 master branch의 원격저장소로 업로드
  * branch를 만들경우 `git branch newbranchname` 이동할경우 `git checkout branchname`
  * branch를 삭제할경우 `git branch -D branchname`
  * stash사용 `git stash`, `git stash list`, `git stash apply (--index)`, `git stash drop`
  * 상태를 나타내는 `git status`
   