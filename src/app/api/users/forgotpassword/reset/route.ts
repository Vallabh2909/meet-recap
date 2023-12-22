import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, user } = reqBody;

    const fuser = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!fuser) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    fuser.password = hashedPassword;
    fuser.forgotPasswordToken = undefined;
    fuser.forgotPasswordTokenExpiry = undefined;
    await fuser.save();
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
