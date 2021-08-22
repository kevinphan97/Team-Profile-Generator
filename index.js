const render = require("./src/htmloutput")
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

// path used to create directory named "dist" and along with render to create HTML file
const path = require("path");
const htmlDirectory = path.resolve(__dirname, "dist")
const htmlCreator = path.join(htmlDirectory, "team.html");

const teamMembers = [];
const idArray = [];

const questions = {
    Engineer: [
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter a valid name.";
                }
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's ID?",
            validate: answer => {
                const pass = answer.match(
                    /^([1-9][0-9]{0,1})$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is used. Please enter another.";
                    }
                    else {
                        return true;
                    }
                }
                return "Please enter an ID number from 1-99";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid email.";
                }
            }
        },
        {
            type: "input",
            name: "engineerGit",
            message: "What is the engineer's Github?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter a valid Github username.";
                }
            }
        },
        {
            type: "list",
            name: "addAnother",
            message: "Do you wish to add another employee",
            choices: ["yes", "no"]
        },
    ],

    Intern: [
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter a valid name.";
                }
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?",
            validate: answer => {
                const pass = answer.match(
                    /^([1-9][0-9]{0,1})$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is used. Please enter another.";
                    }
                    else {
                        return true;
                    }

                }
                return "Please enter an ID number from 1-99";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid email.";
                }
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter a valid name for the intern's school.";
                }
            }
        },
        {
            type: "list",
            name: "addAnother",
            message: "Do you wish to add another employee",
            choices: ["yes", "no"]
        },
    ]
};

function createManager() {       
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Please enter the manager's name.",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }    
                else {
                    return "Please enter a valid name.";
                }
            }
        },    
        {
            type: "input",
            name: "managerId",
            message: "Please enter the manager's ID.",
            validate: answer => {
                const pass = answer.match(
                    /^([1-9][0-9]{0,1})$/
                );
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a number from 1-99.";
                }
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Please enter the manager's Email.",
            validate: answer => {
                const pass = answer.match (
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid Email.";
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the manager's office number.",
            validate: answer => {
                const pass = answer.match (
                    /^([1-9][0-9]{0,1})$/
                );
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid office number.";
                }
            }
        }
    ])
    .then(answer => {
        const manager = new Manager (answer.managerName, answer.managerId, answer.managerEmail, answer.officeNumber);
        teamMembers.push(manager);
        idArray.push(answer.managerId);
        addEmployee();
    })
};

const chooseMember = [
    {
        type: "list",
        name: "memberJob",
        message: "What job would you like to add?",
        choices: ["Engineer", "Intern",]
    }
];

function addEmployee() {
    inquirer.prompt(chooseMember)
        .then(answer => {
            if (answer.memberJob === "Engineer") {
                inquirer.prompt(questions.Engineer)
                    .then(answer => {
                        const engineer = new Engineer (answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGit);
                        teamMembers.push(engineer);
                        idArray.push(answer.engineerId);
                        if (answer.addAnother === "yes") {
                            addEmployee();
                        }
                        else {
                            createHTML();
                        };
                    });
            }
            else if (answer.memberJob === "Intern"){
                inquirer.prompt(questions.Intern)
                    .then(answer => {
                        const intern = new Intern (answer.internName, answer.internId, answer.internEmail, answer.internSchool);
                        teamMembers.push(intern);
                        idArray.push(answer.internId);
                        if (answer.addAnother === "yes") {
                            addEmployee();
                        }
                        else {
                            createHTML();
                        }
                    })
            }
        })
}
     
createManager();

function createHTML() {
    if (!fs.existsSync(htmlCreator)){
        fs.writeFileSync(htmlCreator, render(teamMembers), "utf-8");
    }
}
