import React from "react";
import { StyledContainer } from "../styled";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { theme } from "doctor-online-common";
import { StyledGenderOverview } from "./styled";

const GenderOverview = () => {
  const { t } = useTranslation();

  const data = [
    { name: "male", value: 45, color: theme.orange },
    { name: "female", value: 30, color: theme.blue },
    { name: "child", value: 25, color: theme.strongBlue },
  ];

  return (
    <StyledContainer>
      <div className="header">
        <p className="title">{t("gender")}</p>
      </div>
      <div className="content">
        <StyledGenderOverview>
          <PieChart width={140} height={140}>
            <Pie
              data={data}
              // cx={120}
              // cy={120}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <ul className="annotate">
            {data.map((entry) => {
              return (
                <li style={{ color: entry.color }}>
                  <p>{entry.name}</p>
                  <span>{entry.value}%</span>
                </li>
              );
            })}
          </ul>
        </StyledGenderOverview>
      </div>
    </StyledContainer>
  );
};

export default GenderOverview;
