const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(bodyParser())

//import routes
const authRouter = require("./routes/authRouter")

app.use("/api/auth", authRouter)

app.listen(process.env.PORT || 3000, () => console.log("Running app on port 3000"))