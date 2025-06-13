import Food from "../models/foodModels.js";
import fs from 'fs';


// Create new food
export const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        });
        await food.save();
        res.status(201).json({success: true, message: "Food added successfully"});
    } catch (err) {
        console.log(err);
        res.status(400).json({success: false, message: "Error" });
    }
};

// Get all foods
export const listFood = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json({success: true, data: foods});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Delete food
export const removeFood = async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await Food.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food deleted successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ success:false, message: "Error deleting food" });
    }
};

// Get single food by ID
export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: "Food not found" });
        res.json(food);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update food
export const updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFood) return res.status(404).json({ message: "Food not found" });
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

