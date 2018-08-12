const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string()
        .email({
          minDomainAtoms: 2
        })
        .required(),
      password: Joi.string()
        .regex(new RegExp(/^[-@./#&+\w\s]{8,30}$/))
        .required()
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "You must provide a valid email address"
          });
          break;
        case "password":
          res.status(400).send({
            error: `<p>The password provided failed to match the following rules:
            <br/>
            1. It must contain ONLY the following characters: lower case, upper case and numerics
            <br/>
            2. It must contain ONLY the following special characters: -@./#&+
            <br/>
            3. It must be AT LEAST 8 characters long and NO MORE than 30 characters long</p>`
          });
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information"
          });
      }
    } else {
      next();
    }
  }
};
