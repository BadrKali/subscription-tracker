import mongoose from "mongoose";


const subscritionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    price : {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        min: [0, "Price must be greater than 0"],
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "USD",
        enum: ["USD", "EUR", "GBP"],
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "politics", "business", "technology", "entertainment"],
        required: [true, "Category is required"],
    },
    payment: {
        type: String,
        enum: ["credit card", "paypal", "stripe"],
        required: [true, "Payment is required"],
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate : {
            validator: function(v) {
                return v <= new Date();
            },
            message: "Start date must be greater than today",
        },
    },
    renwalDate: {
        type: Date,
        required: [true, "Renewal date is required"],
        validate : {
            validator: function(v) {
                return v > this.startDate;
            },
            message: "Renewal date must be greater than start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true,
    },

}, { timestamps: true });