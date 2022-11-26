# Starter S3 Storage

This sample shows a basic GET/PUT/DELETE app interacting with Cyclic S3 support.

## Docs

To learn more check out the [Cyclic Docs](https://docs.cyclic.sh/docs/concepts/storage)

If you have questions or need help find us on [discord server](https://discord.cyclic.sh/support).

## Usage

```shell
export APP_URL='https://some-app.cyclic.app'

curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H "Content-type: application/json" "$APP_URL/myFile.txt"

curl -i "$APP_URL/myFile.txt"

curl -i -XDELETE "$APP_URL/myFile.txt"
```

## Local Access

```js
(async () => {
  // Store something
  await s3.putObject({
    Body: JSON.stringify({"now":new Date().toString()}),
    Bucket: process.env.BUCKET,
    Key: "some_files/my_file.json",
  }).promise()

  // Read the file
  let my_file = await s3.getObject({
    Bucket: process.env.BUCKET,
    Key: "some_files/my_file.json",
  }).promise()

  // Log file content
  console.log(JSON.parse(my_file.Body.toString()))

  let res = await s3.deleteObject({
    Bucket: process.env.BUCKET,
    Key: "some_files/my_file.json",
  }).promise()

  console.log(res)
})()
```
# wahunter-server
