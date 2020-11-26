interface userFieldInterface {
  email?: string;
  password: string;
  phone: string;
}

export const fieldValidator = (options: userFieldInterface) => {
  if (options.email) {
    if (!options.email.includes('@')) {
      return [
        {
          field: 'email',
          message: 'email must include @',
        },
      ];
    }
    if (!options.email.includes('.')) {
      return [
        {
          field: 'email',
          message: 'incorrect email address',
        },
      ];
    }
  }
  if (!options.phone.includes('+')) {
    return [
      {
        field: 'phone',
        message: 'phone number must start with a plus sign',
      },
    ];
  }
  if (options.password.length <= 3) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 3 symbol',
      },
    ];
  }
  return false;
};
