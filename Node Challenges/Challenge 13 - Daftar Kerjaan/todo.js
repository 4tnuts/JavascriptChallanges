const fs = require('fs');
const args = process.argv;
let dataObject = JSON.parse(fs.readFileSync('todoData.json'));
const saveData = (data) => {
    fs.writeFileSync('todoData.json', JSON.stringify(data, null, 3));
};
let number = parseInt(args[3] - 1);



const help = () => {
    console.log(`>>> JS TODO <<< \n`);
    console.log(`$ Node todo.js <command>`);
    console.log(`$ Node todo.js list`);
    console.log(`$ Node todo.js task <task_id>`);
    console.log(`$ Node todo.js add <task_content>`);
    console.log(`$ Node todo.js delete <task_id>`);
    console.log(`$ Node todo.js complete <task_id>`);
    console.log(`$ Node todo.js uncomplete <task_id>`);
    console.log(`$ Node todo.js list:outstanding asc|desc`);
    console.log(`$ Node todo.js list:complete asc|desc`);
    console.log(`$ Node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>`);
    console.log(`$ Node todo.js filter: <tag_name>`);
}


if (args[2] === undefined) {
    help();
} else {
    let words = args[2].split(':');
    if (words[0] === 'filter') {
        for (let i = 0; i < dataObject.length; i++) {
            for (let j = 0; j < dataObject[i].tags.length; j++) {
                if (words[1] === dataObject[i].tags[j]) {
                    console.log(`${i + 1}. ${dataObject[i].complete === false ? '[ ]':'[x]'} ${dataObject[i].task}`);
                }
            }
        }
    } else if (args[2] === 'add') {
        const namaTask = args.slice(3).join(' ');
        dataObject.push({
            task: namaTask,
            complete: false,
            tags: []
        });
        saveData(dataObject);
        console.log(`Task '${namaTask}' has been added `);
    } else if (args[2] === 'list' && args.length <= 3) {
        for (let i = 0; i < dataObject.length; i++) {
            console.log(
                `${i + 1}. ${dataObject[i].complete === false ? '[ ]':'[x]'} ${dataObject[i].task}.`
            );
        }
    } else if (args[2] === 'task') {
        if (args[3] === undefined) {
            console.log('Please add the id task');
        } else {
            console.log(`${args[3]}. ${dataObject[number].complete === false ? '[ ]':'[x]'} ${dataObject[number].task}`);
        }
    } else if (args[2] === 'delete') {
        console.log(`Task  '${dataObject[number].task}' has been deleted`);
        dataObject.splice(number, 1);
        saveData(dataObject);
    } else if (args[2] === 'complete') {
        dataObject[number].complete = true;
        saveData(dataObject);
        console.log(`Your '${dataObject[number].task}' has marked complete`);
    } else if (args[2] === 'uncomplete') {
        dataObject[number].complete = false;
        saveData(dataObject);
        console.log(`Your '${dataObject[number].task}' has marked uncomplete`)
    } else if (words[0] === 'list' && words[1] === 'outstanding') {
        if (args[3] === 'desc') {
            for (let i = dataObject.length - 1; i >= 0; i--) {
                if (dataObject[i].complete === false) {
                    console.log(`${i + 1}. ${dataObject[i].complete === false ? '[ ]' : '[x]'}${dataObject[i].task}`);
                }
            }
        } else if (args[3] === 'asc') {
            for (let i = 0; i < dataObject.length; i++) {
                if (dataObject[i].complete === false) {
                    console.log(`${i + 1}. ${dataObject[i].complete === false ? '[ ]' : '[x]'}${dataObject[i].task}`);
                }
            }
        }
    } else if (words[0] === 'list' && words[1] === 'completed') {

        if (args[3] === 'desc') {
            for (let i = dataObject.length - 1; i >= 0; i--) {
                if (dataObject[i].complete === true) {
                    console.log(`${i + 1}. ${dataObject[i].complete === true ? '[x]' : '[ ]'}${dataObject[i].task}`);
                }
            }
        } else if (args[3] === 'asc') {
            for (let i = 0; i < dataObject.length; i++) {
                if (dataObject[i].complete === true) {
                    console.log(`${i + 1}. ${dataObject[i].complete === true ? '[x]' : '[ ]'}${dataObject[i].task}`);
                }
            }
        }
    } else if (args[2] === 'tag') {
        dataObject[number].tags = args.slice(4);
        saveData(dataObject);
        console.log(`Tag has been added to '${dataObject[number].task}' task`);
    } else {
        console.log('\n\033[31;1;4mSorry, there are no commands for that\033[0m\n');
        help();
    }
}