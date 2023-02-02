const index = require('./app')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 5000

index.listen(port, () => {
    console.log(`🚀 Server run on port: ${port}`);
})