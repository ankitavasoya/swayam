import React, { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  img: String;
  text: any;
  alts: String
  link?: string
}
const GrowTogatherCard: FC<Props> = ({ img, text, alts, link }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="grow-together-card" onClick={() => navigate(`/${link}`)}>
        <figure style={{ height: '50px' }}>
          <img src={`./assets/img/${img}`} alt={`${alts}`} />
        </figure>
        <h1>{text}</h1>
      </div>
    </>
  );
};

export default GrowTogatherCard;
