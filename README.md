I. Cach dung:
- cp .env.example .env
- docker-compose up
- port mac dinh: 3001

II. List API:
1. Get list truyen theo catId:
- API: GET /api/v1/novel-by-catId/:catId
- request:
+ catId lay tu path
+ offset: lay tu req.query, mac dinh la 0
+ limit: lay tu req.query, mac dinh la 10

2. Get list truyen moi nhat:
- API: GET /api/v1/newest-novel
- request:
+ offset: lay tu req.query, mac dinh la 0
+ limit: lay tu req.query, mac dinh la 10

3. Get list chapter theo truyen:
- API: GET /api/v1/chapter-by-novelId/:novelId
- request:
+ novelId lay tu path
+ offset: lay tu req.query, mac dinh la 0
+ limit: lay tu req.query, mac dinh la 10

4. Get chapter:
- API: GET /api/v1/chapter/:chapterId
- request:
+ chapterId lay tu path

5. Get truyen search by name:
- API: GET /api/v1/novel-search-by-name
- request:
+ search: lay tu req.query, mac dinh la ""
