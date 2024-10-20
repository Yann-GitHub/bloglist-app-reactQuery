import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("UserLOGIN:", action.payload);
      return {
        ...state,
        user: action.payload.name,
        username: action.payload.username,
        token: action.payload.token,
      };

    case "LOGOUT":
      return { user: null, username: null, token: null };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, {
    user: null,
    username: null,
    token: null,
  });

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserValue must be used within a UserContextProvider");
  }
  return context[0];
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserDispatch must be used within a UserContextProvider"
    );
  }
  return context[1];
};

export default UserContext;
