import {NextRequest, NextResponse} from 'next/server';
import {getAuth} from '@clerk/nextjs/server';
import Instance from "@models/instance.model";
import {connect} from "@lib/db";

export async function GET(req: NextRequest) {
    try {
        const {orgId, userId} = getAuth(req)
        await connect();
        console.log(orgId);
        const instances = await Instance.find({ orgId: orgId ? orgId : userId }, 'config status name createdAt updatedAt provider -_id');

        return NextResponse.json({ instances });
    } catch (error) {
        console.error(error);
    }
}

export async function POST(req: NextRequest) {
    console.log("hello")
    try {
        const {orgId, userId, sessionClaims} = getAuth(req)
        console.log(sessionClaims)
        await connect();
        let payload = await req.json();

        payload = {orgId: orgId ? orgId : userId, createdBy: userId, ...payload}

        const instance = new Instance(payload);
        await instance.save();

        return NextResponse.json({ message: "Instance created successfully", instance });
    } catch (error) {
        console.error("Error creating instance:", error);
        return NextResponse.json({ error: "Failed to create instance" }, { status: 500 });
    }
}
