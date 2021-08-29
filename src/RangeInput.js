import React, { useCallback, useState } from "react";
import { css } from "@emotion/css";

const RangeInput = ({ data, newData, setNewData }) => {
  const onChangeValue = useCallback(
    (e) => {
      const { id } = e.target;
      const value = parseInt(e.target.value);
      // console.log(newData);
      const selectedData = newData.filter((data) => parseInt(id, 10) === data.id);
      // console.log("selectedData", selectedData);
      const unSelectedData = newData.filter((data) => parseInt(id, 10) !== data.id);
      // console.log("unSelectedData", unSelectedData);

      const updatedData = [...newData];
      //   console.log(updatedData);

      const selectedValue = selectedData[0].value;

      if (value > selectedValue) {
        const newValues = newData.map(
          (data) => data.value - (value - selectedValue) / unSelectedData.length,
        );
        newValues[id] = parseInt(value);
        unSelectedData.forEach((data) => {
          if (data.value > 0) {
            // data.value = data.value - (value - selectedValue) / unSelectedData.length;
            updatedData[data.id].value =
              data.value - (value - selectedValue) / unSelectedData.length;
            // console.log(updatedData[data.id], updatedData[data.id].value);
          } else if (data.value <= 0) {
            const stillPositive = unSelectedData.filter((v) => data.id !== v.id && v.value > 0);
            // console.log("stillPositive lenght", stillPositive.length);
            stillPositive.forEach(
              (v) =>
                (updatedData[v.id].value =
                  v.value - (value - selectedValue) / unSelectedData.length),
            );
          }
        });
      } else if (value < selectedValue) {
        // newValues[id] = parseInt(value);
        unSelectedData.forEach((data) => {
          if (data.value <= 100) {
            updatedData[data.id].value =
              data.value + (selectedValue - value) / unSelectedData.length;
          } else if (data.value > 100) {
            const stillInRange = unSelectedData.filter((v) => data.id !== v.id && v.value <= 100);

            stillInRange.forEach(
              (v) =>
                (updatedData[v.id].value =
                  v.value + (selectedValue - value) / unSelectedData.length),
            );
          }
        });
      }
      updatedData[id].value = value;

      //Checker for total Value
      const overLimit = updatedData.filter((data) => data.value > 100);
      const notOverLimit = updatedData.filter((data) => data.id !== overLimit.id);
      const underLimit = updatedData.filter((data) => data.value < 0);
      const notUnderLimit = updatedData.filter((data) => data.id !== underLimit.id);

      if (overLimit.length) {
        console.log("overlimit case");
        overLimit.forEach((data) => (updatedData[data.id].value = Math.floor(data.value)));
        notOverLimit.forEach((data) => (updatedData[data.id].value = Math.round(data.value)));
      }
      if (underLimit.length) {
        console.log("underlimit case");
        underLimit.forEach((data) => (updatedData[data.id].value = Math.round(data.value)));
        notUnderLimit.forEach((data) => (updatedData[data.id].value = Math.floor(data.value)));
      }
      //   console.log("updatedData final", updatedData);
      setNewData(updatedData);
    },
    [newData],
  );

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
      `}>
      <p style={{ width: "4rem", margin: 0, display: "inlineBlock" }}>{data.name}: </p>
      <input
        type="range"
        min="0"
        max="100"
        id={data.id}
        name={data.name}
        value={data.value}
        onChange={onChangeValue}></input>
    </div>
  );
};

export default RangeInput;
