import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        orgId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "stale"],
            default: "active",
        },
        createdBy: {
            type: String,
        },
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now()) }
    }
);

// Add a compound index to enforce uniqueness for orgId + name
ProjectSchema.index({ orgId: 1, name: 1 }, { unique: true });

const ProjectModel = mongoose.models.Project || mongoose.model("Instance", ProjectSchema);

export default ProjectModel;
