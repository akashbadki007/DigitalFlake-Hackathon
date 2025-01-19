const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { sendEmail } = require("../Utils/email");
const crypto = require("crypto");

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        // Create a JWT token for the user (optional)
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.cookies("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        // Send a response with the token
        res.status(200).json({
            success: true,
            token,
            msg: "Login successful"
        });

        // Optionally, you can send the login notification email
        await sendEmail(
            email,
            "Login Notification",
            `<h3>Hi Admin,</h3><p>We noticed a login to your DigitalFlake Admin Dashboard account.</p>`
        );

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error during login" });
    }
};



// Forget Pssword
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, msg: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Save token in user document with expiration (15 minutes)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send reset email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(
            email,
            "Password Reset Request",
            `<p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>If you did not request this, please ignore this email.</p>`
        );

        res.status(200).json({ success: true, msg: "Password reset email sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};
