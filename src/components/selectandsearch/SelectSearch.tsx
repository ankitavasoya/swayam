import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";
import { log } from "console";
import { useNavigate } from "react-router-dom";

const SelectSearch = () => {
  const navigate = useNavigate()

  const [selectorVal, setSelectorVal] = useState("Learn");
  const [showOpt, setShowOpt] = useState(false);
  const [search, setSearch] = useState("");

  const selectorList = [
    {
      list: "Learn",
    },
    {
      list: "Jobs",
    },
    {
      list: "Schemes",
    },
  ];

  const redirect = () => {
    const q = search.split(' ').join('+')
    if (selectorVal === "Learn") {
      if (search) {
        navigate(`/view_all_course?q=${q}`)
      } else {
        navigate(`/view_all_course`)
      }
    } else if (selectorVal === "Jobs") {
      if (search) {
        navigate(`/view_all_jobs?q=${q}`)
      } else {
        navigate(`/view_all_jobs`)
      }
    } else if (selectorVal === "Schemes") {
      if (search) {
        navigate(`/view_all_schemes?q=${q}`)
      } else {
        navigate(`/view_all_schemes`)
      }
    }
  }
  const handalChange = (event: any) => {
    setSearch(event)
  }
  return (
    <>
      <div className="slector-search">
        <div className="slector-search-inner">
          <div className="selector" onClick={() => setShowOpt(!showOpt)}>
            <p>{selectorVal}</p>
            <div className={showOpt ? "uparrow" : "downarrow"}>
              <BiChevronDown />
            </div>
            {showOpt && <div className="selector-option">
              <ul>
                {selectorList.map((item, i) => (
                  <li key={item.list} className={selectorVal === item.list ? "text-bold" : ''} onClick={() => setSelectorVal(item.list)}>
                    {item.list}
                  </li>
                ))}
              </ul>
            </div>}
          </div>
          <div className="search">
            <input type="text" placeholder="Explore More." onChange={(event: any) => handalChange(event.target.value)} />
            <div className="search-icon">
              <CgSearch onClick={redirect} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectSearch;
