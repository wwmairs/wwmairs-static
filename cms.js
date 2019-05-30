var cmsData = sessionStorage.getItem("cmsData");

if (cmsData == null) {
    // retrieve it, store in session,
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAf6ZlVwUAhrc1pUMHC3dsKHi03pXf6lCY",
      authDomain: "wwmairs-cms.firebaseapp.com",
      databaseURL: "https://wwmairs-cms.firebaseio.com",
      projectId: "wwmairs-cms",
      storageBucket: "wwmairs-cms.appspot.com",
      messagingSenderId: "1069213946397",
      appId: "1:1069213946397:web:9b0d59d93dd81b5c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database();
    var dbData = {};
    db.ref("posts").once("value")
        .then((snapshot) => {
            snapshot.val().map((o) => {
                dbData[o.key] = o;
                window.sessionStorage.setItem("cmsData", JSON.stringify(dbData));
            });
} else {
    // see if there's anything we need to make
}
