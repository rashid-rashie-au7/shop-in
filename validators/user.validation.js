
exports.userSignupValidator =(req,res,next)=>{
    req.check('firstname', 'First Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
          min: 4,
          max: 32
      });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
        .withMessage('Password must contain at least one upper case letter, one lower case letter,one numeric digit and one special character. ');
   
    req.check('confirmpassword','Password Must be Same')
        .matches(req.body.password)
   
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
}

