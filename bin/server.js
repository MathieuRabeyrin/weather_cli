#!/usr/bin/env node

const process = require("process");
const { program } = require("commander");
const weather = require("../lib/api");
const { isUndefined } = require("util");

program
    .command("city")
    .arguments("<cityName>")
    .option('-u, --units <type>', 'select a units (metric, imperial, kelvin) ')
    .description("Display the weather of a particular city")
    .action(()=> {
        if (!isUndefined(program.args[2]))
            weather(program.args[1], program.args[program.args.length - 1]);
        else
            weather(program.args[1], 'metric');
    })

program.parse(process.argv);