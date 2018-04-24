# pino-text-level-transport

This is a tranport for pino that transforms the "level" field into a string.

It is useful for logging platforms such as [logdna](logdna.com) that only
supports having the level field as string.

## Usage

```sh
npm install pino-text-level-transport
```

And in your package.json 

```json
{
    ...
    "scripts":{
        ...
        "start": "node yourprocess.js |pino-text-level-transport"
    },
    ...
}
```

Then:

```sh
npm run start
```