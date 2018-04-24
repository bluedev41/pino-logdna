# pino-logdna-formatter

This is a tranport for pino that transforms the `level` field into a string and renames the
`msg` field into `message`. This format is required in [logdna](logdna.com).

## Usage

```sh
npm install pino-logdna-formatter
```

And in your package.json 

```json
{
    ...
    "scripts":{
        ...
        "start": "node yourprocess.js | pino-logdna-formatter"
    },
    ...
}
```

Then:

```sh
npm run start
```