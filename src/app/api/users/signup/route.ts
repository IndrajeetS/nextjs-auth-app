import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Ensure database connection
await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser,
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}