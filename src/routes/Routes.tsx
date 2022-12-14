import Pages from "../pages";
import Employer from "../employer";
import Partner from "../partners";
import AuthStorage from "../helper/AuthStorage";
import STORAGEKEY from "../config/APP/app.config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Routes = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [userType, setUserType] = useState<any>()

  useEffect(() => {
    setUserType(AuthStorage.getStorageData(STORAGEKEY.userType)?.toLowerCase())
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])

  // let userType = AuthStorage.getStorageData(STORAGEKEY.userType)
  // let EmployeeRoute = ['dashboard', 'activejobs', 'jobapplication', 'myprofile', 'edit-profile', 'inactivejobs', 'closedjobs']
  let EmployeeRoute = ['/employer/dashboard', '/employer/activejobs', '/employer/jobapplication', '/employer/myprofile', '/edit-partner-profile', '/employer/inactivejobs', '/employer/closedjobs', '/employer/addtrainingpartner']
  let PartnerRoute = ['/partner/dashboard', '/partner/activecourses', '/partner/inactivecourses', '/partner/postcourses', 'partner/myprofile', '/partner/edit-partner-profile']

  useEffect(() => {
    if (userType === "employer") {
      if (EmployeeRoute.includes(location.pathname.split('/')[2])) {
        // navigate(-1)
      } else {
        navigate('/employer/dashboard')
      }
    }
    if (userType === "partner") {
      if (PartnerRoute.includes(location.pathname.split('/')[2])) {
        // navigate(-1)
      } else {
        navigate('/partner/dashboard')
      }
    }
  }, [userType])

  return (
    <>
      {
        userType === "employer" ?
          <Employer /> :
          userType === "partner" ?
            <Partner /> :
            <Pages />
      }
    </>
  );
};

export default Routes;
