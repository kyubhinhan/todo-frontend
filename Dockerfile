# Apache 이미지 사용
FROM httpd:latest

# 로그 디렉토리 생성 및 권한 설정
RUN mkdir -p /var/log/apache2 && chown -R www-data:www-data /var/log/apache2

# httpd.conf 파일 복사 및 ServerName 설정
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# 웹 콘텐츠 복사
COPY ./build/ /usr/local/apache2/htdocs/