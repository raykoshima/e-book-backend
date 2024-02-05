** env_guide **

PORT=<br>
JWT_SECRET_KEY=<br>
DATABASE_URL="mysql://<username>:<password>@<IP>:3306/ebook_backend"<br>

----------------------

** api_service **

```
method                 path            authen       params         query             body

GET                    /product        true         none           none              none
GET                    /product/page/               :page          none              none
GET                    /id/                         :id            none              none
GET                    /search                      none           ?query            none
POST                   /auth/register               none           none              {email, password, confirmPassword, displayname, phone?, profilepicture?}
POST                   /auth/login                  none           none              {email, password}
GET                    /auth/me        true         none           none              none
GET                    /todos          true         none           none              none
```
**
when use prisma in backend the first Char in datarow is uppercase
email -> Email
password -> Password

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