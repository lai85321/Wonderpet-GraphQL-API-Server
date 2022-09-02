# Wonderpet-GraphQL-API-Server
 1. 程式啟動方式
    1. clone檔案後，先執行 `npm i`
    2. 於 `README.md` 同層加入 `.env` 檔案，並於檔案內新增 `JWTSECRET` 變數，變數內容為任意字串
    3. `npm start` 即可執行
 2. 程式架構
    server於 `app.ts` 內啟動
    程式主要分為兩大部分: schema與resolvers
    schema負責宣告所有graphQL query使用到的輸出及輸入型別
    resolvers則專門用來寫query邏輯
 3. api 的規格與範例
    ### login api 
    
    Variables
    | Field    | Type     |
    | -------- | -------- |
    | account | String   | 
    | password | String   | 

    
    Response
    
    | Field    | Type     | Description |
    | -------- | -------- | ----------- |
    | message  | String   | Response message|

    ```

    //範例

    {

      "loginInput": {

        "account":"tina",

        "password":"test"

      }

    }

    ```

    ### me api 

    ```

    //規格

    query me {

      me {

        id

        account

        password

        name

        birthday
      }

     }

    ```

    Request Headers

    | Field    | Type     | Description |
    | -------- | -------- | ----------- |
    | Authorization  | String   | Access token preceding Bearer .|

4. 整個過程的研究心得
    一開始先研究了typescript的寫法，原本以為是一種全新的語言，但寫起來的感覺就像是嚴謹版的javascript，
   需要特別留意的地方是如果有新的變數產生，又剛好是object型態，就需要先去宣告他裡面的內容的型別才能使用，
   例如當使用了 `jwt.verify` 解出jwt token的資料後，若是直接從中去取用object當中的資料會發生錯誤，因為我們從未宣告過該值，
   而系統也判定他為一個 `String` 型別，此時就需要另外去定義一個interface來宣告他的型別。接下來研究了GraphQL，
   可以明顯感受到他和RESTful API的差異，彈性比RESTful API高了很多，像是如果只想要使用 `me()` 這個API當中的某幾個欄位資料，
   只需要在query中寫入想選取的欄位，但若是在RESTful API中，就需要自己去從response中取出需要的欄位。
   藉由此次專案使用到了typescript與graphQL，體會到了兩者帶來的好處，也期待之後使用這兩項作出帶龐大的專案

    
