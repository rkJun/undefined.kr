tipJS.view("userV", {  
    // choose an attribute data between name or __name
    getFrmSign: function() {
      // var userModel = this.loadModel("userM");
      var frmSign = this.getById("frmSign");
      // userModel.setFrmSignModel(frmSign);
      return frmSign;
    },
    get$FrmSign: function() {
      return $("#frmSign");
    },
    getFrmSignId: function() {
      return "frmSign";
    }
});