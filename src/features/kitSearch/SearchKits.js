import React, { useState, useEffect } from "react";
import styles from "./SearchKits.module.css";

export function SearchKits() {
  const [searchValue, setSearchValue] = useState(null);
  const [kitsData, setKitsData] = useState([]);

  const handleKeyup = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    // if (searchValue) {
    fetch(`http://localhost:3001/kits?qs=${searchValue}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // If more than 10 results are found, the API will return the top 10 matching results
        setKitsData(data);
      });
    // }
  }, [searchValue]);

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          onKeyUp={e => handleKeyup(e.target.value)}
        />
      </div>
      {searchValue?.length === 0 && <p>Please Enter Your Kit Label ID to Search</p>}
      {searchValue?.length > 0 && kitsData?.length === 0 && (
        <div className={styles.row}>No Results Found</div>
      )}
      {searchValue?.length > 0 && kitsData?.length > 0 && (
        <>
          <div className={styles.row}>
            Click your Kit for Detailed Shipping Info (Opens FedEx in a New
            Window)
          </div>
          <ul style={{ listStyleType: "none" }}>
            {kitsData.map(res => (
              <li key={res.id}>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.fedex.com/fedextrack/?tracknumbers=${res.shipping_tracking_code}`,
                      "_blank"
                    )
                  }
                >
                  Label ID: {res.label_id} / Tracking Code:
                  {res.shipping_tracking_code}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
