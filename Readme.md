** env_guide **

PORT=<br>
JWT_SECRET_KEY=<br>
DATABASE_URL="mysql://<username>:<password>@<IP>:3306/todolist_test"<br>

----------------------

** api_service **

```
method                 path            authen       params         query             body

GET                    /product                     none           none              none
GET                    /product/page/               :page          none              none
GET                    /id/                         :id            none              none
GET                    /search                      none           ?query            none
POST                   /auth/register               none           none              {username, password, confirmPassword, email}
POST                   /auth/login                  none           none              {username, password}
GET                    /auth/me        true         none           none              none
GET                    /todos          true         none           none              none
```

----------------------

Note

MVC (Model,Route+Controller,View)

----------------------
Get Start

จากนั้นใช้คำสั่งตาม
```
npm i 

Go config database in .env
ไป config database ในไฟล์ .env

npm run resetDB // for reset
npx prisma db push
npx prisma db seed
```