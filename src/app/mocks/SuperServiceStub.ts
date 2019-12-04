 /*
        * Author: BAS-IT022
        * Purpose: Code coverage
        * Created: 3rd Aug 2019
        * Comment: unit test cases 
    */



import { of } from 'rxjs';
export class SuperServiceStub {

    ckeckInstallation(){
               return of({
            json:function (){
                return   {
                    "statusCode": {
                        "code": "200",
                        "message": "ok"
                    },
                    "errorMessages": null,
                    "data": "success"
                }
            }
        })

    }
    custActivate(email){
        localStorage.setItem('superUser', JSON.stringify({
                "success": true,
                "data": {
                    "userId": 2,
                    "firstName": "Pavan",
                    "lastName": " ",
                    "middleName": " "
                },
                "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNjIuMjU0LjIwOS4xMzBcL2FwaVwvZ2V0Q3V0b3NtZXJUb2tlbiIsImlhdCI6MTU2NDgyMTk0OSwiZXhwIjoxNTY0ODI1NTQ5LCJuYmYiOjE1NjQ4MjE5NDksImp0aSI6IlFTdmFKQTB3SVlQdlp4RTAiLCJzdWIiOjIsInBydiI6ImY1MDI4YTRhNGI5MzQ3MzlmODA1MGUxNzQ0MDM4MDIyN2U0NjEzNjEifQ.KsQ09g7e5QrSLkuc2u4ZCft3IMLtKDe-BO_tUkEGGJ8"
        }));
        return of({
            json:function (){
                return {
                    "success": true,
                    "data": {
                        "userId": 2,
                        "firstName": "Pavan",
                        "lastName": " ",
                        "middleName": " "
                    },
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNjIuMjU0LjIwOS4xMzBcL2FwaVwvZ2V0Q3V0b3NtZXJUb2tlbiIsImlhdCI6MTU2NDgyMTk0OSwiZXhwIjoxNTY0ODI1NTQ5LCJuYmYiOjE1NjQ4MjE5NDksImp0aSI6IlFTdmFKQTB3SVlQdlp4RTAiLCJzdWIiOjIsInBydiI6ImY1MDI4YTRhNGI5MzQ3MzlmODA1MGUxNzQ0MDM4MDIyN2U0NjEzNjEifQ.KsQ09g7e5QrSLkuc2u4ZCft3IMLtKDe-BO_tUkEGGJ8"
                }
            
            }
        })

    }


    

  

}