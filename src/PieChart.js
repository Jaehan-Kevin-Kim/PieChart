import { useCallback, useEffect } from "react";
import { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { css } from "@emotion/css";
import RangeInput from "./RangeInput";

const data = [
  { id: 0, name: "React", value: 50 },
  { id: 1, name: "CSS", value: 25 },
  { id: 2, name: "HTML", value: 25 },
];

const PieChart = () => {
  const [newData, setNewData] = useState(data);
  const [firstValue, setFirstValue] = useState(data[0].value);
  const [secondValue, setSecondValue] = useState(data[1].value);
  const [thirdValue, setThirdValue] = useState(data[2].value);
  const [newInput, setNewInput] = useState("");

  const getPieChartData = () => {
    return newData.map((data) => ({ value: data.value, name: data.name }));
  };

  const getOption = {
    title: {
      text: "React Accessment by Kevin Kim",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: "50%",

        data: getPieChartData(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{b}: ({d}%)",
        },
      },
    ],
  };

  const onChangeNewInput = useCallback(
    (e) => {
      setNewInput(e.target.value);
    },
    [newInput],
  );

  const addNewData = useCallback(
    (e) => {
      e.preventDefault();
      const updatedData = [...newData];
      updatedData.filter((data) => (data.value = 100 / (updatedData.length + 1)));
      console.log(updatedData);
      setNewData([
        ...updatedData,
        { id: newData.length, name: e.target.name.value, value: 100 / (newData.length + 1) },
      ]);
      setNewInput("");
    },
    [newData],
  );

  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          // align-items: center;
        `}>
        <ReactEcharts
          option={getOption}
          style={{ height: "500px", width: "600px", marginTop: "3em" }}
        />
        <div
          className={css`
            display: flex;
            flex-direction: column;
            margin-top: 3em;
          `}>
          <div
            className={css`
              margin-top: 3em;
              margin-bottom: 2em;
            `}>
            <h3>Add a New Data</h3>
            <form
              onSubmit={addNewData}
              className={css`
                display: flex;
              `}>
              <input
                name="name"
                type="text"
                value={newInput}
                onChange={onChangeNewInput}
                placeholder="Name of Data"
              />{" "}
              <br />
              <input
                className={css`
                  cursor: pointer;
                  color: #fff;
                  border-color: black;
                  border-left-color: #1890ff;
                  background: #1890ff;
                  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
                  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
                  outline: none;
                  &:hover {
                    opacity: 0.5;
                  }
                `}
                type="submit"
                value="Add"
              />
            </form>
          </div>

          <div
            className={css`
              margin-top: 2em;
            `}>
            <h3>Slider</h3>
            {newData.map((data) => (
              <RangeInput data={data} newData={newData} setNewData={setNewData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChart;
