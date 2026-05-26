import { useEffect, useState } from "react";
import Table from "../components/table";
import useGetUsers from "../hooks/useGetUsers";
import processAndSetUsers from "../services/processUserData";
import sortByName from "../services/processUserData";
export default function DisplayUsers() {
  const { responseApi } = useGetUsers();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState();
  useEffect(() => {
    if (responseApi?.friends?.length) {
      processAndSetUsers(responseApi, setUsers);
      setLoading(false);
    }
  }, [responseApi]);

  return <Table users={users} loading={loading} setUsers={setUsers} />;
}
