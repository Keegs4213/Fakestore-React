import React from "react";
import PropTypes from "prop-types";
import styles from "../page.module.css"
import { Select } from "antd";

export const SelectPrice = ({ className, onChange }) => {

  SelectPrice.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

SelectPrice.defaultProps = {
  // className: styles.selector,
};
  return (
    <div className={styles.selectContainer}>
      <Select
        className={className}
        defaultValue="none"
        style={{ width: 150 }}
        onChange={onChange}
      >
        <Select.Option value="none">None</Select.Option>
        <Select.Option value="lowToHigh">Low to High</Select.Option>
        <Select.Option value="highToLow">High to Low</Select.Option>
      </Select>
    </div>
  );
};

export default SelectPrice;
