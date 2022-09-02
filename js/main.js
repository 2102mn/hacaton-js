// data start
let users = [
    {
        name: 'User 1',
        password: 'pass123',
        age: 30,
        isLogin: false,
        getMessages: [],
        sendMessages: []
        
    },
    {
        name: 'User 2',
        password: 'pass124',
        age: 33,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 3',
        password: 'pass125',
        age: 21,
        isLogin: false,
        getMessages: [],
        sendMessages: []
       
    },
    {
        name: 'User 4',
        password: 'pass126',
        age: 56,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 5',
        password: 'pass127',
        age: 42,
        isLogin: false,
        getMessages: [],
        sendMessages: []
        
    },
    {
        name: 'User 6',
        password: 'pass128',
        age: 13,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    
    },
    {
        name: 'User 7',
        password: 'pass129',
        age: 29,
        isLogin: false,
        getMessages: [],
        sendMessages: []
        
    },
    {
        name: 'User 8',
        password: 'pass130',
        age: 53,
        isLogin: false,
        getMessages: [],
        sendMessages: []
       
    },
    {
        name: 'User 9',
        password: 'pass131',
        age: 18,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    
    },
    {
        name: 'User 10',
        password: 'pass132',
        age: 48,
        isLogin: false,
        getMessages: [],
        sendMessages: []
        
    }
];


// data end
// send message data start

// users scripts start
let inSystem = '';
function changeInSystemUser(userName='') {
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = 'No users in system'
}
// create logic
function checkUniqueUserName(userName) {
    return users.some(item => item.name === userName)
};

function checkPassword(pass, passConfirm) {
    return pass === passConfirm;
}

function createUser() {
    let userName = prompt('Enter username');
    if(checkUniqueUserName(userName)) {
        alert('User alsready exists');
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter password confirmation');
    if(!checkPassword(pass, passConfirm)) {
         alert('Passwords don\'t match')
    };

    let age = +prompt('Enter age');
    let userObj = {
        name: userName,
        password: pass,
        age: age,
        isLogin: false,
        getMessages:[], 
        sendMessages:[]   
    };
    users.push(userObj);
    alert('Created successfully');
    console.log(users);
};

// login logic
function getUserObj(userName) {
    return users.find(item => item.name === userName)
};

function checkUserPassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass;
};

// change password 

// function changePassword(changePassword)
// if (choice.toLowerCase() == 'пароль') {
//     let oldPassword = prompt('Введите старый пароль')
//     if (!checkUserPassword(inSystem, oldPassword)) {
//         alert('Неверный старый пароль')
//         return
//     }
//     let newPassword = prompt('Введите новый пароль');
//     user.password = newPassword;
//     alert('Пароль изменен')
//     console.log(users)
//     return
// }
// // change password end

function loginUser() {
    let userName = prompt('Enter username');
    if(!checkUniqueUserName(userName)) {
        alert('User not found');
        return;
    };
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName, pass)) {
        alert('Password doesn\'t match this account');
        return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
};


// logout logic
function logOutUser() {
    let user = getUserObj(inSystem);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
}
// user scripts end


//message logic
function sendMessages() {
    if (!sendMessages) {
      alert("Only aurorized users can send message");
      return;
    }
    let from = prompt("Enter recipient");
    let message = prompt("Enter message");
    searchUser(from);
    function searchUser(from) {
      for (i of users) {
        if (i.name == from) {
          i.getMessages.push(message);
          alert("Successfuly created");
        }
      }
    }
    for (i of users) {
      if (inSystem == i.name) {
        i.sendMessages.push(message);
      }
    }
    console.log(users);
  }
  
  function checkIdMs(id){
    return (users.some(item => item.sentMessage.some(item1 => item1.id === id)) || users.some(item => item.getMessage.some(item1 => item1.id === id)));
}  

 
function checkUserIdMs(userName,id){
        let user = getUserObj(userName);
        return (user.sentMessage.some(item =>item.id === id) || user.getMessage.some(item =>item.id === id));
}  

function getMessageObj(userName,id){
    let obj = getUserObj(userName);
    return (obj.sentMessage.find(item =>item.id === id) || obj.getMessage.find(item =>item.id === id));
}

function messageFindSent(obj1,obj2){
    return obj1.sentMessage.some(item => item === obj2);
}
function messageFindGet(obj1,obj2){
    return obj1.getMessage.some(item => item === obj2);
}


function deleteMessage(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let idMessage = +prompt("Введите Id сообщения, который  хотите удалить");
    if(!checkIdMs(idMessage)){
        alert('Сообщение с таким Id не существует');
        return;
    }
    if(!checkUserIdMs(inSystem,idMessage)){
        alert("Не принадлежит сообщение");
        return;
    }
    let  userObj = getUserObj(inSystem);
    let messageObj = getMessageObj(inSystem,idMessage);
    console.log(messageObj);

    if(messageFindSent(userObj,messageObj)){
     userObj.sentMessage.splice(userObj.sentMessage.indexOf(messageObj),1);
     alert("Успешно удалено!");
    }
    else if(messageFindGet(userObj,messageObj)) {
        userObj.getMessage.splice(userObj.getMessage.indexOf(messageObj),1);
        alert("Успешно удалено!");
    }
 
    console.log(users)
}