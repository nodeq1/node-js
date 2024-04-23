const {validationResult} = require("express-validator");


exports.validatorSigninMiddleware = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const array = errors.array();
       const  email = array.filter(error => error.path === 'email');
       const  passowrd = array.filter(error => error.path === 'password');
        return res.render('singin', { emailError: email , passwordError:passowrd });
        // return res.status(400).json({errors:errors.array()});
    }
    next()
}

exports.validatorLoginMiddleware = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const array = errors.array();
       const  email = array.filter(error => error.path === 'email');
       const  passowrd = array.filter(error => error.path === 'password');
        return res.render('login', { emailError: email , passwordError:passowrd });
        // return res.status(400).json({errors:errors.array()});
    }
    next()
}
exports.validatorConfirmationMiddleware = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('confirm', { errors:errors.array() });
        // return res.status(400).json({errors:errors.array()});
    }
    next()
}
