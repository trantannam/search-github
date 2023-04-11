import axios from "axios";
import { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./search.css"

function Search() {
    document.title="Home"

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    let [loading, setLoading] = useState(false);
    let color = useState("#ffffff");
    const [dataSearch, setDataSearch] = useState("");
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const getUserList = async () => {
        setLoading(!loading);
        await axios.get(`https://api.github.com/search/users?q=${dataSearch}`)
            .then(res => {
                document.title="List User"
                setUser(res.data.items)
                console.log("res", res.data.items)
                setLoading(false)
            })
    }

    const handleClickUser = (name, avatar, repos) => {
        localStorage.setItem("username", name);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("repos", repos);
        navigate("/Repo");
    }

    return (
        <>
            <div className='container'>
                <h1 style={{ textAlign: "center" }}>Search Github repo by username</h1>
                <div className='insert-info'>
                    <input
                        className='input-username'
                        placeholder='Insert your guthub username'
                        onChange={e => setDataSearch(e.target.value)}
                    />
                    <button className='btn' onClick={() => getUserList()}>Search</button>
                </div>
                <div className="list-users">
                    {
                        user.map((user, index) =>
                            <div key={index} className="user" onClick={() => handleClickUser(user.login, user.avatar_url, user.repos_url)}>
                                <img className="img" src={`${user.avatar_url}`} alt={'github'} />
                                <p style={{ fontSize: '20px', fontWeight: 800 }}>{user.login}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    );
}

export default Search;