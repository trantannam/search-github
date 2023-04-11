import axios from "axios";
import { useEffect, useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import './repo.css'


function Repo() {
    document.title="List Repositories"

    const override: CSSProperties = {
        textAlign: "center",
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };


    let [loading, setLoading] = useState(false);
    let color = useState("#ffffff");
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");
    const repos = localStorage.getItem("repos");
    const navigate = useNavigate();
    const [repo, setRepo] = useState([]);

    const getRepoList = async () => {
        setLoading(!loading)
        await axios.get(repos)
            .then(res => {
                setLoading(false)
                setRepo(res.data);
                console.log("res", res.data);
            })
    }

    useEffect(() => {
        getRepoList()
    }, [])

    const handleClick = (url, id) => {
        localStorage.setItem("commit_url", url);
        localStorage.setItem("commit_id", id);
        navigate("/commit");
    }

    return (
        <>
            <div className="container">
                <div className="left">
                    <div className="user">
                        <img className="img" src={`${avatar}`} alt={'github'} />
                        <p style={{ fontSize: '20px', fontWeight: 800 }}>{username}</p>
                    </div>
                </div>
                <div className="right">
                    <h1>Repositories List</h1>
                    <ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                
                {repo.map((repo, index) =>
                    <div className="repos" key={index} onClick={() => handleClick(repo.commits_url, repo.id)}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>name:</td>
                                    <td>{repo.name}</td>
                                </tr>
                                <tr>
                                    <td>description:</td>
                                    <td>{repo.description}</td>
                                </tr>
                                <tr>
                                    <td>stars number: </td>
                                    <td>{repo.stargazers_count}</td>
                                </tr>
                                <tr>
                                    <td>issues number: </td>
                                    <td>{repo.open_issues_count}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Repo;