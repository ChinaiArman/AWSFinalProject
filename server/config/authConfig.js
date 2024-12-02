// FUNCTIONS
const isSignedIn = async (req, res, next) => {
    console.log(`In isSignedIn: ${JSON.stringify(req.session)}`)
    if (!req.session.userId) {
        res.status(401).json({ "error": "User is not signed in; session" });
        return;
    }
    // check if user is in database
    const db = req.db;
    const user = await db.getUserById(req.session.userId);
    if (!user) {
        res.status(401).json({ "error": "User is not signed in; db" });
        return;
    }
    next();
}

const isVerified = async (req, res, next) => {
    const db = req.db;
    const user = await db.getUserById(req.session.userId);
    if (user.is_verified === 1) {
        res.status(401).json({ "error": "User is not verified" });
        return;
    }
    next();
}

const isStudent = async (req, res, next) => {
    const db = req.db;
    const user = await db.getUserById(req.session.userId);
    if (user.role !== 0) {
        res.status(401).json({ "error": "User is not a student" });
        return;
    }
    next();
}

const isFaculty = async (req, res, next) => {
    const db = req.db;
    const user = await db.getUserById(req.session.userId);

    if (user.role === 0) {
        res.status(401).json({ "error": "User is not a faculty member" });
        return;
    }
    next();
}

const isAdmin = async (req, res, next) => {
    const db = req.db;
    const user = await db.getUserById(req.session.userId);
    if (user.role !== 2) {
        res.status(401).json({ "error": "User is not an admin" });
        return;
    }
    next();
}


// EXPORTS
export { isSignedIn, isVerified, isStudent, isFaculty, isAdmin };