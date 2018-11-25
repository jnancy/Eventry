import { AsyncStorage } from "react-native";
//import * as firebase from 'firebase';

export const USER_KEY = "auth-demo-key";
let keys = ['userID'];

export const onSignIn = (userkey) => {
  console.log("fml");
  AsyncStorage.setItem("userID", userkey).then(
    AsyncStorage.getItem('userID', (err, result) => {
      console.log("STORED userID: " + result);
    })
  )
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
    AsyncStorage.getItem(USER_KEY)
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
