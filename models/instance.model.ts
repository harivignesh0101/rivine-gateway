import mongoose, { Schema } from "mongoose";

const InstanceSchema = new Schema(
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
        provider: {
            type: String,
            required: true,
        },
        config: {
            authType: {
                type: String,
                default: "none",
            },
            kongAdminUrl: {
                type: String,
            },
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
InstanceSchema.index({ orgId: 1, name: 1 }, { unique: true });

const Instance = mongoose.models.Instance || mongoose.model("Instance", InstanceSchema);

export default Instance;
