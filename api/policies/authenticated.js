/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

 console.log('auto go?');
  // User is allowed, proceed to controller
  // if (req.session.authenticated) {
  if (req.isAuthenticated()) {
    return ok();
  }

  // User is not allowed
  else {

    if ( req.header('X-Requested-With') === 'XMLHttpRequest' ) {
      return  res.json({type:'error', message:'You are not permitted to perform this action.'});
    }

    return res.send("You are not permitted to perform this action.", 403);
  }
};