FROM httpd:latest

# 웹 콘텐츠 복사 (필요한 경우)
COPY ./build/ /usr/local/apache2/htdocs/

# 필요한 포트 열기
EXPOSE 80