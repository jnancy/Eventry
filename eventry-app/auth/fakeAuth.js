import { AsyncStorage } from "react-native";
//import * as firebase from 'firebase';

let keys = ['userID'];

export const onSignIn = (userkey) => {
  AsyncStorage.setItem("userID", userkey).then(
    AsyncStorage.getItem('userID', (err, result) => {
      console.log("STORED userID: " + result);
      getUser(result);
    })
  );
}

const getUser = (token) => {
  try{
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/rest-auth/user/', {
      method: 'GET',
      headers: {
        'Authorization': "Token " + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        credentials: 'include'
    }).then(response => response.json()).  // Promise
    then(res =>{ console.log(res); AsyncStorage.setItem("pk", JSON.stringify(res.pk)).then(
      AsyncStorage.getItem('pk', (err, result) => {
        console.log("STORED pk: " + result);
      })
    )});
  }
  catch(err){
    console.log("err: " + err);
  }
}

export const onSignOut = async () => {
  let latlngPath = null;
  await AsyncStorage.getItem('userID')
  .then(res => {
    /*firebase.database().ref('latlng/'+latlngPath+'/'+res).update({
      kitNoti: null,
      expoToken: null,
    });*/
  })
  .catch(err => console.log("can't find user id when logging out: " + err));
  AsyncStorage.multiRemove(keys);
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('userID')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const storeUserID = (userid) => {
  console.log("storing userID");
  AsyncStorage.setItem("userID", userid);
};

export const getInternalUserInfoBool = (key) => {
  console.log("Getting Interal Info Bool");
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(res => {
        console.log("internaluser Bool: "+ res);
        if (res !== null) {
          if(res === 'true'){
            console.log("Not null, res: " + res);
            resolve(true);
          } else if (res === 'false'){
            console.log("Not null, res: " + res);
            resolve(false);
          }
        } else {
          console.log("Null, res: " + res);
          resolve(res);
        }
      })
      .catch(err => {
        console.log("Rejected, err: " + err)
        reject(err)
      });
  });
};

export const getInternalUserInfo = (key) => {
  console.log("Getting Interal Info");
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(res => {
        console.log("internaluser: "+ res);
        if (res !== null) {
          resolve(res);
        } else {
          console.log("Null, res: " + res);
          resolve(res);
        }
      })
      .catch(err => {
        console.log("Rejected, err: " + err)
        reject(err)
      });
  });
};
