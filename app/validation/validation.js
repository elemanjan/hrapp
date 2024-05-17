const validation = {
  /**
   * Название магазина при регистрации
   */
  tenantName: {
    presence: {
      message: '^Пожалуйста введите название заведения',
      allowEmpty: false,
    },
  },
  /**
   * Номер телефона при регистрации
   */
  phoneNumber: {
    presence: {
      message: '^Пожалуйста введите номер телефона',
      allowEmpty: false,
    },
  },
  /**
   * Саб домен при регистрации
   */
  subDomain: {
    presence: {
      message: '^Пожалуйста введите саб-домен',
      allowEmpty: false,
    },
    format: {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: '^Поле может содержать a-z и 0-9',
    },
    length: {
      minimum: 2,
      message: '^Нужно минимум 2 символа',
    },
  },
  /**
   * Имя пользователя при регистрации
   */
  username: {
    presence: {
      message: '^Пожалуйста введите имя пользователя',

      allowEmpty: false,
    },
    length: {
      minimum: 3,
      message: '^Имя пользователя не может быть меньше 3 символов',
    },
  },
  /**
   * Пароль при регистрации
   */
  password: {
    presence: {
      message: '^Пожалуйста введите пароль',
      allowEmpty: false,
    },
    length: {
      minimum: 6,
      message: '^Пароль не может быть меньше 6 символов',
    },
  },
  /**
   * Новый пароль при регистрации
   */
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: '^Пожалуйста подтвердите пароль',
    },
    equality: {
      attribute: 'password',
      message: '^Пароли не совпадают',
    },
    length: {
      minimum: 6,
      message: '^Пароль не может быть меньше 6 символов',
    },
  },
  /**
   * Пароль при забыли пароль
   */
  forgetPassword: {
    presence: {
      message: '^Пожалуйста введите пароль',
      allowEmpty: false,
    },
    length: {
      minimum: 8,
      message: '^Пароль не может быть меньше 8 символов',
    },
  },
  /**
   * Новый пароль при забыли пароль
   */
  forgetConfirmPassword: {
    presence: {
      allowEmpty: false,
      message: '^Пожалуйста подтвердите пароль',
    },
    equality: {
      attribute: 'forgetPassword',
      message: '^Пароли не совпадают',
    },
    length: {
      minimum: 8,
      message: '^Пароль не может быть меньше 8 символов',
    },
  },

  /**
   * Почта
   */
  email: {
    email: {
      message: '^Пожалуйста введите корректный email',
    },
  },
  /**
   * Имя
   */
  name: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
  },
  /**
   * Цена товара
   */
  price: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
  },
  /**
   * Минимум товара
   */
  minimum: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
  },
  /**
   * Максимум товара
   */
  maximum: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
  },
  /**
   * Обязательное поле
   */
  required: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
  },
  /**
   * Забыли пароль
   */
  forgetCode: {
    presence: {
      allowEmpty: false,
      message: '^Это поле обязательно',
    },
    length: {
      minimum: 5,
      maximum: 5,
      message: '^Код должен состоять из 5 цифр',
    },
  },
};

export default validation;
