import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";
import userRouter from "./route/userRouter";
import commentRouter from "./route/commentRouter";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected success ✅✅"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes.users, userRouter);
app.use(routes.comment, commentRouter);

app.listen(PORT, () =>
  console.log(`Server Connect Success in port ${PORT} ✅✅`)
);

// app.post("/api/users/signUp", (req, res) => {
//   const { body } = req;

//   const user = new User(body);

//   user.save((err, user) => {
//     if (err) return res.json({ signUpSuccess: false, err });
//     return res.status(200).json({ signUpSuccess: true });
//   });
// });

// app.post("/api/users/login", (req, res) => {
//   const {
//     body: { email, password },
//   } = req;

//   User.findOne({ email }, (err, user) => {
//     if (!user) {
//       return res.json({
//         loginSuccess: false,
//         message: "이메일에 해당하는 유저가 없습니다.",
//       });
//     }

//     user.comparePassword(password, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: "패스워드가 일치하지 않습니다.",
//         });

//       user.generateToken((err, user) => {
//         if (err) return res.status(400).send(err);

//         // TOKEN COOKIE에 저장
//         // Cookie의 Token 과 DB의 Token을 비교해서 계속 Auth 비교
//         res.cookie("x_auth", user.token).status(200).json({
//           loginSuccess: true,
//           userId: user._id,
//           message: "로그인 성공",
//         });
//       });
//     });
//   });
// });

// app.get("/api/hello", (req, res) => {
//   res.send("hello world!!!");
// });

// app.get("/api/users/auth", auth, (req, res) => {
//   const {
//     user: { _id, name, email, token },
//   } = req;
//   res.status(200).json({
//     _id,
//     name,
//     email,
//     token,
//     isAuth: true,
//   });
// });

// app.get("/api/users/logout", auth, (req, res) => {
//   const {
//     user: { _id },
//   } = req;
//   User.findByIdAndUpdate({ _id }, { token: "" }, (err, user) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });
