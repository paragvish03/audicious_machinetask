const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.createuser = async (req, res) => {
  const details = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    confirmpassword: req.body.confirmpassword,
  };
  // console.log("name is ",details.name)
  try {
    let result = await User.findOne({ where: { email: details.email } });

    if (result) {
      res.send({ message: " email alreay exists 💀" });
      // console.
    } else if (details.password != details.confirmpassword) {
      console.log("first", details.password, "s", details.confirmpassword);
      res.send({ message: "Password not same in both field 💀" });

    }
    else if (details.email) {
      details.password = bcrypt.hashSync(req.body.password, 10)
      let user = await User.create(details);
      // res.send({ message: "user created succcesful ✔️✔️", email: user.email });
      res.redirect('/')
      return;
    }
  } catch (error) {
    res.send({ message: error.message });
    console.log(error)
  }
};

exports.loginpage = async (req, res) => {
  try {
    details = {
      email: req.body.email,
      password: req.body.password,
    };

    let result = await User.findOne({ where: { email: details.email } });
    if (!result) {
      res.send({ message: " invalid user/ register first" });
      return;
    }

    let validpsswd = bcrypt.compareSync(details.password, result.password);

    if (!validpsswd) {
      res.send({ message: "credential invalid" });
      return;
    }
    let token = jwt.sign({ id: result.id }, "surajsingh", {
      expiresIn: "1h",
    });
    res.cookie('jwt_token', token, { httpOnly: true, maxAge: 6000000 })
    res.redirect('/getall')
    // res.json({ message: "login successfull 🎉 ", token: token });
    console.log(token);
  } catch (error) {
    res.send(error.message);
  }
};



exports.getalluser = async (req, res) => {
  try {
    const finduser = await User.findAll();



    // res.status(200).send({ result:usersWithEmail })
    res.render('getalluser', { result: finduser })

  }
  catch (err) {
    res.status(500).send(err.message)
    console.log("error is ", err)
  }
}

exports.getoneuser = async (req, res) => {
  let id = req.params.id
  try {
    const result = await User.findOne({where:{ id: id} });
    if (!result) {
      res.status(401).send({ message: 'User not found' });
    } else {
      res.render('view',{ result: result })
    }
  }

  catch (err) {
    res.status(500).send(err.message)
    console.log("error is ", err)
  }

}


exports.edituser = async (req, res) => {

  // const name = req.body.name;
  try {
    const id = req.params.id
    const result = await User.findOne({where:{ id: id }})
    if (!result) {
      res.send("user not found")
      return;
    }

    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password
    const confirmpassword = req.body.confirmpassword
    //console.log(email, password)
    if (password != confirmpassword) {
      res.status(500).send('Error updating user require same password in both field');
      return
    }
    password = bcrypt.hashSync(password, 10)
    User.update({ name, email, password }, { where: { id: id } })
      .then(() => {
        res.redirect('/getall');
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error updating user');
      });



  }
  catch (err) {
    res.send(err.message)
  }




}


exports.deleteuser = async (req, res) => {


  try {
    const id = req.params.id
    const result = await User.destroy({ where: { id: id } })
    if (!result) {
      res.status(401).send({ message: `User with ID ${id} not exist` })
    } else {
      res.status(200).send({ message: `User with ID ${id} deleted successfully` })
    }

  }
  catch (err) {
    res.status(500).send(err.message)
  }

}


exports.edituserejs = async function (req, res) {
let id = req.params.id 
  try {
    const result1 = await User.findOne({ where: { id: id} });
    if (!result1) {
      res.status(401).send({ message: 'User not found' });
    } else {
      res.render('edit', { result: result1 })
      console.log(result1)
    }
  }

  catch (err) {
    res.status(500).send(err.message)
    console.log("error is ", err)
  }
}