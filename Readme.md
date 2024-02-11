** env_guide **

PORT=<br>
JWT_SECRET_KEY=<br>
DATABASE_URL="mysql://<username>:<password>@<IP>:3306/ebook_backend"<br>
ADMIN_NUMBER=<for admin role please not input 0>

----------------------

** api_service **

```
method                 path                         authen       params         query             body

GET                    /product/getall              admin        none           none              none
GET                    /product/page/:page                       :page          none              none
GET                    /product/id/                              :id            none              none
GET                    /product                                  none           ?q                none

POST                   /auth/register                            none           none              {email, password, confirmPassword, displayname, phone?, profilepicture?}
POST                   /auth/login                               none           none              {email, password}
GET                    /auth/me                     true         none           none              none
PATCH                  /auth/update                 true         none           none              {oldPassword, newPassword ,confirmNewPassword, displayname, phone, profilepicture}

GET                    /todos                       true         none           none              none

POST                   /topup                       true         none           none              {amount}
GET                    /topup/status                true         :id            none              none

PATCH                  /backend/topup/update/:id    admin        :id            none              {status : "PAID","CANCEL"}
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