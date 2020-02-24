'use strict';

module.exports = function(app) {
  var User = app.models.user;
 
  const findOrCreateUser =
    User.findOne({'where': {'email': process.env.ADMIN_EMAIL}})
      .then(user => {
        console.log('inside findOrCreateUser');
        if (!user) {
          console.log('defaualt user not found, create defualt:');
          console.log('   ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
          console.log('ADMIN_PASSWORD:', process.env.ADMIN_EMAIL);

          return User.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_EMAIL,
          })
        } else { 
          console.log('found user:');
          console.log(user);
          return user; 
        } 
      })
      .catch(err => {
        console.log('unable to find or create an admin user');
        return err;
      });

  // let myPromise = new Promise((res,rej)=>{
  //   console.log('in my promise');
  //   res('success!');
  // });
  // myPromise.then((msg)=>{
  //   console.log('Yay we did it: ', msg);
  // })

    
  Promise.all([findOrCreateUser])
    .then(response => {
      console.log('in my Promise.all');
    })
    .catch(() => console.log('unable to assign admin role to a user'));
};

