import { environment } from "./environments/environment.localqa";

// TODO: MOVE ALL CONSTANTS HERE
export const AppConstants =
{
    ApiUrls: {
        TEST_URL: 'test/test',
        DUMMY_TEACHER_URL: 'api/DummyTeacher',
        DUMMY_STUDENT_URL: 'api/token',
        ACCOUNT_URL: 'api/token',

        REGISTER_URL: 'api/v1/register',
        LOG_URL: 'api/v1/login',
        LICENSE: 'api/v1/license',
        Banner: 'api/v1/banner',
        MODULE: 'api/v1/module',
    },
    DbKeys: {
        ACCESS_TOKEN: 'ACCESS_TOKEN',
        TOKEN_EXPIRY: 'TOKEN_EXPIRY',
        REMEMBER_ME: 'REMEMBER_ME',
        LOGIN_USER: 'LOGIN_USER',
        LOGIN_ADMIN:'LOGIN_ADMIN',
        CLIENT_COMPANY_ID: 'CLIENT_COMPANY_ID',
        TRANSACTION_DATE: 'TRANSACTION_DATE',
        API_RESP_CACHE: '',
        PLATFORM: '',
        USER_ID: '',
        PASSWORD:'pwd',
    },
    DbDefaultValues: {
    },
    ErrorPrompts: {
        App_StartError: 'Error occured. Please restart the application.',
        Load_Data_Error: 'Error in loading data. Please try again.',
        Invalid_Input_Data: 'Invalid data.Please try again.',
        Unknown_Error: 'Error occured. Please try again.',
        Network_Error: 'Please check network and try again.',
        Save_Data_Error: 'Error in saving. Please try again.',
        Delete_Data_Error: 'Error in delete. Please try again.',
        Permission_Error: 'Permission denied.',
        Unauthorized_User: 'User not authorized. Please relogin.',
        Password_Wrong:'Password Does Not Match !'
    },
    HeadersName: {
        ApiType: 'targetapitype',
        DevApk: 'isdeveloperapk',
        AppVersion: 'appversion',
        CORS_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
        CORS_ALLOW_METHODS: "Access-Control-Allow-Methods",
        CORS_ALLOW_CREDENTIALS: "Access-Control-Allow-Credentials",

    },
    HeadersValue: {
        ApiType: 'abcd',
        DevApk: (!environment.production).toString(),
        AppVersion: environment.applicationVersion,
        CORS_ALLOW_ORIGIN: "http://localhost:4200",
        CORS_ALLOW_METHODS: "GET, POST, OPTIONS, DELETE, PUT",
        CORS_ALLOW_CREDENTIALS: "true",
    },
    SuccessMessages: {
        Data_Saved_Success: 'Save Success',
        Details_Updated: 'Details Updated Successfully',
    },

    DefaultMessages: {
        GenericPayrollComponentDeleteAlert: "Are you sure you want to delete this Component?",
        EmployeeDeleteAlert: "Are you sure you want to delete this Employee?",
        EmployeeAddressDeleteAlert: "Are you sure you want to delete this Address?",
        EmployeeBankDeleteAlert: "Are you sure you want to delete this Bank-Info?",
        AdminDeleteAlert: "Are you sure you want to delete this Admin?",
        EmployeeLeaveDeleteAlert: "Are you sure you want to delete this Leave?",
        EmployeeDocumentDeleteAlert: "Are you sure you want to delete this Document?",
        LetterDeleteAlertMessage: "Are you sure you want to delete this Letter?",
        LoginAgain: "Please Login Again",
        LogOutSuccess: "Log Out Successful",
        DeleteCompanyLogo:"Are you sure you want to delete this Logo?",
        DeleteCompanyShift:"Are you sure you want to delete this Shift",
        DeleteCompanyDepartment:"Are you sure you want to delete this Department",
        DeleteSqlQuery:"Are you sure you want to delete this Query",
        DeleteContactUsDetails:"Are you sure you want to delete this Conatct"
    },
    WebRoutes: {
        DASHBOARD:'/dashboard',
        EMPLOYEE:'/profile',
        EMPLOYEELIST:'/employees-list',
        ATTENDANCE:'/attendance',
        ATTENDANSHIFT:'/shift',
        COMPANYOVERVIEW:'/company-overview',
        LICENSE:'/license',
        COMPANYLETTERS:'/company-letter',
        LEAVES:'/leaves',
        PAYROLLSTRUCTURE:'/payroll-structure',
        TRANSACTIONS:'/transactions',
        SETTINGS:'/setting',
        DEPARTMENTS:'/departments',
        PROFILE:'/profile',
        PAYMENT_FAIL_URL: `/failure`,
        PAYMENT_SUCCESS_URL: `/success`,
        REPORTS:{
            NONE:'',
            LEAVEREPORTS:'/leaves-report',
            PAYROLLREPORTS:'/payroll-report',
            ATTENDANCE_REPORT:'/attendance-report',
        },
        ADMIN:{
            DASHBOARD:'admin/dashboard',
            COMPANIES:'admin/companylist',
            SQL:'admin/sql',
            CONTACT_US:'admin/contact-us'
        },
        HOME:'/website',
        SAMPLE: 'sample',
        TEACHERS: 'teachers',
        LOGIN: 'login',
        UNAUTHORIZED: '**',
    },
    Token_Info_Keys: {
        Role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
        Expiry: 'exp',
        CompanyCode: 'clCd',
        Audience: 'aud',
        CompanyId: 'clId',
        RecordId: 'dbRId',
        EmailAddress: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        UserName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
        GivenName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
        Issuer: 'iss',
        TokenStart: 'nbf'
    }

};
