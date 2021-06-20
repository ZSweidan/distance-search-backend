FROM node
COPY . /src
RUN cd /src 
EXPOSE 9000
CMD ["node", "/src/app.js"]
