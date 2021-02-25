const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArr = [];

const teamRoster =[
    {
        type: "list",
        name: "role",
        message: "What team member role are you adding?",
        choices: ["Manager", "Intern", "Engineer", "Done"]
}];

const promptList = () => {
    inquirer.prompt(teamRoster).then(data => {
        switch (data.role) {
            case "Manager":
                renderManager();
                break;
            case "Engineer":
                renderEngineer();
                break;
            case "Intern":
                renderIntern();
                break;
            default:
                renderHtml();
        }
    });
};
        
const managerInfo = [{
    type: "input",
    name: "manager_name",
    message: "Please enter the manager's name"
},
{
    type: "input",
    name: "manager_id",
    message: "What is the manager's id?"
},
{
    type: "input",
    name: "manager_email",
    message: "What is the manager's email?"
},
{
    type: "input",
    name: "manager_officeNumber",
    message: "What is the manager's office number?"
}
];


const renderManager = () => {
    inquirer.prompt(managerInfo).then(answer => {
        console.log(answer);
        teamArr.push(new Manager(answer.manager_name, answer.manager_id, answer.manager_email, answer.manager_officeNumber));
        promptList();
    });
};

const engineerInfo = [{
    type: "input",
    name: "engineer_name",
    message: "Please enter the engineer's name"
},
{
    type: "input",
    name: "engineer_id",
    message: "What is the engineer's id?"
},
{
    type: "input",
    name: "engineer_email",
    message: "What is the engineer's email?"
},
{
    type: "input",
    name: "engineer_github",
    message: "What is the engineer's github profile?"
}
];

const renderEngineer = () => {
    inquirer.prompt(engineerInfo).then(answer => {
        console.log(answer);
        teamArr.push(new Engineer(answer.engineer_name, answer.engineer_id, answer.engineer_email, answer.engineer_github));
        promptList();
    });
};

const internInfo = [{
    type: "input",
    name: "intern_name",
    message: "Please enter the intern's name"
},
{
    type: "input",
    name: "intern_id",
    message: "What is the intern's id?"
},
{
    type: "input",
    name: "intern_email",
    message: "What is the intern's email?"
},
{
    type: "input",
    name: "intern_school",
    message: "What is the intern's school?"
}
];

const renderIntern = () => {
    inquirer.prompt(internInfo).then(answer => {
        console.log(answer);
        teamArr.push(new Intern(answer.intern_name, answer.intern_id, answer.intern_email, answer.intern_school));
        promptList();
    });
};

const renderHtml = () => {
    console.log('Created new HTML');
    console.log(render(teamArr));
    render(teamArr);
    fs.writeFile('outputs/team.html', render(teamArr), function(err){
        if(err) throw err;
    })
};

promptList();
