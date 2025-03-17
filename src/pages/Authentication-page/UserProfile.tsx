import { useEffect, useState } from "react";
import { auth, db } from "./components/Firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth1 = getAuth();

onAuthStateChanged(auth1, (user) => {
  if (user) {
    user.getIdToken(true)  // `true` để làm mới token nếu cần
      .then((idToken) => {
        console.log("Firebase ID Token:", idToken);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy ID Token:", error);
      });
  } else {
    console.error("Người dùng chưa đăng nhập!");
  }
});

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User is not logged in");
        return;
      }

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.name} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.name}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default UserProfile;
