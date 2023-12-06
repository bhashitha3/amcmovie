# amcmovie


s3 index.html url : https://amcfrontenddeploy.s3.amazonaws.com/index.html

s3 static website url: **http://amcfrontenddeploy.s3-website-us-east-1.amazonaws.com** The final website url

lambda arn:  arn:aws:lambda:us-east-1:804026444600:function:amcmoviebackend

            In lambda trigger is api gateway and handler is server.handler

API gateway url: https://zfvjan4g8c.execute-api.us-east-1.amazonaws.com/live/movies   where /movies is my api and live is stage that is deployed in get method of movie resource

mongodb: Ip address need t be 0.0.0.0/0 or the aws Ip address
