import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = (path) => {
    document.location.href = path;
  };

  const request = async (value) => {
    setLoading(true);
    const res = await apiFunc(value);

    setLoading(false);
    console.log(res);
    if (res.status == "200" || res.status == "201") {
      setData(res.data);
      return res;
    }
    return toast.error(res?.data?.message);
  };

  return { data, loading, request };
};

export default useApi;
