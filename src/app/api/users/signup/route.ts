import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Ensure database connection
await connect();

/**
 * Handles the POST request for user signup.
 *
 * This function processes the incoming request to create a new user. It validates
 * the request body, checks if the user already exists, hashes the password, and
 * saves the new user to the database. If the user already exists, it returns an
 * error response. In case of any other errors, it returns a 500 status with the
 * error message.
 *
 * @param {NextRequest} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A JSON response indicating the result of the operation.
 *
 * @throws {Error} If there is an issue with the request processing or database operations.
 */

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log("Request Body for signup", reqBody);

        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // hash the password
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
        console.log("Error in signup route:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}
