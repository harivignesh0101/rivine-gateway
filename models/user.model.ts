import mongoose, { Schema } from "mongoose";

// Define User schema
const UserSchema = new Schema(
    {
        externalId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        photo: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        },
    },
    {
        timestamps: false, // Disable Mongoose default timestamps handling
    }
);

// Convert createdAt and updatedAt to Unix timestamps (seconds)
UserSchema.pre("save", function (next) {
    const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
    if (this.isNew) {
        this.createdAt = currentTime; // Set createdAt for new documents
    }
    this.updatedAt = currentTime; // Always update updatedAt before save
    next();
});

// Create or use the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
