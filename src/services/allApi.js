


import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register

export const registerApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqbody,"")
}


//login

export const loginApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqbody,"")
}

//api to add project
export const addProjectApi = async(reqbody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqbody,reqHeader)
}

//api to get home-projects
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

//api to get all projects
export const allProjectApi = async(searchkey,reqHeader)=>{
    //query parameter = baseurl?key=value
    //path parameter = baseurl/id => baseurl/:id
    
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchkey}`,"",reqHeader)
}

//api to get user projects
export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

//api to remove userprojects
export const removeUserProjectApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}

//api to update project
export const updateUserprojectApi = async(id,reqbody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userproject/${id}`,reqbody,reqHeader)
}

//api to update profile
export const updateProfileApi = async(reqbody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqbody,reqHeader)
}
