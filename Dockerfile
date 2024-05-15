# Apache 이미지 사용
FROM httpd:latest

# 필요한 모듈 활성화
RUN apt-get update && apt-get install -y \
    && a2enmod headers

# 커스텀 Apache 설정 파일 복사
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf

# 웹 콘텐츠 복사
COPY ./build/ /usr/local/apache2/htdocs/