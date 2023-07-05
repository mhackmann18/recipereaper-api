exports.printSuccessMsg = () => {
  console.log("Successfully completed request".green);
};

exports.printErrMsg = (err) => {
  console.log(`Error: ${err.message}`.red);
};

exports.requestWrapper = (Model, fn) => async (req, res) => {
  const user = new Model();

  try {
    await user.openConnection();
    const data = await fn(req, user);
    res.send(data);
    this.printSuccessMsg();
  } catch (error) {
    res
      .status((error.cause && error.cause.code) || 500)
      .send({ message: error.message || "An unexpected error occurred" });
    this.printErrMsg(error);
  } finally {
    user.closeConnection();
  }
};
