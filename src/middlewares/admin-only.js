import jwt from "jsonwebtoken";

function adminOnly(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");

    res.status(401).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const role = jwtDecoded.role;
    if (role !== "admin") {
      res.status(403).json({
        result: "forbidden-approach",
        reason: "관리자만 사용할 수 있는 서비스입니다.",
      });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}

export { adminOnly };
