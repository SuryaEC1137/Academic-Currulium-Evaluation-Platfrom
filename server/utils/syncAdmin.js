const Admin = require('../models/Admin');

const syncAdmin = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            console.log('Admin credentials not set in .env. Skipping sync.');
            return;
        }

        const user = await Admin.findOne({ email });

        if (!user) {
            console.log('[Startup] Creating Admin User in ADMINS collection...');
            await Admin.create({
                name: 'Administrator',
                email,
                password,
                role: 'admin'
            });
            console.log('[Startup] Admin created successfully in ADMINS collection.');
        } else {
            // Only update if password or name has changed
            const isMatch = await user.matchPassword(password);
            if (!isMatch || user.name !== 'Administrator') {
                console.log('[Startup] Admin credentials out of sync. Updating...');
                user.password = password;
                user.name = 'Administrator';
                await user.save();
                console.log('[Startup] Admin credentials updated.');
            } else {
                console.log('[Startup] Admin credentials verified (Up to date).');
            }
        }

    } catch (error) {
        console.error('[Startup] Error syncing admin:', error);
    }
};

module.exports = syncAdmin;
