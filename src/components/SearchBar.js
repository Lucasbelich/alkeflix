import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  /* ======================= CAMBIAR SEARCH BAR =============== */
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swAlert(<h3>Debe escribir una palabra</h3>);
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
      refreshPage();
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {token ? (
        <div>
          <form
            className="d-flex align-items-center gap-2"
            onSubmit={(e) => submitHandler(e)}
          >
            <label className="form-label mb-0">
              <input
                className="form-control"
                type="text"
                name="keyword"
                placeholder="Buscar..."
              />
            </label>
            <button type="submit" className="btn btn-success">
              Buscar
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
