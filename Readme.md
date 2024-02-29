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
GET                    /product/id/:id                           :id            none              none
GET                    /product?q=                               none           ?q                none

POST                   /auth/register                            none           none              {email, password, confirmPassword, displayname, phone?, profilepicture?}
POST                   /auth/login                               none           none              {email, password}
GET                    /auth/me                     true         none           none              none
PATCH                  /auth/update                 true         none           none              {oldPassword, newPassword ,confirmNewPassword, displayname, phone, profilepicture}

POST                   /topup                       true         none           none              {amount}
GET                    /topup/status                true         :id            none              none
GET                    /topup/me                    true         none           none              none

PATCH                  /backend/topup/update/:id    admin        :id            none              {status : "PAID","CANCEL"}
PATCH                  /backend/product/update/:id  admin        :id            none              { name, description, publishDate, author, price, tag, imageUrl, downloadUrl }
POST                   /backend/product/new         admin        none           none              { name, description?, publishDate, author, price, tag, imageUrl, downloadUrl }
DELETE                 /backend/product/delete/:id  admin        :id            none              none

GET                    /cart/my                     true         none           none              none
POST                   /cart/add/:id                true         :id            none              none
DELETE                 /cart/delete/:id             true         :id            none              none
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