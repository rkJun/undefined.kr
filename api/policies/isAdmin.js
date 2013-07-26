/**
 * Check has Administrator
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  // if (req.session.authenticated) {
  if (req.user && req.user.isAdmin) {
    return ok();
  } else { // User is not allowed
    return res.send("You are not permitted to perform this action. - request for administrator", 403);
  }

};