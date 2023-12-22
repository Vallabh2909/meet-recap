import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //find a user a with same email
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "Email Already exist" },
        { status: 401 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    //Send email

    await SendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
