"use server";

import Project from '@models/project.model';
import { connect } from '@lib/db';
import { auth } from "@clerk/nextjs/server"


export async function getProject(instanceId: string) {
    try {
        await connect();
        const { orgId, userId } = await auth();
        const query = { orgId: orgId ? orgId : userId, _id: instanceId };
        const project = await Project.findOne(query, 'status name createdAt updatedAt -_id');
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error("Error fetching instances:", error);
        throw new Error("Failed to fetch instances");
    }
}

/**
 * Get instances based on organization ID or user ID.
 * @returns Array of instance documents.
 */
export async function getProjects() {
    try {
        await connect();
        const { orgId, userId } = await auth();
        const query = { orgId: orgId ? orgId : userId };
        const projects = await Project.find(query, 'status name -_id');
        console.log(projects)
        return JSON.parse(JSON.stringify(projects));
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
export async function createProject(payload: any) {
    try {
        await connect();
        const { orgId, userId } = await auth();
        const projectData = { orgId: orgId ? orgId : userId, createdBy: userId, ...payload };
        const project = new Project(projectData);
        await project.save();
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
    }
}
