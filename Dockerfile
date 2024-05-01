# Apache 서버가 포함된 기본 이미지 사용
FROM httpd:2.4

# 호스트의 build 폴더에서 이미지의 문서 루트로 모든 파일 복사
COPY ./build/ /usr/local/apache2/htdocs/