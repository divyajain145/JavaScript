const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: 'Admin created successfully' 
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.bosy.title;
    const description=req.bosy.description;
    const imageLink=req.bosy.imageLink;
    const price=req.bosy.price;
    const newCourse= await Course.create({
        title,
        description,
        imageLink,
        price
    })
    //console.log(newCourse);
    res.json({
        message: 'Course created successfully', courseId: newCourse
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});

module.exports = router;