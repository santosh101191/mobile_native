import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_KEY")
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

export const signIn = (username, password) => {
  return new Promise ((resolve, reject) => {
    if(username == 'Santosh' && password == '123'){
      AsyncStorage.setItem("USER_KEY", USER_KEY )
      resolve(true);
    }
    reject(false);
  })
}

export const signOut = (username, password) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("USER_KEY");
      resolve(true);
  })
}