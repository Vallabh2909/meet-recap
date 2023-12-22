import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { SendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    console.log(user);
    await SendEmail({ email, emailType: "RESET", userId: user._id });
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);
    // user.password = hashedPassword;
    // user.forgotPasswordToken = undefined;
    // user.forgotPasswordTokenExpiry = undefined;
    // await user.save();
    return NextResponse.json({
      message: "A link sent to email",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { token } = reqBody;

//     const user = await User.findOne({
//       verifyToken: token,
//       verifyTokenExpiry: { $gt: Date.now() },
//     });
//     if (!user) {
//       return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
//     }
//     user.isVerfied = true;
//     user.verifyToken = undefined;
//     user.verifyTokenExpiry = undefined;
//     await user.save();
//     return NextResponse.json({
//       message: "Email verified successfully",
//       success: true,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
