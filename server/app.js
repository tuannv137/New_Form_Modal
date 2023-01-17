const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");
const dataFormModal = require("./dataFormModal");
const app = express();

const port = 3006;
app.use(cors());

// {
//   status: true | false
//   message: 'aaaaa',
//   redirect_url: ''
// }

app.use(bodyParser.json());

app.get("/get-form-template", (req, res) => {
  try {
    const data = dataFormModal.dataFormTemplate;
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({
        message: "Data not found!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error from server!",
    });
  }
});

app.post("/post-new-form", (req, res) => {
  try {
    const data = req.body;

    if (!data.name) {
      return res.status(200).json({
        code: 1,
        message: "Form name cannot be empty.",
      });
    }

    const newForm = {
      id: data.id,
      name: data.name,
      type: data.type,
      fieldForm: data.fieldForm,
    };

    const arrForm = _.cloneDeep(data.arrForm);

    if (_.find(arrForm, ["name", data.name])) {
      return res.status(200).json({
        code: 2,
        message: "Name of the form already exists.",
      });
    } else {
      return res.status(200).json({
        newForm,
        arrForm,
        code: 0,
        message: "Create form successfully.",
        url_redirect: "/form",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error from server!",
    });
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
