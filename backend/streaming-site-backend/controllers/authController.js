
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const { createTable, insertRecord, checkRecordExists } = require('../utils/sqlFunctions');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email or Password fields cannot be empty!" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
        userId: uuidv4(),
        email,
        password: hashedPassword
    };
    try {
        await createTable(userSchema);
        const userAlreadyExists = await checkRecordExists('users', 'email', email);
        if (userAlreadyExists) {
            res.status(409).json({ message: "Email already exists" })
        }
        else {
            console.log(userAlreadyExists, 'userAlreadyExists');
            await insertRecord("users", user);
            res.status(201).json({ message: "User created successfully" });
        }
    }
    catch (err) {
        console.log(err, 'err while registering user');
        res.status(500).json({ error: "An error occurred while registering the user." });

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email or Password fields cannot be empty!" })
    }
    try {
        const existingUser = await checkRecordExists('users', 'email', email);
        if (existingUser) {
            if (!existingUser.password) {
                res.status(401).json({ message: 'Invalid credentials' })
            }
            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            )
            if (passwordMatch) {
                res.status(200).json({
                    userId: existingUser.userId,
                    email: existingUser.email,
                    access_token: generateAccessToken(existingUser.userId)
                })

            }
            else {
                res.status(401).json({ error: "Invalid Credentials" })
            }
        }
        else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

}

module.exports = {
    register,
    login,
}