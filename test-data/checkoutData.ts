export const checkoutData = {
    firstName: 'Taylor',
    lastName: 'Tester',
    postalCode: '90210',
} as const;

export const checkoutValidationCases = [
    {
        testCaseId: 'CHK-003',
        title: 'First Name Is Mandatory',
        firstName: '',
        lastName: checkoutData.lastName,
        postalCode: checkoutData.postalCode,
        expectedErrorMessage: 'Error: First Name is required',
    },
    {
        testCaseId: 'CHK-004',
        title: 'Last Name Is Mandatory',
        firstName: checkoutData.firstName,
        lastName: '',
        postalCode: checkoutData.postalCode,
        expectedErrorMessage: 'Error: Last Name is required',
    },
    {
        testCaseId: 'CHK-005',
        title: 'ZIP/Postal Code Is Mandatory',
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        postalCode: '',
        expectedErrorMessage: 'Error: Postal Code is required',
    },
] as const;