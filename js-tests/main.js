const getData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todo/1");

    //if (!response.ok) return console.log("Something's wrong");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("lol");
    console.error(error);
  } finally {
    console.log("Complete");
  }
};

//console.log("test");
getData();
