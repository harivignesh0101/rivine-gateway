"use server";

import Instance from '@models/instance.model';
import { connect } from '@lib/db';
import { auth } from "@clerk/nextjs/server"

/**
 * Get instances based on organization ID or user ID.
 * @returns Array of instance documents.
 */
export async function getInstances() {
    try {
        await connect();
        const { orgId, userId } = await auth();
        console.log(orgId, userId)
        const query = { orgId: orgId ? orgId : userId };
        const ff = await Instance.find(query, 'config status name createdAt updatedAt provider -_id');
        console.log(ff)
        return JSON.parse(JSON.stringify(ff));
    } catch (error) {
        console.error("Error fetching instances:", error);
        throw new Error("Failed to fetch instances");
    }
}

/**
 * Create a new instance.
 * @param payload - The payload for the instance.
 * @returns The created instance document.
 */
export async function createInstance(payload: any) {
    try {
        await connect();
        const { orgId, userId } = await auth();
        const instanceData = { orgId: orgId ? orgId : userId, createdBy: userId, ...payload };
        const instance = new Instance(instanceData);
        await instance.save();
        return JSON.parse(JSON.stringify(instance));
    } catch (error) {
        console.error("Error creating instance:", error);
        throw new Error("Failed to create instance");
    }
}
