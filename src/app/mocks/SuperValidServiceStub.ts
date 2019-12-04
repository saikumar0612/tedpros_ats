/*
       * Author: BAS-IT022
       * Purpose: Code coverage
       * Created: 3rd Aug 2019
       * Comment: unit test cases 
   */



import { of } from 'rxjs';
export class SuperValidServiceStub {


    /*
       * Author: BAS-IT003
       * Purpose: Code coverage
       * Created: 19th Aug 2019
       * Comment: start of mock services
   */

    getcustData(currentUser) {
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });
    }
    getcustplans(currentUser) {
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });
    }
    getcustInvoice(currentUser) {
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });
    }
    getcustInvoicePaid(currentUser) {
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });
    }

    postencdata(key, currentUser) {
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });
        // if (key === 'Customer') {
        //     return of({
        //         statusCode: {
        //             code: '200',
        //             message: 'ok'
        //         },
        //         errorMessages: null,
        //         data: ''
        //     });
        // } else if (key === 'Customerplan') {
        //     return of({
        //         statusCode: {
        //             code: '200',
        //             message: 'ok'
        //         },
        //         errorMessages: null,
        //         data: ''
        //     });
        // } else if (key === 'CustomerPendingInvoice') {
        //     return of({
        //         statusCode: {
        //             code: '200',
        //             message: 'ok'
        //         },
        //         errorMessages: null,
        //         data: ''
        //     });
        // } else if (key === 'CustomerPaidInvoice') {
        //     return of({
        //         statusCode: {
        //             code: '200',
        //             message: 'ok'
        //         },
        //         errorMessages: null,
        //         data: ''
        //     });
        // } else if (key === 'Customerplan') {
        //     return of({
        //         statusCode: {
        //             code: '200',
        //             message: 'ok'
        //         },
        //         errorMessages: null,
        //         data: ''
        //     });
        // }
    }

    getCompanyInfo() {
        const baseUrl = window.location.origin;
        console.log('comapanyInfo');
        return of({
            statusCode: {
                code: '200',
                message: 'ok'
            },
            errorMessages: null,
            data: ''
        });

    }



    /*
       * Author: BAS-IT003
       * Purpose: Code coverage
       * Created: 19th Aug 2019
       * Comment: end of mock services
   */

}
