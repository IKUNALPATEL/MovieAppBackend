const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/testing')
    .then(()=>console.log('Connected...'))
    .catch((err)=>console.error("Couldnot connect to mongoDB",err));

const authorSchema = new mongoose.Schema({
    name:String,
    bio:String,
    webSite:String
});

const Author = mongoose.model('Author',authorSchema);

const courseSchema = new mongoose.Schema({
    name:String,
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Author"
    }
});

const Course = mongoose.model('Course',courseSchema);

async function createAuthor(name,bio,webSite){
    const author = new Author({
        name,
        bio,
        webSite
    });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name,author){
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}

async function listCourse(){
    const courses = await Course
                    .find()
                    .populate('author','name -_id')
                    .select('name author')
                    .lean();
    console.log(courses);
}

// createAuthor("kunal","dev","google.com");
// createCourse("Node","6102dead0f1fef58d8c7ad63");
listCourse();
