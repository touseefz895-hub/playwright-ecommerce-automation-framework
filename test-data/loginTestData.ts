export const loginData = [
   {
    testCaseId: 'AUTH-002',
    title: 'Verify user is not able to login with invalid credentials',
    username: 'invalid_user',
    password: 'invalid_password',
    expectedErrorMessage: 'Epic sadface: Username and password do not match any user in this service'   
    
 },

 {
    testCaseId: 'AUTH-003',
    title: 'Verify user is not able to login with empty username',
    username: '',
    password: 'secret_sauce',
    expectedErrorMessage: 'Epic sadface: Username is required'
 },
 {
    testCaseId: 'AUTH-004',
    title: 'Verify user is not able to login with empty password',
    username: 'standard_user',
    password: '',
    expectedErrorMessage: 'Epic sadface: Password is required'
 } 
] as const;