var db = firebase.firestore();


function signUpFunc(){
  console.log("TCL: signUpFunc -> signUpFunc", "signUpFunc")

  let sEmail = document.getElementById('s-email').value;
  let sPass = document.getElementById('s-pass').value


  firebase.auth().createUserWithEmailAndPassword(sEmail, sPass).then((data) => {
    console.log("TCL: signUpFunc -> then", data.user.uid);
    var obj = {
        email: data.user.email,
        uid: data.user.uid
    }
    saveUser(obj);
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("TCL: signUpFunc -> errorMessage", errorMessage)
    // ...
});

}


function loginFunc() {
  console.log("TCL: loginFunc -> loginFunc", "loginFunc");

  let lEmail = document.getElementById('l-email').value;
  let lPass = document.getElementById('l-pass').value;

  firebase.auth().signInWithEmailAndPassword(lEmail, lPass)
      .then((data) => {
          console.log("TCL: loginFunc -> data", data.user.email)
          alert("login succ with this email "+ data.user.email)
      })
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
          // ...
      });


}


saveUser = (data = { name : "Shafique"}) => {
    console.log("TCL : saveUser - > data". data)

    var db = firebase.firestore();

    db.collection("user").add({ name : 'Abbasi'})
    .then(()=> {
        console.log("TCL: saveUser -> then", "then")
    }).catch(()=> {
        console.log("TCL: saveUser -> err", err)
    })
}

getUserData = () => {
  var user = localStorage.getItem("user");
  var userObj = JSON.parse(user);

  console.log("TCL: getUserData -> userObj", userObj);
  console.log("TCL: getUserData -> user", user);

  db.collection("user").doc(userObj.uid).get()
      .then((doc) => {
          console.log("TCL: getUserData -> doc", doc)
          console.log("TCL: getUserData -> data", doc.data())

      }).catch((err) => {
          console.log("TCL: getUserData -> err", err)

      })
}
