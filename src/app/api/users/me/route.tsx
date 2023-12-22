import { getTokenId } from "@/helpers/getTokendData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request: NextRequest) {
  try {
    const _id = await getTokenId(request);
    const user = await User.findOne({ _id: _id }).select(
      "-password -isAdmin -verifyToken -verifyTokenExpiry -forgotToken -forgotTokenExpiry"
    );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong!" },
      {
        status: 500,
      }
    );
  }
}
