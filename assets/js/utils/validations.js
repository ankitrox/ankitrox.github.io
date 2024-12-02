/**
 * Validation functions for form fields.
 */

/**
 * Validate the name field.
 * 
 * @param {string} name The name to validate.
 * @returns {object} The validation result.
 */
export function validateName(name) {
    // Trim whitespace from both ends
    name = name.trim();
    
    // Check if the name is a string, can contain spaces, and consists of up to 4 words
    const wordCount = name.split(/\s+/).length;
    const isValid = typeof name === "string" && /^[a-zA-Z\s]+$/.test(name) && wordCount <= 4;

    return isValid;
}

/**
 * Validate the email field.
 * 
 * @param {string} email The email to validate.
 * @returns {object} The validation result.
 */
export function validateEmail(email) {
    // Standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return isValid;
}

/**
 * Validate the phone number field.
 * 
 * @param {string} phone The phone number to validate.
 * @returns {object} The validation result.
 */
export function validatePhoneNumber(phone) {
    // Indian phone number validation: 10 digits.
    const phoneRegex = /^[6-9]\d{9}$/;
    const isValid = phoneRegex.test(phone);

    return isValid;
}

/**
 * Validate the amount field.
 * 
 * @param {number} amount The amount to validate.
 * @returns {object} The validation result.
 */
export function validateAmount(amount) {
    // Convert the amount to integer.
    const isInteger = Number.isInteger( parseInt( amount ) );
    const inRange = amount >= 1 && amount <= 100000;

    console.log( isInteger, inRange, amount );
    const isValid = isInteger && inRange;

    return isValid;
}

export const validatePaymentForm = (formData) => {
    const { name, email, phone, amount } = formData;

    if ( ! validateName( name ) ) {
        return new Error( 'Invalid Name.' );
    }

    if ( ! validateEmail( email ) ) {
        return new Error( 'Invalid Email.' );
    }

    if ( ! validatePhoneNumber( phone ) ) {
        return new Error( 'Invalid phone number.' );
    }

    if ( ! validateAmount( amount ) ) {
        return new Error( 'Amount should be between INR 1 to INR 1,00,000' );
    }

    return null;
};