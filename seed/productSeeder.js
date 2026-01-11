require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const categories = await Category.find();

        function getCategoryId(name) {
            const cat = categories.find(
                c => c.name.trim().toLowerCase() === name.toLowerCase()
            );
            if (!cat) throw new Error(`Category not found: ${name}`);
            return cat._id;
        }

        const ELECTRONICS_ID = getCategoryId("Electronics");
        const CLOTHING_ID = getCategoryId("Clothing");
        const HOME_ID = getCategoryId("Home Appliances");
        const SPORTS_ID = getCategoryId("Sports & Outdoors");

        const products = [
            {
                title: "iPhone 14 Pro",
                description: "Apple iPhone 14 Pro with A16 Bionic chip, 128GB storage and Pro camera system.",
                price: 1200,
                oldPrice: 1350,
                salePrice: 1150,
                stockCount: 25,
                cargoWeight: 0.4,
                category: ELECTRONICS_ID,
                tags: ["iphone", "apple", "smartphone"],
                imageURLs: ["https://picsum.photos/600/600?1"],
                reviewCount: 48,
                likeCount: 120,
                averageRating: 4.8
            },

            {
                title: "Samsung Galaxy S23",
                description: "Samsung Galaxy S23 with AMOLED display and high-performance processor.",
                price: 980,
                stockCount: 30,
                cargoWeight: 0.38,
                category: ELECTRONICS_ID,
                tags: ["samsung", "android", "phone"],
                imageURLs: ["https://picsum.photos/600/600?2"],
                reviewCount: 31,
                likeCount: 76,
                averageRating: 4.6
            },

            {
                title: "Men’s Casual Sneakers",
                description: "Breathable lightweight sneakers for daily wear.",
                price: 85,
                salePrice: 75,
                stockCount: 60,
                cargoWeight: 1.2,
                category: CLOTHING_ID,
                tags: ["shoes", "men", "sneakers"],
                imageURLs: ["https://picsum.photos/600/600?7"],
                reviewCount: 19,
                likeCount: 44,
                averageRating: 4.4
            },

            {
                title: "Non-Stick Cooking Pan 28cm",
                description: "Durable non-stick pan for everyday cooking.",
                price: 28,
                stockCount: 100,
                cargoWeight: 1.5,
                category: HOME_ID,
                tags: ["kitchen", "pan", "cooking"],
                imageURLs: ["https://picsum.photos/600/600?13"],
                reviewCount: 7,
                likeCount: 18,
                averageRating: 4.2
            },

            {
                title: "Professional Football",
                description: "High-quality football for training and matches.",
                price: 30,
                stockCount: 80,
                cargoWeight: 0.45,
                category: SPORTS_ID,
                tags: ["football", "sport", "training"],
                imageURLs: ["https://picsum.photos/600/600?19"],
                reviewCount: 14,
                likeCount: 31,
                averageRating: 4.5
            }
            // 👉 You can paste the rest of your products here safely
        ];

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("✅ Products seeded successfully");
        process.exit();

    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seedProducts();
