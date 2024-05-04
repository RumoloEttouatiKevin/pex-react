import { memo } from "react";

export const UseCallback = memo(({ onClick }) => {
  console.log("RENDER <UseCallback />");

  return (
    <button onClick={onClick} style={{ marginTop: "100px" }}>
      Coucou !
    </button>
  );
});
