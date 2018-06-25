const Joi = require('joi');
const express = require ('express');
const app = express();

app.use(express.json());

const courses=[
    {id:1, name:'Kok Dara'},
    {id:2, name:'Chan Bopha'},
    {id:3, name:'Vong Kiri'},
    {id:4, name:'Yus Sak'},
]
app.get('/',(req,res)=>{
    res.send('Hello Word!');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res) =>{
    const { error } = validateCourse(req.body); //result.error
    //if invalid , return 400 bad request
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course={
        id:courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');

    const { error } = validateCourse(req.body);    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});


function validateCourse(course){
      const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

})














app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
const port = process.env.PORT || 3000;
app.listen({port},()=>console.log(`Listening on port ${port}`));