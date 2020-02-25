'use strict';

module.exports = function(app) {
  var Client = app.models.Client;
 
  const findOrCreateClient =
    Client.findOne({'where': {'email': process.env.ADMIN_EMAIL}})
      .then(myClient => {
        console.log('inside findOrCreateClient');
        if (!myClient) {
          console.log('defaualt client not found, create defualt:');
          console.log('   ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
          console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);

          return Client.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
          })
        } else { 
          console.log('found client:');
          console.log(myClient);
          return myClient; 
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

    
  Promise.all([findOrCreateClient])
    .then(response => {
      console.log('in my Promise.all');
    })
    .catch(() => console.log('unable to assign admin role to a user'));
};

