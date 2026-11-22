# 쉬운 지방세 용어사전

압축을 푼 뒤 public/index.html을 브라우저에서 열면 용어 검색과 초성 필터를 사용할 수 있습니다.

## 수정할 파일

- public/terms.js — 한 줄에 용어와 해설 한 쌍을 작성합니다. 새 항목도 검색, 가나다 정렬, 결과 개수에 자동 반영됩니다.
- public/index.html — 화면 제목, 안내 문구, 출처 링크를 수정합니다.
- public/styles.css — 색상, 글자 크기, 모바일 배치를 조정합니다.
- public/app.js — 검색, 강조 표시, 초성 필터를 수정합니다.

## Firebase Hosting에 올리기

1. https://console.firebase.google.com/ 에서 사용할 프로젝트를 만들거나 선택하고 프로젝트 설정에서 프로젝트 ID를 확인합니다.
2. 컴퓨터에 Node.js LTS와 npm을 설치한 뒤 터미널에서 아래 두 명령으로 Firebase CLI를 설치하고 로그인합니다.

```sh
npm install -g firebase-tools
firebase login
```

3. firebase.json이 들어 있는 폴더에서 아래 명령을 실행합니다. YOUR_PROJECT_ID는 본인의 실제 프로젝트 ID로 바꿉니다. 터미널에 표시되는 로컬 주소로 배포 전 화면을 확인하고 Ctrl+C로 종료합니다.

```sh
firebase emulators:start --only hosting --project YOUR_PROJECT_ID
```

4. 공개할 준비가 되면 같은 폴더에서 실행합니다. 해당 프로젝트의 기본 Hosting 사이트가 갱신됩니다. 완료 후 터미널의 Hosting URL로 접속합니다.

```sh
firebase deploy --only hosting --project YOUR_PROJECT_ID
```

용어나 디자인을 수정한 뒤에도 같은 명령으로 배포합니다. 현재 용어 데이터는 앱에 포함되어 있어 별도 데이터베이스 설정 없이 동작합니다.

공식 가이드 https://firebase.google.com/docs/hosting/quickstart?hl=ko
