
export const getSender = (loggedUser, users) => {

  console.log("Users in GetSender: ",users);
  console.log("Logged User in GetSender: ",loggedUser);
  try{
    return users[0]._id === loggedUser._id ? users[1].firstName.concat(" " ,users[1].lastName) : users[0].firstName.concat(" ",users[0].lastName );
  }catch(error){
    return "Deleted Account"
  } 
   

  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

//To handle the messages
export const isSameSender = (messages, currentMsg, i, userId) =>{
    return (
        i < messages.length - 1 && (
            messages[i+1].sender._id === currentMsg.sender._id &&
            messages[i].sender._id === userId)
    );
}

export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  
  export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 10;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 10;
    else return "auto";
  };
 
  