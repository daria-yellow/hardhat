import React from "react";

export function OwhBalanceOf({ owhBalanceOf }) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const account = formData.get("account");

          if (account) {
            owhBalanceOf(account);
          }
        }}
      >
        <input placeholder="Enter address to check" type="text" name="account" required />
        <input type="submit" value="Check" />
      </form>
    </div>
  );
}