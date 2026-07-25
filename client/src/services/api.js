import axios from "axios"
import { serverUrl } from "../App"
import { setUserdata } from "../redux/userSlice"


export const getCurrentUser = async(dispatch) =>{
    try {
        const result = await axios.get(serverUrl+"/api/user/currentuser",
            {withCredentials: true})
            dispatch(setUserdata(result.data))
    } catch (error) {
        console.log(error)
    }
}