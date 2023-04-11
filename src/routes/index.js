import Commit from "../page/commit";
import Repo from "../page/repo";
import Search from "../page/search"



const publicRoutes = [
    { path: '/', component: Search},
    { path: '/Repo', component: Repo},
    { path: '/Commit', component: Commit},
    
]

export default publicRoutes;