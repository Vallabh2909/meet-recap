import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { type, data, id: _id } = reqBody;
    const user = await User.findOne({ _id });
    console.log(user);
    if (type === "EMAIL") {
      user.email = data;
      await user.save();
    } else if (type === "USERNAME") {
      user.username = data;
      await user.save();
    } else if (type === "PASSWORD") {
      const validPassword = await bcryptjs.compare(data, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { message: "Wrong Password!" },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      {
        success: true,
      },
      { status: 202 }
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
