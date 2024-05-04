import { memo } from "react";

export const Memo = memo(() => {
  console.log("RENDER <MEMO />");

  return <div style={{ marginTop: "100px" }}>Coucou !</div>;
});

// function Memo_() {
//   console.log("RENDER <MEMO />");

//   return <div style={{ marginTop: "100px" }}>Coucou !</div>;
// }

// export const Memo = memo(Memo_);
