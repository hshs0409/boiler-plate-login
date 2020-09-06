import express from "express";
import routes from "../routes";
import { auth } from "../middleware/auth";
import User from "../models/User";
import { json } from "body-parser";

const userRouter = express.Router();

userRouter.get("/hello", (req, res) => {
  res.send("hello world!!!");
});

userRouter.post(routes.signIn, (req, res) => {
  const {
    body: { email, password },
  } = req;

  User.findOne({ email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "패스워드가 일치하지 않습니다.",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // TOKEN COOKIE에 저장
        // Cookie의 Token 과 DB의 Token을 비교해서 계속 Auth 비교
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          message: "로그인 성공",
        });
      });
    });
  });
});

userRouter.post(routes.signUp, (req, res) => {
  const { body } = req;

  const user = new User(body);

  user.save((err, user) => {
    if (err) return res.json({ signUpSuccess: false, err });
    return res.status(200).json({ signUpSuccess: true });
  });
});

userRouter.get(routes.logout, auth, (req, res) => {
  const {
    user: { _id },
  } = req;
  User.findByIdAndUpdate({ _id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

userRouter.get(routes.auth, auth, (req, res) => {
  const {
    user: { _id, name, email, token },
  } = req;
  res.status(200).json({
    _id,
    name,
    email,
    token,
    isAuth: true,
  });
});

userRouter.post(routes.profile, auth, (req, res) => {
  const {
    body: { name, email, password },
    user: { _id },
  } = req;

  User.findByIdAndUpdate({ _id }, { name, email, password }, (err, user) => {
    if (err) return json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

export default userRouter;
