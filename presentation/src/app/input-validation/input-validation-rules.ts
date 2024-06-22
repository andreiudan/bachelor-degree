export const INPUT_VALIDATION_RULES = {
    text: {
      minLength:2,
    },
    password: {
      minLength:8
    },
    regex: {
      alphabeticOnly: /^[a-zA-Z]+$/,
      hasUpperCase: /[A-Z]/,
      hasLowerCase: /[a-z]/,
      hasNumber: /\d/,
      hasSpecialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      hasAccentedAlphanumeric: /^[^!?@#$%^&*>()<+=\[\]{}:"'.,/\\~]*$/,
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      numberPattern: /^\d+(\.\d{1,2})?$/,
      namePattern: /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u,
      datePattern: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    }
  };
  