// 1.Part 1: Callbacks 
// Create a JavaScript function that takes an argument and a callback function.
// for example: function can be getUserData and argument can be userId  or getDogBreedInfromation and argument can be dogBreed
// Inside the function, simulate fetching user data asynchronously (you can use a setTimeout to simulate a delay).
// If the data  is found, call the callback with the user's data (an object with name, email, etc.- for userData function).
// If the user is not found, call the callback with an error message.
// Create a callback function that handles the user data or error and prints the result.

// the following is list of items
const users = [
    {userId: 1,  name: "Abc", email: "abc@example.com" },
    {userId: 2, name: "Xyz", email: "xyz@example.com" },
  ];
  //console.log("trial");
  // the following is another way to declare list of objects
// const users = {
//     1: { name: "John", email: "john@example.com" },
//     2: { name: "Jane", email: "jane@example.com" },
//   };
  function getUserData(userId, callback){
    setTimeout(() => {
        const userData = users[userId-1]
        if(userData){
            callback(null,{userId,...userData})
        }
        // the following line if I do userId-1 it will not refect to the index 0 
        //so used temp data to point that in above if
        //Q. the following is print 1 but for above it prints as refernece why?
        // if(userId)
        // {
        //     callback(null,userId)
        // }
        else{
            callback("userId not available",null)
        }
    }, 1000);
  }
  function handleUserData(error, data) {
    const {userId, name, email} = data
    if (error) {
      console.error("Error:", error);
    }
    else{
        //console.log("User Data:",userId,name,email) OR following as template literal
        console.log(`user data: ${userId} name: ${name} email: ${email}`)
    }
    // } else {
    //     const {userId, name, email} = data
    //     console.log('User Data: ${userId} of ${name} has contact info ${email}');
    // }
  }
  
  // Call the function
  getUserData(1, handleUserData);

//  2. Part 2: Promises

// Refactor the function function to use Promises instead of callbacks.
// Create a Promise that resolves with the user data when found and rejects with an error message when not found.
// Use the .then() and .catch() methods to handle the resolved data or errors.

function getUserData1(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userData = users[userId-1];
        if (userData) {
          // User found, resolve the Promise with the user's data
          resolve(userData);
        } else {
          // User not found, reject the Promise with an error message
          reject("userId not available");
        }
      }, 1000); // delay of 1 second
    });
  }
  
  //Example usage with .then() and .catch()
  getUserData1(1)
    .then((data) => {
      const {userId, name, email} = data
      console.log(`user data: ${userId} name: ${name} email: ${email}`)
      //console.log("User Data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

//Part 3: Error Handling - 20

// Modify your Promise-based  function to intentionally throw an error (e.g., if the user ID is negative).
// Implement error handling in the .catch() block to gracefully handle this error and print a custom error message.

function getUserData3(userId) {
    return new Promise((resolve, reject) => {
      try {
        if (userId < 0) {
          throw new Error("User ID cannot be negative");
        }
         setTimeout(() => {
          const userData = users[userId-1];
          if (userData) {
            resolve(userData);
          } else {
            reject("userId not available");
          }
        }, 1000); // Simulated delay of 1 second
      } 
      catch (error) {
        reject(error.message);
      }
    });
  }
  getUserData3(-1)
  .then((data) => {
    // const {userId, name, email} = data
    // console.log(`user data: ${userId} name: ${name} email: ${email}`)
    console.log("User Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  // Part 4: Async/Await  - (do this for extra 50 points)

// Rewrite the Promise-based functions using async/await syntax.
// Demonstrate how to use try/catch blocks for error handling with async/await.
  async function fetchUserData() {
    try {
      const userData = await getUserData3(1);
      console.log("User Data:", userData);
    } catch (error) { 
      console.error("Error:", error);
    }
  }
  
  // Call the function
  fetchUserData();