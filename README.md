## Overview

This is an implementation of the TourRadar test assignment - the cli script which pull content from the API, normalizes it and sends it to the AWS SQS queue. Timing: 8 hours.
Basically it retrieves content from the Rick and Morty tv series, 
normalizes the fields by defined mapping and sends it to queue.

## Local Development

```bash
npm install
npm run start
```
## CLI Tools

There is a CLI script to help syncing data between source and destination.
Use '--help' option to see detailed information on command usage, for instance

```bash
node src/cli/index.js --help

Pulls data from the given source and sends it to the SQS.

Options:
      --version  Show version number                                   [boolean]
  -s, --source   Source value(ex. rickandmorty)                       [required]
  -t, --type     Type value(ex. episodes)                             [required]
      --help     Show help                                             [boolean]
```

### index.js

index.js tool usage:

```bash
node src/cli/index.js sync -s rickandmorty -t episodes
```

## Mappings

The mappings(JSON schema) are defined in src/mappings folder.
It is used to convert received data to a needed format.
If the new source should be added - it should be only added to the configs 
and new mapping should be created.

## Answers

1. The suggestions I may add to the current setup:
- It is not mentioned, but the queue should be the **FIFO** because I believe
the order of the messages is very important. It can lead to issues when
the last update will be processed first and earlier updates will be processed last.
So it is the risk for the not up to date content.
- As I can see there is a tour importer per tour operator. I believe it can be **unified** *where possible*. So one importer can manage different tour operators. It can reduce the cost for separate instances for each importer. The perfect scenario is when adding a new tour operator is just a config update.
- I am not sure about the main idea of storing JSON to the Tour Files(S3 bucket let's say)
and then sending this JSON to the queue. I believe the proposed solution(see the image below) can increase the performance by **cutting the Tour file** storage off and **sending messages directly to the queue**.
- I believe the main problem with CLI is that they are scheduled without knowing if some update needs to be pulled or not. So it can pull the data from the Tour Operator API even it was not updated. I don't think there is a quick solution that can resolve this issue. But I believe some Discovery Epic can be added to the backlog. It is about the possibility to implement some **script/widget that can be integrated into the Tour Operator CMS**. So once content is changed - it can directly send a message to the queue(or another approach that cuts off CLI from the play).

2. Proposed architecture:

![Proposed architercure](https://github.com/stanislavtyrinov/cli-nodejs/blob/main/diagrams/diagram.png?raw=true)

3. High load testing, scheduled automated testing, end-to-end testing. It is not possible to be 100% sure all cases are covered, but having setup alert system and logs allows to improve the architecture where possible.
Also vertical/horizontal scaling allows to manage more Tour Operators.
