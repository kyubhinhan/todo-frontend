FROM httpd:latest

# 웹 콘텐츠 복사 (필요한 경우)
COPY ./build/ /usr/local/apache2/htdocs/

# Apache 설정 변경
RUN sed -i 's/Listen 80/Listen 3000/' /usr/local/apache2/conf/httpd.conf

# 필요한 포트 열기
EXPOSE 3000