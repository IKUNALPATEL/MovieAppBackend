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
        authors: [authorSchema]   // {type : authorSchema, required : true}
    });

    const Course = mongoose.model('Course',courseSchema);

    async function createCourse(name,authors){
        const course = new Course({
            name,
            authors
        });
        const result = await course.save();
        // console.log(result);
    }

    async function addAuthor(courseId,author){
        const course = await Course.findById(courseId);
        course.authors.push(author);
        course.save();
    }

    async function listCourse(){
        const courses = await Course
                        .find()
                        .lean();
        console.log(courses);
    }

    async function updateCourse(courseId){
        // const course = await Course.update({_id : courseId},{$set : {"author.name" : "Anek"}});
        const course = await Course.update({_id:courseId},{$unset : {"author" : ""}});
        // const course = await Course.findById(courseId);
        // course.author.name = "Mosh Hemadani";
        // course.save();
    }


    async function removeAuthor(authorId,courseId){
        const course = await Course.findById(courseId);
        const author = course.authors.id(authorId);
        author.remove();
        course.save();
    }

    

//createCourse("Node", new Author({ name : "Hari" }));

// setTimeout(listCourse,5000);
 
// updateCourse("610369da1170cc55002b87c9");
 
//  createCourse("Node", [
//     new Author({ name : "Ram" }),
//     new Author({ name : "Hari" })
//  ]);

// addAuthor("61036ef780242347e04dd3f8",new Author({name:"Kapal"}));

// removeAuthor("6103706ed460ef3888f5c177","61036ef780242347e04dd3f8");

listCourse();
