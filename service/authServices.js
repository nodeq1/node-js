const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/UserModels");
const confirmSchema = require("../models/confirmModels");

exports.singUp = asyncHandler(async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kingsrt315@gmail.com", // البريد الإلكتروني الذي سيُرسل منه رمز التأكيد
      pass: "yaqu gjfx hluk jhar", // كلمة مرور البريد الإلكتروني
    },
  });

  const randomNumber = crypto.randomInt(100000, 1000000);
  const confirmationCode = randomNumber.toString();

  // إرسال رمز التأكيد عبر البريد الإلكتروني
  const mailOptions = {
    from: "kingsrt315@gmail.com", // البريد الإلكتروني الذي سيُرسل منه
    to: req.body.email, // بريد المستخدم الذي قام بالتسجيل
    subject: "Confirm registration",
    text: `confirmation code: ${confirmationCode}`,
    //   timeout: 10000, // زيادة وقت انتظار الاتصال (بالمللي ثانية)
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      // return res.status(500).send("حدثت مشكلة أثناء إرسال رمز التأكيد.");
      return Promise.reject(new Error("حدثت مشكلة أثناء إرسال رمز التأكيد."));
    }
    await confirmSchema
      .create({ email: req.body.email, confirm: confirmationCode })
      .then(() => {
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        res.redirect("/confirm");
      });
  });

  // await User.create({
  //   email: req.body.email,
  //   password: req.body.password,
  // }).then((result) => {
  //   res.redirect("home");
  // });

  // // const tokin = jwt.sign({ email: users.email }, process.env.JTW_SECURE_KEYS, {
  // //   expiresIn: process.env.EXPIRESIN,
  // // });

  // res.status(201).json({ data: users });
});

exports.confirmation = asyncHandler(async (req, res) => {
  // التحقق من وجود البريد الإلكتروني وكلمة المرور في req.session
  // if (!req.session.email || !req.session.password) {
  //   return res
  //     .status(400)
  //     .json({ error: "بريد إلكتروني أو كلمة مرور غير متاحة." });
  // }

  await User.create({
    email: req.session.email,
    password: req.session.password,
    active: true,
}).then((result) => {
    res.render("home" ,{active:true});
});

  // const tokin = jwt.sign({ email: users.email }, process.env.JTW_SECURE_KEYS, {
  //   expiresIn: process.env.EXPIRESIN,
  // });
});

exports.login = asyncHandler(async (req, res, next) => {
  const users = await User.findOne({ email: req.body.email }).then((result) => {
    res.render("home",{active:true});
  });

  // const tokin = jwt.sign({ email: users.email }, process.env.JTW_SECURE_KEYS, {
  //   expiresIn: process.env.EXPIRESIN,
  // });

  // res.status(201).json({ data: users, tokin });
  // return res.status(200).send('تم إرسال رمز التأكيد بنجاح. يرجى التحقق من بريدك الإلكتروني.');
});





exports.logout=asyncHandler (async (req,res)=>{
  try {
    // ابحث عن المستخدم باستخدام بريد الجلسة
    const user = await User.findOne({ email: req.session.email });

    // تحديث قيمة الـ active إلى false إذا وجد المستخدم
    if (user) {
        user.active = false;
        await user.save();
    }

    // قم بتسجيل الخروج من الجلسة أو أي عمليات إضافية
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        // قم بتوجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
        res.redirect('/login');
    });
} catch (error) {
    console.error('Error updating user active status:', error);
    res.status(500).send('Internal Server Error');
}
})