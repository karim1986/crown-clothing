import { useEffect, useRef, useState } from "react";
import ProductList from "./assets/components/ProductList";
import userService, { User } from "./assets/services/user-service";
import apiClient, { CanceledError } from "./assets/services/api-client";
import useUsers from "./hooks/useUsers";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");

  // // THis function will be called after each render
  // useEffect(() => {
  //   // Side effect
  //   if (ref.current) ref.current.focus();
  // });

  // const connect = () => console.log("Connecting....");
  // const discounnect = () => console.log("disconnect");

  // useEffect(() => {
  //   connect();

  //   return () => discounnect();
  // });

  //Use effect
  // try {
  //   const fetchUsers = async () => {
  //     const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  //     setUsers(res.data);
  //   };
  // } catch (err) {
  //   setError((err as AxiosError).message);
  // }

  // fetchUsers();

  const { users, error, isLoading, setError, setUsers } = useUsers();
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };

    setUsers([newUser, ...users]);
    userService
      .create(newUser)
      .then(({ data: saveUser }) => setUsers([saveUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {/* <input ref={ref} type="text" className="form-control" /> */}
      <select className="" onChange={(event) => setCategory(event.target.value)}>
        <option value=""></option>
        <option value="clothing">Clothing</option>
        <option value="household">household</option>
      </select>
      form-select
      <ProductList category={category} />
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between">
            {user.name}
            <div>
              <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>
                Update
              </button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

// In the console the element is rendered twice because the strict mode is activated on dev mode
//  in real life it is not called twice
