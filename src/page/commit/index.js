import axios from 'axios';
import { useEffect, useState,CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './commit.css'

function Commit(){

    document.title="List Commit";

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    let [loading, setLoading] = useState(false);
    let color = useState("#ffffff");

    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");
    const commit_url = localStorage.getItem("commit_url");
    const commit_id = localStorage.getItem("commit_id");
    const navigate = useNavigate();
    const [commit, setCommit]=useState([]);

    //auther, commit message, commit id
    const getCommit =async()=>{
        setLoading(!loading);
        await axios(`${commit_url.slice(0,commit_url.length-6)}?id=${commit_id}`)
        .then(res=>{
            setLoading(false);
            setCommit(res.data)
        })
    }

    const handleClick=(e)=>{
        window.open(e,"_blank","");
    }

    useEffect(()=>{
        getCommit()
    },[])

    return(
        <div className='container'>
            <div className="left">
                <div className="user">
                    <img className="img" src={`${avatar}`} alt={'github'} />
                    <p style={{ fontSize: '20px', fontWeight: 800 }}>{username}</p>
                </div>
            </div>
            <div className="right">
                <h1>Commit List</h1>
                <ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                {commit.map((commit, index) =>
                    <div className="repos" key={index} onClick={()=>handleClick(commit.html_url)}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Author name:</td>
                                    <td>{commit.commit.author.name}</td>
                                </tr>
                                <tr>
                                    <td>Message:</td>
                                    <td>{commit.commit.message}</td>
                                </tr>
                                <tr>
                                    <td>Commit id: </td>
                                    <td>{commit.sha}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Commit;