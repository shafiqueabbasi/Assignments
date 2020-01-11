function signIn() {
    var email = document.getElementById("emaili").value;
    var pwd = document.getElementById("pwdi").value;
  
    console.log(email, pwd);
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(res => {
        console.log("TCL: res", res.user.uid, res.user.email);
        const userData = {
          uid: res.user.uid,
          email: res.user.email
        };
        localStorage.setItem("user", JSON.stringify(userData));
      });
  }
  
  function signUp() {
    var email = document.getElementById("emails").value;
    var pwd = document.getElementById("pwds").value;
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then(function(res) {
        console.log("TCL: res", res.user.uid, res.user.email);
        firebase
          .firestore()
          .collection("users")
          .add({
            uid: res.user.uid,
            email: res.user.email
          })
          .then(() => {
            console.log("TCL: signUp -> then");
          });
      });
  }
  
  async function renderAds() {
    const adsData = [];
    const resAds = await firebase
      .firestore()
      .collection("Ads")
      .get();
    resAds.forEach(doc => {
      adsData.push({ ...doc.data(), adID: doc.id });
    });
    console.log("TCL: renderAds -> adsData", adsData);
  
    for (var i = 0; i < adsData.length; i++) {
      var mainIndex = document.getElementById("_index");
      var buttons = document.createElement("a");
      var br = document.createElement("br");
      buttons.innerHTML = adsData[i].name || "name not found";
      buttons.id = adsData[i].adID;
      // buttons.setAttribute("href", "./chat.html");
      buttons.setAttribute("onclick", "goToChat(this)");
      mainIndex.appendChild(buttons);
      mainIndex.appendChild(br);
    }
  }
  
  async function goToChat(e) {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("TCL: goToChat -> userData", userData);
    if (!userData.uid) {
      alert("please login first");
      return;
    }
    console.log("TCL: goToChat -> goToChat", e.id);
  
    const response = await firebase
      .firestore()
      .collection("Ads")
      .doc(e.id)
      .get();
    console.log("TCL: goToChat -> response", response.data());
    const adData = { ...response.data(), adId: response.id };
    console.log("TCL: goToChat -> adData", adData);
    localStorage.setItem("adData", JSON.stringify(adData));
    window.location.href = "./chat.html";
  
    //   // const user = localStorage.getItem("user");
    //   // const userId = JSON.parse(user).id
    //   const userId = "ayanmurad987"
  
    //   const adData = {
    //     title: "Mobile",
    //     adID: "123123",
    //     ownerID: "1234512345"
    //   };
  
    //   const roomRes = await db.collection("chatRooms")
    //   .where(adData.adID,"==",true)
    //   .where(adData.ownerID,"==",true)
    //   .where(userId,"==",true)
    //   .get();
    //   let messages;
    //    if(roomRes.size){
    //      messages = await getMsgs(roomRes);
    //    }
    //    else{
    //     await db.collection("chatRooms").add({
    //       [adData.adID]:true,
    //       [adData.ownerID]:true,
    //       [userId]:true
    //     })
  
    //  const roomR = await db.collection("chatRooms")
    //   .where(adData.adID,"==",true)
    //   .where(adData.ownerID,"==",true)
    //   .where(userId,"==",true)
    //   .get();
    //     messages = await getMsgs(roomR)
  
    //   }
    //   console.log("TCL: goToChat -> messages", messages)
  }
  
  async function loadChat() {
    const adData = JSON.parse(localStorage.getItem("adData"));
    const user = JSON.parse(localStorage.getItem("user"));
  
    const chatRes = await firebase
      .firestore()
      .collection("chatRooms")
      .where(adData.ownerid, "==", true)
      .where(adData.adId, "==", true)
      .where(user.uid, "==", true)
      .get();
    console.log("TCL: loadChat -> chatRes.size", chatRes.size);
    if (!chatRes.size) {
      createChatCollection(adData, user);
      return;
    }
    const allMsg = [];
    chatRes.forEach(async doc => {
      console.log("TCL: loadChat -> doc", doc.data());
      const msgRes = await firebase
      .firestore()
      .collection("chatRooms")
      .doc(doc.id)
      .collection("msg")
      .get();
      msgRes.forEach(docs => {
        allMsg.push(docs.data());
      });
      console.log("TCL: loadChat -> allMsg", allMsg)
    });
  }
  
  async function createChatCollection(adData, user) {
    console.log("TCL: createChatCollection -> createChatCollection");
    await firebase
      .firestore()
      .collection("chatRooms")
      .add({
        [adData.ownerid]: true,
        [adData.adId]: true,
        [user.uid]: true
      })
      .then(() => {
        loadChat();
      });
  }
  
  async function sentMsg() {
    const inputVal = document.getElementById("sendInpu").value;
    const adData = JSON.parse(localStorage.getItem("adData"));
    const user = JSON.parse(localStorage.getItem("user"));
    const chatRes = await firebase
      .firestore()
      .collection("chatRooms")
      .where(adData.ownerid, "==", true)
      .where(adData.adId, "==", true)
      .where(user.uid, "==", true)
      .get();
  
    chatRes.forEach(async doc => {
      console.log("TCL: sentMsg -> doc", doc.id);
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(doc.id)
        .collection("msg")
        .add({
          msg:inputVal,
          createdAt : Date.now()
        }).then(()=>{
          inputVal.innerHTML = ""
          loadChat()
        })
    });
  }
  // async function getMsgs(roomRes){
  //   let roomId;
  //      roomRes.forEach(doc => {
  //        roomId = doc.id
  //       });
  //       localStorage.setItem("roomId", JSON.stringify(roomId));
  //      let arr = []
  //      const msgRes = await db.collection("chatRooms")
  //      .doc(roomId)
  //      .collection('messages')
  //      .get();
  
  //      msgRes.forEach(val => {
  //       arr.push(val.data());
  //      })
  
  //      return arr
  // }
  
  // async function send () {
  //   const inputVal = document.getElementById("writeMsg");
  //   const roomId = localStorage.getItem("roomId");
  
  //   // const user = localStorage.getItem("user");
  //   // const userId = JSON.parse(user).id
  //   const userId = "ayanmurad987"
  
  //   await db.collection("chatRooms")
  //   .doc(roomId)
  //   .collection('messages')
  //   .set({
  //     text: inputVal.value,
  //     senderId : userId,
  //     createdAt: new Date.now()
  //   })
  //   inputVal.value = "";
  // }
  