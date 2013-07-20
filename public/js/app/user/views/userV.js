tipJS.view({
    // choose an attribute data between name or __name
    name:"user.userV",
    getFrmSignView: function() {
      var userModel = this.loadModel("userM");
      var frmSign = this.getById("frmSign");
      userModel.setFrmSignModel(frmSign);
      return frmSign;
    }

});